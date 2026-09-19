import {
  Component,
  Suspense,
  ViewTransition,
  lazy,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, LockKeyhole, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projects, type Project, type ProjectCategory } from "../../data/portfolio";
import { motionTokens, projectDepth, projectTransition } from "../../lib/motion";
import { canObserveViewport } from "../../lib/motionLifecycle";
import { ProjectMedia } from "../projects/ProjectMedia";
import { type InspectorTab } from "../projects/EngineeringInspector";
import { SectionHeading } from "../SectionHeading";
import { Container } from "../layout/Container";
import { Reveal } from "../ui/Reveal";
import { useMediaQuery } from "../../lib/pointer";

const EngineeringInspector = lazy(() =>
  import("../projects/EngineeringInspector").then((mod) => ({
    default: mod.EngineeringInspector,
  })),
);

type InspectorLoadBoundaryProps = {
  children: ReactNode;
  onClose: () => void;
  resetKey: string;
};

class InspectorLoadBoundary extends Component<
  InspectorLoadBoundaryProps,
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // The fallback below provides recovery without exposing implementation details.
  }

  componentDidUpdate(previousProps: InspectorLoadBoundaryProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.failed) {
      this.setState({ failed: false });
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div
        aria-labelledby="inspector-load-error-title"
        aria-modal="true"
        className="engineering-inspector-overlay"
        role="alertdialog"
      >
        <button
          aria-label="Close Engineering Inspector"
          className="engineering-inspector-backdrop"
          onClick={this.props.onClose}
          tabIndex={-1}
          type="button"
        />
        <div className="engineering-inspector-panel inspector-load-fallback" role="document">
          <p className="pane-kicker">INSPECTOR UNAVAILABLE</p>
          <h2 id="inspector-load-error-title">The project details could not be loaded.</h2>
          <p>The site may have been updated while this page was open. Reload to request the latest files.</p>
          <div className="inspector-load-actions">
            <button className="button button-primary" onClick={() => window.location.reload()} type="button">
              Reload Portfolio
            </button>
            <button className="button button-secondary" onClick={this.props.onClose} type="button">
              Close Inspector
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const categories: Array<"All" | ProjectCategory> = [
  "All",
  "Web",
  "Backend",
  "Mobile",
  "AI/CV",
  "Security",
];

type ProjectFilter = (typeof categories)[number];

function getCategoryFromUrl(): { category: ProjectFilter; invalid: boolean } {
  if (typeof window === "undefined") return { category: "All", invalid: false };
  const requested = new URL(window.location.href).searchParams.get("work");
  if (!requested) return { category: "All", invalid: false };

  const category = categories.find((item) => item.toLowerCase() === requested.toLowerCase());
  return category
    ? { category, invalid: false }
    : { category: "All", invalid: true };
}

function getInspectorFromUrl(): { projectSlug: string | null; view: InspectorTab | null } {
  if (typeof window === "undefined") return { projectSlug: null, view: null };
  const params = new URL(window.location.href).searchParams;
  const projectSlug = params.get("project");
  const viewParam = params.get("view") as InspectorTab | null;
  const validViews: InspectorTab[] = ["overview", "architecture", "security", "testing", "decisions"];
  const view = viewParam && validViews.includes(viewParam) ? viewParam : null;
  return { projectSlug, view };
}

function projectSupportsInspectorTab(project: Project, tab: InspectorTab) {
  if (tab === "overview") return true;
  if (tab === "architecture") return Boolean(project.architectureTiers?.length);
  if (tab === "security") return Boolean(project.securityDetails?.length || project.security);
  if (tab === "testing") return Boolean(project.testingDetails?.length || project.testing);
  return Boolean(project.decisions?.length);
}

function sanitizeCurrentUrl() {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  let changed = false;
  const { invalid: invalidCategory } = getCategoryFromUrl();
  if (invalidCategory) {
    url.searchParams.delete("work");
    changed = true;
  }

  const rawProject = url.searchParams.get("project");
  const rawView = url.searchParams.get("view");
  const validViews: InspectorTab[] = ["overview", "architecture", "security", "testing", "decisions"];
  const project = rawProject ? projects.find((item) => item.slug === rawProject) : undefined;

  if (rawProject && !project) {
    url.searchParams.delete("project");
    url.searchParams.delete("view");
    changed = true;
  } else if (!rawProject && rawView) {
    url.searchParams.delete("view");
    changed = true;
  } else if (project && rawView) {
    const requestedView = validViews.includes(rawView as InspectorTab)
      ? rawView as InspectorTab
      : null;
    if (
      requestedView === null
      || requestedView === "overview"
      || !projectSupportsInspectorTab(project, requestedView)
    ) {
      url.searchParams.delete("view");
      changed = true;
    }
  }

  if (changed) {
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }
}

function updateInspectorUrl(project: Project | null, tab?: InspectorTab, replace = false) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (project) {
    url.searchParams.set("project", project.slug);
    if (tab && tab !== "overview") {
      url.searchParams.set("view", tab);
    } else {
      url.searchParams.delete("view");
    }
  } else {
    url.searchParams.delete("project");
    url.searchParams.delete("view");
  }

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  if (replace) {
    window.history.replaceState(null, "", nextUrl);
  } else {
    window.history.pushState(null, "", nextUrl);
  }
}

