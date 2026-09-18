import type { ReactNode } from "react";

type DashboardMockupProps = {
  children: ReactNode;
  label: string;
  variant?: "dashboard" | "pos";
};

export function DashboardMockup({ children, label, variant = "dashboard" }: DashboardMockupProps) {
  return (
    <div className={`mockup-frame dashboard-mockup dashboard-${variant}`}>
      <div className="dashboard-rail" aria-hidden="true">
        <strong>{label.slice(0, 2).toUpperCase()}</strong>
        <i /><i /><i /><i />
      </div>
      <div className="dashboard-canvas">
        <div className="dashboard-toolbar" aria-hidden="true">
          <span>{variant === "pos" ? "POS workspace" : "Operations dashboard"}</span>
          <i />
        </div>
        <div className="mockup-viewport">{children}</div>
      </div>
    </div>
  );
}
