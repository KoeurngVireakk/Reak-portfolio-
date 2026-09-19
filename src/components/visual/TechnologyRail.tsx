import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { brandIconPaths } from "../../data/brandIconPaths";
import { technologyRail, technologyProjectMap } from "../../data/portfolio";
import { useContinuousMotion } from "../../lib/motionLifecycle";
import { BrandIcon } from "./BrandIcon";

function TechnologyItems({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul aria-hidden={duplicate || undefined} className="technology-rail-list">
      {technologyRail.map((technology) => {
        const evidenceCount = technologyProjectMap[technology]?.length ?? 0;
        const hint = evidenceCount > 0 ? `${technology} — Verified across ${evidenceCount} projects` : technology;

        return (
          <li key={`${duplicate ? "duplicate-" : ""}${technology}`} title={duplicate ? undefined : hint}>
            <BrandIcon
              fallback={technology === "SQL Server" ? "SQL" : technology.slice(0, 2)}
              icon={brandIconPaths[technology]}
            />
            <span>{technology}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function TechnologyRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const { active } = useContinuousMotion(railRef);
  const playing = active && !paused;

  return (
    <div className="technology-rail-wrap" ref={railRef}>
      <div className="technology-rail-label">
        <div>
          <span>Working stack</span>
          <span>Selected technologies used across real projects</span>
        </div>
        <button
          aria-label={paused ? "Resume technology rail" : "Pause technology rail"}
          aria-pressed={paused}
          className="technology-rail-control"
          onClick={() => setPaused((current) => !current)}
          type="button"
        >
          {paused ? <Play aria-hidden="true" size={14} /> : <Pause aria-hidden="true" size={14} />}
          <span>{paused ? "Resume" : "Pause"}</span>
        </button>
      </div>

      <div className="technology-rail-viewport">
        <div className={`technology-rail-track ${playing ? "is-playing" : "is-paused"}`}>
          <TechnologyItems />
          <TechnologyItems duplicate />
        </div>
      </div>
    </div>
  );
}
