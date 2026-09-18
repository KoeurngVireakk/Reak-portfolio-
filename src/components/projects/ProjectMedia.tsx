import type { Project } from "../../data/portfolio";

type ProjectMediaProps = {
  project: Project;
  index: number;
};

export function ProjectMedia({ project, index }: ProjectMediaProps) {
  if (project.media) {
    return (
      <figure className="project-media project-media-image">
        <img
          src={project.media.src}
          alt={project.media.alt}
          decoding="async"
          loading="lazy"
          height="900"
          width="1440"
        />
      </figure>
    );
  }

  return (
    <div
      className="project-media project-media-placeholder"
      aria-label={`${project.name} media placeholder. Real project screenshots have not been published yet.`}
      role="img"
    >
      <div className="media-coordinate" aria-hidden="true">
        <span>P-{String(index + 1).padStart(2, "0")}</span>
        <span>{project.categories.join(" / ")}</span>
      </div>
      <span className="media-monogram" aria-hidden="true">{project.shortName}</span>
      <div className="media-architecture" aria-hidden="true">
        <span>Interface</span>
        <i />
        <span>Services</span>
        <i />
        <span>Data</span>
      </div>
      <p>Project media slot · real screenshots pending</p>
    </div>
  );
}
