import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { motionEasings, revealSoftTransition } from "../../lib/motion";

type SectionTransitionProps = {
  from: string;
  to: string;
};

type TransitionMotif = {
  code: string;
  motif: string;
  badge: string;
};

const transitionMotifs: Record<string, TransitionMotif> = {
  "Identity->System": {
    code: "SYS.CONDUIT // 01",
    motif: "TOPOLOGY_INGEST",
    badge: "IDENTITY ➔ ARCHITECTURE",
  },
  "System->Proof": {
    code: "SYS.CONDUIT // 02",
    motif: "ARCH_VERIFIED",
    badge: "CAPABILITIES ➔ SYSTEMS",
  },
  "Proof->Trajectory": {
    code: "SYS.CONDUIT // 03",
    motif: "PROOF_COMPILED",
    badge: "PROJECTS ➔ TRAJECTORY",
  },
  "Trajectory->Contact": {
    code: "SYS.CONDUIT // 04",
    motif: "SIGNAL_RESOLVE",
    badge: "PROGRESSION ➔ ACTION",
  },
};

export function SectionTransition({ from, to }: SectionTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.65 });
  const reduceMotion = useReducedMotion();
  const transitionKey = `${from}->${to}`;
  const motif = transitionMotifs[transitionKey] ?? {
    code: "SYS.CONDUIT",
    motif: "FLOW_TRANSFER",
    badge: `${from.toUpperCase()} ➔ ${to.toUpperCase()}`,
  };

  return (
    <div className="section-transition" aria-hidden="true" ref={containerRef}>
      <div className="transition-endpoint endpoint-from">
        <span className="endpoint-name">{from}</span>
        <small className="endpoint-code">{motif.code}</small>
      </div>

      <div className="section-transition-path">
        {/* Calibrated connector baseline */}
        <motion.i
          className="transition-line"
          initial={reduceMotion ? false : { scaleX: 0 }}
          transition={revealSoftTransition}
          viewport={{ once: true, amount: 0.7 }}
          whileInView={{ scaleX: 1 }}
        />

        {/* Evolving architecture motif badge in center */}
        <div className="transition-motif-badge">
          <span className="motif-text">{motif.motif}</span>
          <span className="motif-sub">{motif.badge}</span>
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
        <small className="endpoint-code">NEXT // ONLINE</small>
      </div>
    </div>
  );
}
