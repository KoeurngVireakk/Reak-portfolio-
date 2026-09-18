import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { focusAreas, profile } from "../../data/portfolio";
import { motionTokens, revealSoft } from "../../lib/motion";
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
            title="Engineering the whole system, not only the interface."
            description="I care about the connection between product UI, APIs, data, authorization, testing, and delivery."
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
                I&apos;m <strong>Koeurng Vireak</strong>, a final-year Bachelor of Information Technology
                student at Build Bright University in Battambang.
              </p>
              <p>
                My strongest work is in practical full-stack systems: React frontends, Spring Boot and
                Laravel APIs, ASP.NET Core applications, relational databases, Flutter, local computer
                vision, authentication, role-based access control, testing, and deployment preparation.
              </p>
              <p>
                I&apos;m especially interested in backend engineering, application security, and projects
                where architectural integrity and reliability are prioritized.
              </p>
              <div className="inline-links">
                <a href={profile.github} rel="noreferrer" target="_blank">
                  <GitHubIcon size={16} /> GitHub profile <ArrowUpRight size={14} />
                </a>
                <a href={`mailto:${profile.email}`}>
                  Email me <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>

            <Reveal className="about-notes" delay={0.08}>
              <div>
                <span>Education</span>
                <strong>Bachelor of Information Technology</strong>
                <p>Build Bright University · Battambang Campus</p>
              </div>
              <div>
                <span>Current direction</span>
                <strong>Backend, full-stack, and security-oriented roles</strong>
                <p>Internship and junior opportunities</p>
              </div>
              <div>
                <span>Working principle</span>
                <strong>Finish · secure · verify</strong>
                <p>Build evidence that can be explained in an interview.</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section section-anchor capabilities-section" id="capabilities" tabIndex={-1}>
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="Technical range, grounded in project evidence."
            description="No percentages or inflated proficiency scores—only the technologies and engineering decisions demonstrated across real projects."
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
                  initial={reduceMotion ? false : "hidden"}
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
                  whileInView="visible"
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

          <Reveal delay={0.08}><TechnologyRail /></Reveal>
        </Container>
      </section>
    </>
  );
}
