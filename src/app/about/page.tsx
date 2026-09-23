import type { Metadata } from "next";
import Image from "next/image";
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
        lead={
          <Image
            src={person.avatar.src}
            width={person.avatar.w}
            height={person.avatar.h}
            alt={person.avatar.alt}
            preload
            sizes="80px"
            className="size-16 rounded-full object-cover [box-shadow:inset_0_1px_0_var(--hi),0_0_0_1px_var(--edge),0_10px_24px_-12px_rgb(var(--sh)/0.35)] sm:size-20"
          />
        }
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
