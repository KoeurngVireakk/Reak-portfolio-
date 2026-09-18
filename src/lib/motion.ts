export const springSoft = {
  type: "spring" as const,
  stiffness: 150,
  damping: 24,
  mass: 0.9,
};

export const springInteractive = {
  type: "spring" as const,
  stiffness: 340,
  damping: 28,
  mass: 0.55,
};

export const springMagnetic = {
  type: "spring" as const,
  stiffness: 260,
  damping: 24,
  mass: 0.45,
};

export const springSpatial = {
  type: "spring" as const,
  stiffness: 105,
  damping: 24,
  mass: 0.85,
};

export const revealTransition = {
  duration: 0.62,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const revealSoftTransition = {
  duration: 0.46,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const projectTransition = {
  duration: 0.42,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const interactionMotion = {
  lift: { y: -2 },
  press: { scale: 0.98 },
  iconPress: { scale: 0.92 },
};

export const projectDepth = {
  enter: { opacity: 0, scale: 0.97, rotateY: -2, y: 18 },
  center: { opacity: 1, scale: 1, rotateY: 0 },
  exit: { opacity: 0, scale: 0.96, rotateY: 2, y: -18 },
};

export const revealMask = {
  variants: {
    hidden: { y: "112%", rotate: 1.5 },
    visible: { y: "0%", rotate: 0 },
  },
  transition: {
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1] as const,
  },
};

export const heroSceneReveal = {
  hidden: { opacity: 0, scale: 0.97, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.72, delay: 0.46, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const revealSoft = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export const heroDepth = {
  hidden: { opacity: 0, y: 24, rotateX: 4, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: revealTransition,
  },
};

export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.025,
    },
  },
};

export const staggerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

export const motionTokens = {
  silk: revealTransition,
  quick: {
    duration: 0.2,
    ease: [0.22, 1, 0.36, 1] as const,
  },
  spring: springInteractive,
  reveal: revealTransition,
  revealSoft: revealSoftTransition,
  springSoft,
  springInteractive,
  springMagnetic,
  springSpatial,
  heroDepth,
  heroSceneReveal,
  revealMask,
  projectTransition,
  interaction: interactionMotion,
  projectDepth,
  staggerFast,
  staggerSlow,
};

export const revealVariants = reveal;
export const staggerVariants = staggerFast;

export const heroItemVariants = {
  hidden: revealSoft.hidden,
  visible: {
    ...revealSoft.visible,
    transition: revealTransition,
  },
};