function projectId(project: Project) {
  return `project-${project.shortName.toLowerCase()}`;
}

function projectAccent(project: Project) {
  return { "--project-accent": project.accent } as CSSProperties;
}

type ProjectNarrativeProps = {
  project: Project;
  onInspect: (project: Project, tab?: InspectorTab, trigger?: HTMLElement) => void;
};

function ProjectNarrative({ project, onInspect }: ProjectNarrativeProps) {
  return (
    <div className="project-content">
      <div>
        <p className="project-tagline">{project.tagline}</p>
        <h3 className="project-title-heading">{project.name}</h3>
        <p className="project-description">{project.description}</p>
      </div>

      <dl className="project-brief">
        <div>
          <dt>Problem</dt>
          <dd>{project.problem}</dd>
        </div>
        <div>
          <dt>Solution</dt>
          <dd>{project.solution}</dd>
        </div>
        <div>
          <dt>Architecture</dt>
          <dd>{project.architecture}</dd>
        </div>
      </dl>

      <div className="project-evidence">
        <div>
          <span className="evidence-label">Engineering evidence</span>
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight}>
                <Check size={14} aria-hidden="true" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <div className="decision-notes">
          {project.security ? (
            <button
              type="button"
              className="decision-interactive-card"
              onClick={(e) => onInspect(project, "security", e.currentTarget)}
            >
              <div className="decision-card-label">
                <span>Security decision</span>
                <span className="chip-arrow" aria-hidden="true">↗</span>
              </div>
              <p>{project.security}</p>
            </button>
          ) : null}
          {project.testing ? (
            <button
              type="button"
              className="decision-interactive-card"
              onClick={(e) => onInspect(project, "testing", e.currentTarget)}
            >
              <div className="decision-card-label">
                <span>Testing verification</span>
                <span className="chip-arrow" aria-hidden="true">↗</span>
              </div>
              <p>{project.testing}</p>
            </button>
          ) : null}
        </div>
      </div>

      <footer className="project-footer">
        <div className="project-footer-actions">
          <button
            type="button"
            className="inspect-system-btn"
            onClick={(e) => onInspect(project, "overview", e.currentTarget)}
          >
            <SlidersHorizontal size={14} aria-hidden="true" />
            <span>Inspect System Evidence</span>
            <span className="sr-only"> for {project.name}</span>
          </button>

          {project.repository ? (
            <a href={project.repository} rel="noopener noreferrer" target="_blank" className="project-repo-link">
              View repository <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          ) : (
            <span className="private-label">{project.repositoryLabel ?? "Case study project"}</span>
          )}
        </div>

        <ul aria-label={`${project.name} technology stack`} className="tech-list">
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </footer>
    </div>
  );
}

function ProjectHeader({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <header className="project-case-header">
      <div className="project-kinds">
        <span className="project-index-mobile" aria-hidden="true">
          Project {index + 1} / {total} · {project.shortName}
        </span>
        {project.featured ? <span className="featured-tag">Featured project</span> : <span>Additional work</span>}
        <span>{project.role}</span>
      </div>
      <div className="project-status">
        {project.repository ? <span>Public source</span> : <span><LockKeyhole aria-hidden="true" size={12} /> Private source</span>}
        <span>{project.status}</span>
      </div>
    </header>
  );
}

