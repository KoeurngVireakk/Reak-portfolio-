import type { ReactNode } from "react";

type PhoneMockupProps = {
  children: ReactNode;
};

export function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <div className="mockup-frame phone-mockup">
      <span className="phone-sensor" aria-hidden="true" />
      <div className="mockup-viewport">{children}</div>
      <span className="phone-home" aria-hidden="true" />
    </div>
  );
}
