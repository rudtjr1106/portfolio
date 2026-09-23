import { kindLabel, type Project } from "@/lib/content";
import { MetaList, type MetaItem } from "@/components/ui/MetaList";

/**
 * The project's facts from site.ts as one raised panel beside the detail page title:
 * period, kind, platform, team (team projects only), status and role.
 */
export function ProjectFacts({ project: p }: { project: Project }) {
  const kind = kindLabel(p.kind);
  const items: MetaItem[] = [
    { label: "기간", value: <span className="tnum">{p.period}</span> },
    { label: "구분", value: kind },
    { label: "플랫폼", value: p.platform, wide: !p.team },
    { label: "팀", value: p.team },
    // Some personal projects use the kind itself as status; showing it twice adds nothing.
    { label: "상태", value: p.status === kind ? undefined : p.status, wide: true },
    { label: "역할", value: p.role, wide: true },
  ];
  return (
    <div className="surface rounded-panel p-6 sm:p-8">
      <MetaList items={items} columns={2} />
    </div>
  );
}
