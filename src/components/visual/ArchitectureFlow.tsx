type ArchitectureFlowProps = {
  className?: string;
  nodes?: string[];
  label?: string;
};

export function ArchitectureFlow({
  className = "",
  nodes = ["UI", "API", "Data", "Security"],
  label = "System flow from interface through security",
}: ArchitectureFlowProps) {
  return (
    <div
      className={`architecture-flow ${className}`.trim()}
      role="img"
      aria-label={`${label}: ${nodes.join(" to ")}`}
    >
      {nodes.map((node, index) => (
        <div className="architecture-flow-segment" key={node}>
          <span className="architecture-flow-node">{node}</span>
          {index < nodes.length - 1 ? (
            <span className="architecture-flow-connector" aria-hidden="true">
              <i />
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
