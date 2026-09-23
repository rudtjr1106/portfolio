import type { Metadata } from "next";
import { hasImages, person, projectCount, projects, projectsSorted } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectTile } from "@/components/projects/ProjectTile";
import { ProjectFilterBar, ProjectFilterProvider, ProjectYearList, type BrowserItem } from "@/components/projects/ProjectBrowser";
import { projectsInListOrder } from "@/components/projects/order";

const description = `지금까지 만든 프로젝트 ${projectCount}개`;

export const metadata: Metadata = {
  title: "프로젝트",
  description,
  openGraph: { title: `프로젝트 | ${person.name}`, description, type: "website", locale: "ko_KR" },
};

export default function ProjectsPage() {
  const team = projects.filter((p) => p.kind === "팀").length;
  const since = Math.min(...projects.map((p) => p.year));
  // The first two visual tiles sit above the fold with no filter: preload their front screenshot.
  const eager = new Set(projectsInListOrder.filter(hasImages).slice(0, 2).map((p) => p.slug));
  // Marks of the first tiles under each filter (전체, 팀, 개인) are above the fold: no lazy loading.
  const eagerMarks = new Set(
    [projectsInListOrder, projectsInListOrder.filter((p) => p.kind === "팀"), projectsInListOrder.filter((p) => p.kind === "개인")].flatMap(
      (list) => list.slice(0, 4).map((p) => p.slug),
    ),
  );

  const items: BrowserItem[] = projectsSorted.map((p) => ({
    slug: p.slug,
    year: p.year,
    visual: hasImages(p),
    team: p.kind === "팀",
    node: <ProjectTile project={p} preload={eager.has(p.slug)} eagerMark={eagerMarks.has(p.slug)} />,
  }));

  return (
    <ProjectFilterProvider>
      <PageHeader
        title="프로젝트"
        lede={`Android를 처음 시작한 ${since}년부터 지금까지 만든 프로젝트 ${projectCount}개입니다. 팀으로 출시한 앱부터 혼자 만든 도구까지 모두 담았습니다.`}
      >
        <ProjectFilterBar counts={{ all: projectCount, team, solo: projectCount - team }} />
      </PageHeader>
      <ProjectYearList items={items} />
    </ProjectFilterProvider>
  );
}
