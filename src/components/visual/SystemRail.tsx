import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { springSoft } from "../../lib/motion";

const stages = ["Identity", "System", "Proof", "Trajectory", "Contact"];

export function SystemRail() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, springSoft);

  return (
    <aside className="system-rail" aria-hidden="true">
      <span className="system-rail-kicker">Portfolio system</span>
      <div className="system-rail-track">
        <motion.i style={{ scaleY: reduceMotion ? 1 : progress }} />
        {stages.map((stage, index) => (
          <span className="system-rail-stage" key={stage}>
            <b>{String(index + 1).padStart(2, "0")}</b>
            {stage}
          </span>
        ))}
      </div>
    </aside>
  );
}