type FeaturedChapterProps = {
  project: Project;
  index: number;
  total: number;
  active: boolean;
  onEnter: (project: Project) => void;
  showMedia: boolean;
  onInspect: (project: Project, tab?: InspectorTab, trigger?: HTMLElement) => void;
};

function FeaturedChapter({
  project,
  index,
  total,
  active,
  onEnter,
  showMedia,
  onInspect,
}: FeaturedChapterProps) {
  const reduceMotion = useReducedMotion();
  const canObserve = canObserveViewport();

  return (
    <motion.article
      className={`featured-chapter ${active ? "is-active" : "is-inactive"}`}
      id={projectId(project)}
      onViewportEnter={canObserve ? () => onEnter(project) : undefined}
      viewport={{ amount: 0.38, margin: "-18% 0px -24% 0px" }}
      initial={reduceMotion || !canObserve ? false : { y: 18 }}
      whileInView={canObserve ? { y: 0 } : undefined}
      transition={motionTokens.revealSoft}
      style={projectAccent(project)}
    >
      <span className="featured-chapter-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <ProjectHeader index={index} project={project} total={total} />
      {showMedia ? (
        <div className="featured-mobile-media">
          <ProjectMedia compact index={index} project={project} />
        </div>
      ) : null}
      <ProjectNarrative onInspect={onInspect} project={project} />
    </motion.article>
  );
}

