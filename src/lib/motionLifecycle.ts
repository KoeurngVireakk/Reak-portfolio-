import { useEffect, useState, type RefObject } from "react";
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
  const inView = useSafeInView(target, amount);

  return {
    active: documentVisible && inView && !reducedMotion,
    documentVisible,
    inView,
    reducedMotion,
  };
}

export function useSafeInView(
  target: RefObject<Element | null>,
  amount = 0.1,
  once = false,
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = target.current;
    if (!element) return;

    if (typeof globalThis.IntersectionObserver !== "function") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { threshold: amount },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [amount, once, target]);

  return inView;
}

export function canObserveViewport() {
  return typeof window !== "undefined"
    && typeof globalThis.IntersectionObserver === "function";
}
