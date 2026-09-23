import { featuredStudy, studyCount } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { StudyCard } from "@/components/ui/StudyCard";
import { LinkButton } from "@/components/ui/Button";

/** Home: featured study notes, one large (accent) beside a stack of smaller ones (a pair under it on tablets), then a link into /study. */
export function StudyHighlights() {
  const [lead, ...others] = featuredStudy;
  if (!lead) return null;
  return (
    <Section id="study" title="공부한 것" lede="Notion과 GitHub에 정리한 노트 중 몇 가지입니다.">
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <div className="reveal grid lg:col-span-7">
          <StudyCard item={lead} variant="feature" tone="accent" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-5">
          {others.map((s) => (
            <div key={s.slug} className="reveal grid">
              <StudyCard item={s} variant="card" topics={3} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <LinkButton href="/study" arrow="right">
          공부 기록 {studyCount}개 모두 보기
        </LinkButton>
      </div>
    </Section>
  );
}
