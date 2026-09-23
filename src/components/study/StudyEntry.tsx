import Link from "next/link";
import { relatedProject, studyHref, type Study } from "@/lib/content";
import { ChipList } from "@/components/ui/Chip";
import { CardArrow } from "@/components/ui/ProjectCard";
import { ProjectMark } from "@/components/ui/ProjectMark";

/**
 * How many topic chips fit on one line beside the related project: counts characters (Hangul as ~1.7)
 * plus a per-chip allowance, so a long first topic does not push "+N" onto a line of its own.
 */
function chipsThatFit(topics: string[], budget: number): number {
  let used = 0;
  let n = 0;
  for (const t of topics) {
    const w = Array.from(t).reduce((a, c) => a + (/[\u3131-\uD79D]/.test(c) ? 1.7 : 1), 0) + 4;
    if (n >= 2 && used + w > budget) break;
    used += w;
    n++;
  }
  return Math.min(n, 4);
}

/**
 * One study note in the /study index. The whole card is one link (stretched on the title).
 * Top line: period and where the notes live (arrow badge in the corner from sm).
 * Then title, the one-line summary, the first topics, and the related project with its real mark.
 */
export function StudyEntry({ item }: { item: Study }) {
  const related = relatedProject(item);
  const shown = chipsThatFit(item.topics, related ? 54 : 64);
  return (
    <article className="linkcard group surface tactile relative rounded-card p-6 sm:p-8">
      <CardArrow className="absolute right-6 top-6 hidden sm:grid" />

      <p className="flex flex-wrap items-center gap-x-4 gap-y-1 type-label text-muted sm:pr-14">
        <span className="tnum">{item.period}</span>
        <span>{item.source}</span>
      </p>

      <h3 className="mt-3 type-card text-ink sm:pr-14 sm:text-[1.45rem] sm:leading-[1.25] sm:tracking-[-0.03em]">
        <Link href={studyHref(item.slug)} className="linkcard-link">
          {item.title}
        </Link>
      </h3>
      <p className="mt-2.5 max-w-[38rem] text-[15.5px] leading-[1.7] text-ink-2">{item.short}</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <ChipList items={item.topics} max={shown} label="다룬 주제" className="min-w-0" />
        {related && (
          <p className="flex items-center gap-2.5 text-[14px] font-medium text-ink">
            <span className="type-label text-muted">관련 프로젝트</span>
            <ProjectMark project={related} size={28} />
            {related.name}
          </p>
        )}
      </div>
    </article>
  );
}
