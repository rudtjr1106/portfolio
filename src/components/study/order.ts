/**
 * Display order for /study and prev/next on /study/[slug].
 * Areas keep the shared STUDY_AREAS order. Inside an area, notes are ordered by latest activity:
 * ongoing notes ("진행 중", "현재") first, then by the last month in `period`, newest first.
 * Only sorts what site.ts says; adds nothing.
 */
import { STUDY_AREAS, startKey, study, type Study, type StudyArea } from "@/lib/content";

/** ASCII anchor ids for the area sections ("#android"). */
export const AREA_ID: Record<StudyArea, string> = {
  Android: "android",
  Kotlin: "kotlin",
  "인프라·연구": "infra",
  "협업·교육": "collab",
};

const ONGOING = /진행 중|현재|운영 중/;

/** Sort key for the end of a period: ongoing notes rank above everything else. */
function endKey(period: string): number {
  if (ONGOING.test(period)) return 999999;
  const all = [...period.matchAll(/(\d{4})(?:\.(\d{1,2}))?/g)];
  const last = all[all.length - 1];
  if (!last) return 0;
  return Number(last[1]) * 100 + (last[2] ? Number(last[2]) : 0);
}

function byLatest(list: Study[]): Study[] {
  return list
    .map((s, i) => ({ s, i, end: endKey(s.period), start: startKey(s.period) }))
    .sort((a, b) => b.end - a.end || b.start - a.start || a.i - b.i)
    .map((x) => x.s);
}

export type StudyGroup = { area: StudyArea; id: string; items: Study[] };

export const studyGroups: StudyGroup[] = STUDY_AREAS.map((area) => ({
  area,
  id: AREA_ID[area],
  items: byLatest(study.filter((s) => s.area === area)),
})).filter((g) => g.items.length > 0);

/** Flattened studyGroups: the order the index shows, used for prev/next. */
export const studyOrder: Study[] = studyGroups.flatMap((g) => g.items);
