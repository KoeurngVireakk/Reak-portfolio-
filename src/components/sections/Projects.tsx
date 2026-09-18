import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { projects, type Project, type ProjectCategory } from "../../data/portfolio";
import { motionTokens, projectDepth, projectTransition } from "../../lib/motion";
import { ProjectMedia } from "../projects/ProjectMedia";
import { SectionHeading } from "../SectionHeading";
import { Container } from "../layout/Container";
import { ScrollReveal } from "../motion/ScrollReveal";
import { Reveal } from "../ui/Reveal";

const categories: Array<"All" | ProjectCategory> = [
  "All",
  "Web",
  "Backend",
  "Mobile",
  "AI/CV",
  "Security",
];

function projectId(project: Project) {
  return `project-${project.shortName.toLowerCase()}`;
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
};

function FeaturedChapter({ project, index, onEnter }: FeaturedChapterProps) {
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
    >
      <span className="featured-chapter-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <ProjectHeader project={project} />
      <div className="featured-mobile-media">
        <ProjectMedia compact index={index} project={project} />
      </div>
      <ProjectNarrative project={project} />
    </motion.article>
  );
}

function SecondaryProject({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="secondary-project"
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
      transition={{ ...projectTransition, delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.12) }}
    >
      <ProjectHeader project={project} />
      <div className="secondary-project-layout">
        <ProjectMedia compact index={index} project={project} />
        <ProjectNarrative project={project} />
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const reduceMotion = useReducedMotion();

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

  return (
    <section className="section section-anchor projects-section" id="projects">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Engineering stories, not a wall of project cards."
            description="Move through the featured systems to see the problem, architecture, security decisions, testing evidence, and honest current status behind each build."
          />
        </ScrollReveal>

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
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                  {active ? (
                    <motion.span
                      className="filter-indicator"
                      layoutId={reduceMotion ? undefined : "filter-indicator"}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
          <span aria-live="polite">{filteredProjects.length} projects</span>
        </Reveal>

        {featuredProjects.length > 0 ? (
          <div className="featured-story">
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

            <div className="featured-chapters">
              {featuredProjects.map((project) => (
                <FeaturedChapter
                  index={projects.indexOf(project)}
                  key={project.name}
                  onEnter={(current) => setActiveFeaturedName(current.name)}
                  project={project}
                />
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
            <motion.div layout={!reduceMotion}>
              <AnimatePresence initial={false} mode="popLayout">
                {secondaryProjects.map((project) => (
                  <SecondaryProject
                    index={projects.indexOf(project)}
                    key={project.name}
                    project={project}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </section>
        ) : null}
      </Container>
    </section>
  );
}
