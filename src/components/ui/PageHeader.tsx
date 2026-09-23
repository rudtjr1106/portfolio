import type { CSSProperties, ReactNode } from "react";
import { Container } from "./Container";
import { BackLink } from "./Button";

const i = (n: number) => ({ ["--i" as string]: n }) as CSSProperties;

/**
 * Top of every inner page (everything except "/").
 *
 * Order, top to bottom: back link, `lead` (e.g. a ProjectMark), h1 title (+ titleNote),
 * lede, `meta` (e.g. MetaList or ChipList), `actions` (LinkButtons), `children`.
 * With `aside` the header becomes a 7/5 split on lg (text left, visual right); on phones the aside
 * follows the text. Clears the fixed nav with pt-28 / sm:pt-32. Entrance uses the .rise stagger.
 */
export function PageHeader({
  title,
  titleNote,
  lede,
  back,
  lead,
  meta,
  actions,
  aside,
  children,
  id = "page-title",
  asideClassName = "",
  className = "",
}: {
  title: ReactNode;
  /** Small muted text beside the title (e.g. nameNote "구 핀업"). */
  titleNote?: ReactNode;
  lede?: ReactNode;
  back?: { href: string; label: string };
  /** Element above the title, e.g. <ProjectMark size={72} float />. */
  lead?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  /** id of the h1. */
  id?: string;
  asideClassName?: string;
  className?: string;
}) {
  const text = (
    <div className={aside ? "lg:col-span-7" : "max-w-[48rem]"}>
      {back && (
        <div className="rise mb-8" style={i(0)}>
          <BackLink href={back.href} label={back.label} />
        </div>
      )}
      {lead && (
        <div className="rise mb-6" style={i(1)}>
          {lead}
        </div>
      )}
      <div className="rise" style={i(1)}>
        <h1 id={id} className="type-title text-ink">
          {title}
        </h1>
        {titleNote && <p className="mt-2 text-[15px] font-medium text-muted">{titleNote}</p>}
      </div>
      {lede && (
        <div className="rise mt-5 max-w-[40rem] type-lede text-ink-2" style={i(2)}>
          {lede}
        </div>
      )}
      {meta && (
        <div className="rise mt-8" style={i(3)}>
          {meta}
        </div>
      )}
      {actions && (
        <div className="rise mt-8 flex flex-wrap gap-2.5" style={i(4)}>
          {actions}
        </div>
      )}
      {children && (
        <div className="rise mt-8" style={i(5)}>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <header className={`pb-14 pt-28 sm:pt-32 lg:pb-20 ${className}`}>
      <Container>
        {aside ? (
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {text}
            <div className={`rise lg:col-span-5 ${asideClassName}`} style={i(3)}>
              {aside}
            </div>
          </div>
        ) : (
          text
        )}
      </Container>
    </header>
  );
}
