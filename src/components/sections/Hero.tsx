import { ArrowDown, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { GitHubIcon } from "../GitHubIcon";
import { Container } from "../layout/Container";
import { facts, profile } from "../../data/portfolio";
import { heroDepth, heroItemVariants, interactionMotion, motionTokens, staggerSlow } from "../../lib/motion";
import { CursorSpotlight } from "../motion/CursorSpotlight";
import { Magnetic } from "../motion/Magnetic";
import { Parallax } from "../motion/Parallax";
import { Tilt } from "../motion/Tilt";

const depthLabels = [
  { label: "React", className: "depth-label-react" },
  { label: "Spring Boot", className: "depth-label-spring" },
  { label: "Backend engineering", className: "depth-label-backend" },
  { label: "Application security", className: "depth-label-security" },
  { label: "Final-year IT", className: "depth-label-student" },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero section-anchor" id="home">
      <CursorSpotlight />
      <Container className="hero-layout">
        <motion.div
          className="hero-copy"
          animate="visible"
          initial={reduceMotion ? false : "hidden"}
          variants={staggerSlow}
        >
          <motion.div className="availability" variants={heroItemVariants}>
            <span aria-hidden="true" />
            Open to internship and junior opportunities
          </motion.div>

          <motion.p className="hero-overline" variants={heroItemVariants}>
            Koeurng Vireak · Battambang, Cambodia
          </motion.p>

          <motion.h1 variants={heroItemVariants}>
            Full-stack developer
            <span>building systems with depth.</span>
          </motion.h1>

          <motion.p className="hero-intro" variants={heroItemVariants}>
            Final-year Information Technology student focused on backend systems, secure application
            design, and practical product engineering.
          </motion.p>

          <motion.div className="hero-actions" variants={heroItemVariants}>
            <Magnetic>
              <motion.a
                className="button button-primary"
                href="#projects"
                transition={motionTokens.springInteractive}
                whileHover={reduceMotion ? undefined : interactionMotion.lift}
                whileTap={reduceMotion ? undefined : interactionMotion.press}
              >
                View projects <ArrowDown size={16} />
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a
                className="button button-secondary"
                href={profile.github}
                rel="noreferrer"
                target="_blank"
                transition={motionTokens.springInteractive}
                whileHover={reduceMotion ? undefined : interactionMotion.lift}
                whileTap={reduceMotion ? undefined : interactionMotion.press}
              >
                <GitHubIcon size={16} /> GitHub
              </motion.a>
            </Magnetic>
            <a className="text-link" href={`mailto:${profile.email}`}>
              Contact <ArrowUpRight size={15} />
            </a>
          </motion.div>

          <motion.div className="hero-focus" variants={heroItemVariants}>
            <span>Primary focus</span>
            <ul>
              <li>Full-stack engineering</li>
              <li>Backend systems</li>
              <li>Application security</li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="portrait-column"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={heroDepth}
        >
          <Parallax className="hero-visual-parallax" distance={18}>
            <div className="hero-visual-shell">
              <Tilt className="portrait-tilt" maxTilt={3}>
                <div className="portrait-frame">
                  <div className="portrait-index" aria-hidden="true">
                    <span>PROFILE / SYSTEMS</span>
                    <span>2026</span>
                  </div>
                  <img
                    className="portrait"
                    src={profile.avatar}
                    alt="Portrait of Koeurng Vireak"
                    decoding="async"
                    fetchPriority="high"
                    height="520"
                    width="520"
                  />
                  <div className="portrait-caption">
                    <span>
                      <MapPin size={14} /> {profile.location}
                    </span>
                    <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}>
                      <Mail size={14} /> Email
                    </a>
                  </div>
                </div>
              </Tilt>

              <div className="hero-depth-labels" aria-hidden="true">
                {depthLabels.map((item, index) => (
                  <motion.span
                    className={item.className}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...motionTokens.revealSoft, delay: reduceMotion ? 0 : 0.32 + index * 0.06 }}
                    key={item.label}
                  >
                    {item.label}
                  </motion.span>
                ))}
              </div>

              <div className="hero-system-axis" aria-hidden="true">
                <span>UI</span><i /><span>API</span><i /><span>DATA</span><i /><span>SEC</span>
              </div>
            </div>
          </Parallax>
        </motion.div>
      </Container>

      <Container className="fact-rail" aria-label="Profile facts">
        {facts.map((fact) => (
          <div key={fact.label}>
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </div>
        ))}
        <a href="#about">
          Read the profile <ArrowDown size={15} />
        </a>
      </Container>
    </section>
  );
}
