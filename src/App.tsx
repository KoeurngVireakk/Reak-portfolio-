import { startTransition, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/navigation/SiteHeader";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Journey } from "./components/sections/Journey";
import { Projects } from "./components/sections/Projects";
import { SectionTransition } from "./components/visual/SectionTransition";
import { SystemRail } from "./components/visual/SystemRail";
import { springSoft } from "./lib/motion";
import { useActiveSection } from "./lib/useActiveSection";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const documentTheme = document.documentElement.dataset.theme;
  if (documentTheme === "dark" || documentTheme === "light") return documentTheme;

  try {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    if (storedTheme === "dark" || storedTheme === "light") return storedTheme;
  } catch {
    // localStorage unavailable (private browsing, iframe restrictions)
  }

  try {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  } catch {
    return "dark";
  }
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const { activeSection, activeStage } = useActiveSection();
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: springSoft.stiffness,
    damping: springSoft.damping,
    mass: springSoft.mass,
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      // localStorage unavailable
    }
    document.documentElement.style.colorScheme = theme;
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#020503" : "#f6f5f0");
  }, [theme]);

  function handleToggleTheme(origin?: { x: number; y: number }) {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    let reduceMotion = false;
    try {
      reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      // Use the non-animated path if media-query APIs are unavailable below.
    }

    if (
      reduceMotion
      || typeof document.startViewTransition !== "function"
      || typeof document.documentElement.animate !== "function"
    ) {
      startTransition(() => {
        setTheme(nextTheme);
      });
      return;
    }

    const x = origin?.x ?? window.innerWidth - 48;
    const y = origin?.y ?? 32;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.dataset.themeTransition = "circular";

    let transition;
    try {
      transition = document.startViewTransition(() => {
        setTheme(nextTheme);
      });
    } catch {
      delete document.documentElement.dataset.themeTransition;
      startTransition(() => setTheme(nextTheme));
      return;
    }

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 460,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});

    transition.finished.finally(() => {
      delete document.documentElement.dataset.themeTransition;
    });
  }

  return (
    <div className="site" data-theme={theme} data-styleseed-recipe="expressive-brand">
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progressScale }}
        aria-hidden="true"
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SystemRail activeStage={activeStage} />

      <SiteHeader
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main id="main">
        <Hero />
        <SectionTransition from="Identity" to="System" />
        <About />
        <SectionTransition from="System" to="Proof" />
        <Projects />
        <SectionTransition from="Proof" to="Trajectory" />
        <Journey />
        <SectionTransition from="Trajectory" to="Contact" />
        <Contact />
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
