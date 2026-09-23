import type { Project, Study } from "@/lib/content";
import { ChipList } from "@/components/ui/Chip";
import { ItemList, Prose } from "@/components/ui/Prose";
import { Panel, Note } from "@/components/ui/Panel";
import { ProjectCard } from "@/components/ui/ProjectCard";

/** Section heading size for the note body: between type-card and type-card-lg, so list text keeps up. */
const H2 = "type-card text-ink sm:text-[1.5rem] sm:leading-[1.25] sm:tracking-[-0.03em]";

/**
 * "다룬 주제" as a raised panel of chips. Sits in the PageHeader aside (right of the title on lg), or in
 * the body's right column when the note has sections but no related project (see NoteBody).
 */
export function NoteTopics({ item, className = "" }: { item: Study; className?: string }) {
  return (
    <Panel as="section" tone="surface" radius="panel" padding="md" aria-labelledby="topics-title" className={className}>
      <h2 id="topics-title" className="type-card text-ink">
        다룬 주제
      </h2>
      <ChipList items={item.topics} size="md" className="mt-5" />
    </Panel>
  );
}

/**
 * Summary (+ caveat) for a note without sections. It is the whole text of such a note, so it goes into
 * the PageHeader (after the one-line short, before the meta), beside the topics panel, instead of opening an almost empty body.
 */
export function NoteIntro({ item, className = "" }: { item: Study; className?: string }) {
  return (
    <div className={`max-w-[42rem] ${className}`}>
      <Prose paragraphs={item.summary} size="md" />
      {item.caveat && <Note className="mt-6">{item.caveat}</Note>}
    </div>
  );
}

function Related({ project }: { project: Project }) {
  return (
    <section aria-labelledby="related-title">
      <h2 id="related-title" className={H2}>
        관련 프로젝트
      </h2>
      <div className="reveal mt-6 grid">
        <ProjectCard project={project} variant="card" />
      </div>
    </section>
  );
}

/**
 * The reading part of a note with sections: summary, sections (heading + statements), caveat, at a
 * ~65ch measure, lists in one column. 7/4 split on lg: the right column holds the related project,
 * or, when there is none, the topics panel (sticky), so the page never runs with an empty half.
 * Phones get the related project after the text, the topics panel before it. A note without sections only shows the related
 * project here (its text is in the header, see NoteIntro).
 */
export function NoteBody({ item, related }: { item: Study; related?: Project }) {
  const sections = item.sections ?? [];

  if (sections.length === 0) {
    return related ? (
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Related project={related} />
        </div>
      </div>
    ) : null;
  }

  const main = (
    <div className="min-w-0 max-w-[48rem]">
      <Prose paragraphs={item.summary} size="lg" />

      {sections.map((sec, i) => (
        <section key={sec.heading} aria-labelledby={`sec-${i}`} className="mt-14 lg:mt-16">
          <h2 id={`sec-${i}`} className={H2}>
            {sec.heading}
          </h2>
          <ItemList items={sec.items} className="mt-6" />
        </section>
      ))}

      {item.caveat && <Note className="mt-12">{item.caveat}</Note>}
    </div>
  );

  return (
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">{main}</div>
      {/* Topics lead on phones (right under the header, as on other notes); the related project follows the text. */}
      <div className={`lg:col-span-4 lg:col-start-9 ${related ? "" : "order-first lg:order-none"}`}>
        {related ? <Related project={related} /> : <NoteTopics item={item} className="lg:sticky lg:top-28" />}
      </div>
    </div>
  );
}
