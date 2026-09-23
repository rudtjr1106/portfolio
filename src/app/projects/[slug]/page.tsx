import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  adjacentProject,
  getProject,
  hasImages,
  imageLayoutOf,
  person,
  projectCount,
  projectHref,
  projects,
  studiesForProject,
  studyHref,
  shareImage,
} from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LinkButton, TextLink } from "@/components/ui/Button";
import { ChipList } from "@/components/ui/Chip";
import { ItemList, Prose } from "@/components/ui/Prose";
import { Note, Panel } from "@/components/ui/Panel";
import { ProjectMark } from "@/components/ui/ProjectMark";
import { ScreenshotGallery } from "@/components/ui/ScreenshotGallery";
import { StudyCard } from "@/components/ui/StudyCard";
import { PrevNext } from "@/components/ui/PrevNext";
import { ProjectFacts } from "@/components/projects/ProjectFacts";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { projectsInListOrder } from "@/components/projects/order";

// Every project page is generated at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.tagline,
    openGraph: {
      title: `${p.name} | ${person.name}`,
      description: p.tagline,
      locale: "ko_KR",
      type: "article",
      images: [shareImage],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const layout = imageLayoutOf(p);
  const related = studiesForProject(p.slug);
  // Wraps around like the study notes, so every project page has both neighbours.
  const { prev, next } = adjacentProject(p.slug, projectsInListOrder, true);
  const rail = layout === "phone" && p.images.length > 5;
  const galleryLabel = `${p.name} 화면`;

  // Links as buttons (first one primary). With no links, a related study note is the next place to go.
  const actions =
    p.links.length > 0 ? (
      p.links.map((l, i) => (
        <LinkButton key={l.href} href={l.href} variant={i === 0 ? "primary" : "ghost"}>
          {l.label}
        </LinkButton>
      ))
    ) : related[0] ? (
      <LinkButton href={studyHref(related[0].slug)} variant="primary" arrow="right">
        공부 기록 보기
      </LinkButton>
    ) : undefined;

  // A note that explains missing links belongs next to the buttons; any other note closes the page.
  const noteInHeader = p.note && p.links.length === 0;

  return (
    <>
      <PageHeader
        back={{ href: "/projects", label: "프로젝트" }}
        // The real app icon only: an initial tile above a title that starts with the same letter adds nothing.
        lead={p.icon ? <ProjectMark project={p} size={72} float preload /> : undefined}
        title={p.name}
        titleNote={p.nameNote}
        lede={p.tagline}
        actions={actions}
        aside={<ProjectFacts project={p} />}
      >
        {noteInHeader ? <Note>{p.note}</Note> : null}
      </PageHeader>

      {hasImages(p) && (
        // The count helps only on a rail, where some screens start out of view.
        <Section id="screens" title="화면" count={rail ? p.images.length : undefined} headingSize="md" spacing="tight" bodyClassName="mt-8 lg:mt-10">
          {rail ? (
            <ScreenshotGallery images={p.images} layout="phone" label={galleryLabel} variant="rail" />
          ) : (
            <ProjectGallery images={p.images} layout={layout} label={galleryLabel} />
          )}
          {p.imageNote && <Note className="mt-6">{p.imageNote}</Note>}
        </Section>
      )}

      <Container className="pb-16 lg:pb-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <section aria-labelledby="summary-title" className="lg:col-span-6">
            <SectionHeading id="summary-title" title="개요" size="md" />
            <Prose paragraphs={p.summary} size="lg" className="mt-5" />
          </section>
          <section aria-labelledby="features-title" className="lg:col-span-5 lg:col-start-8">
            <SectionHeading id="features-title" title="주요 기능" size="md" />
            <ItemList items={p.features} className="mt-6" />
          </section>
        </div>
      </Container>

      <Container className="pb-16 lg:pb-24">
        <Panel tone="surface" padding="lg">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <section aria-labelledby="work-title" className="lg:col-span-7">
              <SectionHeading id="work-title" title="맡은 일" size="md" />
              <ItemList items={p.myWork} className="mt-6" />
            </section>
            <section aria-labelledby="stack-title" className="lg:col-span-4 lg:col-start-9">
              <SectionHeading id="stack-title" title="사용 기술" size="md" />
              <ChipList items={p.stack} label="사용 기술" size="md" className="mt-6" />
            </section>
          </div>
          {p.highlights && p.highlights.length > 0 && (
            <section
              aria-labelledby="highlights-title"
              className="mt-10 rounded-card p-6 [box-shadow:inset_0_1px_2px_rgb(var(--sh)/0.06),inset_0_0_0_1px_var(--edge)] sm:p-8 lg:mt-12"
              style={{ background: "linear-gradient(150deg, var(--accent-wash), transparent 60%), var(--bg)" }}
            >
              <SectionHeading id="highlights-title" title="기술 포인트" size="sm" />
              <ItemList items={p.highlights} columns={2} className="mt-5" />
            </section>
          )}
        </Panel>
      </Container>

      {related.length > 0 && (
        <Section id="related" title="관련 공부" count={related.length > 1 ? related.length : undefined} headingSize="md" spacing="tight" bodyClassName="mt-6 lg:mt-8">
          <Panel tone="well" padding="sm" radius="card">
            <div className="grid gap-1">
              {related.map((s) => (
                <StudyCard key={s.slug} item={s} variant="row" />
              ))}
            </div>
          </Panel>
        </Section>
      )}

      <Container className="pb-24 lg:pb-32">
        {p.note && !noteInHeader && <Note className="mb-10">{p.note}</Note>}
        <PrevNext
          label="다른 프로젝트"
          prevLabel="이전 프로젝트"
          nextLabel="다음 프로젝트"
          prev={prev && { href: projectHref(prev.slug), title: prev.name, mark: <ProjectMark project={prev} size={44} /> }}
          next={next && { href: projectHref(next.slug), title: next.name, mark: <ProjectMark project={next} size={44} /> }}
        />
        <div className="mt-10 flex justify-center">
          <TextLink href="/projects">프로젝트 {projectCount}개 모두 보기</TextLink>
        </div>
      </Container>
    </>
  );
}
