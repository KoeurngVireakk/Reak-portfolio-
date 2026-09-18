import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { springSpatial } from "../../lib/motion";

export function AmbientSystem() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    ...springSpatial,
    stiffness: 72,
    damping: 24,
  });

  const orbAY = useTransform(progress, [0, 1], [-70, 210]);
  const orbBY = useTransform(progress, [0, 1], [110, -160]);
  const orbCX = useTransform(progress, [0, 1], [-50, 90]);
  const latticeY = useTransform(progress, [0, 1], [0, -120]);

  return (
    <div className="ambient-system" aria-hidden="true">
      <motion.div
        className="ambient-lattice"
        style={{ y: reduceMotion ? 0 : latticeY }}
      />
      <motion.div
        className="ambient-orb ambient-orb-a"
        style={{ y: reduceMotion ? 0 : orbAY }}
      />
      <motion.div
        className="ambient-orb ambient-orb-b"
        style={{ y: reduceMotion ? 0 : orbBY }}
      />
      <motion.div
        className="ambient-orb ambient-orb-c"
        style={{ x: reduceMotion ? 0 : orbCX }}
      />

      <div className="ambient-rail">
        <motion.i
          className="ambient-rail-progress"
          style={{ scaleY: reduceMotion ? 1 : progress }}
        />
        <span className="ambient-node ambient-node-a" />
        <span className="ambient-node ambient-node-b" />
        <span className="ambient-node ambient-node-c" />
      </div>

      <span className="ambient-coordinate ambient-coordinate-a">KV / SYSTEM / 05</span>
      <span className="ambient-coordinate ambient-coordinate-b">UI · API · DATA · SECURITY</span>
    </div>
  );
}
