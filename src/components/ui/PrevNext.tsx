import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";

export type PrevNextItem = {
  href: string;
  title: string;
  /** Optional leading visual, e.g. <ProjectMark project={p} size={40} />. */
  mark?: ReactNode;
};

/**
 * Two large tiles at the end of a detail page. A missing side keeps its column empty so the other
 * tile stays on its own edge. Labels default to "이전" / "다음"; pass e.g. "이전 프로젝트".
 */
export function PrevNext({
  prev,
  next,
  prevLabel = "이전",
  nextLabel = "다음",
  label = "다른 글 보기",
  className = "",
}: {
  prev?: PrevNextItem;
  next?: PrevNextItem;
  prevLabel?: string;
  nextLabel?: string;
  /** aria-label of the <nav>. */
  label?: string;
  className?: string;
}) {
  if (!prev && !next) return null;
  return (
    <nav aria-label={label} className={`grid gap-3 sm:grid-cols-2 sm:gap-4 ${className}`}>
      {prev ? <Tile item={prev} label={prevLabel} dir="prev" /> : <span aria-hidden className="hidden sm:block" />}
      {next ? <Tile item={next} label={nextLabel} dir="next" /> : null}
    </nav>
  );
}

function Tile({ item, label, dir }: { item: PrevNextItem; label: string; dir: "prev" | "next" }) {
  const isNext = dir === "next";
  return (
    <Link
      href={item.href}
      rel={isNext ? "next" : "prev"}
      className={`group surface tactile flex items-center gap-4 rounded-card p-5 sm:p-6 ${isNext ? "flex-row-reverse text-right" : ""}`}
    >
      {item.mark && <span className="shrink-0">{item.mark}</span>}
      <span className="min-w-0 flex-1">
        <span className={`flex items-center gap-1.5 type-label text-muted ${isNext ? "justify-end" : ""}`}>
          {!isNext && <ArrowLeft size={13} weight="bold" aria-hidden className="transition-transform group-hover:-translate-x-0.5" />}
          {label}
          {isNext && <ArrowRight size={13} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-0.5" />}
        </span>
        <span className="mt-1.5 block type-card text-ink">{item.title}</span>
      </span>
    </Link>
  );
}
