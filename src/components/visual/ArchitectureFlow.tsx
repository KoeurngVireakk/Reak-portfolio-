type ArchitectureFlowProps = {
  className?: string;
  nodes?: string[];
  label?: string;
  activeNodeIndex?: number;
  pulseActive?: boolean;
};

export function ArchitectureFlow({
  className = "",
  nodes = ["UI", "API", "Data", "Security"],
  label = "System flow from interface through security",
  activeNodeIndex,
  pulseActive = false,
}: ArchitectureFlowProps) {
  return (
    <div
      className={`architecture-flow ${pulseActive ? "is-pulsing" : ""} ${className}`.trim()}
      role="img"
      aria-label={`${label}: ${nodes.join(" to ")}`}
    >
      {nodes.map((node, index) => {
        const isActive = activeNodeIndex !== undefined && activeNodeIndex === index;
        return (
          <div className="architecture-flow-segment" key={node}>
            <span
              className={`architecture-flow-node ${isActive ? "is-highlighted" : ""}`}
              data-node={node.toLowerCase()}
            >
              {node}
            </span>
            {index < nodes.length - 1 ? (
              <span className="architecture-flow-connector" aria-hidden="true">
                <i />
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
