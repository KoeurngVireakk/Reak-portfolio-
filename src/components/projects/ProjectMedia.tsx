import type { Project } from "../../data/portfolio";

type ProjectMediaProps = {
  project: Project;
  index: number;
};

export function ProjectMedia({ project, index }: ProjectMediaProps) {
  if (project.media) {
    return (
      <figure className={`project-media project-media-image media-${project.media.kind}`}>
        <div className="project-media-assets">
          {project.media.assets.map((asset) => (
            <img
              src={asset.src}
              alt={asset.alt}
              decoding="async"
              key={asset.src}
              loading="lazy"
              height="900"
              width="1440"
            />
          ))}
        </div>
        <figcaption>{project.name} · project media</figcaption>
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
