import { motion, useReducedMotion } from "motion/react";
import { revealSoftTransition } from "../../lib/motion";

type SectionTransitionProps = {
  from: string;
  to: string;
};

export function SectionTransition({ from, to }: SectionTransitionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="section-transition" aria-hidden="true">
      <span>{from}</span>
      <span className="section-transition-path">
        <motion.i
          initial={reduceMotion ? false : { scaleX: 0 }}
          transition={revealSoftTransition}
          viewport={{ once: true, amount: 0.8 }}
          whileInView={{ scaleX: 1 }}
        />
        <motion.b
          initial={reduceMotion ? false : { opacity: 0, x: -12 }}
          transition={{ ...revealSoftTransition, delay: 0.12 }}
          viewport={{ once: true, amount: 0.8 }}
          whileInView={{ opacity: 1, x: 0 }}
        />
      </span>
      <span>{to}</span>
    </div>
  );
}
