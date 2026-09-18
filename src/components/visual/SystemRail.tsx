import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { springSoft } from "../../lib/motion";
import type { SystemStage } from "../../lib/useActiveSection";

const stages: SystemStage[] = ["Identity", "System", "Proof", "Trajectory", "Contact"];

type SystemRailProps = {
  activeStage?: SystemStage;
};

export function SystemRail({ activeStage = "Identity" }: SystemRailProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, springSoft);
  const activeIndex = stages.indexOf(activeStage);

  return (
    <aside className="system-rail" aria-hidden="true">
      <span className="system-rail-kicker">Portfolio system</span>
      <div className="system-rail-track">
        <motion.i style={{ scaleY: reduceMotion ? 1 : progress }} />
        {stages.map((stage, index) => {
          const status =
            index < activeIndex
              ? "is-completed"
              : index === activeIndex
              ? "is-current"
              : "is-upcoming";

          return (
            <span
              className={`system-rail-stage ${status}`}
              data-stage={stage.toLowerCase()}
              key={stage}
            >
              <b>{String(index + 1).padStart(2, "0")}</b>
              {stage}
            </span>
          );
        })}
      </div>
    </aside>
  );
}
