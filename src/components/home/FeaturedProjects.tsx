import Link from "next/link";
import { featuredProjects, imageLayoutOf, projectCount, projects, projectsSorted, type Project } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { ProjectCard, CardArrow } from "@/components/ui/ProjectCard";
import { ProjectMarkGrid, ProjectMarkStack, iconsFirst } from "@/components/ui/ProjectMark";

// Bento rhythm on lg: wide + narrow, then narrow + wide, repeating. Stages in a row share one height.
// md (tablets): two equal columns with shorter 4/3 stages, so the entrance stays short.
// Below md: one column.
const SPAN = [7, 5, 5, 7];
const spanClass = (n: number) => (n === 7 ? "lg:col-span-7" : n === 5 ? "lg:col-span-5" : "lg:col-span-12");
const STAGE_HEIGHT = "md:aspect-[4/3] lg:aspect-auto lg:h-[420px]";
const stageFor = (p: Project) =>
  `${p.images.length > 0 && imageLayoutOf(p) === "desktop" ? "aspect-[16/10]" : "aspect-[4/3] sm:aspect-[16/10]"} ${STAGE_HEIGHT}`;

// Which featured project sits in which bento slot (layout only; any other featured project follows).
const SLOT_ORDER = ["pinyut", "damoim", "umc", "poketdesktop", "switchboard"];

function allProjectsCopy() {
  const team = projects.filter((p) => p.kind === "팀").length;
  const since = Math.min(...projects.map((p) => p.year));
  return {
    title: `프로젝트 ${projectCount}개 모두 보기`,
    sub: `${since}년부터 지금까지, 팀 프로젝트 ${team}개와 개인 프로젝트 ${projects.length - team}개`,
  };
}

/** Full-width tile (even number of featured projects): copy left, a row of the other projects right. */
function AllProjectsWide({ rest }: { rest: Project[] }) {
  const { title, sub } = allProjectsCopy();
  return (
    <Link
      href="/projects"
      className="group surface tactile flex flex-col gap-7 rounded-panel p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:px-10"
    >
      <span className="block">
        <span className="block type-card-lg text-ink">{title}</span>
        <span className="mt-2 block type-small text-ink-2">{sub}</span>
      </span>
      <span className="flex items-center justify-between gap-6 sm:justify-end">
        <ProjectMarkStack projects={rest} max={4} size={40} className="sm:hidden" />
        <ProjectMarkStack projects={rest} max={7} size={44} className="hidden sm:flex" />
        <CardArrow />
      </span>
    </Link>
  );
}

/** Card-shaped tile (odd number of featured projects) that completes the last bento row: an app folder. */
function AllProjectsFolder({ rest, stage }: { rest: Project[]; stage: string }) {
  const { title, sub } = allProjectsCopy();
  return (
    <Link href="/projects" className="group surface tactile flex h-full flex-col rounded-panel p-2">
      <span className={`inset-well relative grid place-items-center overflow-hidden rounded-card ${stage}`}>
        <span aria-hidden className="stage-light" />
        <span className="lift-on-hover relative" data-lift="sm">
          <ProjectMarkGrid projects={rest} size={52} className="lg:hidden" />
          <ProjectMarkGrid projects={rest} size={64} className="hidden lg:grid" />
        </span>
      </span>
      <span className="flex flex-1 items-start gap-4 px-4 pb-5 pt-6 sm:px-6 sm:pb-6">
        <span className="min-w-0 flex-1">
          <span className="block type-card-lg text-ink">{title}</span>
          <span className="mt-3 block max-w-[24rem] text-[16px] leading-[1.65] text-ink-2">{sub}</span>
        </span>
        <CardArrow />
      </span>
    </Link>
  );
}

/**
 * Home: the featured projects as a bento (7/5, 5/7, ...), closed by a tile into /projects.
 * Works for any count: with an odd count the tile fills the last row as a folder card,
 * with an even count it runs full width underneath. Tablets get two equal columns.
 */
export function FeaturedProjects() {
  const ordered = [
    ...SLOT_ORDER.map((slug) => featuredProjects.find((p) => p.slug === slug)).filter((p) => p !== undefined),
    ...featuredProjects.filter((p) => !SLOT_ORDER.includes(p.slug)),
  ];
  const rest = iconsFirst(projectsSorted.filter((p) => !p.featured));
  const odd = ordered.length % 2 === 1;
  const lastSpan = SPAN[(ordered.length - 1) % SPAN.length];

  return (
    <Section id="work" title="만든 것" lede={`팀으로 출시한 앱과 혼자 만든 앱 중 ${ordered.length}개를 골랐습니다.`}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {ordered.map((p, idx) => {
          const span = SPAN[idx % SPAN.length];
          return (
            <div key={p.slug} className={`reveal grid ${spanClass(span)}`}>
              <ProjectCard project={p} variant="feature" visual={span === 7 ? "lg" : "md"} stageClass={stageFor(p)} />
            </div>
          );
        })}
        {rest.length > 0 &&
          (odd ? (
            <div className={`reveal grid ${spanClass(12 - lastSpan)}`}>
              <AllProjectsFolder rest={rest} stage={`aspect-[4/3] sm:aspect-[16/10] ${STAGE_HEIGHT}`} />
            </div>
          ) : (
            <div className="reveal md:col-span-2 lg:col-span-12">
              <AllProjectsWide rest={rest} />
            </div>
          ))}
      </div>
    </Section>
  );
}
