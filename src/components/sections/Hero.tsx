import { ArrowDown, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { GitHubIcon } from "../GitHubIcon";
import { Container } from "../layout/Container";
import { facts, profile } from "../../data/portfolio";
import { heroItemVariants, motionTokens, staggerVariants } from "../../lib/motion";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const portraitY = useTransform(scrollYProgress, [0, 0.22], [0, reduceMotion ? 0 : 30]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.22], [1, reduceMotion ? 1 : 0.975]);

  return (
    <section className="hero section-anchor" id="home">
      <Container className="hero-layout">
        <motion.div
          className="hero-copy"
          animate="visible"
          initial={reduceMotion ? false : "hidden"}
          variants={staggerVariants}
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
            <motion.a
              className="button button-primary"
              href="#projects"
              transition={motionTokens.spring}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              View projects <ArrowDown size={16} />
            </motion.a>
            <motion.a
              className="button button-secondary"
              href={profile.github}
              rel="noreferrer"
              target="_blank"
              transition={motionTokens.spring}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              <GitHubIcon size={16} /> GitHub
            </motion.a>
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
          style={{ y: portraitY, scale: portraitScale }}
          initial={reduceMotion ? false : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...motionTokens.silk, delay: reduceMotion ? 0 : 0.16 }}
        >
          <div className="portrait-frame">
            <div className="portrait-index" aria-hidden="true">
              <span>PROFILE / 01</span>
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
