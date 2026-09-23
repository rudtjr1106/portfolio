import Image from "next/image";
import type { Project } from "@/lib/content";

/** First letter of the project name, used when there is no icon ("What is That?" -> "W", "매듭" -> "매"). */
export const initialOf = (name: string) => Array.from(name.trim())[0]?.toUpperCase() ?? "";

/**
 * The project's app icon, or a typographic squircle tile with its initial when site.ts has no icon.
 * Both share the same footprint (size x size) and silhouette, so lists stay aligned.
 * float: stronger multi-layer shadow for icons sitting on a stage.
 * preload: the icon is above the fold and likely the LCP element (detail page header).
 * eager: load without lazy loading, for marks above the fold among several candidates (list tiles).
 * Decorative by default (alt=""), because the name is always printed next to it.
 */
export function ProjectMark({
  project,
  size = 48,
  float = false,
  preload = false,
  eager = false,
  decorative = true,
  className = "",
}: {
  project: Pick<Project, "name" | "icon">;
  size?: number;
  float?: boolean;
  preload?: boolean;
  eager?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  if (project.icon) {
    return (
      <Image
        src={project.icon.src}
        width={project.icon.w}
        height={project.icon.h}
        alt={decorative ? "" : project.icon.alt}
        preload={preload}
        loading={eager && !preload ? "eager" : undefined}
        sizes={`${Math.ceil(size * 1.5)}px`}
        className={`shrink-0 ${float ? "icon-float" : "icon-rest"} ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : project.name}
      data-float={float || undefined}
      className={`mark-tile ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.225, fontSize: Math.round(size * 0.42) }}
    >
      {initialOf(project.name)}
    </span>
  );
}

/** Projects with a real icon first (stable), so rows and folders lead with real artwork. */
export const iconsFirst = (list: Project[]) => [...list.filter((p) => p.icon), ...list.filter((p) => !p.icon)];

function MoreBubble({ n, size }: { n: number; size: number }) {
  return (
    <span
      className="tnum grid shrink-0 place-items-center rounded-full bg-pill font-sans font-semibold text-pill-ink"
      style={{ width: size * 0.82, height: size * 0.82, fontSize: Math.max(12, Math.round(size * 0.28)) }}
    >
      +{n}
    </span>
  );
}

/**
 * A row of marks, e.g. "the other projects" on a link to /projects. Shows `max` marks and a "+N"
 * bubble for the rest. overlap: false (default) spaces them apart; true tucks them together with a
 * ring in the surface color. Always decorative: pair it with visible text.
 */
export function ProjectMarkStack({
  projects,
  max = 6,
  size = 44,
  overlap = false,
  className = "",
}: {
  projects: Project[];
  max?: number;
  size?: number;
  overlap?: boolean;
  className?: string;
}) {
  const shown = projects.slice(0, max);
  const rest = projects.length - shown.length;
  if (!overlap) {
    return (
      <div aria-hidden className={`flex items-center gap-2 ${className}`}>
        {shown.map((p) => (
          <ProjectMark key={p.slug} project={p} size={size} />
        ))}
        {rest > 0 && <MoreBubble n={rest} size={size} />}
      </div>
    );
  }
  return (
    <div aria-hidden className={`flex items-center ${className}`}>
      {shown.map((p, i) => (
        <span
          key={p.slug}
          className="relative block rounded-[22.5%] bg-surface"
          style={{ marginLeft: i === 0 ? 0 : -size * 0.22, zIndex: shown.length - i, padding: 3 }}
        >
          <ProjectMark project={p} size={size} />
        </span>
      ))}
      {rest > 0 && (
        <span className="relative" style={{ marginLeft: -size * 0.1 }}>
          <MoreBubble n={rest} size={size} />
        </span>
      )}
    </div>
  );
}

/**
 * Marks in a square grid, like an app folder on a phone home screen. Shows up to `max` marks
 * (default 9); when there are more, the last cell becomes "+N". Decorative.
 */
export function ProjectMarkGrid({
  projects,
  max = 9,
  size = 60,
  cols = 3,
  className = "",
}: {
  projects: Project[];
  max?: number;
  size?: number;
  cols?: number;
  className?: string;
}) {
  const overflow = projects.length > max;
  const shown = overflow ? projects.slice(0, max - 1) : projects;
  return (
    <div
      aria-hidden
      className={`grid place-items-center ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, ${size}px)`, gap: Math.round(size * 0.32) }}
    >
      {shown.map((p) => (
        <ProjectMark key={p.slug} project={p} size={size} />
      ))}
      {overflow && <MoreBubble n={projects.length - shown.length} size={size} />}
    </div>
  );
}
