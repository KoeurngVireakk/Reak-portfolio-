import type { ReactNode } from "react";

type BrowserMockupProps = {
  children: ReactNode;
  label: string;
};

export function BrowserMockup({ children, label }: BrowserMockupProps) {
  return (
    <div className="mockup-frame browser-mockup">
      <div className="browser-chrome" aria-hidden="true">
        <span className="window-dots"><i /><i /><i /></span>
        <span className="browser-address">{label.toLowerCase().replaceAll(" ", "-")}.local</span>
        <span className="browser-action" />
      </div>
      <div className="mockup-viewport">{children}</div>
    </div>
  );
}
