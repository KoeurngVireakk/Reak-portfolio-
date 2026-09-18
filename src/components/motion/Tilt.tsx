import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { springSoft } from "../../lib/motion";
import { useFinePointer } from "../../lib/pointer";

type TiltProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
};

export function Tilt({ children, className = "", maxTilt = 3.5 }: TiltProps) {
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, springSoft);
  const springRotateY = useSpring(rotateY, springSoft);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !finePointer) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateX.set(vertical * maxTilt * -2);
    rotateY.set(horizontal * maxTilt * 2);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      className={`tilt ${className}`.trim()}
      onPointerLeave={reset}
      onPointerMove={handlePointerMove}
      style={{ rotateX: springRotateX, rotateY: springRotateY }}
    >
      {children}
    </motion.div>
  );
}
