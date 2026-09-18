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

function BrowserProductUI({ project, index }: { project: Project; index: number }) {
  return (
    <div className="product-view-browser" aria-hidden="true">
      <div className="browser-app-nav">
        <div className="nav-brand-strip">
          <span className="nav-logo">{project.shortName}</span>
          <span className="nav-route">/{project.shortName.toLowerCase()}/v{index + 1}</span>
        </div>
        <div className="nav-pill-tags">
          <span>Live System</span>
          <span className="tag-active">Session {index + 1}</span>
        </div>
      </div>
      <div className="browser-app-body">
        <div className="app-card-hero">
          <div className="hero-status-strip">
            <span className="app-module-badge">{project.categories[0]} Engine</span>
            <span className="app-telemetry-pill">API connected</span>
          </div>
          <h4>{project.name}</h4>
          <p>{project.tagline}</p>
          <div className="hero-action-bar">
            <span className="action-button-demo">Inspect Workflow</span>
            <span className="action-pill-meta">{project.stack.slice(0, 2).join(" + ")}</span>
          </div>
        </div>
        <div className="app-sidebar-widget">
          <span className="widget-title">Pipeline Status</span>
          <div className="widget-metric">
            <strong>Active</strong>
            <small>Workflow connected</small>
          </div>
          <div className="widget-bar"><i style={{ width: "88%" }} /></div>
        </div>
      </div>
    </div>
  );
}

function DesktopProductUI({ project }: { project: Project }) {
  return (
    <div className="product-view-desktop" aria-hidden="true">
      <div className="desktop-viewfinder">
        <div className="viewfinder-lens">
          <div className="lens-crosshair" />
          <div className="lens-bbox">
            <span className="bbox-label">InsightFace // Recognition active</span>
            <div className="bbox-corners" />
          </div>
          <div className="lens-scanline" />
        </div>
        <div className="lens-telemetry">
          <span>Local inference · ONNX Runtime</span>
          <span>Detection pipeline active</span>
        </div>
      </div>
      <div className="desktop-attendance-sidebar">
        <div className="attendance-profile-card">
          <div className="profile-avatar-placeholder">{project.shortName}</div>
          <div className="profile-info">
            <strong>{project.name}</strong>
            <small>Engine: {project.stack[0]}</small>
          </div>
        </div>
        <div className="attendance-status-badge">
          <span className="status-dot" />
          <span>{project.status.toUpperCase()}</span>
        </div>
        <div className="attendance-meta-list">
          <div><span>Policy</span><b>Standard Shift</b></div>
          <div><span>Target</span><b>{project.stack[1] ?? "Local"}</b></div>
          <div><span>Storage</span><b>SQLite / Secure</b></div>
        </div>
      </div>
    </div>
  );
}

function PhoneDashboardProductUI({ project }: { project: Project }) {
  return (
    <div className="product-view-phone" aria-hidden="true">
      <div className="phone-screen-top">
        <span className="phone-clock">09:41</span>
        <div className="phone-island" />
        <span className="phone-signals">Demo · Online</span>
      </div>
      <div className="phone-app-header">
        <div className="phone-brand-title">
          <strong>{project.name}</strong>
          <small>{project.tagline}</small>
        </div>
        <span className="phone-cart-pill">Cart (2)</span>
      </div>
      <div className="phone-product-card">
        <div className="phone-card-image">
          <span className="phone-artisan-badge">{project.role.split(" · ")[0] ?? "Artisan"}</span>
        </div>
        <div className="phone-card-info">
          <h5>Handwoven Heritage Collection</h5>
          <div className="phone-price-row">
            <span className="phone-price">Sample Item</span>
            <span className="phone-role-pill">Verified RBAC</span>
          </div>
        </div>
      </div>
      <div className="phone-tab-bar">
        <span className="is-active">Shop</span>
        <span>Orders</span>
        <span>Trace</span>
        <span>Roles</span>
      </div>
    </div>
  );
}

function DashboardProductUI({ project }: { project: Project }) {
  return (
    <div className="product-view-dashboard" aria-hidden="true">
      <div className="dash-kpi-row">
        <div className="dash-kpi-tile">
          <span>Workflow State</span>
          <strong>Synchronized</strong>
          <small>{project.shortName} Role Access</small>
        </div>
        <div className="dash-kpi-tile">
          <span>Data Authority</span>
          <strong>Active</strong>
          <small>Transactional Services</small>
        </div>
        <div className="dash-kpi-tile">
          <span>Approval Pipeline</span>
          <strong>Operational</strong>
          <small>Audited Transitions</small>
        </div>
      </div>
      <div className="dash-table-card">
        <div className="table-header-strip">
          <span>Record</span>
          <span>Tier</span>
          <span>Verification</span>
          <span>Status</span>
        </div>
        <div className="table-row">
          <strong>Record 01</strong>
          <span>Standard</span>
          <span>Validated</span>
          <span className="table-badge approved">Approved</span>
        </div>
        <div className="table-row">
          <strong>Record 02</strong>
          <span>Commercial</span>
          <span>Compliance</span>
          <span className="table-badge pending">In Review</span>
        </div>
        <div className="table-row">
          <strong>Record 03</strong>
          <span>Operational</span>
          <span>Authorized</span>
          <span className="table-badge approved">Disbursed</span>
        </div>
      </div>
    </div>
  );
}

function PosProductUI({ project }: { project: Project }) {
  return (
    <div className="product-view-pos" aria-hidden="true">
      <div className="pos-catalog-grid">
        <div className="pos-item-btn active">
          <strong>Espresso Roast</strong>
          <small>SKU-101</small>
          <b>$2.50</b>
        </div>
        <div className="pos-item-btn">
          <strong>Iced Cafe Latte</strong>
          <small>SKU-104</small>
          <b>$3.25</b>
        </div>
        <div className="pos-item-btn">
          <strong>Butter Croissant</strong>
          <small>SKU-208</small>
          <b>$2.75</b>
        </div>
        <div className="pos-item-btn">
          <strong>Green Tea Blend</strong>
          <small>SKU-312</small>
          <b>$2.00</b>
        </div>
      </div>
      <div className="pos-receipt-tape">
        <div className="tape-header">
          <span>{project.shortName} DEMO REGISTER</span>
          <small>REGISTER TAPE</small>
        </div>
        <div className="tape-items">
          <div><span>Catalog Item A</span><b>Order Line 1</b></div>
          <div><span>Catalog Item B</span><b>Order Line 2</b></div>
        </div>
        <div className="tape-tally">
          <div><span>Subtotal</span><span>Sample Line</span></div>
          <div><span>State</span><span>Ready</span></div>
          <div className="tape-total"><strong>LEDGER</strong><strong>BALANCED</strong></div>
        </div>
        <div className="pos-checkout-btn">
          <span>{project.status.toUpperCase()}</span>
        </div>
      </div>
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

  const presentation = project.presentation;
  return (
    <div className={`media-product-viewport presentation-${presentation} ${compact ? "is-compact" : ""}`}>
      {presentation === "desktop" ? (
        <DesktopProductUI project={project} />
      ) : presentation === "phone-dashboard" ? (
        <PhoneDashboardProductUI project={project} />
      ) : presentation === "dashboard" ? (
        <DashboardProductUI project={project} />
      ) : presentation === "pos" ? (
        <PosProductUI project={project} />
      ) : (
        <BrowserProductUI index={index} project={project} />
      )}
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
