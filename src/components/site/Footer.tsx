import { person } from "@/lib/content";
import { Container } from "@/components/ui/Container";

/** Quiet last line of every page: who, and the three ways to reach him. */
export function Footer() {
  const links = [
    { href: `mailto:${person.email}`, label: person.email, web: false },
    { href: person.github, label: "GitHub", web: true },
    { href: person.velog, label: "velog", web: true },
  ];
  return (
    <footer className="pb-10 pt-8">
      <Container className="flex flex-col gap-4 text-[13.5px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {person.name} ({person.nameEn}), {person.role}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full font-medium text-ink-2 transition-colors hover:text-ink"
                {...(l.web ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {l.label}
                {l.web && <span className="sr-only"> (새 창)</span>}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
