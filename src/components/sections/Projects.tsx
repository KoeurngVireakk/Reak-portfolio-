import {
  ViewTransition,
  startTransition,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projects, type Project, type ProjectCategory } from "../../data/portfolio";
import { motionTokens, projectDepth, projectTransition } from "../../lib/motion";
import { ProjectMedia } from "../projects/ProjectMedia";
import { SectionHeading } from "../SectionHeading";
import { Container } from "../layout/Container";
import { Reveal } from "../ui/Reveal";
import { useMediaQuery } from "../../lib/pointer";

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

function projectId(project: Project) {
  return `project-${project.shortName.toLowerCase()}`;
}

function projectAccent(project: Project) {
  return { "--project-accent": project.accent } as CSSProperties;
}

type ProjectNarrativeProps = {
  project: Project;
};

function ProjectNarrative({ project }: ProjectNarrativeProps) {
  return (
    <div className="project-content">
      <div>
        <p className="project-tagline">{project.tagline}</p>
        <h3>{project.name}</h3>
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
            <div>
              <span>Security decision</span>
              <p>{project.security}</p>
            </div>
          ) : null}
          {project.testing ? (
            <div>
              <span>Testing</span>
              <p>{project.testing}</p>
            </div>
          ) : null}
        </div>
      </div>

      <footer className="project-footer">
        <ul aria-label={`${project.name} technology stack`} className="tech-list">
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        {project.repository ? (
          <a href={project.repository} rel="noreferrer" target="_blank">
            View repository <ArrowUpRight size={15} />
          </a>
        ) : (
          <span className="private-label">{project.repositoryLabel ?? "Case study project"}</span>
        )}
      </footer>
    </div>
  );
}

function ProjectHeader({ project }: { project: Project }) {
  return (
    <header className="project-case-header">
      <div className="project-kinds">
        {project.featured ? <span className="featured-tag">Featured project</span> : <span>Additional work</span>}
        <span>{project.role}</span>
      </div>
      <div className="project-status">
        {project.repository ? <span>Public source</span> : <span><LockKeyhole size={12} /> Private source</span>}
        <span>{project.status}</span>
      </div>
    </header>
  );
}

type FeaturedChapterProps = {
  project: Project;
  index: number;
  onEnter: (project: Project) => void;
  showMedia: boolean;
};

function FeaturedChapter({ project, index, onEnter, showMedia }: FeaturedChapterProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="featured-chapter"
      id={projectId(project)}
      onViewportEnter={() => onEnter(project)}
      viewport={{ amount: 0.38, margin: "-18% 0px -24% 0px" }}
      initial={reduceMotion ? false : { opacity: 0.45, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={motionTokens.revealSoft}
      style={projectAccent(project)}
    >
      <span className="featured-chapter-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <ProjectHeader project={project} />
      {showMedia ? (
        <div className="featured-mobile-media">
          <ProjectMedia compact index={index} project={project} />
        </div>
      ) : null}
      <ProjectNarrative project={project} />
    </motion.article>
  );
}

function SecondaryProject({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className="secondary-project"
      style={projectAccent(project)}
    >
      <ProjectHeader project={project} />
      <div className="secondary-project-layout">
        <ProjectMedia compact index={index} project={project} />
        <ProjectNarrative project={project} />
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

  useEffect(() => {
    setActiveFeaturedName(featuredProjects[0]?.name ?? "");
  }, [activeCategory, featuredProjects]);

  useEffect(() => {
    const restoreFilter = () => {
      const { category, invalid } = getCategoryFromUrl();
      if (invalid) {
        const url = new URL(window.location.href);
        url.searchParams.delete("work");
        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      }
      startTransition(() => setActiveCategory(category));
    };

    restoreFilter();
    window.addEventListener("popstate", restoreFilter);
    return () => window.removeEventListener("popstate", restoreFilter);
  }, []);

  function selectCategory(category: ProjectFilter) {
    if (category === activeCategory) return;

    const url = new URL(window.location.href);
    if (category === "All") url.searchParams.delete("work");
    else url.searchParams.set("work", category);
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);

    startTransition(() => setActiveCategory(category));
  }

  return (
    <section className="section section-anchor projects-section" id="projects" tabIndex={-1}>
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Engineering stories, not a wall of project cards."
          description="Move through the featured systems to see the problem, architecture, security decisions, testing evidence, and honest current status behind each build."
        />

        <Reveal className="project-filter-wrap">
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

                  <nav className="featured-progress" aria-label="Featured projects">
                    {featuredProjects.map((project, index) => (
                      <a
                        aria-current={activeFeatured?.name === project.name ? "location" : undefined}
                        href={`#${projectId(project)}`}
                        key={project.name}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {project.shortName}
                      </a>
                    ))}
                  </nav>
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
                    index={projects.indexOf(project)}
                    onEnter={(current) => {
                      if (desktopStory) setActiveFeaturedName(current.name);
                    }}
                    project={project}
                    showMedia={!desktopStory}
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
                      project={project}
                    />
                  </ViewTransition>
                ))}
            </div>
          </section>
        ) : null}
      </Container>
    </section>
  );
}
