import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { motionEasings, revealSoftTransition } from "../../lib/motion";
import { canObserveViewport, useSafeInView } from "../../lib/motionLifecycle";

type SectionTransitionProps = {
  from: string;
  to: string;
};

type TransitionMotif = {
  phase: string;
  label: string;
  shape: "circle" | "diamond" | "bracket" | "pulse";
};

const transitionMotifs: Record<string, TransitionMotif> = {
  "Identity->System": {
    phase: "Phase 01 → 02",
    label: "Identity to System",
    shape: "circle",
  },
  "System->Proof": {
    phase: "Phase 02 → 03",
    label: "System to Evidence",
    shape: "diamond",
  },
  "Proof->Trajectory": {
    phase: "Phase 03 → 04",
    label: "Evidence to Trajectory",
    shape: "bracket",
  },
  "Trajectory->Contact": {
    phase: "Phase 04 → 05",
    label: "Trajectory to Contact",
    shape: "pulse",
  },
};

export function SectionTransition({ from, to }: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useSafeInView(containerRef, 0.65, true);
  const canObserve = canObserveViewport();
  const reduceMotion = useReducedMotion();
  const transitionKey = `${from}->${to}`;
  const motif = transitionMotifs[transitionKey] ?? {
    phase: "Conduit",
    label: `${from} to ${to}`,
    shape: "circle" as const,
  };

  return (
    <div
      className="section-transition"
      data-transition={motif.shape}
      aria-hidden="true"
      ref={containerRef}
    >
      <div className="transition-endpoint endpoint-from">
        <span className="endpoint-name">{from}</span>
        <small className="endpoint-code">{motif.phase.split(" → ")[0]}</small>
      </div>

      <div className="section-transition-path">
        {/* Calibrated connector baseline */}
        <motion.i
          className="transition-line"
          initial={reduceMotion || !canObserve ? false : { scaleX: 0 }}
          transition={revealSoftTransition}
          viewport={{ once: true, amount: 0.7 }}
          whileInView={canObserve ? { scaleX: 1 } : undefined}
        />

        {/* Evolving geometric conduit motif in center */}
        <div className={`transition-motif-badge shape-${motif.shape}`}>
          <span className="motif-shape-indicator" />
          <span className="motif-text">{motif.label}</span>
        </div>

        {/* Single-shot data signal packet traveling once across the connector */}
        {!reduceMotion && inView ? (
          <motion.span
            animate={{
              left: ["0%", "100%"],
              opacity: [0, 1, 1, 0],
            }}
            className="transition-signal-packet"
            initial={{ left: "0%", opacity: 0 }}
            transition={{
              duration: 1.05,
              delay: 0.15,
              ease: motionEasings.arrive,
            }}
          />
        ) : (
          <span className="transition-static-pip" />
        )}
      </div>

      <div className="transition-endpoint endpoint-to">
        <span className="endpoint-name">{to}</span>
        <small className="endpoint-code">{motif.phase.split(" → ")[1] ?? "Next"}</small>
      </div>
    </div>
  );
}
