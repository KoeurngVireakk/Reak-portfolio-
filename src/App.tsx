import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/navigation/SiteHeader";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Journey } from "./components/sections/Journey";
import { Projects } from "./components/sections/Projects";
import { AmbientSystem } from "./components/visual/AmbientSystem";
import { SectionTransition } from "./components/visual/SectionTransition";
import { springSoft } from "./lib/motion";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const storedTheme = window.localStorage.getItem("portfolio-theme");
  if (storedTheme === "dark" || storedTheme === "light") return storedTheme;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: springSoft.stiffness,
    damping: springSoft.damping,
    mass: springSoft.mass,
  });

  useEffect(() => {
    window.localStorage.setItem("portfolio-theme", theme);
    document.documentElement.style.colorScheme = theme;
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#020503" : "#f4f3ee");
  }, [theme]);

  return (
    <div className="site" data-theme={theme} data-styleseed-recipe="expressive-brand">
      <AmbientSystem />

      <motion.div
        className="scroll-progress"
        style={{ scaleX: progressScale }}
        aria-hidden="true"
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteHeader
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
      />

      <main id="main">
        <Hero />
        <SectionTransition index="01" from="Identity" to="System" />
        <About />
        <SectionTransition index="02" from="System" to="Proof" />
        <Projects />
        <SectionTransition index="03" from="Proof" to="Trajectory" />
        <Journey />
        <SectionTransition index="04" from="Trajectory" to="Contact" />
        <Contact />
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
