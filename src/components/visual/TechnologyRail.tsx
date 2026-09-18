import { useRef, useState } from "react";
import { Pause, Play, X, Layers } from "lucide-react";
import {
  siCloudflare,
  siDocker,
  siDotnet,
  siFirebase,
  siFlutter,
  siGithubactions,
  siLaravel,
  siMysql,
  siPython,
  siReact,
  siSpringboot,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { technologyRail, technologyProjectMap } from "../../data/portfolio";
import { useContinuousMotion } from "../../lib/motionLifecycle";
import { BrandIcon } from "./BrandIcon";

const icons: Record<string, SimpleIcon | undefined> = {
  React: siReact,
  TypeScript: siTypescript,
  "Spring Boot": siSpringboot,
  Laravel: siLaravel,
  "ASP.NET Core": siDotnet,
  Flutter: siFlutter,
  Firebase: siFirebase,
  MySQL: siMysql,
  Python: siPython,
  Docker: siDocker,
  Cloudflare: siCloudflare,
  "GitHub Actions": siGithubactions,
};

type TechnologyItemsProps = {
  duplicate?: boolean;
  selectedTech: string | null;
  onSelectTech: (tech: string) => void;
};

function TechnologyItems({ duplicate = false, selectedTech, onSelectTech }: TechnologyItemsProps) {
  return (
    <ul aria-hidden={duplicate || undefined} className="technology-rail-list">
      {technologyRail.map((technology) => {
        const hasEvidence = !!technologyProjectMap[technology];
        const isSelected = selectedTech === technology;

        return (
          <li key={`${duplicate ? "duplicate-" : ""}${technology}`}>
            <button
              aria-label={
                hasEvidence
                  ? `Show engineering evidence for ${technology}`
                  : `${technology}`
              }
              aria-pressed={isSelected}
              className={`technology-rail-btn ${isSelected ? "is-selected" : ""} ${
                hasEvidence ? "has-evidence" : ""
              }`}
              onClick={() => onSelectTech(technology)}
              tabIndex={duplicate ? -1 : 0}
              type="button"
            >
              <BrandIcon
                fallback={technology === "SQL Server" ? "SQL" : technology.slice(0, 2)}
                icon={icons[technology]}
              />
              <span>{technology}</span>
              {hasEvidence && <span className="evidence-dot" aria-hidden="true" />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function TechnologyRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const { active } = useContinuousMotion(railRef);
  const playing = active && !paused && !selectedTech;

  const handleSelectTech = (tech: string) => {
    setSelectedTech((current) => (current === tech ? null : tech));
  };

  const currentEvidence = selectedTech ? technologyProjectMap[selectedTech] : null;

  return (
    <div className="technology-rail-wrap" ref={railRef}>
      <div className="technology-rail-label">
        <div>
          <span>Working stack</span>
          <span>Select any technology with evidence to reveal demonstrated systems</span>
        </div>
        <button
          aria-label={paused ? "Resume technology rail" : "Pause technology rail"}
          aria-pressed={paused}
          className="technology-rail-control"
          onClick={() => setPaused((current) => !current)}
          type="button"
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
          <span>{paused ? "Resume" : "Pause"}</span>
        </button>
      </div>

      <div className="technology-rail-viewport">
        <div className={`technology-rail-track ${playing ? "is-playing" : "is-paused"}`}>
          <TechnologyItems
            onSelectTech={handleSelectTech}
            selectedTech={selectedTech}
          />
          <TechnologyItems
            duplicate
            onSelectTech={handleSelectTech}
            selectedTech={selectedTech}
          />
        </div>
      </div>

      {/* Interactive Evidence Relationship Drawer */}
      {selectedTech && (
        <div className="technology-evidence-drawer" role="region" aria-label={`Evidence for ${selectedTech}`}>
          <div className="drawer-header">
            <div className="drawer-title-group">
              <Layers size={14} className="drawer-icon" aria-hidden="true" />
              <span className="drawer-kicker">DEMONSTRATED IN SYSTEMS:</span>
              <strong className="drawer-tech-name">{selectedTech}</strong>
            </div>
            <button
              aria-label="Close evidence drawer"
              className="drawer-close-btn"
              onClick={() => setSelectedTech(null)}
              type="button"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>

          <div className="drawer-body">
            {currentEvidence && currentEvidence.length > 0 ? (
              <div className="drawer-project-chips">
                {currentEvidence.map((proj) => (
                  <a
                    className="drawer-project-link"
                    href={`#project-${proj.shortName.toLowerCase()}`}
                    key={proj.slug}
                    onClick={() => setSelectedTech(null)}
                  >
                    <span className="drawer-proj-badge">{proj.shortName}</span>
                    <span className="drawer-proj-title">{proj.name}</span>
                    <span className="drawer-proj-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="drawer-empty-text">
                Used in exploratory development environments and utility tooling.
              </p>
            )}
          </div>
          <p className="sr-only" aria-live="polite">
            {selectedTech} is demonstrated in {currentEvidence?.map((p) => p.name).join(", ") ?? "projects"}.
          </p>
        </div>
      )}
    </div>
  );
}
