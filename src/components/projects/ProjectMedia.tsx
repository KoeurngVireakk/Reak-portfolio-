import type { CSSProperties } from "react";
import type { Project } from "../../data/portfolio";
import { ProjectStack } from "../mockups/ProjectStack";
import { Tilt } from "../motion/Tilt";

type ProjectMediaProps = {
  project: Project;
  index: number;
  compact?: boolean;
};

function MediaPlaceholder({ project, index, compact = false }: ProjectMediaProps) {
  return (
    <div className={`media-placeholder-content ${compact ? "media-placeholder-compact" : ""}`}>
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
    </div>
  );
}

function ArchitecturePreview({ project }: { project: Project }) {
  return (
    <div className="architecture-preview" aria-hidden="true">
      <span>{project.shortName} system layers</span>
      <div><i /> Interface</div>
      <div><i /> Services</div>
      <div><i /> Data + security</div>
    </div>
  );
}

export function ProjectMedia({ project, index, compact = false }: ProjectMediaProps) {
  const mediaContent = project.media ? (
    <div className={`project-media-assets media-assets-${project.media.kind}`}>
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
  ) : (
    <MediaPlaceholder compact={compact} index={index} project={project} />
  );

  return (
    <figure
      className={`project-media project-media-${project.presentation} ${project.media ? "has-media" : "is-placeholder"}`}
      style={{ "--project-accent": project.accent } as CSSProperties}
    >
      <Tilt className="project-media-tilt" maxTilt={2.25}>
        <ProjectStack
          label={project.name}
          presentation={project.presentation}
          secondary={<ArchitecturePreview project={project} />}
        >
          {mediaContent}
        </ProjectStack>
      </Tilt>
      <figcaption>
        <span>{project.presentation.replace("phone-dashboard", "mobile + dashboard")}</span>
        <span>{project.media ? "Project media" : "Real screenshots pending"}</span>
      </figcaption>
    </figure>
  );
}
