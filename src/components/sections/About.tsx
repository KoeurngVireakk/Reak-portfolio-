import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { focusAreas, profile } from "../../data/portfolio";
import { SectionHeading } from "../SectionHeading";
import { GitHubIcon } from "../GitHubIcon";
import { Container } from "../layout/Container";
import { Reveal } from "../ui/Reveal";
import { ArchitectureExplorer } from "../architecture/ArchitectureExplorer";
import { TechnologyRail } from "../visual/TechnologyRail";

export function About() {
  const [activeCapability, setActiveCapability] = useState(0);

  return (
    <>
      <section className="section section-anchor about-section" id="about">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Profile"
              title="Engineering the whole system, not only the interface."
              description="I care about the connection between product UI, APIs, data, authorization, testing, and delivery."
            />
          </Reveal>

          <div className="about-layout">
            <Reveal className="about-manifesto" aria-hidden="true">
              <span>BUILD.</span>
              <span>SECURE.</span>
              <span>VERIFY.</span>
            </Reveal>
            <Reveal className="about-statement">
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
                where clean architecture matters more than flashy demos.
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

      <section className="section section-anchor capabilities-section" id="capabilities">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="Technical range, grounded in project evidence."
              description="No percentages or inflated proficiency scores—only the technologies and engineering decisions demonstrated across real projects."
            />
          </Reveal>

          <div className="capabilities-layout">
            <div className="capability-list">
              {focusAreas.map((area, index) => (
                <Reveal
                  className={`capability-row ${activeCapability === index ? "is-active" : ""}`}
                  data-active={activeCapability === index}
                  delay={index * 0.04}
                  key={area.title}
                  onFocus={() => setActiveCapability(index)}
                  onMouseEnter={() => setActiveCapability(index)}
                  tabIndex={0}
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
                </Reveal>
              ))}
            </div>
            <Reveal className="architecture-explorer-wrap" delay={0.08}>
              <ArchitectureExplorer activeIndex={activeCapability} />
            </Reveal>
          </div>

          <Reveal delay={0.08}><TechnologyRail /></Reveal>
        </Container>
      </section>
    </>
  );
}
