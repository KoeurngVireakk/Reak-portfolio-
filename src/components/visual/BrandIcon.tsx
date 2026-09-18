import type { SimpleIcon } from "simple-icons";

type BrandIconProps = {
  icon?: SimpleIcon;
  fallback: string;
};

export function BrandIcon({ icon, fallback }: BrandIconProps) {
  if (!icon) {
    return <span className="brand-icon-fallback" aria-hidden="true">{fallback}</span>;
  }

  return (
    <svg
      aria-hidden="true"
      className="brand-icon"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d={icon.path} />
    </svg>
  );
}
