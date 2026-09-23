import type { ReactNode } from "react";

type Tone = "default" | "accent" | "surface";
type Size = "sm" | "md";

const chipClass = (tone: Tone, size: Size) =>
  ["chip", size === "md" ? "chip-md" : "", tone === "accent" ? "chip-accent" : tone === "surface" ? "chip-surface" : ""].filter(Boolean).join(" ");

/**
 * Small rounded label for a stack item, topic, kind ("팀", "개인") or area.
 * tone: default = sunk into the page (use on surfaces), surface = raised (use on the page backdrop or
 * inside wells), accent = the one warm accent (use for at most one chip per card).
 */
export function Chip({ children, tone = "default", size = "sm", className = "" }: { children: ReactNode; tone?: Tone; size?: Size; className?: string }) {
  return <span className={`${chipClass(tone, size)} ${className}`}>{children}</span>;
}

/**
 * Wrapping list of chips. With `max`, shows the first `max` items and a "+N" chip for the rest.
 */
export function ChipList({
  items,
  label,
  max,
  tone = "default",
  size = "sm",
  className = "",
}: {
  items: string[];
  /** Accessible name of the list, e.g. "사용 기술", "다룬 주제". */
  label?: string;
  max?: number;
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  const shown = max !== undefined ? items.slice(0, max) : items;
  const rest = items.length - shown.length;
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-1.5 ${className}`}>
      {shown.map((s) => (
        <li key={s} className={chipClass(tone, size)}>
          {s}
        </li>
      ))}
      {rest > 0 && (
        <li className={`${chipClass(tone === "accent" ? "default" : tone, size)} tnum text-muted`}>
          <span aria-hidden>+{rest}</span>
          <span className="sr-only">외 {rest}개</span>
        </li>
      )}
    </ul>
  );
}
