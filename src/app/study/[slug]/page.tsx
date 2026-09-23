import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GithubLogo } from "@phosphor-icons/react/ssr";
import { adjacentStudy, getStudy, person, relatedProject, study, studyHref } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { MetaList } from "@/components/ui/MetaList";
import { LinkButton } from "@/components/ui/Button";
import { PrevNext } from "@/components/ui/PrevNext";
import { NoteBody, NoteIntro, NoteTopics } from "@/components/study/NoteBody";
import { studyOrder } from "@/components/study/order";

// Every study page is generated at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return study.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getStudy(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.short,
    openGraph: { title: `${s.title} | ${person.name}`, description: s.short, type: "article", locale: "ko_KR" },
  };
}

export default async function StudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStudy(slug);
  if (!s) notFound();

  const related = relatedProject(s);
  const { prev, next } = adjacentStudy(s.slug, studyOrder, true);
  const links = s.links ?? [];
  const hasSections = (s.sections?.length ?? 0) > 0;
  // With sections but no related project, the topics move down beside the text (see NoteBody).
  const topicsInBody = hasSections && !related;

  return (
    <>
      <PageHeader
        back={{ href: "/study", label: "공부" }}
        title={s.title}
        lede={s.short}
        aside={topicsInBody ? undefined : <NoteTopics item={s} />}
        // Top-align the two columns so the back link sits at the same height on every note, and
        // start the topics panel level with the title (back link 2.4rem + its 2rem gap).
        className="[&_.grid]:items-start"
        asideClassName="lg:mt-[4.4rem]"
        meta={
          <>
            {/* A note without sections is just its summary: read it here, beside the topics. */}
            {!hasSections && <NoteIntro item={s} className="mb-10" />}
            <MetaList
              columns={3}
              items={[
                { label: "기간", value: <span className="tnum">{s.period}</span> },
                { label: "정리한 곳", value: s.source },
                { label: "분야", value: s.area },
              ]}
            />
          </>
        }
        actions={
          links.length > 0
            ? links.map((l, i) => (
                <LinkButton
                  key={l.href}
                  href={l.href}
                  variant={i === 0 ? "primary" : "ghost"}
                  icon={/github\.com/.test(l.href) ? <GithubLogo size={16} weight="bold" aria-hidden /> : undefined}
                >
                  {l.label}
                </LinkButton>
              ))
            : undefined
        }
      />

      {(hasSections || related) && (
        <section aria-label="노트 내용" className="pb-20 lg:pb-28">
          <Container>
            <NoteBody item={s} related={related} />
          </Container>
        </section>
      )}

      <div className="pb-24 lg:pb-32">
        <Container>
          <PrevNext
            label="다른 공부 기록"
            prevLabel="이전 기록"
            nextLabel="다음 기록"
            prev={prev && { href: studyHref(prev.slug), title: prev.title }}
            next={next && { href: studyHref(next.slug), title: next.title }}
          />
        </Container>
      </div>
    </>
  );
}
