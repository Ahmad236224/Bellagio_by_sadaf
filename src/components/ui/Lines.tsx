import type { ReactNode } from "react";

type Props = {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Opt out of the scroll-triggered line reveal (e.g. the hero drives its own). */
  hero?: boolean;
};

/** Display heading split into masked lines that rise one by one. */
export default function Lines({ lines, as: Tag = "h2", className = "", hero }: Props) {
  return (
    <Tag className={`display ${className}`} data-reveal={hero ? undefined : "lines"}>
      {lines.map((l, i) => (
        <span key={i} className="line" data-hero={hero ? "line" : undefined}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
