import type { StudyGroup } from "./order";

/** Jump links to each area section on /study, with the number of notes in it. */
export function AreaNav({ groups }: { groups: StudyGroup[] }) {
  return (
    <nav aria-label="분야별로 보기">
      <ul className="flex flex-wrap gap-2">
        {groups.map((g) => (
          <li key={g.id}>
            <a href={`#${g.id}`} className="pill pill-ghost pill-sm gap-2">
              {g.area}
              <span className="tnum text-muted">
                {g.items.length}
                <span className="sr-only">개</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
