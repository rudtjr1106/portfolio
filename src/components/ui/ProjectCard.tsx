import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { hasImages, kindLabel, projectHref, type Project } from "@/lib/content";
import { ProjectMark } from "./ProjectMark";
import { ProjectVisual } from "./ProjectVisual";
import { Chip } from "./Chip";

type Heading = "h2" | "h3" | "h4";

/** Period and platform as a quiet line; kind as a chip. No separators needed. */
export function ProjectMeta({ project, showKind = true, className = "" }: { project: Project; showKind?: boolean; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 ${className}`}>
      {showKind && <Chip>{kindLabel(project.kind)}</Chip>}
      <span className="tnum type-label text-muted">{project.period}</span>
      <span className="type-label text-muted">{project.platform}</span>
    </div>
  );
}

export function CardArrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid size-10 shrink-0 place-items-center rounded-full bg-bg text-ink transition-[background-color,color,transform] duration-300 [box-shadow:inset_0_0_0_1px_var(--edge)] group-hover:bg-pill group-hover:text-pill-ink ${className}`}
    >
      <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </span>
  );
}

/**
 * One project as a link to /projects/[slug]. The whole card is clickable (stretched link on the
 * name), focus ring on the card, one link per card for screen readers.
 *
 * variant
 *  - "feature": big stage (ProjectVisual) + icon, name, tagline, meta. For hero-level showcases.
 *               `visual` sets the stage composition: "lg" (3 phones, 16/10) or "md" (2 phones, 4/3);
 *               `stageClass` overrides the stage aspect/height.
 *  - "card":    compact 16/10 stage + name + tagline (2 lines) + meta. For grids of 2-3 columns.
 *               Every card in a grid gets the same stage aspect, so title rows line up.
 * The icon appears once per card: next to the name when the stage shows screenshots, only on the
 * stage when the project has no screenshots.
 *  - "row":     no stage: mark, name, tagline, meta in one line on desktop. For dense lists;
 *               transparent until hover, so place rows inside a Panel or on the backdrop.
 */
export function ProjectCard({
  project,
  variant = "card",
  visual = "lg",
  stageClass,
  headingAs: H = "h3",
  preload = false,
  className = "",
}: {
  project: Project;
  variant?: "feature" | "card" | "row";
  visual?: "lg" | "md";
  /** feature only: aspect/height classes for the stage, replacing the default aspect. Use it to give
   *  cards in one row the same stage height, e.g. "aspect-[4/3] lg:aspect-auto lg:h-[420px]". */
  stageClass?: string;
  headingAs?: Heading;
  preload?: boolean;
  className?: string;
}) {
  const href = projectHref(project.slug);

  if (variant === "row") {
    return (
      <article
        className={`linkcard group flex items-center gap-4 rounded-card p-3 transition-[background-color,box-shadow] duration-300 hover:bg-surface hover:[box-shadow:inset_0_1px_0_var(--hi),0_0_0_1px_var(--edge),0_10px_24px_-12px_rgb(var(--sh)/0.25)] sm:gap-5 sm:p-4 ${className}`}
      >
        <ProjectMark project={project} size={52} />
        <div className="min-w-0 flex-1 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8">
          <div className="min-w-0">
            <H className="type-card text-ink">
              <Link href={href} className="linkcard-link">
                {project.name}
              </Link>
              {project.nameNote && <span className="ml-2 text-[13px] font-medium tracking-normal text-muted">{project.nameNote}</span>}
            </H>
            <p className="mt-1 type-small text-ink-2">{project.tagline}</p>
          </div>
          <ProjectMeta project={project} className="mt-2.5 md:mt-0 md:justify-end" />
        </div>
        <ArrowRight size={16} weight="bold" aria-hidden className="hidden shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink sm:block" />
      </article>
    );
  }

  if (variant === "card") {
    return (
      <article className={`linkcard group surface tactile flex flex-col rounded-card p-2 ${className}`}>
        <ProjectVisual project={project} size="sm" radius="rounded-inner" preload={preload} aspectClass="aspect-[16/10]" />
        <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
          <div className="flex min-h-9 items-center gap-3">
            {hasImages(project) && <ProjectMark project={project} size={36} />}
            <H className="type-card min-w-0 text-ink">
              <Link href={href} className="linkcard-link">
                {project.name}
              </Link>
            </H>
          </div>
          <p className="mt-3 line-clamp-2 type-small text-ink-2">{project.tagline}</p>
          <ProjectMeta project={project} className="mt-auto pt-5" />
        </div>
      </article>
    );
  }

  return (
    <article className={`linkcard group surface tactile flex flex-col rounded-panel p-2 ${className}`}>
      <ProjectVisual project={project} size={visual} radius="rounded-card" preload={preload} aspectClass={stageClass} />
      <div className="flex flex-1 flex-col px-4 pb-5 pt-6 sm:px-6 sm:pb-6">
        <div className="flex min-h-12 items-start gap-4">
          {hasImages(project) && <ProjectMark project={project} size={48} />}
          <div className="min-w-0 flex-1">
            <H className="type-card-lg text-ink">
              <Link href={href} className="linkcard-link">
                {project.name}
              </Link>
            </H>
            {project.nameNote && <p className="mt-1 text-[13px] font-medium text-muted">{project.nameNote}</p>}
          </div>
          <CardArrow />
        </div>
        <p className="mt-4 max-w-[36rem] text-[16px] leading-[1.65] text-ink-2">{project.tagline}</p>
        <ProjectMeta project={project} className="mt-auto pt-6" />
      </div>
    </article>
  );
}
