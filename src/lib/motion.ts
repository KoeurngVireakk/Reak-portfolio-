export const motionDurations = {
  feedback: 0.2,
  state: 0.42,
  editorial: 0.62,
  spatial: 0.72,
} as const;

export const motionEasings = {
  arrive: [0.16, 1, 0.3, 1],
  soft: [0.22, 1, 0.36, 1],
  leave: [0.4, 0, 1, 1],
} as const;

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
  duration: motionDurations.editorial,
  ease: motionEasings.arrive,
};

export const revealSoftTransition = {
  duration: 0.46,
  ease: motionEasings.soft,
};

export const projectTransition = {
  duration: motionDurations.state,
  ease: motionEasings.arrive,
};

export const interactionMotion = {
  lift: { y: -2 },
  press: { scale: 0.98 },
  iconPress: { scale: 0.92 },
};

export const projectDepth = {
  enter: { opacity: 0, scale: 0.975, y: 16, filter: "brightness(0.92)" },
  center: { opacity: 1, scale: 1, y: 0, filter: "brightness(1)" },
  exit: { opacity: 0, scale: 0.955, y: -16, filter: "brightness(0.85)" },
};

export const revealMask = {
  variants: {
    hidden: { y: "112%", rotate: 1.5 },
    visible: { y: "0%", rotate: 0 },
  },
  transition: {
    duration: 0.7,
    ease: motionEasings.arrive,
  },
};

export const heroSceneReveal = {
  hidden: { opacity: 0, scale: 0.97, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: motionDurations.spatial, delay: 0.46, ease: motionEasings.arrive },
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
    duration: motionDurations.feedback,
    ease: motionEasings.soft,
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

export const motionLanguage = {
  editorialArrival: revealTransition,
  interfaceFeedback: motionTokens.quick,
  stateContinuity: projectTransition,
  spatialContinuity: springSpatial,
} as const;

export const revealVariants = reveal;
export const staggerVariants = staggerFast;

export const heroItemVariants = {
  hidden: revealSoft.hidden,
  visible: {
    ...revealSoft.visible,
    transition: revealTransition,
  },
};
