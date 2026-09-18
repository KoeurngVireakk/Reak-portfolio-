import { useMemo, useState } from "react";
import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  projects,
  type Project,
  type ProjectCategory,
} from "../../data/portfolio";
import { motionTokens } from "../../lib/motion";
import { ProjectMedia } from "../projects/ProjectMedia";
import { SectionHeading } from "../SectionHeading";
import { Container } from "../layout/Container";
import { Reveal } from "../ui/Reveal";

const categories: Array<"All" | ProjectCategory> = [
  "All",
  "Web",
  "Backend",
  "Mobile",
  "AI/CV",
  "Security",
];

type ProjectCaseStudyProps = {
  project: Project;
  index: number;
};

function ProjectCaseStudy({ project, index }: ProjectCaseStudyProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`project-case ${project.featured ? "project-featured" : "project-secondary"}`}
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
      transition={{ ...motionTokens.silk, delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.14) }}
    >
      <div className="project-index-column" aria-hidden="true">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <i />
      </div>

      <div className="project-case-main">
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

        <div className="project-case-layout">
          <ProjectMedia index={index} project={project} />

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
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(activeCategory)),
    [activeCategory],
  );

  return (
    <section className="section section-anchor projects-section" id="projects">
      <Container>
        <Reveal>
          <SectionHeading
            number="03"
            eyebrow="Selected work"
            title="Case studies over surface-level project cards."
            description="Each project foregrounds the problem, system architecture, security decisions, testing evidence, and honest current status."
          />
        </Reveal>

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
                  {active ? <motion.span className="filter-indicator" layoutId="filter-indicator" /> : null}
                </button>
              );
            })}
          </div>
          <span aria-live="polite">{filteredProjects.length} projects</span>
        </Reveal>

        <motion.div className="project-list" layout>
          <AnimatePresence initial={false} mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCaseStudy index={index} key={project.name} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
