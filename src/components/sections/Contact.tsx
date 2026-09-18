import { useRef, useState } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { profile } from "../../data/portfolio";
import { interactionMotion, motionTokens } from "../../lib/motion";
import { useContinuousMotion } from "../../lib/motionLifecycle";
import { useFinePointer } from "../../lib/pointer";
import { GitHubIcon } from "../GitHubIcon";
import { Container } from "../layout/Container";
import { Reveal } from "../ui/Reveal";

const convergenceNodes = [
  { short: "UI", label: "Client" },
  { short: "API", label: "Services" },
  { short: "DATA", label: "Persistence" },
  { short: "SEC", label: "Security" },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { active: motionActive, reducedMotion: reduceMotion } = useContinuousMotion(sectionRef, 0.08);
  const finePointer = useFinePointer();
  const [pulsing, setPulsing] = useState(false);
  const pulseTimerRef = useRef<number | null>(null);

  function triggerSignalPulse() {
    if (reduceMotion || !finePointer || pulsing) return;
    setPulsing(true);
    if (pulseTimerRef.current) window.clearTimeout(pulseTimerRef.current);
    pulseTimerRef.current = window.setTimeout(() => {
      setPulsing(false);
    }, 700);
  }

  return (
    <section
      className="section section-anchor contact-section"
      data-motion-active={motionActive}
      id="contact"
      ref={sectionRef}
      tabIndex={-1}
    >
      <Container>
        <Reveal className="contact-panel">
          <div className="contact-main">
            <span className="contact-index">Contact // Resolution</span>

            {/* Architecture convergence schematic */}
            <div className={`contact-convergence ${pulsing ? "is-pulsing" : ""}`} aria-hidden="true">
              <div className="convergence-kicker">
                <span>System convergence</span>
                <span className="convergence-spec">UI · API · DATA · SEC ➔ CONVERSATION</span>
              </div>
              <div className="convergence-grid">
                {convergenceNodes.map((node) => (
                  <div className="convergence-node" key={node.short}>
                    <strong>{node.short}</strong>
                    <small>{node.label}</small>
                    <i className="convergence-connector" />
                  </div>
                ))}
              </div>
              <div className="convergence-terminal-line">
                <i className="terminal-bus" />
                {pulsing && !reduceMotion ? (
                  <span className="convergence-pulse-packet" />
                ) : null}
              </div>
            </div>

            <h2>Let&apos;s build software that holds up beyond the demo.</h2>
            <p>
              I&apos;m open to internship and junior opportunities where I can contribute to real
              software while growing in backend engineering, full-stack development, application security, and IT operations.
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
            className={`button button-primary contact-button ${pulsing ? "is-signaling" : ""}`}
            href={`mailto:${profile.email}`}
            onFocus={triggerSignalPulse}
            onPointerEnter={triggerSignalPulse}
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
