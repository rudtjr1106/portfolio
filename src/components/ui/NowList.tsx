import Link from "next/link";
import { ArrowRight, Flask } from "@phosphor-icons/react/ssr";
import { nowItems, type NowItem } from "@/lib/content";
import { ProjectMark } from "./ProjectMark";

function Mark({ item, size }: { item: NowItem; size: number }) {
  // Eager: on /about the list sits right under the header, and its icons are tiny.
  if (item.project) return <ProjectMark project={item.project} size={size} eager />;
  return (
    <span aria-hidden className="mark-tile" style={{ width: size, height: size, borderRadius: size * 0.225 }}>
      <Flask size={Math.round(size * 0.46)} weight="bold" className="text-accent-ink" />
    </span>
  );
}

/**
 * person.now as large rows: mark, what (big), detail (muted), arrow. Rows link to the project or
 * study note that site.ts connects them to (see nowItems in lib/content); rows without a link render
 * as plain text. Transparent until hover, so it sits on the backdrop or inside a Panel.
 */
export function NowList({ items = nowItems, className = "" }: { items?: NowItem[]; className?: string }) {
  return (
    <ul className={`grid gap-1.5 ${className}`}>
      {items.map((it) => {
        const body = (
          <>
            <Mark item={it} size={56} />
            <span className="min-w-0 flex-1">
              <span className="block font-kr text-[clamp(1.2rem,0.8vw+1rem,1.5rem)] font-bold leading-[1.3] tracking-[-0.03em] text-ink">{it.what}</span>
              <span className="mt-1 block text-[15px] leading-[1.6] text-ink-2">{it.detail}</span>
            </span>
          </>
        );
        return (
          <li key={it.what}>
            {it.href ? (
              <Link
                href={it.href}
                className="group flex items-center gap-4 rounded-card p-3 transition-[background-color,box-shadow] duration-300 hover:bg-surface hover:[box-shadow:inset_0_1px_0_var(--hi),0_0_0_1px_var(--edge),0_10px_24px_-12px_rgb(var(--sh)/0.25)] sm:gap-5 sm:p-4"
              >
                {body}
                <ArrowRight size={18} weight="bold" aria-hidden className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
              </Link>
            ) : (
              <div className="flex items-center gap-4 p-3 sm:gap-5 sm:p-4">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
