import type { ReactNode } from "react";

type DesktopMockupProps = {
  children: ReactNode;
  label: string;
};

export function DesktopMockup({ children, label }: DesktopMockupProps) {
  return (
    <div className="mockup-frame desktop-mockup">
      <div className="desktop-chrome" aria-hidden="true">
        <span>{label}</span>
        <span className="desktop-controls"><i /><i /><i /></span>
      </div>
      <div className="mockup-viewport">{children}</div>
      <div className="desktop-base" aria-hidden="true" />
    </div>
  );
}
