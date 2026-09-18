import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
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
import { technologyRail } from "../../data/portfolio";
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

function TechnologyItems({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul aria-hidden={duplicate || undefined} className="technology-rail-list">
      {technologyRail.map((technology) => (
        <li key={`${duplicate ? "duplicate-" : ""}${technology}`}>
          <BrandIcon
            fallback={technology === "SQL Server" ? "SQL" : technology.slice(0, 2)}
            icon={icons[technology]}
          />
          <span>{technology}</span>
        </li>
      ))}
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
          {paused ? <Play size={14} /> : <Pause size={14} />}
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
