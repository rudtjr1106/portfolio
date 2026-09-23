import { EnvelopeSimple, GithubLogo } from "@phosphor-icons/react/ssr";
import { person } from "@/lib/content";
import { Container } from "./Container";
import { LinkButton } from "./Button";
import { CopyEmail } from "./CopyEmail";
import { IconShelf } from "./IconShelf";

/**
 * The closing block of a page: big title, the email written out, mail / copy / GitHub / velog.
 * With `shelf` the app icons sit on the right as a visual (only where no other icon cluster is on the
 * page). Without it (default), the panel splits in two on lg: title and lede left, the address and
 * the buttons right, so the wide panel has no empty half. Renders its own <section id="contact">.
 */
export function ContactPanel({
  title = "편하게 연락 주세요",
  lede = "메일이나 GitHub으로 연락할 수 있습니다.",
  shelf = false,
  id = "contact",
  className = "pb-10",
}: {
  title?: string;
  lede?: string;
  shelf?: boolean;
  id?: string;
  className?: string;
}) {
  const heading = (
    <>
      <h2 id={`${id}-title`} className="type-section text-ink">
        {title}
      </h2>
      <p className="mt-4 max-w-[30rem] type-lede text-ink-2">{lede}</p>
    </>
  );
  const reach = (
    <>
      <p className="tnum select-all break-all font-sans text-[clamp(1.35rem,3.2vw,2.3rem)] font-semibold tracking-[-0.035em] text-ink">
        {person.email}
      </p>
      <div className="mt-8 flex flex-wrap gap-2.5">
        <LinkButton href={`mailto:${person.email}`} variant="primary" icon={<EnvelopeSimple size={18} weight="bold" aria-hidden />}>
          메일 보내기
        </LinkButton>
        <CopyEmail email={person.email} />
        <LinkButton href={person.github} icon={<GithubLogo size={18} weight="bold" aria-hidden />}>
          GitHub
        </LinkButton>
        <LinkButton href={person.velog}>velog</LinkButton>
      </div>
    </>
  );

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={className}>
      <Container>
        <div className="surface-lift reveal overflow-hidden rounded-panel p-6 sm:p-10 lg:p-16">
          {shelf ? (
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                {heading}
                <div className="mt-10">{reach}</div>
              </div>
              <div className="lg:col-span-5">
                <IconShelf className="max-w-[300px] sm:max-w-[400px]" />
              </div>
            </div>
          ) : (
            // The right column is as wide as the button row, so the four buttons never wrap on desktop.
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
              <div>{heading}</div>
              <div>{reach}</div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
