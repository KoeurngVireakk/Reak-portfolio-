import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { motionEasings, springSoft } from "../../lib/motion";

export type ArchitectureLayer = {
  short: string;
  label: string;
  detail: string;
  role: string;
  boundary: string;
  evidence: string[];
  demonstratedIn: Array<{ slug: string; name: string; shortName: string }>;
};

export const architectureLayers: ArchitectureLayer[] = [
  {
    short: "UI",
    label: "Frontend Architecture",
    detail: "Responsive interfaces, deterministic view states, and client-side performance.",
    role: "Client Presentation & Local State",
    boundary: "Untrusted Client Boundary",
    evidence: ["React 19 / TypeScript", "Tailwind UI Systems", "Native View Transitions", "WCAG 2.2 AA Compliance"],
    demonstratedIn: [
      { slug: "koupreng-einvitation", name: "Koupreng E-Invitation", shortName: "EI" },
      { slug: "e-menu-saas", name: "E-Menu SaaS", shortName: "EM" },
    ],
  },
  {
    short: "API",
    label: "Service Architecture",
    detail: "Stateless REST contracts, input validation pipelines, and business rule orchestration.",
    role: "Application Logic & Mediation",
    boundary: "Authenticated Service Boundary",
    evidence: ["Spring Boot & ASP.NET Core", "REST Contract Validation", "Service Layer Isolation", "Idempotent Endpoints"],
    demonstratedIn: [
      { slug: "koupreng-einvitation", name: "Koupreng E-Invitation", shortName: "EI" },
      { slug: "loan-management", name: "Loan Management System", shortName: "LM" },
      { slug: "sale-management", name: "Sale Management System", shortName: "SM" },
    ],
  },
  {
    short: "DATA",
    label: "Data Persistence",
    detail: "Normalized relational schemas, ACID transactions, and deterministic migrations.",
    role: "Persistent Truth & Query Engine",
    boundary: "Encrypted Storage Tier",
    evidence: ["MySQL & SQL Server", "ACID Transaction Isolation", "Flyway & EF Migrations", "Index Optimization"],
    demonstratedIn: [
      { slug: "loan-management", name: "Loan Management System", shortName: "LM" },
      { slug: "sale-management", name: "Sale Management System", shortName: "SM" },
      { slug: "koupreng-einvitation", name: "Koupreng E-Invitation", shortName: "EI" },
    ],
  },
  {
    short: "SEC",
    label: "Security & Trust",
    detail: "Role-based access control, least-privilege tokens, and defensive authorization.",
    role: "Enforcement & Audit Boundary",
    boundary: "Zero-Trust Enforcement Layer",
    evidence: ["Spring Security & ASP.NET Identity", "RBAC Policy Enforcement", "JWT Token Lifecycle", "Antiforgery & Rate Limiting"],
    demonstratedIn: [
      { slug: "loan-management", name: "Loan Management System", shortName: "LM" },
      { slug: "sale-management", name: "Sale Management System", shortName: "SM" },
      { slug: "krama", name: "KRAMA", shortName: "KR" },
      { slug: "face-attendance-studio", name: "Face Attendance Studio", shortName: "FA" },
    ],
  },
];

type ArchitectureExplorerProps = {
  activeIndex: number;
  onSelectLayer?: (index: number) => void;
};

export function ArchitectureExplorer({ activeIndex, onSelectLayer }: ArchitectureExplorerProps) {
  const reduceMotion = useReducedMotion();
  const safeIndex = Math.min(Math.max(0, activeIndex), architectureLayers.length - 1);
  const activeLayer = architectureLayers[safeIndex];

  const prevIndexRef = useRef(safeIndex);
  useEffect(() => {
    prevIndexRef.current = safeIndex;
  }, [safeIndex]);

  // Connector node positions (percentage of track height)
  const nodePositions = [12.5, 37.5, 62.5, 87.5];
  const targetY = nodePositions[safeIndex];

  return (
    <div
      aria-labelledby={`capability-tab-${safeIndex}`}
      className="architecture-explorer"
      id="capability-architecture-panel"
      role="tabpanel"
      tabIndex={0}
    >
      <div className="architecture-explorer-heading">
        <div className="architecture-explorer-tag">
          <span>System architecture</span>
          <span className="architecture-pipe-state" aria-hidden="true">
            PIPELINE STAGE 0{safeIndex + 1}
          </span>
        </div>
        <strong>{activeLayer.label}</strong>
      </div>

      <div className="architecture-explorer-diagram">
        {/* Animated tracing connector track */}
        <div className="architecture-connector-track" aria-hidden="true">
          <svg className="connector-svg" preserveAspectRatio="none" viewBox="0 0 24 280">
            {/* Base line */}
            <line className="connector-base-line" x1="12" x2="12" y1="20" y2="260" />
            {/* Active route trace line */}
            <motion.line
              animate={reduceMotion ? { y2: targetY * 2.8 } : { y2: targetY * 2.8 }}
              className="connector-active-trace"
              initial={false}
              transition={reduceMotion ? { duration: 0 } : springSoft}
              x1="12"
              x2="12"
              y1="20"
            />
            {/* Traveling signal packet head */}
            <motion.circle
              animate={{ cy: targetY * 2.8 }}
              className="connector-signal-packet"
              cx="12"
              initial={false}
              r="3.5"
              transition={reduceMotion ? { duration: 0 } : springSoft}
            />
          </svg>
        </div>

        {/* 4 Pipeline Layer Nodes */}
        <div className="architecture-explorer-nodes">
          {architectureLayers.map((layer, index) => {
            const isActive = index === safeIndex;
            return (
              <button
                aria-pressed={isActive}
                className={`architecture-node-item ${isActive ? "is-active" : "is-inactive"}`}
                key={layer.short}
                onClick={() => onSelectLayer?.(index)}
                type="button"
              >
                <div className="node-badge">
                  <span className="node-code">{layer.short}</span>
                  {isActive ? (
                    <motion.span
                      className="node-ring"
                      layoutId={reduceMotion ? undefined : "active-node-ring"}
                      transition={springSoft}
                    />
                  ) : null}
                </div>
                <div className="node-summary">
                  <div className="node-summary-top">
                    <strong>{layer.label}</strong>
                    <span className="node-boundary">{layer.boundary}</span>
                  </div>
                  <p className="node-role">{layer.role}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Layer Accompanying Details & Restrained Evidence Stagger */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="architecture-active-details"
          exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          key={activeLayer.short}
          transition={{ duration: 0.28, ease: motionEasings.arrive }}
        >
          <div className="active-details-meta">
            <span className="details-kicker">Architecture responsibility</span>
            <p className="details-detail">{activeLayer.detail}</p>
          </div>

          <div className="active-details-evidence">
            <span className="evidence-title">Verified implementation evidence</span>
            <ul aria-label={`${activeLayer.label} architectural evidence`} className="evidence-chips">
              {activeLayer.evidence.map((item, idx) => (
                <motion.li
                  animate={{ opacity: 1, y: 0 }}
                  initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                  key={item}
                  transition={{
                    duration: 0.22,
                    delay: reduceMotion ? 0 : idx * 0.035,
                    ease: motionEasings.arrive,
                  }}
                >
                  <i aria-hidden="true" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="active-layer-status">
            <span className="layer-status-text">
              Verified across {activeLayer.demonstratedIn.length} system implementations.
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
