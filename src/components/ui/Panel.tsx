import type { ElementType, ReactNode } from "react";
import { Info } from "@phosphor-icons/react/ssr";

const TONE = {
  surface: "surface",
  lift: "surface-lift",
  accent: "surface-accent",
  well: "inset-well",
} as const;

const PAD = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-5 sm:p-8",
  lg: "p-6 sm:p-10 lg:p-12",
} as const;

const RADIUS = {
  panel: "rounded-panel",
  card: "rounded-card",
  inner: "rounded-inner",
} as const;

/**
 * Rounded block. tone: surface (raised, default), lift (raised more, for one hero-level block per page),
 * accent (surface with the warm wash, max one per section), well (sunk into the page, holds visuals).
 * Radius follows nesting: panel (32) for top-level blocks, card (24) for blocks inside a grid or a panel,
 * inner (16) for wells inside cards.
 */
export function Panel({
  children,
  tone = "surface",
  padding = "lg",
  radius = "panel",
  as: Tag = "div",
  className = "",
  ...rest
}: {
  children: ReactNode;
  tone?: keyof typeof TONE;
  padding?: keyof typeof PAD;
  radius?: keyof typeof RADIUS;
  as?: ElementType;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  return (
    <Tag className={`${TONE[tone]} ${RADIUS[radius]} ${PAD[padding]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/** Small muted note with an info glyph: project.note, imageNote, study.caveat. */
export function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex max-w-[42rem] gap-2 text-[13.5px] leading-[1.65] text-muted ${className}`}>
      <Info size={16} weight="bold" aria-hidden className="mt-[0.2em] shrink-0" />
      <span>{children}</span>
    </p>
  );
}
