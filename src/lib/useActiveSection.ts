import { useEffect, useState } from "react";

export type SystemStage = "Identity" | "System" | "Proof" | "Trajectory" | "Contact";

export function getStageFromSection(sectionId: string): SystemStage {
  switch (sectionId) {
    case "about":
    case "capabilities":
      return "System";
    case "projects":
      return "Proof";
    case "journey":
      return "Trajectory";
    case "contact":
      return "Contact";
    case "home":
    default:
      return "Identity";
  }
}

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = ["home", "about", "capabilities", "projects", "journey", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0.01, 0.2, 0.45] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onHashChange() {
      const id = window.location.hash.slice(1);
      if (id && ["home", "about", "capabilities", "projects", "journey", "contact"].includes(id)) {
        setActiveSection(id);
      }
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const activeStage = getStageFromSection(activeSection);

  return { activeSection, activeStage, setActiveSection };
}