function SecondaryProject({
  project,
  index,
  total,
  onInspect,
}: {
  project: Project;
  index: number;
  total: number;
  onInspect: (project: Project, tab?: InspectorTab, trigger?: HTMLElement) => void;
}) {
  return (
    <article
      className="secondary-project"
      id={projectId(project)}
      style={projectAccent(project)}
    >
      <ProjectHeader index={index} project={project} total={total} />
      <div className="secondary-project-layout">
        <ProjectMedia compact index={index} project={project} />
        <ProjectNarrative onInspect={onInspect} project={project} />
      </div>
    </article>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectFilter>(
    () => getCategoryFromUrl().category,
  );
  const reduceMotion = useReducedMotion();
  const desktopStory = useMediaQuery("(min-width: 901px)");

  // Initial inspector state from URL
  const initialInspector = useMemo(() => {
    const { projectSlug, view } = getInspectorFromUrl();
    if (!projectSlug) return { project: null, tab: "overview" as InspectorTab };
    const found = projects.find((p) => p.slug === projectSlug);
    const requestedTab = view ?? "overview";
    return {
      project: found ?? null,
      tab: found && projectSupportsInspectorTab(found, requestedTab)
        ? requestedTab
        : "overview" as InspectorTab,
    };
  }, []);

  const [inspectingProject, setInspectingProject] = useState<Project | null>(initialInspector.project);
  const [activeInspectorTab, setActiveInspectorTab] = useState<InspectorTab>(initialInspector.tab);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const isHistoryPushedRef = useRef(false);

  useEffect(() => {
    sanitizeCurrentUrl();
  }, []);

  const filteredProjects = useMemo(
    () => activeCategory === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(activeCategory)),
    [activeCategory],
  );
  const featuredProjects = useMemo(
    () => filteredProjects.filter((project) => project.featured),
    [filteredProjects],
  );
  const secondaryProjects = useMemo(
    () => filteredProjects.filter((project) => !project.featured),
    [filteredProjects],
  );
  const [activeFeaturedName, setActiveFeaturedName] = useState(featuredProjects[0]?.name ?? "");
  const activeFeatured = featuredProjects.find((project) => project.name === activeFeaturedName)
    ?? featuredProjects[0];
  const activeFeaturedIndex = activeFeatured
    ? featuredProjects.findIndex((project) => project.slug === activeFeatured.slug)
    : -1;
  const previousFeatured = activeFeaturedIndex >= 0
    ? featuredProjects[(activeFeaturedIndex - 1 + featuredProjects.length) % featuredProjects.length]
    : undefined;
  const nextFeatured = activeFeaturedIndex >= 0
    ? featuredProjects[(activeFeaturedIndex + 1) % featuredProjects.length]
    : undefined;

  useEffect(() => {
    setActiveFeaturedName(featuredProjects[0]?.name ?? "");
  }, [activeCategory, featuredProjects]);

  // Handle URL restoration and popstate
  useEffect(() => {
    const handlePopState = () => {
      isHistoryPushedRef.current = false;

      // 1. Work category
      const { category, invalid } = getCategoryFromUrl();
      startTransition(() => setActiveCategory(category));

      // 2. Project inspector
      const { projectSlug, view } = getInspectorFromUrl();
      if (projectSlug) {
        const matched = projects.find((p) => p.slug === projectSlug);
        if (matched) {
          setInspectingProject(matched);
          const requestedTab = view ?? "overview";
          setActiveInspectorTab(
            projectSupportsInspectorTab(matched, requestedTab) ? requestedTab : "overview",
          );
        } else {
          setInspectingProject(null);
        }
      } else {
        setInspectingProject(null);
      }

      if (invalid || projectSlug || view) sanitizeCurrentUrl();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function selectCategory(category: ProjectFilter) {
    if (category === activeCategory) return;

    const url = new URL(window.location.href);
    if (category === "All") url.searchParams.delete("work");
    else url.searchParams.set("work", category);
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);

    startTransition(() => setActiveCategory(category));
  }

  const openInspector = useCallback(
    (project: Project, tab: InspectorTab = "overview", trigger?: HTMLElement) => {
      setTriggerElement(trigger ?? null);
      setInspectingProject(project);
      setActiveInspectorTab(tab);
      isHistoryPushedRef.current = true;
      updateInspectorUrl(project, tab, false);
    },
    [],
  );

  const closeInspector = useCallback(() => {
    if (isHistoryPushedRef.current) {
      isHistoryPushedRef.current = false;
      window.history.back();
    } else {
      updateInspectorUrl(null, undefined, true);
      setInspectingProject(null);
    }
  }, []);

  const handleSelectTab = useCallback(
    (tab: InspectorTab) => {
      setActiveInspectorTab(tab);
      if (inspectingProject) {
        updateInspectorUrl(inspectingProject, tab, true);
      }
    },
    [inspectingProject],
  );

  const handleSelectProject = useCallback(
    (project: Project) => {
      const nextTab = projectSupportsInspectorTab(project, activeInspectorTab)
        ? activeInspectorTab
        : "overview";
      setInspectingProject(project);
      setActiveInspectorTab(nextTab);
      updateInspectorUrl(project, nextTab, true);
    },
    [activeInspectorTab],
  );

  function navigateToFeatured(project: Project) {
    setActiveFeaturedName(project.name);
    document.getElementById(projectId(project))?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <section
      className="section section-anchor projects-section"
      id="projects"
      style={activeFeatured ? { "--active-project-accent": activeFeatured.accent } as CSSProperties : undefined}
      tabIndex={-1}
    >
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Engineering stories, not a wall of project cards."
          description="Move through the featured systems to see the problem, architecture, security decisions, testing evidence, and honest current status behind each build."
        />

        <Reveal className="project-filter-wrap" variant="structural">
          <div className="project-filters" aria-label="Filter projects" role="group">
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  type="button"
                  aria-pressed={active}
                  className={active ? "active" : ""}
                  key={category}
                  onClick={() => selectCategory(category)}
                >
                  {category}
                  {active ? (
                    <ViewTransition
                      default="none"
                      name="project-filter-indicator"
                      share={reduceMotion ? "none" : "filter-indicator-transition"}
                    >
                      <span className="filter-indicator" />
                    </ViewTransition>
                  ) : null}
                </button>
              );
            })}
          </div>
          <span aria-hidden="true">{filteredProjects.length} projects</span>
          <span className="sr-only" aria-atomic="true" aria-live="polite">
            {activeCategory === "All" ? "All categories" : activeCategory}: {filteredProjects.length} projects shown.
          </span>
        </Reveal>

        {featuredProjects.length > 0 ? (
          <div className={`featured-story ${desktopStory ? "is-desktop-story" : "is-mobile-story"}`}>
            {desktopStory ? (
              <div className="featured-visual-column">
                <div className="featured-visual-sticky">
                  <AnimatePresence initial={false} mode="wait">
                    {activeFeatured ? (
                      <motion.div
                        key={activeFeatured.name}
                        initial={reduceMotion ? false : projectDepth.enter}
                        animate={projectDepth.center}
                        exit={reduceMotion ? undefined : projectDepth.exit}
                        transition={projectTransition}
                        style={projectAccent(activeFeatured)}
                      >
                        <ProjectMedia
                          index={projects.indexOf(activeFeatured)}
                          project={activeFeatured}
                        />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  {activeFeatured && previousFeatured && nextFeatured ? (
                    <nav className="project-sequence-nav" aria-label="Featured project navigation">
                      <button
                        aria-label={`Previous project: ${previousFeatured.name}`}
                        onClick={() => navigateToFeatured(previousFeatured)}
                        type="button"
                      >
                        <ChevronLeft aria-hidden="true" size={16} />
                      </button>
                      <div aria-live="polite" className="project-sequence-current">
                        <span>
                          {String(activeFeaturedIndex + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
                        </span>
                        <AnimatePresence initial={false} mode="wait">
                          <motion.strong
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                            key={activeFeatured.slug}
                            transition={{ duration: reduceMotion ? 0 : 0.24 }}
                          >
                            {activeFeatured.name}
                          </motion.strong>
                        </AnimatePresence>
                      </div>
                      <button
                        aria-label={`Next project: ${nextFeatured.name}`}
                        onClick={() => navigateToFeatured(nextFeatured)}
                        type="button"
                      >
                        <ChevronRight aria-hidden="true" size={16} />
                      </button>
                    </nav>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="featured-chapters">
              {featuredProjects.map((project) => (
                <ViewTransition
                  enter={reduceMotion ? "none" : "project-filter-enter"}
                  exit={reduceMotion ? "none" : "project-filter-exit"}
                  key={project.name}
                  update={reduceMotion ? "none" : "project-filter-move"}
                >
                  <FeaturedChapter
                    active={activeFeatured?.slug === project.slug}
                    index={projects.indexOf(project)}
                    onEnter={(current) => {
                      if (desktopStory) setActiveFeaturedName(current.name);
                    }}
                    onInspect={openInspector}
                    project={project}
                    showMedia={!desktopStory}
                    total={projects.length}
                  />
                </ViewTransition>
              ))}
            </div>
          </div>
        ) : null}

        {secondaryProjects.length > 0 ? (
          <section className="additional-projects" aria-labelledby="additional-projects-title">
            <div className="additional-projects-heading">
              <span>Additional systems</span>
              <h3 id="additional-projects-title">More engineering work</h3>
            </div>
            <div>
              {secondaryProjects.map((project) => (
                <ViewTransition
                  enter={reduceMotion ? "none" : "project-filter-enter"}
                  exit={reduceMotion ? "none" : "project-filter-exit"}
                  key={project.name}
                  update={reduceMotion ? "none" : "project-filter-move"}
                >
                  <SecondaryProject
                    index={projects.indexOf(project)}
                    onInspect={openInspector}
                    project={project}
                    total={projects.length}
                  />
                </ViewTransition>
              ))}
            </div>
          </section>
        ) : null}
      </Container>

      {/* Lazy / conditionally rendered Engineering Inspector */}
      <InspectorLoadBoundary
        onClose={closeInspector}
        resetKey={inspectingProject?.slug ?? "closed"}
      >
        <Suspense fallback={null}>
          <AnimatePresence>
            {inspectingProject ? (
              <EngineeringInspector
                key="engineering-inspector"
                activeTab={activeInspectorTab}
                onClose={closeInspector}
                onSelectProject={handleSelectProject}
                onSelectTab={handleSelectTab}
                project={inspectingProject}
                triggerElement={triggerElement}
              />
            ) : null}
          </AnimatePresence>
        </Suspense>
      </InspectorLoadBoundary>
    </section>
  );
}
