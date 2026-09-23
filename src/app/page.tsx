import { HomeHero } from "@/components/home/HomeHero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { StudyHighlights } from "@/components/home/StudyHighlights";
import { NowSection } from "@/components/site/NowSection";
import { ContactPanel } from "@/components/ui/ContactPanel";

/** The entrance: who he is, the featured projects, a few study notes, what he is doing now, how to reach him. */
export default function Home() {
  return (
    <>
      <HomeHero />
      <FeaturedProjects />
      <StudyHighlights />
      <NowSection />
      <ContactPanel />
    </>
  );
}
