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
  return (
    <div className={`section-heading ${className}`.trim()} data-slot="section-heading">
      <div className="section-heading-label">
        {number ? <span aria-hidden="true">{number}</span> : null}
        <span>{eyebrow}</span>
      </div>
      <div className="section-heading-copy">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
}
