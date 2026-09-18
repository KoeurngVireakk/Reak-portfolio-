import { motion, useReducedMotion } from "motion/react";
import { revealMask } from "../../lib/motion";

type HeadlineRevealProps = {
  lines: string[];
};

export function HeadlineReveal({ lines }: HeadlineRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <h1 aria-label={lines.join(" ")}>
      {lines.map((line, index) => (
        <span className={`headline-mask ${index === lines.length - 1 ? "headline-accent" : ""}`} key={line}>
          <motion.span
            aria-hidden="true"
            animate="visible"
            initial={reduceMotion ? false : "hidden"}
            transition={{ ...revealMask.transition, delay: reduceMotion ? 0 : 0.2 + index * 0.08 }}
            variants={revealMask.variants}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
