import type { ElementType, ReactNode } from "react";

const WIDTH = {
  page: "max-w-[1320px]",
  narrow: "max-w-[880px]",
} as const;

/**
 * Horizontal frame for every page block: centered, 1320px max, 20px gutter on phones, 32px from sm.
 */
export function Container({
  children,
  size = "page",
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  size?: keyof typeof WIDTH;
  as?: ElementType;
  className?: string;
}) {
  return <Tag className={`mx-auto w-full ${WIDTH[size]} px-5 sm:px-8 ${className}`}>{children}</Tag>;
}
