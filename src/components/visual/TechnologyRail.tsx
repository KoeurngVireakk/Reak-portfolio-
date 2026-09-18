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
  return (
    <div className="technology-rail-wrap">
      <div className="technology-rail-label">
        <span>Working stack</span>
        <span>Selected technologies used across real projects</span>
      </div>
      <div className="technology-rail-viewport">
        <div className="technology-rail-track">
          <TechnologyItems />
          <TechnologyItems duplicate />
        </div>
      </div>
    </div>
  );
}
