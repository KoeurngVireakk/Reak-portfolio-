const layers = [
  { short: "UI", label: "Frontend", detail: "Product interfaces" },
  { short: "API", label: "Services", detail: "Business rules" },
  { short: "DATA", label: "Data", detail: "Reliable state" },
  { short: "SEC", label: "Security", detail: "Trust boundaries" },
];

export function ArchitectureExplorer({ activeIndex }: { activeIndex: number }) {
  const activeLayer = layers[activeIndex] ?? layers[0];

  return (
    <div
      aria-labelledby={`capability-tab-${activeIndex}`}
      className="architecture-explorer"
      id="capability-architecture-panel"
      role="tabpanel"
      tabIndex={0}
    >
      <div className="architecture-explorer-heading">
        <span>System architecture</span>
        <strong>{activeLayer.label}</strong>
      </div>
      <div className="architecture-explorer-map">
        {layers.map((layer, index) => (
          <div className={index === activeIndex ? "is-active" : ""} key={layer.short}>
            <span>{layer.short}</span>
            <p><strong>{layer.label}</strong>{layer.detail}</p>
            {index < layers.length - 1 ? <i aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {activeLayer.label}: {activeLayer.detail}.
      </p>
      <p className="architecture-explorer-note">Focus a capability to trace its place in the system.</p>
    </div>
  );
}
