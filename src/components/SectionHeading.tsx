import { motion, useReducedMotion } from "motion/react";
import { revealMask } from "../lib/motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  number?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  number,
  className = "",
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();
  const words = title.split(" ");

  return (
    <div className={`section-heading ${className}`.trim()} data-slot="section-heading">
      <div className="section-heading-label">
        {number ? <span aria-hidden="true">{number}</span> : null}
        <span>{eyebrow}</span>
      </div>
      <div className="section-heading-copy">
        <motion.h2
          aria-label={title}
          initial={reduceMotion ? false : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.035 } },
          }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={reduceMotion ? undefined : "visible"}
        >
          {words.map((word, index) => (
            <span className="section-heading-word" key={`${word}-${index}`}>
              <motion.span
                aria-hidden="true"
                transition={revealMask.transition}
                variants={revealMask.variants}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h2>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
}
