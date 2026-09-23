import type { ReactNode } from "react";

export type MetaItem = {
  label: string;
  value: ReactNode;
  /** Take the full row (use for long values such as team or role). */
  wide?: boolean;
};

const COLS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * Label/value pairs as a <dl> grid. No rules between rows: spacing does the grouping.
 * Items with empty values (undefined, null, "") are skipped, so optional fields can be passed as-is.
 * Phones always get 2 columns (1 when columns=1); wide items span the whole row.
 */
export function MetaList({ items, columns = 2, className = "" }: { items: MetaItem[]; columns?: 1 | 2 | 3 | 4; className?: string }) {
  const shown = items.filter((it) => it.value !== undefined && it.value !== null && it.value !== "");
  return (
    <dl className={`grid gap-x-8 gap-y-5 ${COLS[columns]} ${className}`}>
      {shown.map((it) => (
        <div key={it.label} className={it.wide ? "col-span-full" : ""}>
          <dt className="type-label text-muted">{it.label}</dt>
          <dd className="mt-1 text-[15px] leading-[1.55] text-ink">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
