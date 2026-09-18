import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { motionTokens, revealVariants } from "../../lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      transition={{ ...motionTokens.silk, delay: reduceMotion ? 0 : delay }}
      variants={revealVariants}
      viewport={{ once: true, amount: 0.16 }}
      whileInView="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}
