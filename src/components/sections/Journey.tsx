import { journey } from "../../data/portfolio";
import { SectionHeading } from "../SectionHeading";
import { Container } from "../layout/Container";
import { Reveal } from "../ui/Reveal";

export function Journey() {
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

        <ol className="journey-list">
          {journey.map((item, index) => (
            <Reveal delay={index * 0.06} key={item.title}>
              <li>
                <span className="journey-index">{String(index + 1).padStart(2, "0")}</span>
                <time>{item.date}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p className="journey-org">{item.organization}</p>
                  <p>{item.description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
