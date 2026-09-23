import { record } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { ChipList } from "@/components/ui/Chip";

type Entry = { when: string; what: string; detail?: string };

function Timeline({ id, title, items }: { id: string; title: string; items: Entry[] }) {
  return (
    <>
      <h3 id={id} className="type-card text-ink">
        {title}
      </h3>
      <ol aria-labelledby={id} className="mt-7 space-y-7">
        {items.map((it) => (
          <li key={it.what}>
            <p className="tnum type-label text-muted">{it.when}</p>
            <p className="mt-1.5 font-kr text-[17px] font-semibold leading-snug tracking-[-0.015em] text-ink">{it.what}</p>
            {it.detail && <p className="mt-1.5 max-w-[36rem] text-[15px] leading-[1.7] text-ink-2">{it.detail}</p>}
          </li>
        ))}
      </ol>
    </>
  );
}

/**
 * /about: two rows of panels, 5/7 then 7/5.
 * Education and activities first, then skills beside the awards (the one accent panel).
 */
export function Record() {
  return (
    <Section id="record" title="이력">
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <Panel className="reveal lg:col-span-5">
          <Timeline id="record-education" title="학력과 연구" items={record.education} />
        </Panel>
        <Panel className="reveal lg:col-span-7">
          <Timeline id="record-activities" title="활동" items={record.activities} />
        </Panel>

        <Panel className="reveal lg:col-span-7">
          <h3 id="record-skills" className="type-card text-ink">
            기술
          </h3>
          <dl className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {record.skills.map((g) => (
              <div key={g.group}>
                <dt className="text-[13.5px] font-semibold text-ink">{g.group}</dt>
                <dd className="mt-3">
                  <ChipList items={g.items} label={`${g.group} 기술`} />
                </dd>
              </div>
            ))}
          </dl>
        </Panel>
        <Panel tone="accent" className="reveal lg:col-span-5">
          <h3 id="record-awards" className="type-card text-ink">
            수상
          </h3>
          <ul aria-labelledby="record-awards" className="mt-7 space-y-6">
            {record.awards.map((a) => (
              <li key={a.what}>
                <p className="tnum type-label text-muted">{a.when}</p>
                <p className="mt-1 font-kr text-[clamp(1.25rem,0.8vw+1.05rem,1.6rem)] font-bold leading-[1.3] tracking-[-0.03em] text-ink">{a.what}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Section>
  );
}
