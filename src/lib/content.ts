/**
 * Read-only helpers over src/content/site.ts (the only content source).
 * Nothing here adds facts: it only sorts, groups, looks up and links what site.ts already says.
 */
import { person, projects, record, study, type Img, type Link, type Project, type Study } from "@/content/site";

export { person, projects, record, study };
export type { Img, Link, Project, Study };

export type StudyArea = Study["area"];

/* ---------- URLs ---------- */

export const projectHref = (slug: string) => `/projects/${slug}`;
export const studyHref = (slug: string) => `/study/${slug}`;

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/* ---------- Dates ---------- */

/** "2025.08 - 운영 중" -> 202508, "2024" -> 202400. Used only for sorting. */
export function startKey(period: string, fallbackYear = 0): number {
  const m = period.match(/(\d{4})(?:\.(\d{1,2}))?/);
  if (!m) return fallbackYear * 100;
  return Number(m[1]) * 100 + (m[2] ? Number(m[2]) : 0);
}

function newestFirst<T>(list: T[], key: (t: T) => number): T[] {
  return list
    .map((t, i) => ({ t, i, k: key(t) }))
    .sort((a, b) => b.k - a.k || a.i - b.i)
    .map((x) => x.t);
}

/* ---------- Projects ---------- */

export const projectCount = projects.length;

/** Newest first by start month; ties keep site.ts order. */
export const projectsSorted: Project[] = newestFirst(projects, (p) => startKey(p.period, p.year));

/** Projects flagged featured: true, in site.ts order. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Projects with at least one screenshot. */
export const hasImages = (p: Project) => p.images.length > 0;

/** "phone" unless the project says "desktop". */
export const imageLayoutOf = (p: Project): "phone" | "desktop" => p.imageLayout ?? "phone";

/* ---------- Study ---------- */

export const studyCount = study.length;

/** Display order of study areas. */
export const STUDY_AREAS: StudyArea[] = ["Android", "Kotlin", "인프라·연구", "협업·교육"];

/** Study flagged featured: true, in site.ts order. */
export const featuredStudy: Study[] = study.filter((s) => s.featured);

export function getStudy(slug: string): Study | undefined {
  return study.find((s) => s.slug === slug);
}

/** The project a study note points to (study.related), if any. */
export function relatedProject(s: Study): Project | undefined {
  return s.related ? getProject(s.related) : undefined;
}

/** Study notes whose `related` is this project. */
export function studiesForProject(slug: string): Study[] {
  return study.filter((s) => s.related === slug);
}

/* ---------- Prev / next ---------- */

export type Adjacent<T> = { prev?: T; next?: T };

/**
 * Neighbours of `slug` inside `list` (the order the index page shows). With wrap: true the first
 * item's prev is the last item (and vice versa) so both links always exist.
 */
export function adjacent<T extends { slug: string }>(list: T[], slug: string, wrap = false): Adjacent<T> {
  const i = list.findIndex((x) => x.slug === slug);
  if (i < 0) return {};
  const n = list.length;
  if (wrap && n > 1) return { prev: list[(i - 1 + n) % n], next: list[(i + 1) % n] };
  return { prev: i > 0 ? list[i - 1] : undefined, next: i < n - 1 ? list[i + 1] : undefined };
}

export const adjacentProject = (slug: string, list: Project[], wrap = false) => adjacent(list, slug, wrap);
export const adjacentStudy = (slug: string, list: Study[], wrap = false) => adjacent(list, slug, wrap);

/* ---------- Now ---------- */

export type NowItem = {
  what: string;
  detail: string;
  href?: string;
  project?: Project;
  study?: Study;
};

/**
 * person.now with a link when site.ts itself connects the item: a project with the same name,
 * or a study note whose source names the same place.
 */
export const nowItems: NowItem[] = person.now.map((n) => {
  const p = projects.find((x) => x.name === n.what);
  if (p) return { ...n, href: projectHref(p.slug), project: p };
  const s = study.find((x) => x.source.includes(n.what));
  if (s) return { ...n, href: studyHref(s.slug), study: s };
  return { ...n };
});
