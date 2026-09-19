import {
  useEffect,
  useRef,
  useCallback,
  type KeyboardEvent,
  type CSSProperties,
} from "react";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  ShieldCheck,
  TestTube2,
  X,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  howIWork,
  projects,
  type Project,
} from "../../data/portfolio";
import { springSoft } from "../../lib/motion";

export type InspectorTab = "overview" | "architecture" | "security" | "testing" | "decisions";

export type EngineeringInspectorProps = {
  project: Project | null;
  activeTab: InspectorTab;
  onSelectTab: (tab: InspectorTab) => void;
  onSelectProject: (project: Project) => void;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
};

export function getAvailableTabs(project: Project): Array<{ id: InspectorTab; label: string }> {
  const tabs: Array<{ id: InspectorTab; label: string }> = [
    { id: "overview", label: "OVERVIEW" },
  ];
  if (project.architectureTiers && project.architectureTiers.length > 0) {
    tabs.push({ id: "architecture", label: "ARCHITECTURE" });
  }
  if ((project.securityDetails && project.securityDetails.length > 0) || project.security) {
    tabs.push({ id: "security", label: "SECURITY" });
  }
  if ((project.testingDetails && project.testingDetails.length > 0) || project.testing) {
    tabs.push({ id: "testing", label: "TESTING" });
  }
  if (project.decisions && project.decisions.length > 0) {
    tabs.push({ id: "decisions", label: "DECISIONS" });
  }
  return tabs;
}

function getSecurityCategory(measure: string): string {
  const m = measure.toLowerCase();
  if (m.includes("jwt") || m.includes("token") || m.includes("auth") || m.includes("login") || m.includes("password")) {
    return "Authentication";
  }
  if (m.includes("role") || m.includes("rbac") || m.includes("permission") || m.includes("claim") || m.includes("access")) {
    return "Authorization";
  }
  if (m.includes("biometric") || m.includes("face") || m.includes("onnx") || m.includes("camera") || m.includes("local") || m.includes("privacy")) {
    return "Privacy";
  }
  if (m.includes("cors") || m.includes("sanitiz") || m.includes("validat") || m.includes("sql") || m.includes("csrf") || m.includes("boundary")) {
    return "Data Boundary";
  }
  if (m.includes("rate limit") || m.includes("pwa") || m.includes("container") || m.includes("offline") || m.includes("delivery") || m.includes("cache")) {
    return "Runtime / Delivery";
  }
  return "Hardening";
}

function getTestingCategory(practice: string): string {
  const p = practice.toLowerCase();
  if (p.includes("playwright") || p.includes("e2e") || p.includes("end-to-end") || p.includes("workflow")) {
    return "E2E Testing";
  }
  if (p.includes("unit") || p.includes("assertion") || p.includes("component test")) {
    return "Unit Testing";
  }
  if (p.includes("integration") || p.includes("transaction") || p.includes("database") || p.includes("service") || p.includes("flow")) {
    return "Integration";
  }
  if (p.includes("ci") || p.includes("github actions") || p.includes("build") || p.includes("pipeline") || p.includes("static analysis")) {
    return "CI & Build";
  }
  if (p.includes("doctor") || p.includes("diagnostic") || p.includes("health") || p.includes("pre-flight")) {
    return "Diagnostics";
  }
  if (p.includes("device") || p.includes("emulator") || p.includes("responsive") || p.includes("pwa")) {
    return "Device Verification";
  }
  return "Verification";
}

