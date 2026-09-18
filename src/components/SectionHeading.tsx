import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "../lib/motion";

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
  const words = title.trim().split(/\s+/);

  return (
    <div className={"section-heading " + className} data-slot="section-heading">
      <div className="section-heading-label">
        {number ? <span aria-hidden="true">{number}</span> : null}
        <span>{eyebrow}</span>
      </div>
      <div className="section-heading-copy">
        <h2 className="kinetic-heading" aria-label={title}>
          {words.map((word, index) => (
            <span className="kinetic-word" aria-hidden="true" key={word + index}>
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, y: "108%", rotate: 2 }}
                whileInView={{ opacity: 1, y: "0%", rotate: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{
                  ...motionTokens.silk,
                  delay: reduceMotion ? 0 : Math.min(index * 0.045, 0.36),
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h2>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
}
