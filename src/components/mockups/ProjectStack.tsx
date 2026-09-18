import type { ReactNode } from "react";
import type { ProjectPresentation } from "../../data/portfolio";
import { BrowserMockup } from "./BrowserMockup";
import { DashboardMockup } from "./DashboardMockup";
import { DesktopMockup } from "./DesktopMockup";
import { PhoneMockup } from "./PhoneMockup";

type ProjectStackProps = {
  children: ReactNode;
  label: string;
  presentation: ProjectPresentation;
  secondary?: ReactNode;
};

export function ProjectStack({ children, label, presentation, secondary }: ProjectStackProps) {
  if (presentation === "desktop") {
    return <DesktopMockup label={label}>{children}</DesktopMockup>;
  }

  if (presentation === "phone-dashboard") {
    return (
      <div className="project-stack project-stack-mobile">
        <DashboardMockup label={label}>{secondary ?? children}</DashboardMockup>
        <PhoneMockup>{children}</PhoneMockup>
      </div>
    );
  }

  if (presentation === "dashboard" || presentation === "pos") {
    return (
      <DashboardMockup label={label} variant={presentation === "pos" ? "pos" : "dashboard"}>
        {children}
      </DashboardMockup>
    );
  }

  return <BrowserMockup label={label}>{children}</BrowserMockup>;
}
