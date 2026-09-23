import type { ReactNode } from "react";
import { Container } from "./Container";
import { TextLink } from "./Button";

type HeadingSize = "lg" | "md" | "sm";

const TITLE_CLASS: Record<HeadingSize, string> = {
  lg: "type-section",
  md: "type-card-lg",
  sm: "type-card",
};

/**
 * Heading block for a section or a group inside a section.
 * Stacks vertically: title (+ optional count), lede under it (max 40rem), action link.
 * On md+ the action sits at the right end of the title row; on phones it drops under the lede.
 */
export function SectionHeading({
  id,
  title,
  count,
  lede,
  action,
  size = "lg",
  as: Tag = "h2",
  className = "",
}: {
  /** id for the heading element, used by aria-labelledby. */
  id?: string;
  title: ReactNode;
  /** Small muted number after the title, e.g. items in a group. */
  count?: number;
  lede?: ReactNode;
  action?: { href: string; label: string };
  size?: HeadingSize;
  as?: "h2" | "h3" | "h4";
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10 ${className}`}>
      <div className="max-w-[44rem]">
        <Tag id={id} className={`${TITLE_CLASS[size]} text-ink`}>
          {title}
          {count !== undefined && (
            <span className="tnum ml-2.5 align-baseline font-sans text-[0.5em] font-semibold tracking-normal text-muted">
              {count}
              <span className="sr-only">개</span>
            </span>
          )}
        </Tag>
        {lede && <p className={`mt-3 text-ink-2 ${size === "lg" ? "type-lede" : "type-small"}`}>{lede}</p>}
      </div>
      {action && (
        <div className="shrink-0 md:pb-1.5">
          <TextLink href={action.href}>{action.label}</TextLink>
        </div>
      )}
    </div>
  );
}

const SPACING = {
  default: "pb-24 lg:pb-32",
  tight: "pb-16 lg:pb-20",
  none: "",
} as const;

/**
 * A page section: <section aria-labelledby> + Container + optional SectionHeading + children.
 * Vertical rhythm comes from bottom padding only (sections stack without top padding).
 */
export function Section({
  id,
  title,
  count,
  lede,
  action,
  headingSize = "lg",
  children,
  spacing = "default",
  containerSize = "page",
  className = "",
  bodyClassName = "mt-10 lg:mt-12",
  label,
}: {
  /** Used for the section id and `${id}-title`. Required when a title is given. */
  id: string;
  title?: ReactNode;
  count?: number;
  lede?: ReactNode;
  action?: { href: string; label: string };
  headingSize?: HeadingSize;
  children: ReactNode;
  spacing?: keyof typeof SPACING;
  containerSize?: "page" | "narrow";
  className?: string;
  /** Classes for the wrapper around children (default adds the gap under the heading). */
  bodyClassName?: string;
  /** aria-label when the section has no visible title. */
  label?: string;
}) {
  const titleId = title ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={titleId} aria-label={titleId ? undefined : label} className={`${SPACING[spacing]} ${className}`}>
      <Container size={containerSize}>
        {title && <SectionHeading id={titleId} title={title} count={count} lede={lede} action={action} size={headingSize} />}
        <div className={title ? bodyClassName : ""}>{children}</div>
      </Container>
    </section>
  );
}
