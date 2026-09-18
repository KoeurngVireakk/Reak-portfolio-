import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { journey } from "../../data/portfolio";
import { motionTokens, springSoft } from "../../lib/motion";
import { SectionHeading } from "../SectionHeading";
import { Container } from "../layout/Container";
import { Reveal } from "../ui/Reveal";

export function Journey() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 58%"],
  });
  const progress = useSpring(scrollYProgress, springSoft);

  return (
    <section className="section section-anchor journey-section" id="journey">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Engineering journey"
            title="Progression without invented experience."
            description="A concise record of education, project depth, and the engineering direction I am actively developing."
          />
        </Reveal>

        <div className="journey-timeline-shell" ref={timelineRef}>
          <div className="journey-progress-rail" aria-hidden="true">
            <motion.i style={{ scaleY: reduceMotion ? 1 : progress }} />
          </div>

          <ol className="journey-list">
            {journey.map((item, index) => (
              <motion.li
                initial={reduceMotion ? false : { opacity: 0.35, x: 26 }}
                key={item.title}
                transition={{
                  ...motionTokens.revealSoft,
                  delay: reduceMotion ? 0 : Math.min(index * 0.045, 0.16),
                }}
                viewport={{ once: true, amount: 0.34 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span className="journey-node" aria-hidden="true"><i /></span>
                <span className="journey-index">{String(index + 1).padStart(2, "0")}</span>
                <time>{item.date}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p className="journey-org">{item.organization}</p>
                  <p>{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
