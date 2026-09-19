import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Check, FileText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  education,
  focusAreas,
  itFoundations,
  languages,
  professionalIdentity,
  profile,
  workingPrinciples,
} from "../../data/portfolio";
import { motionTokens, revealSoft } from "../../lib/motion";
import { canObserveViewport } from "../../lib/motionLifecycle";
import { SectionHeading } from "../SectionHeading";
import { GitHubIcon } from "../GitHubIcon";
import { Container } from "../layout/Container";
import { Reveal } from "../ui/Reveal";
import { ArchitectureExplorer } from "../architecture/ArchitectureExplorer";
import { TechnologyRail } from "../visual/TechnologyRail";

export function About() {
  const [activeCapability, setActiveCapability] = useState(0);
  const capabilityTabs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const canObserve = canObserveViewport();

  function handleCapabilityKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? focusAreas.length - 1
        : (index + (event.key === "ArrowDown" ? 1 : -1) + focusAreas.length) % focusAreas.length;

    setActiveCapability(nextIndex);
    capabilityTabs.current[nextIndex]?.focus();
  }

  return (
    <>
      <section className="section section-anchor about-section" id="about" tabIndex={-1}>
        <Container>
          <SectionHeading
            eyebrow="Profile"
            title="Engineering the whole system, grounded in IT foundations."
            description="A balanced technical profile combining practical full-stack development, backend reliability, application security, and essential IT infrastructure competencies."
          />

          <div className="about-layout">
            <Reveal className="about-manifesto" aria-hidden="true">
              <span>BUILD.</span>
              <span>SECURE.</span>
              <span>VERIFY.</span>
            </Reveal>

            <Reveal className="about-statement">
              <blockquote className="about-editorial-quote">
                &ldquo;Clean architecture matters more than flashy demos — verifiable systems built from database transactions to responsive client states.&rdquo;
              </blockquote>

              <p className="statement-lead">
                I&apos;m <strong>Koeurng Vireak</strong>, a final-year Bachelor of Science in Information
                Technology student at Build Bright University in Battambang, Cambodia.
              </p>

              <p>
                My technical path pairs structured Information Technology foundations with active software
                engineering. Across academic systems and personal projects, I design and implement full-stack
                solutions using Spring Boot, React, ASP.NET Core, Laravel, Flutter, and relational persistence.
              </p>

              <p>
                Beyond interface design, my strongest focus is in backend services, role-based authorization,
                defensive application security, and practical IT infrastructure—including LAN networking,
                operating system administration, and workplace troubleshooting.
              </p>

              <div className="inline-links">
                <a href={profile.github} rel="noopener noreferrer" target="_blank">
                  <GitHubIcon size={16} /> GitHub profile <ArrowUpRight aria-hidden="true" size={14} />
                </a>
                <a href={`mailto:${profile.email}`}>
                  Email me <ArrowUpRight aria-hidden="true" size={14} />
                </a>
                {profile.resumeUrl ? (
                  <a href={profile.resumeUrl} download>
                    <FileText aria-hidden="true" size={15} /> Download CV <ArrowUpRight aria-hidden="true" size={14} />
                  </a>
                ) : null}
              </div>
            </Reveal>

            <Reveal className="about-notes recruiter-dossier" delay={0.08}>
              <div className="dossier-kicker">
                <span>RECRUITER SCAN // 30-SEC PROFILE</span>
              </div>

              <div className="dossier-entry">
                <span>Education</span>
                <strong>{education.degree}</strong>
                <p>{education.institution} · {education.status} ({education.period})</p>
              </div>

              <div className="dossier-entry">
                <span>Career Direction</span>
                <strong>{professionalIdentity.directions.slice(0, 2).join(" · ")}</strong>
                <p>{professionalIdentity.directions.slice(2).join(" · ")}</p>
              </div>

              <div className="dossier-entry">
                <span>Location</span>
                <strong>{profile.location}</strong>
                <p>Available for internship & junior engineering opportunities</p>
              </div>

              <div className="dossier-entry">
                <span>Languages</span>
                <strong>
                  {languages[0].language}: {languages[0].proficiency}
                </strong>
                <p>
                  {languages[1].language}: {languages[1].proficiency}
                </p>
              </div>

              <div className="dossier-entry">
                <span>Working Style</span>
                <strong>{workingPrinciples[0].title} · {workingPrinciples[1].title}</strong>
                <p>{workingPrinciples[2].title} & {workingPrinciples[3].title.toLowerCase()}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section section-anchor capabilities-section" id="capabilities" tabIndex={-1}>
        <Container>
          <SectionHeading
            eyebrow="Capabilities & Foundations"
            title="Technical range, grounded in project evidence."
            description="Software engineering architecture paired with essential IT infrastructure and support competencies."
          />

          <div className="capabilities-layout">
            <div
              className="capability-list"
              role="tablist"
              aria-label="Engineering capabilities"
              aria-orientation="vertical"
            >
              {focusAreas.map((area, index) => (
                <motion.button
                  aria-controls="capability-architecture-panel"
                  aria-selected={activeCapability === index}
                  className={`capability-row ${activeCapability === index ? "is-active" : ""}`}
                  data-active={activeCapability === index}
                  id={`capability-tab-${index}`}
                  initial={reduceMotion || !canObserve ? false : "hidden"}
                  key={area.title}
                  onFocus={() => setActiveCapability(index)}
                  onKeyDown={(event) => handleCapabilityKeyDown(event, index)}
                  onMouseEnter={() => setActiveCapability(index)}
                  onClick={() => setActiveCapability(index)}
                  ref={(element) => {
                    capabilityTabs.current[index] = element;
                  }}
                  role="tab"
                  tabIndex={activeCapability === index ? 0 : -1}
                  transition={{ ...motionTokens.revealSoft, delay: reduceMotion ? 0 : index * 0.04 }}
                  variants={revealSoft}
                  viewport={{ once: true, amount: 0.25 }}
                  whileInView={canObserve ? "visible" : undefined}
                  type="button"
                >
                  <span className="capability-number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="capability-copy">
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </div>
                  <div className="capability-evidence">
                    <ul aria-label={`${area.title} technologies`}>
                      {area.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  </div>
                </motion.button>
              ))}
            </div>

            <Reveal className="architecture-explorer-wrap" delay={0.08}>
              <ArchitectureExplorer
                activeIndex={activeCapability}
                onSelectLayer={setActiveCapability}
              />
            </Reveal>
          </div>

          <Reveal className="it-foundations-wrap" delay={0.08}>
            <div className="it-foundations-panel">
              <div className="it-foundations-header">
                <div>
                  <span className="it-foundations-kicker">INFRASTRUCTURE & WORKPLACE IT DOMAIN</span>
                  <h3>Foundational IT, Network & System Competencies</h3>
                  <p>Practical laboratory and academic training supporting production-minded development.</p>
                </div>
                <span className="it-foundations-badge">ACADEMIC & PRACTICAL TRAINING</span>
              </div>

              <div className="it-foundations-grid">
                {itFoundations.map((foundation) => (
                  <div className="it-foundation-card" key={foundation.domain}>
                    <div className="foundation-card-head">
                      <span className="foundation-domain-tag">DOMAIN // {foundation.domain}</span>
                      <h4>{foundation.title}</h4>
                      <p>{foundation.description}</p>
                    </div>
                    <ul className="foundation-skills-list" aria-label={`${foundation.title} competencies`}>
                      {foundation.skills.map((skill) => (
                        <li key={skill}>
                          <Check size={13} aria-hidden="true" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="it-foundations-integrity-note">
                Academic & practical laboratory training — non-employment experience.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}><TechnologyRail /></Reveal>
        </Container>
      </section>
    </>
  );
}
