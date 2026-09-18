import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { springMagnetic } from "../../lib/motion";
import { useFinePointer } from "../../lib/pointer";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({ children, className = "", strength = 4 }: MagneticProps) {
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springMagnetic);
  const springY = useSpring(y, springMagnetic);

  function handlePointerMove(event: PointerEvent<HTMLSpanElement>) {
    if (reduceMotion || !finePointer) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * strength * 2);
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * strength * 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      className={`magnetic ${className}`.trim()}
      onPointerLeave={reset}
      onPointerMove={handlePointerMove}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.span>
  );
}
