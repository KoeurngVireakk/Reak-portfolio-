export const motionTokens = {
  silk: {
    duration: 0.58,
    ease: [0.16, 1, 0.3, 1] as const,
  },
  quick: {
    duration: 0.22,
    ease: [0.22, 1, 0.36, 1] as const,
  },
  spring: {
    type: "spring" as const,
    stiffness: 280,
    damping: 26,
    mass: 0.75,
  },
};

export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const staggerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
};

export const heroItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTokens.silk,
  },
};
