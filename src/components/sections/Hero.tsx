import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { GitHubIcon } from "../GitHubIcon";
import { Container } from "../layout/Container";
import { facts, profile } from "../../data/portfolio";
import { heroItemVariants, interactionMotion, motionTokens, staggerSlow } from "../../lib/motion";
import { CursorSpotlight } from "../motion/CursorSpotlight";
import { HeadlineReveal } from "../motion/HeadlineReveal";
import { Magnetic } from "../motion/Magnetic";
import { HeroSpatialScene } from "../visual/HeroSpatialScene";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero section-anchor" id="home" tabIndex={-1}>
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

          <motion.div variants={heroItemVariants}>
            <HeadlineReveal lines={["Full-stack developer", "building systems with depth."]} />
          </motion.div>

          <motion.p className="hero-intro" variants={heroItemVariants}>
            Final-year Information Technology student building practical software across
            full-stack development, backend systems, application security, and IT infrastructure.
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
                View projects <ArrowDown aria-hidden="true" size={16} />
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.a
                className="button button-secondary"
                href={profile.github}
                rel="noopener noreferrer"
                target="_blank"
                transition={motionTokens.springInteractive}
                whileHover={reduceMotion ? undefined : interactionMotion.lift}
                whileTap={reduceMotion ? undefined : interactionMotion.press}
              >
                <GitHubIcon size={16} /> GitHub
              </motion.a>
            </Magnetic>
            <a className="text-link" href={`mailto:${profile.email}`}>
              Contact <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </motion.div>

          <motion.div className="hero-focus" variants={heroItemVariants}>
            <span>Core disciplines</span>
            <ul>
              <li>Full-stack engineering</li>
              <li>Backend systems</li>
              <li>Application security</li>
              <li>IT & network foundations</li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="portrait-column"><HeroSpatialScene /></div>
      </Container>

      <Container className="fact-rail" aria-label="Profile facts">
        {facts.map((fact) => (
          <div key={fact.label}>
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </div>
        ))}
        <a href="#about">
          Read the profile <ArrowDown aria-hidden="true" size={15} />
        </a>
      </Container>
    </section>
  );
}