export function EngineeringInspector({
  project,
  activeTab,
  onSelectTab,
  onSelectProject,
  onClose,
  triggerElement,
}: EngineeringInspectorProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Store trigger element for focus restoration
  useEffect(() => {
    if (project && !returnFocusRef.current) {
      returnFocusRef.current = triggerElement ?? (document.activeElement as HTMLElement | null);
    }
  }, [project, triggerElement]);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      returnFocusRef.current?.focus({ preventScroll: true });
    }, 50);
  }, [onClose]);

  // Lock body scroll with scrollbar shift compensation and setup Escape / Focus Trap
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("inspector-open");

    // Focus close button initially
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 60);

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      // Focus trap within panel
      if (event.key === "Tab" && panelRef.current) {
        const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.documentElement.classList.remove("inspector-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleClose]);

  if (!project) return null;

  const tabs = getAvailableTabs(project);
  // Ensure activeTab is valid for current project
  const currentTabId = tabs.some((tab) => tab.id === activeTab) ? activeTab : tabs[0].id;
  const projectIndex = projects.findIndex((p) => p.slug === project.slug);
  const currentNumber = String(projectIndex + 1).padStart(2, "0");
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
        ? tabs.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;

    const nextTab = tabs[nextIndex];
    onSelectTab(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  };

  const projectAccentStyle = {
    "--project-accent": project.accent,
  } as CSSProperties;

  return (
    <motion.div
      aria-labelledby="inspector-heading"
      aria-modal="true"
      className="engineering-inspector-overlay"
      role="dialog"
      style={projectAccentStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
    >
      {/* Backdrop overlay */}
      <motion.button
        aria-label={`Close Engineering Inspector for ${project.name}`}
        animate={{ opacity: 1 }}
        className="engineering-inspector-backdrop"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        onClick={handleClose}
        tabIndex={-1}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
        type="button"
      />

      {/* Slide-in inspector panel */}
      <motion.div
        className="engineering-inspector-panel"
        exit={reduceMotion ? { opacity: 0 } : { x: "100%", opacity: 0.8 }}
        initial={reduceMotion ? { opacity: 0 } : { x: "100%", opacity: 1 }}
        animate={reduceMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
        ref={panelRef}
        role="document"
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Panel Header */}
        <div className="inspector-header">
          <div className="inspector-header-top">
            <div className="inspector-identity">
              <span className="inspector-badge">
                <span className="inspector-badge-dot" aria-hidden="true" />
                SYSTEM DOSSIER // {currentNumber}
              </span>
              <span className="inspector-shortname">{project.shortName}</span>
              <span className="inspector-status-pill">{project.status}</span>
            </div>

            <button
              className="inspector-close-button"
              onClick={handleClose}
              ref={closeButtonRef}
              type="button"
            >
              <X size={18} aria-hidden="true" />
              <span className="sr-only">Close Engineering Inspector for {project.name}</span>
            </button>
          </div>

          <div className="inspector-title-block">
            <h2 id="inspector-heading" className="inspector-title">
              {project.name}
            </h2>
            <p className="inspector-role-kicker">{project.role}</p>
            <p className="inspector-tagline">{project.tagline}</p>
          </div>

          {/* Quick Project Switcher Index */}
          <div className="inspector-nav-bar" aria-label="Quick project index">
            <span className="inspector-nav-kicker">INDEX:</span>

            {/* Desktop 6-project button row */}
            <div className="inspector-nav-links desktop-only-flex">
              {projects.map((p, idx) => {
                const isSelected = p.slug === project.slug;
                return (
                  <button
                    aria-current={isSelected ? "true" : undefined}
                    className={`inspector-nav-item ${isSelected ? "is-active" : ""}`}
                    key={p.slug}
                    onClick={() => onSelectProject(p)}
                    type="button"
                  >
                    <span className="nav-num">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="nav-code">{p.shortName}</span>
                    <span className="sr-only"> — Inspect {p.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Thumb Stepper */}
            <div className="inspector-mobile-stepper mobile-only-flex">
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onSelectProject(prevProject)}
                aria-label={`Previous project: ${prevProject.name}`}
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <span className="stepper-status">
                {currentNumber} / {String(projects.length).padStart(2, "0")} · {project.shortName}
              </span>
              <button
                type="button"
                className="stepper-btn"
                onClick={() => onSelectProject(nextProject)}
                aria-label={`Next project: ${nextProject.name}`}
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Tab Navigation List */}
          <div
            aria-label="Engineering evidence dimensions"
            className="inspector-tabs"
            role="tablist"
          >
            {tabs.map((tab, idx) => {
              const isActive = tab.id === currentTabId;
              return (
                <button
                  aria-controls={`inspector-panel-${tab.id}`}
                  aria-selected={isActive}
                  className={`inspector-tab-btn ${isActive ? "is-active" : ""}`}
                  id={`inspector-tab-${tab.id}`}
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el;
                  }}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  <span>{tab.label}</span>
                  {isActive ? (
                    <motion.span
                      className="tab-indicator"
                      layoutId={reduceMotion ? undefined : "inspector-tab-indicator"}
                      transition={springSoft}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel Scrollable Body */}
        <div className="inspector-content">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              key={`${project.slug}-${currentTabId}`}
              transition={{ duration: 0.22 }}
              className="inspector-tab-view"
              id={`inspector-panel-${currentTabId}`}
              role="tabpanel"
              aria-labelledby={`inspector-tab-${currentTabId}`}
              tabIndex={0}
            >
              {/* TAB 1: OVERVIEW */}
              {currentTabId === "overview" && (
                <div className="tab-pane tab-overview">
                  <div className="pane-summary-grid">
                    <div className="summary-field">
                      <span className="field-label">PROJECT ROLE</span>
                      <strong>{project.role}</strong>
                    </div>
                    <div className="summary-field">
                      <span className="field-label">CURRENT STATUS</span>
                      <strong className="field-status-value">{project.status}</strong>
                    </div>
                    <div className="summary-field">
                      <span className="field-label">CATEGORIES</span>
                      <strong>{project.categories.join(" · ")}</strong>
                    </div>
                    <div className="summary-field">
                      <span className="field-label">PRIMARY ACCENT</span>
                      <strong className="field-accent-tag" style={{ color: project.accent }}>
                        {project.accent}
                      </strong>
                    </div>
                  </div>

                  <div className="pane-narrative-block">
                    <div className="narrative-segment">
                      <h4>Problem Statement</h4>
                      <p>{project.problem}</p>
                    </div>

                    <div className="narrative-segment">
                      <h4>Engineering Solution</h4>
                      <p>{project.solution}</p>
                    </div>

                    <div className="narrative-segment">
                      <h4>Core Architectural Flow</h4>
                      <p className="architecture-summary-text">{project.architecture}</p>
                    </div>
                  </div>

                  <div className="pane-highlights-block">
                    <h4>Integrated Workflows</h4>
                    <ul className="inspector-highlights-list">
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>
                          <Check size={14} className="highlight-icon" aria-hidden="true" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pane-stack-block">
                    <h4>Technology Stack</h4>
                    <ul className="inspector-stack-pills" aria-label="Technology stack">
                      {project.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pane-methodology-block">
                    <h4>Engineering Methodology</h4>
                    <ol className="inspector-methodology-strip" aria-label="Engineering execution lifecycle">
                      {howIWork.map((stage) => (
                        <li key={stage.step} className="methodology-step-pill">
                          <span className="methodology-step-num">{stage.step}</span>
                          <div className="methodology-step-copy">
                            <strong>{stage.title}</strong>
                            <p>{stage.summary}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {project.repository ? (
                    <div className="pane-repo-action">
                      <a
                        className="inspector-repo-link"
                        href={project.repository}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Code2 size={16} aria-hidden="true" />
                        <span>Inspect Public Codebase</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    </div>
                  ) : (
                    <div className="pane-repo-action">
                      <span className="inspector-private-note">
                        <Code2 size={15} aria-hidden="true" />
                        <span>{project.repositoryLabel ?? "Academic / Case Study Repository"}</span>
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: ARCHITECTURE */}
              {currentTabId === "architecture" && (
                <div className="tab-pane tab-architecture">
                  <div className="pane-intro">
                    <span className="pane-kicker">SYSTEM DESIGN</span>
                    <h3>Multi-Tier Topology</h3>
                    <p>
                      Functional partition boundaries from client interfaces down to relational storage.
                    </p>
                  </div>

                  {project.architectureTiers && project.architectureTiers.length > 0 ? (
                    <div className="architecture-tier-pipeline">
                      {project.architectureTiers.map((tier, idx) => (
                        <div className="architecture-tier-card" key={tier.tier}>
                          <div className="tier-header">
                            <span className="tier-badge">TIER 0{idx + 1}</span>
                            <h4 className="tier-name">{tier.tier}</h4>
                            <span className="tier-tech">{tier.technology}</span>
                          </div>
                          <p className="tier-detail">{tier.detail}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="architecture-fallback-block">
                      <p>{project.architecture}</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SECURITY */}
              {currentTabId === "security" && (
                <div className="tab-pane tab-security">
                  <div className="pane-intro">
                    <span className="pane-kicker">APPLICATION DEFENSE</span>
                    <h3>Documented Security Measures</h3>
                    <p>
                      Authentic security mechanisms implemented to protect data integrity, state
                      transitions, and actor boundaries.
                    </p>
                  </div>

                  {project.securityDetails && project.securityDetails.length > 0 ? (
                    <ul className="inspector-security-list">
                      {project.securityDetails.map((measure, idx) => {
                        const category = getSecurityCategory(measure);
                        return (
                          <li className="security-measure-item" key={idx}>
                            <ShieldCheck size={16} className="security-icon" aria-hidden="true" />
                            <div className="security-measure-copy">
                              <div className="measure-category-row">
                                <span className="measure-category-badge">{category}</span>
                              </div>
                              <p>{measure}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : project.security ? (
                    <div className="security-single-summary">
                      <ShieldCheck size={18} className="security-icon" aria-hidden="true" />
                      <p>{project.security}</p>
                    </div>
                  ) : null}
                </div>
              )}

              {/* TAB 4: TESTING */}
              {currentTabId === "testing" && (
                <div className="tab-pane tab-testing">
                  <div className="pane-intro">
                    <span className="pane-kicker">QUALITY ASSURANCE</span>
                    <h3>Verification & Diagnostics</h3>
                    <p>
                      Concrete testing practices, diagnostic scripts, and CI workflows used to
                      validate functionality without fabricated metrics.
                    </p>
                  </div>

                  {project.testingDetails && project.testingDetails.length > 0 ? (
                    <ul className="inspector-testing-list">
                      {project.testingDetails.map((practice, idx) => {
                        const category = getTestingCategory(practice);
                        return (
                          <li className="testing-practice-item" key={idx}>
                            <TestTube2 size={16} className="testing-icon" aria-hidden="true" />
                            <div className="testing-practice-copy">
                              <div className="practice-category-row">
                                <span className="practice-category-badge">{category}</span>
                              </div>
                              <p>{practice}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : project.testing ? (
                    <div className="testing-single-summary">
                      <TestTube2 size={18} className="testing-icon" aria-hidden="true" />
                      <p>{project.testing}</p>
                    </div>
                  ) : null}
                </div>
              )}

              {/* TAB 5: DECISIONS */}
              {currentTabId === "decisions" && (
                <div className="tab-pane tab-decisions">
                  <div className="pane-intro">
                    <span className="pane-kicker">ARCHITECTURAL RATIONALE</span>
                    <h3>Key Engineering Decisions</h3>
                    <p>
                      Deliberate system choices, technical reasons, and trade-offs behind this project.
                    </p>
                  </div>

                  {project.decisions && project.decisions.length > 0 ? (
                    <div className="inspector-decisions-stack">
                      {project.decisions.map((decision, idx) => (
                        <article className="decision-item-card" key={idx}>
                          <div className="decision-header">
                            <span className="decision-kicker">DECISION 0{idx + 1}</span>
                            <h4>{decision.title}</h4>
                          </div>
                          <div className="reason-block">
                            <span className="reason-kicker">RATIONALE</span>
                            <p>{decision.reason}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : null}

                  {project.lessons && project.lessons.length > 0 && (
                    <div className="pane-sub-block">
                      <span className="pane-sub-kicker">RETROSPECTIVE</span>
                      <h4>Key Engineering Takeaway</h4>
                      <p className="sub-block-text">{project.lessons[0]}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Panel Footer */}
        <div className="inspector-footer">
          <div className="inspector-footer-info">
            <span>Project {currentNumber} of {String(projects.length).padStart(2, "0")}</span>
            <span>{project.categories.join(" · ")}</span>
          </div>

          <div className="inspector-footer-actions">
            {project.repository ? (
              <a
                className="inspector-footer-repo"
                href={project.repository}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Codebase</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ) : null}
            <button
              className="inspector-footer-close"
              onClick={handleClose}
              type="button"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
