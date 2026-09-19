import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { motionTokens, revealVariants } from "../../lib/motion";
import { canObserveViewport } from "../../lib/motionLifecycle";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  variant?: "editorial" | "structural" | "system" | "media";
};

const revealArchetypes = {
  editorial: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  },
  structural: {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  },
  system: {
    hidden: { opacity: 0, scale: 0.99 },
    visible: { opacity: 1, scale: 1 },
  },
  media: {
    hidden: { opacity: 0, y: 12, scale: 0.985 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
} as const;

export function Reveal({ children, className = "", delay = 0, variant = "editorial", ...props }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const canObserve = canObserveViewport();

  return (
    <motion.div
      className={className}
      initial={reduceMotion || !canObserve ? false : "hidden"}
      transition={{ ...motionTokens.silk, delay: reduceMotion ? 0 : delay }}
      variants={variant === "editorial" ? revealVariants : revealArchetypes[variant]}
      viewport={{ once: true, amount: 0.16 }}
      whileInView={canObserve ? "visible" : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
