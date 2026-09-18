import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { springSoft } from "../../lib/motion";
import { useFinePointer } from "../../lib/pointer";

export function CursorSpotlight() {
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const x = useMotionValue(-480);
  const y = useMotionValue(-480);
  const springX = useSpring(x, springSoft);
  const springY = useSpring(y, springSoft);

  useEffect(() => {
    if (reduceMotion || !finePointer) return;

    const update = (event: PointerEvent) => {
      x.set(event.clientX - 220);
      y.set(event.clientY - 220);
    };

    window.addEventListener("pointermove", update, { passive: true });
    return () => window.removeEventListener("pointermove", update);
  }, [finePointer, reduceMotion, x, y]);

  if (reduceMotion || !finePointer) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-spotlight"
      style={{ x: springX, y: springY }}
    />
  );
}
