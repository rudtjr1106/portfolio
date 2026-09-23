import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { studyHref, type Study } from "@/lib/content";
import { Chip, ChipList } from "./Chip";
import { CardArrow } from "./ProjectCard";

type Heading = "h2" | "h3" | "h4";

/** Area chip + period, the top line of every study card. */
export function StudyMeta({ item, showArea = true, className = "" }: { item: Study; showArea?: boolean; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 ${className}`}>
      {showArea && <Chip tone="surface">{item.area}</Chip>}
      <span className="tnum type-label text-muted">{item.period}</span>
    </div>
  );
}

/**
 * One study note as a link to /study/[slug]. Whole card clickable, one link per card.
 *
 * variant
 *  - "feature": large card: meta, title, short at the top; topic chips (all, or the first `topics`)
 *               and source anchored to the bottom, so it can stretch beside a stack of cards.
 *               tone "accent" adds the warm wash (use once per section), default "surface".
 *  - "card":    medium card: meta, title, short (3 lines), first 3 topics.
 *  - "row":     compact line for dense lists: title + short, meta on the right from md.
 */
export function StudyCard({
  item,
  variant = "card",
  tone = "surface",
  topics,
  headingAs: H = "h3",
  className = "",
}: {
  item: Study;
  variant?: "feature" | "card" | "row";
  tone?: "surface" | "accent";
  /** How many topic chips to show before "+N". */
  topics?: number;
  headingAs?: Heading;
  className?: string;
}) {
  const href = studyHref(item.slug);

  if (variant === "row") {
    return (
      <article
        className={`linkcard group flex items-center gap-4 rounded-card p-4 transition-[background-color,box-shadow] duration-300 hover:bg-surface hover:[box-shadow:inset_0_1px_0_var(--hi),0_0_0_1px_var(--edge),0_10px_24px_-12px_rgb(var(--sh)/0.25)] sm:p-5 ${className}`}
      >
        <div className="min-w-0 flex-1 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8">
          <div className="min-w-0">
            <H className="type-card text-ink">
              <Link href={href} className="linkcard-link">
                {item.title}
              </Link>
            </H>
            <p className="mt-1 type-small text-ink-2">{item.short}</p>
          </div>
          <StudyMeta item={item} className="mt-2.5 md:mt-0 md:justify-end" />
        </div>
        <ArrowRight size={16} weight="bold" aria-hidden className="hidden shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink sm:block" />
      </article>
    );
  }

  const surface = tone === "accent" ? "surface-accent" : "surface";

  if (variant === "card") {
    return (
      <article className={`linkcard group ${surface} tactile flex flex-col rounded-card p-5 sm:p-6 ${className}`}>
        <StudyMeta item={item} />
        <H className="mt-4 type-card text-ink">
          <Link href={href} className="linkcard-link">
            {item.title}
          </Link>
        </H>
        <p className="mt-2 line-clamp-3 type-small text-ink-2">{item.short}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <ChipList items={item.topics} max={topics ?? 3} label="다룬 주제" />
          <CardArrow />
        </div>
      </article>
    );
  }

  return (
    <article className={`linkcard group ${surface} tactile flex flex-col rounded-panel p-6 sm:p-8 lg:p-10 ${className}`}>
      <StudyMeta item={item} />
      <H className="mt-6 type-card-lg max-w-[30rem] text-ink">
        <Link href={href} className="linkcard-link">
          {item.title}
        </Link>
      </H>
      <p className="mt-3 max-w-[36rem] text-[16px] leading-[1.7] text-ink-2">{item.short}</p>
      <div className="mt-auto pt-10">
        <ChipList items={item.topics} max={topics} label="다룬 주제" />
        <div className="mt-7 flex items-center justify-between gap-4">
          <p className="type-label text-muted">{item.source}</p>
          <CardArrow />
        </div>
      </div>
    </article>
  );
}
