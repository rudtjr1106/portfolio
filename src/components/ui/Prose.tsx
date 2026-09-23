import type { ReactNode } from "react";

/**
 * Paragraphs from site.ts (summary, about). size "lg" reads as a lede, "md" as body copy.
 */
export function Prose({ paragraphs, size = "md", className = "" }: { paragraphs: string[]; size?: "lg" | "md"; className?: string }) {
  return (
    <div className={`max-w-[42rem] space-y-4 text-ink-2 ${size === "lg" ? "type-lede" : "type-body"} ${className}`}>
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

/**
 * List of short statements (features, myWork, highlights, study section items).
 * Marker is a small neutral round bullet centered on the first line (a plain list marker, not a
 * colored status dot). columns=2 splits into two columns from md.
 * tone "plain" makes the bullet lighter for secondary lists.
 */
export function ItemList({
  items,
  columns = 1,
  size = "md",
  tone = "accent",
  label,
  className = "",
}: {
  items: ReactNode[];
  columns?: 1 | 2;
  size?: "md" | "sm";
  tone?: "accent" | "plain";
  /** Accessible name for the list when no heading labels it. */
  label?: string;
  className?: string;
}) {
  return (
    <ul
      aria-label={label}
      className={`grid gap-x-10 ${size === "sm" ? "gap-y-2.5" : "gap-y-3.5"} ${columns === 2 ? "md:grid-cols-2" : ""} ${className}`}
    >
      {items.map((it, idx) => (
        <li key={idx} className={`relative pl-5 text-ink ${size === "sm" ? "text-[14.5px] leading-[1.65]" : "text-[15.5px] leading-[1.7]"}`}>
          <span
            aria-hidden
            className={`absolute left-0.5 size-[5px] -translate-y-1/2 rounded-full ${size === "sm" ? "top-[0.825em]" : "top-[0.85em]"} ${
              tone === "accent" ? "bg-ink-2/55" : "bg-muted/45"
            }`}
          />
          {it}
        </li>
      ))}
    </ul>
  );
}
