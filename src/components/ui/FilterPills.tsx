"use client";

export type FilterOption<T extends string> = { value: T; label: string; count?: number };

/**
 * Controlled single-choice filter as a frosted pill bar (same material as the nav).
 * Buttons with aria-pressed inside a labelled group; the active one is a raised surface chip.
 * Scrolls sideways on narrow screens instead of wrapping.
 *
 *   const [kind, setKind] = useState<"all" | "팀" | "개인">("all");
 *   <FilterPills label="프로젝트 종류" value={kind} onChange={setKind}
 *     options={[{ value: "all", label: "전체", count: 14 }, { value: "팀", label: "팀", count: 7 }]} />
 */
export function FilterPills<T extends string>({
  options,
  value,
  onChange,
  label,
  className = "",
}: {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}) {
  return (
    <div className={`rail -m-3 max-w-[calc(100%+1.5rem)] overflow-x-auto p-3 ${className}`}>
      <div role="group" aria-label={label} className="glass inline-flex h-11 items-center gap-0.5 rounded-full p-1">
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={`flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-[14px] font-medium transition-[background-color,color,box-shadow] duration-200 lg:px-4 ${
                active ? "bg-surface text-ink [box-shadow:0_0_0_1px_var(--edge),0_2px_6px_-2px_rgb(var(--sh)/0.2)]" : "text-ink-2 hover:text-ink"
              }`}
            >
              {o.label}
              {o.count !== undefined && <span className={`tnum text-[12px] font-semibold ${active ? "text-accent-ink" : "text-muted"}`}>{o.count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
