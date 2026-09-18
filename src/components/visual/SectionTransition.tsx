import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "../../lib/motion";

type SectionTransitionProps = {
  index: string;
  from: string;
  to: string;
};

export function SectionTransition({ index, from, to }: SectionTransitionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="section-transition" aria-hidden="true">
      <span className="section-transition-code">{index}</span>
      <div className="section-transition-track">
        <motion.i
          initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={motionTokens.reveal}
        />
        <span className="section-transition-pulse" />
      </div>
      <div className="section-transition-copy">
        <span>{from}</span>
        <b>→</b>
        <span>{to}</span>
      </div>
    </div>
  );
}
