import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { motionTokens, revealVariants } from "../../lib/motion";
import { canObserveViewport } from "../../lib/motionLifecycle";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const canObserve = canObserveViewport();

  return (
    <motion.div
      className={className}
      initial={reduceMotion || !canObserve ? false : "hidden"}
      transition={{ ...motionTokens.silk, delay: reduceMotion ? 0 : delay }}
      variants={revealVariants}
      viewport={{ once: true, amount: 0.16 }}
      whileInView={canObserve ? "visible" : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
