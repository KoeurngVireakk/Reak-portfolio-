import type { RefObject } from "react";
import { useInView } from "motion/react";
import { useDocumentVisible, useMediaQuery } from "./pointer";

type ContinuousMotionState = {
  active: boolean;
  documentVisible: boolean;
  inView: boolean;
  reducedMotion: boolean;
};

export function useContinuousMotion(
  target: RefObject<Element | null>,
  amount = 0.1,
): ContinuousMotionState {
  const documentVisible = useDocumentVisible();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const inView = useInView(target, { amount });

  return {
    active: documentVisible && inView && !reducedMotion,
    documentVisible,
    inView,
    reducedMotion,
  };
}
