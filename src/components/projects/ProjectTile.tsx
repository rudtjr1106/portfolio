import Link from "next/link";
import { hasImages, projectHref, type Project } from "@/lib/content";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { ProjectMark } from "@/components/ui/ProjectMark";
import { CardArrow, ProjectMeta } from "@/components/ui/ProjectCard";

/**
 * One project on /projects as a link to its detail page. The tile reads its own width (container
 * query), so the same markup works in a half cell and across both columns:
 *  - visual (has screenshots): stage with the real screens + mark, name, tagline, meta.
 *    Across both columns it turns sideways: stage left, text right (centered).
 *  - compact (no screenshots): mark, name, tagline, meta. Mark beside the text when narrow (phones),
 *    mark on top in a half cell, one row across both columns. Never an empty stage.
 * One real link per tile (stretched over the tile), focus ring on the whole tile.
 */
export function ProjectTile({ project: p, preload = false, eagerMark = false }: { project: Project; preload?: boolean; eagerMark?: boolean }) {
  const href = projectHref(p.slug);
  const title = (
    <h3 className="type-card text-ink">
      <Link href={href} className="linkcard-link">
        {p.name}
      </Link>
      {p.nameNote && <span className="ml-2 whitespace-nowrap text-[13px] font-medium tracking-normal text-muted">{p.nameNote}</span>}
    </h3>
  );

  if (hasImages(p)) {
    return (
      <div className="@container h-full">
        <article className="linkcard group surface tactile flex h-full flex-col rounded-card p-2 @2xl:grid @2xl:grid-cols-12 @2xl:gap-2">
          <ProjectVisual
            project={p}
            size="lg"
            radius="rounded-inner"
            preload={preload}
            aspectClass="aspect-[16/10]"
            className="@2xl:col-span-7"
          />
          <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4 sm:pb-4 @2xl:col-span-5 @2xl:justify-center @2xl:px-8 @2xl:py-8">
            <div className="flex items-start gap-3.5">
              <ProjectMark project={p} size={44} eager={eagerMark} />
              <div className="min-w-0 flex-1 pt-2.5">{title}</div>
              <CardArrow />
            </div>
            <p className="mt-4 max-w-[34rem] type-small text-ink-2 @2xl:mt-5 @2xl:text-[15.5px]">{p.tagline}</p>
            <ProjectMeta project={p} className="mt-auto pt-5 @2xl:mt-6 @2xl:pt-0" />
          </div>
        </article>
      </div>
    );
  }

  // Narrow (phones): mark left, text right. Half cell: mark and arrow on top, meta at the bottom.
  // Across both columns: one row.
  return (
    <div className="@container h-full">
      <article className="linkcard group surface tactile grid h-full grid-cols-[auto_minmax(0,1fr)] content-start gap-x-4 rounded-card p-5 sm:p-6 @md:flex @md:flex-col @2xl:flex-row @2xl:items-center @2xl:gap-6 @2xl:py-5">
        <div className="row-span-2 flex items-start justify-between gap-4">
          <ProjectMark project={p} size={52} eager={eagerMark} />
          <span className="hidden @md:block @2xl:hidden">
            <CardArrow />
          </span>
        </div>
        <div className="min-w-0 pt-0.5 @md:mt-5 @md:pt-0 @2xl:mt-0 @2xl:flex-1">
          {title}
          <p className="mt-1.5 max-w-[34rem] type-small text-ink-2">{p.tagline}</p>
        </div>
        <ProjectMeta project={p} className="mt-3.5 @md:mt-auto @md:pt-5 @2xl:mt-0 @2xl:max-w-[17rem] @2xl:justify-end @2xl:pt-0" />
        <span className="hidden @2xl:block">
          <CardArrow />
        </span>
      </article>
    </div>
  );
}
