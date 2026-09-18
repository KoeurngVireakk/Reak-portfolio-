import { type CSSProperties, type PointerEvent } from "react";
import type { Project } from "../../data/portfolio";
import { useFinePointer } from "../../lib/pointer";
import { ProjectStack } from "../mockups/ProjectStack";
import { Tilt } from "../motion/Tilt";

type ProjectMediaProps = {
  project: Project;
  index: number;
  compact?: boolean;
};

function SystemMetadataPlane({ project, index }: { project: Project; index: number }) {
  return (
    <div className="media-metadata-plane" aria-hidden="true">
      <div className="media-coordinate">
        <span className="coordinate-code">SYS.PRJ // {String(index + 1).padStart(2, "0")}</span>
        <span className="coordinate-category">{project.categories.join(" · ")}</span>
      </div>
      <span className="media-monogram">{project.shortName}</span>
      <div className="media-status-tag">
        <i />
        <span>{project.status}</span>
      </div>
    </div>
  );
}

function ArchitecturePlane({ project }: { project: Project }) {
  return (
    <div className="media-architecture-plane" aria-hidden="true">
      <div className="architecture-schematic-header">
        <span className="schematic-title">System architecture blueprint</span>
        <span className="schematic-model">TIER FLOW // V5</span>
      </div>
      <div className="architecture-schematic-flow">
        <div className="schematic-node">
          <span>UI</span>
          <small>Client</small>
        </div>
        <i className="schematic-arrow" />
        <div className="schematic-node">
          <span>API</span>
          <small>Service</small>
        </div>
        <i className="schematic-arrow" />
        <div className="schematic-node">
          <span>DATA</span>
          <small>Store</small>
        </div>
        <i className="schematic-arrow" />
        <div className="schematic-node">
          <span>SEC</span>
          <small>Guard</small>
        </div>
      </div>
      <p className="architecture-schematic-summary">{project.architecture}</p>
    </div>
  );
}

function ProductUIPlane({ project, index, compact }: ProjectMediaProps) {
  if (project.media) {
    return (
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
    );
  }

  return (
    <div className={`media-product-viewport ${compact ? "is-compact" : ""}`}>
      <div className="product-viewport-header" aria-hidden="true">
        <div className="viewport-dots">
          <i /><i /><i />
        </div>
        <span className="viewport-url">
          https://{project.shortName.toLowerCase()}.p{index + 1}.system.internal
        </span>
        <span className="viewport-status">ONLINE</span>
      </div>
      <div className="product-viewport-canvas" aria-hidden="true">
        <div className="canvas-headline">
          <strong>{project.name}</strong>
          <span>{project.tagline}</span>
        </div>
        <div className="canvas-grid-preview">
          <div className="preview-tile tile-primary" />
          <div className="preview-tile tile-secondary" />
          <div className="preview-tile tile-accent" />
        </div>
      </div>
    </div>
  );
}

export function ProjectMedia({ project, index, compact = false }: ProjectMediaProps) {
  const finePointer = useFinePointer();

  function handlePointerMove(e: PointerEvent<HTMLElement>) {
    if (!finePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--media-px", `${px.toFixed(1)}%`);
    e.currentTarget.style.setProperty("--media-py", `${py.toFixed(1)}%`);
  }

  function handlePointerLeave(e: PointerEvent<HTMLElement>) {
    e.currentTarget.style.setProperty("--media-px", "50%");
    e.currentTarget.style.setProperty("--media-py", "35%");
  }

  return (
    <figure
      className={`project-media project-media-${project.presentation} ${
        project.media ? "has-media" : "is-placeholder"
      }`}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={{ "--project-accent": project.accent } as CSSProperties}
    >
      {/* Plane 1: System Metadata Plane (Base / Anchored) */}
      <SystemMetadataPlane index={index} project={project} />

      {/* Plane 2: Architecture Plane (Underlay Schematic) */}
      <ArchitecturePlane project={project} />

      {/* Plane 3: Product / UI Plane (Foreground Mockup / Media) with Tilt & Specular Sheen */}
      <Tilt className="project-media-tilt" maxTilt={2.2}>
        <div className="product-ui-plane">
          <ProjectStack label={project.name} presentation={project.presentation}>
            <ProductUIPlane compact={compact} index={index} project={project} />
          </ProjectStack>
          <div className="media-specular-sheen" aria-hidden="true" />
        </div>
      </Tilt>

      <figcaption>
        <span>{project.presentation.replace("phone-dashboard", "mobile + dashboard")}</span>
        <span>{project.media ? "Verified capture" : "Architecture & system preview"}</span>
      </figcaption>
    </figure>
  );
}
