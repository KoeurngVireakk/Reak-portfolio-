import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "../../data/portfolio";
import { interactionMotion, motionTokens } from "../../lib/motion";
import { GitHubIcon } from "../GitHubIcon";
import { Container } from "../layout/Container";
import { Reveal } from "../ui/Reveal";
import { ArchitectureFlow } from "../visual/ArchitectureFlow";

export function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section section-anchor contact-section" id="contact">
      <Container>
        <Reveal className="contact-panel">
          <motion.div
            className="contact-constellation"
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.86, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="contact-ring contact-ring-a" />
            <span className="contact-ring contact-ring-b" />
            <span className="contact-ring contact-ring-c" />
            <i className="contact-dot contact-dot-a" />
            <i className="contact-dot contact-dot-b" />
            <i className="contact-dot contact-dot-c" />
          </motion.div>

          <div>
            <span className="contact-index">Contact</span>
            <ArchitectureFlow
              className="contact-system-flow"
              label="Engineering system resolving to contact"
              nodes={["UI", "API", "Data", "Contact"]}
            />
            <h2>Let&apos;s build software that holds up beyond the demo.</h2>
            <p>
              I&apos;m open to internship and junior opportunities where I can contribute to real
              software while growing in backend engineering, full-stack development, and application security.
            </p>
          </div>

          <div className="contact-details">
            <a href={"mailto:" + profile.email}>
              <Mail size={17} />
              <span>
                <small>Email</small>
                {profile.email}
              </span>
              <ArrowUpRight size={16} />
            </a>
            <a href={profile.github} rel="noreferrer" target="_blank">
              <GitHubIcon size={17} />
              <span>
                <small>GitHub</small>
                KoeurngVireakk
              </span>
              <ArrowUpRight size={16} />
            </a>
            <div>
              <MapPin size={17} />
              <span>
                <small>Location</small>
                {profile.location}
              </span>
            </div>
          </div>

          <motion.a
            className="button button-primary contact-button"
            href={"mailto:" + profile.email}
            transition={motionTokens.spring}
            whileHover={reduceMotion ? undefined : interactionMotion.lift}
            whileTap={reduceMotion ? undefined : interactionMotion.press}
          >
            Start a conversation <ArrowUpRight size={16} />
          </motion.a>
        </Reveal>
      </Container>
    </section>
  );
}
