import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { isExternal } from "@/lib/content";

type Variant = "primary" | "ghost";
type Size = "md" | "sm";

const pillClass = (variant: Variant, size: Size, iconOnly = false, className = "") =>
  ["pill", variant === "primary" ? "pill-primary" : "pill-ghost", size === "sm" ? "pill-sm" : "", iconOnly ? "pill-icon" : "", className]
    .filter(Boolean)
    .join(" ");

/**
 * Pill link. Internal hrefs use next/link. http(s) links open in a new tab with an up-right arrow
 * and a screen-reader note; mailto/tel stay in place.
 *
 * arrow: "auto" shows ArrowUpRight on http links and nothing on internal ones;
 *        "right" forces ArrowRight (use for "모두 보기" style internal links); false hides it.
 */
export function LinkButton({
  href,
  children,
  variant = "ghost",
  size = "md",
  icon,
  arrow = "auto",
  iconOnly = false,
  label,
  className = "",
}: {
  href: string;
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  arrow?: "auto" | "right" | false;
  /** Render only the icon; `label` becomes the accessible name. */
  iconOnly?: boolean;
  label?: string;
  className?: string;
}) {
  const cls = pillClass(variant, size, iconOnly, className);
  const web = /^https?:/.test(href);
  const iconSize = size === "sm" ? 14 : 16;
  const trailing =
    arrow === "right" ? (
      <ArrowRight size={iconSize} weight="bold" aria-hidden />
    ) : arrow === "auto" && web && !iconOnly ? (
      <ArrowUpRight size={iconSize} weight="bold" aria-hidden />
    ) : null;
  const body = (
    <>
      {icon}
      {iconOnly ? <span className="sr-only">{label}</span> : children}
      {trailing}
      {web && <span className="sr-only"> (새 창)</span>}
    </>
  );

  if (isExternal(href)) {
    return (
      <a href={href} className={cls} aria-label={iconOnly ? undefined : label} {...(web ? { target: "_blank", rel: "noreferrer" } : {})}>
        {body}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={iconOnly ? undefined : label}>
      {body}
    </Link>
  );
}

/** Pill <button>. Same look as LinkButton; defaults to type="button". */
export function Button({
  children,
  variant = "ghost",
  size = "md",
  icon,
  className = "",
  type = "button",
  ...rest
}: {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={pillClass(variant, size, false, className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}

/** Quiet inline link with a trailing arrow, e.g. "프로젝트 14개 모두 보기". */
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const web = /^https?:/.test(href);
  const cls = `group inline-flex items-center gap-1.5 rounded-full text-[15px] font-semibold text-ink transition-colors hover:text-accent-ink ${className}`;
  const inner = (
    <>
      {children}
      {web ? (
        <ArrowUpRight size={15} weight="bold" aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : (
        <ArrowRight size={15} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );
  return isExternal(href) ? (
    <a href={href} className={cls} {...(web ? { target: "_blank", rel: "noreferrer" } : {})}>
      {inner}
      {web && <span className="sr-only"> (새 창)</span>}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Small ghost pill with a left arrow, used above detail page titles ("프로젝트", "공부"). */
export function BackLink({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <Link href={href} className={`pill pill-ghost pill-sm group ${className}`}>
      <ArrowLeft size={14} weight="bold" aria-hidden className="transition-transform group-hover:-translate-x-0.5" />
      {label}
    </Link>
  );
}
