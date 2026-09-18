import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { revealSoft, revealSoftTransition } from "../../lib/motion";

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function ScrollReveal({ children, className = "", delay = 0, ...props }: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      transition={{ ...revealSoftTransition, delay: reduceMotion ? 0 : delay }}
      variants={revealSoft}
      viewport={{ once: true, amount: 0.18 }}
      whileInView="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}
