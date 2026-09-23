import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Section";
import { NowList } from "@/components/ui/NowList";

/** "지금 하는 것": heading on the left, person.now rows on the right (stacked on phones). Home and /about. */
export function NowSection({ id = "now" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="pb-24 lg:pb-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 lg:pt-4">
            <SectionHeading id={`${id}-title`} title="지금 하는 것" />
          </div>
          <div className="reveal lg:col-span-8">
            <NowList />
          </div>
        </div>
      </Container>
    </section>
  );
}
