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
          <div>
            <span className="contact-index">Contact</span>
            <ArchitectureFlow className="contact-system-flow" label="Engineering system resolving to contact" nodes={["UI", "API", "Data", "Contact"]} />
            <h2>Let&apos;s build software that holds up beyond the demo.</h2>
            <p>
              I&apos;m open to internship and junior opportunities where I can contribute to real
              software while growing in backend engineering, full-stack development, and application security.
            </p>
          </div>

          <div className="contact-details">
            <a href={`mailto:${profile.email}`}>
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
            href={`mailto:${profile.email}`}
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
