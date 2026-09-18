import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { journey } from "../../data/portfolio";
import { revealSoftTransition, springSoft } from "../../lib/motion";
import { SectionHeading } from "../SectionHeading";
import { Container } from "../layout/Container";

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeMilestone, setActiveMilestone] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, springSoft);

  useMotionValueEvent(progress, "change", (latest) => {
    if (reduceMotion || journey.length === 0) return;
    const index = Math.min(journey.length - 1, Math.floor(latest * journey.length));
    setActiveMilestone(index);
  });

  return (
    <section
      className="section section-anchor journey-section"
      id="journey"
      ref={sectionRef}
      tabIndex={-1}
    >
      <Container>
        <SectionHeading
          eyebrow="Engineering journey"
          title="Progression without invented experience."
          description="A concise record of education, project depth, and the engineering direction I am actively developing."
        />

        <div className="journey-track">
          <span className="journey-line" aria-hidden="true">
            <motion.i style={{ scaleY: reduceMotion ? 1 : progress }} />
          </span>
          <ol className="journey-list">
            {journey.map((item, index) => {
              const isCurrent = reduceMotion || activeMilestone === index;
              const isPassed = !reduceMotion && activeMilestone > index;
              const statusClass = isCurrent ? "is-current" : isPassed ? "is-passed" : "is-upcoming";

              return (
                <motion.li
                  className={statusClass}
                  data-milestone={index}
                  initial={reduceMotion ? false : { opacity: 0.42, x: -10 }}
                  key={item.title}
                  transition={{ ...revealSoftTransition, delay: reduceMotion ? 0 : index * 0.05 }}
                  viewport={{ once: true, amount: 0.55 }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <span className="journey-index">{String(index + 1).padStart(2, "0")}</span>
                  <time>{item.date}</time>
                  <div>
                    <h3>{item.title}</h3>
                    <p className="journey-org">{item.organization}</p>
                    <p>{item.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
