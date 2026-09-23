import type { Metadata } from "next";
import { person, shareImage, studyCount } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/Section";
import { AreaNav } from "@/components/study/AreaNav";
import { StudyEntry } from "@/components/study/StudyEntry";
import { studyGroups } from "@/components/study/order";

const description = `Notion과 GitHub에 정리한 공부 기록 ${studyCount}개`;

export const metadata: Metadata = {
  title: "공부",
  description,
  openGraph: { title: `공부 | ${person.name}`, description, type: "website", locale: "ko_KR", images: [shareImage] },
};

export default function StudyPage() {
  return (
    <>
      <PageHeader
        title="공부"
        lede={`Notion과 GitHub에 정리한 공부 기록 ${studyCount}개를 분야별로 모았습니다.`}
      >
        <AreaNav groups={studyGroups} />
      </PageHeader>

      {studyGroups.map((g, gi) => (
        <section
          key={g.id}
          id={g.id}
          aria-labelledby={`${g.id}-title`}
          className={gi === studyGroups.length - 1 ? "pb-24 lg:pb-32" : "pb-16 lg:pb-24"}
        >
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <SectionHeading id={`${g.id}-title`} title={g.area} count={g.items.length} size="lg" />
                </div>
              </div>
              <ul className="grid gap-4 lg:col-span-8 lg:gap-5">
                {g.items.map((s) => (
                  <li key={s.slug} className="reveal grid">
                    <StudyEntry item={s} />
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
