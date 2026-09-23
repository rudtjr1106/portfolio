import type { Metadata } from "next";
import { person } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { IconShelf } from "@/components/ui/IconShelf";
import { ContactPanel } from "@/components/ui/ContactPanel";
import { NowSection } from "@/components/site/NowSection";
import { Record } from "@/components/about/Record";

export const metadata: Metadata = {
  title: "소개",
  description: person.about[0],
  openGraph: { title: `소개 | ${person.name}`, description: person.about[0], type: "profile", locale: "ko_KR" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={person.name}
        titleNote={`${person.nameEn}, ${person.role}`}
        lede={
          <div className="space-y-4">
            {person.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        }
        aside={<IconShelf linked eager className="max-w-[320px] sm:max-w-[400px] lg:max-w-[440px]" />}
      />
      <NowSection />
      <Record />
      <ContactPanel />
    </>
  );
}
