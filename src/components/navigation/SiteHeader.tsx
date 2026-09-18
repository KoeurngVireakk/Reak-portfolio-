import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { motionTokens } from "../../lib/motion";

const navItems = [
  { id: "about", label: "About" },
  { id: "capabilities", label: "Capabilities" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

function navigateToSection(id: string) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

type SiteHeaderProps = {
  theme: "dark" | "light";
  onToggleTheme: () => void;
};

export function SiteHeader({ theme, onToggleTheme }: SiteHeaderProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = ["home", ...navItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0.01, 0.2, 0.45] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    function onResize() {
      if (window.innerWidth > 900) setMobileOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function handleNavigation(id: string) {
    navigateToSection(id);
    setMobileOpen(false);
  }

  return (
    <header className="site-header">
      <a
        className="brand"
        href="#home"
        aria-label="Koeurng Vireak — home"
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
          onClick={onToggleTheme}
          transition={motionTokens.spring}
          whileTap={reduceMotion ? undefined : { scale: 0.92 }}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              animate={{ opacity: 1, rotate: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, rotate: 20 }}
              initial={reduceMotion ? false : { opacity: 0, rotate: -20 }}
              key={theme}
              transition={motionTokens.quick}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
        <a className="header-contact" href="#contact">
          Contact <ArrowUpRight size={15} />
        </a>
        <button
          className="mobile-menu-button"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
              <a
                href={`#${item.id}`}
                key={item.id}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigation(item.id);
                }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
