import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { interactionMotion, motionTokens } from "../../lib/motion";

const navItems = [
  { id: "about", label: "About" },
  { id: "capabilities", label: "Capabilities" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

function navigateToSection(id: string, updateHistory = true) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const target = document.getElementById(id);
  if (!target) return;

  target.focus({ preventScroll: true });
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });

  if (updateHistory && window.location.hash !== `#${id}`) {
    const url = new URL(window.location.href);
    url.hash = id;
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }
}

type SiteHeaderProps = {
  theme: "dark" | "light";
  onToggleTheme: (origin?: { x: number; y: number }) => void;
  activeSection?: string;
};

export function SiteHeader({
  theme,
  onToggleTheme,
  activeSection: propActiveSection,
}: SiteHeaderProps) {
  const [internalActiveSection, setInternalActiveSection] = useState("home");
  const activeSection = propActiveSection ?? internalActiveSection;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lastHashRef = useRef(window.location.hash);

  useEffect(() => {
    if (propActiveSection !== undefined) return;

    const supportsIntersectionObserver = typeof globalThis.IntersectionObserver === "function";
    if (!supportsIntersectionObserver) {
      const hashSection = window.location.hash.slice(1);
      if (["home", ...navItems.map((item) => item.id)].includes(hashSection)) {
        setInternalActiveSection(hashSection);
      }
      return;
    }

    const sections = ["home", ...navItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setInternalActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0.01, 0.2, 0.45] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [propActiveSection]);

  useEffect(() => {
    function restoreSectionFromHistory() {
      const nextHash = window.location.hash;
      if (nextHash === lastHashRef.current) return;

      lastHashRef.current = nextHash;
      const id = nextHash.slice(1) || "home";
      window.requestAnimationFrame(() => navigateToSection(id, false));
    }

    window.addEventListener("popstate", restoreSectionFromHistory);
    return () => window.removeEventListener("popstate", restoreSectionFromHistory);
  }, []);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    }

    function onResize() {
      if (window.innerWidth > 900) setMobileOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      if (mobileOpen && !headerRef.current?.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileOpen]);

  function handleNavigation(id: string) {
    navigateToSection(id);
    lastHashRef.current = `#${id}`;
    setMobileOpen(false);
  }

  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""}`}
      ref={headerRef}
      style={{ viewTransitionName: "site-header" }}
    >
      <a
        className="brand"
        href="#home"
        onClick={(event) => {
          event.preventDefault();
          handleNavigation("home");
        }}
      >
        <span className="brand-mark" aria-hidden="true">KV</span>
        <span className="brand-copy">
          <strong>Koeurng Vireak</strong>
          <small>Full-stack developer</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const active = activeSection === item.id;
          return (
            <a
              href={`#${item.id}`}
              key={item.id}
              aria-current={active ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                handleNavigation(item.id);
              }}
            >
              {item.label}
              {active ? (
                <motion.span
                  className="nav-indicator"
                  layoutId={reduceMotion ? undefined : "desktop-nav-indicator"}
                />
              ) : null}
            </a>
          );
        })}
      </nav>

      <div className="header-actions">
        <motion.button
          className="icon-button"
          type="button"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          onClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            onToggleTheme({
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            });
          }}
          transition={motionTokens.spring}
          whileTap={reduceMotion ? undefined : interactionMotion.iconPress}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              animate={{ opacity: 1, rotate: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, rotate: 20 }}
              initial={reduceMotion ? false : { opacity: 0, rotate: -20 }}
              key={theme}
              transition={motionTokens.quick}
            >
              {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
        <a
          className="header-contact"
          href="#contact"
          onClick={(event) => {
            event.preventDefault();
            handleNavigation("contact");
          }}
        >
          Contact <ArrowUpRight aria-hidden="true" size={15} />
        </a>
        <button
          className="mobile-menu-button"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMobileOpen((value) => !value)}
          ref={menuButtonRef}
        >
          {mobileOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            className="mobile-nav"
            id="mobile-navigation"
            aria-label="Mobile navigation"
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            transition={motionTokens.quick}
          >
            {navItems.map((item, index) => (
              <motion.a
                animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                href={`#${item.id}`}
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                key={item.id}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigation(item.id);
                }}
                transition={{ ...motionTokens.quick, delay: index * 0.035 }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
