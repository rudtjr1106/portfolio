import type { CSSProperties } from "react";
import { AndroidLogo, EnvelopeSimple, GithubLogo } from "@phosphor-icons/react/ssr";
import { getProject, person } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { HeroDevices } from "./HeroDevices";

const i = (n: number) => ({ ["--i" as string]: n }) as CSSProperties;

/** "앱을 만들고, 출시하고, 운영합니다." -> ["앱을 만들고,", "출시하고, 운영합니다."] */
function splitHeadline(h: string): [string, string] {
  const at = h.indexOf(", ");
  return at < 0 ? ["", h] : [h.slice(0, at + 1), h.slice(at + 2)];
}

export function HomeHero() {
  const pinyut = getProject("pinyut")!;
  const damoim = getProject("damoim")!;
  const hugg = getProject("hugg")!;
  const umc = getProject("umc")!;
  const [first, second] = splitHeadline(person.headline);

  return (
    <section aria-labelledby="hero-title" className="relative">
      <Container className="grid grid-cols-1 items-center gap-12 pb-20 pt-28 md:gap-8 lg:min-h-[100dvh] lg:grid-cols-12 lg:pb-12 lg:pt-24">
        <div className="lg:col-span-6">
          <p
            className="rise inline-flex items-center gap-2.5 rounded-full bg-surface py-1.5 pl-1.5 pr-4 text-[14px] font-medium text-ink-2 [box-shadow:inset_0_1px_0_var(--hi),0_0_0_1px_var(--edge),0_6px_16px_-8px_rgb(var(--sh)/0.25)]"
            style={i(0)}
          >
            <span aria-hidden className="grid size-7 place-items-center rounded-full bg-pill text-pill-ink">
              <AndroidLogo size={15} weight="bold" />
            </span>
            {person.role} {person.name}
          </p>

          <h1 id="hero-title" className="rise mt-7 type-display text-ink" style={i(1)}>
            {first && <span className="block text-muted">{first}</span>}
            <span className="block">{second}</span>
          </h1>

          <p className="rise mt-6 max-w-[32rem] type-lede text-ink-2" style={i(2)}>
            {person.lede}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={i(3)}>
            <LinkButton href={`mailto:${person.email}`} variant="primary" icon={<EnvelopeSimple size={18} weight="bold" aria-hidden />}>
              메일 보내기
            </LinkButton>
            <LinkButton href={person.github} icon={<GithubLogo size={18} weight="bold" aria-hidden />} arrow={false}>
              GitHub
            </LinkButton>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="mx-auto w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[min(100%,calc((100dvh-150px)/1.02))]">
            <HeroDevices
              pinyut={pinyut.images[0]}
              damoim={damoim.images[0]}
              hugg={hugg.images[0]}
              umcIcon={umc.icon!}
              pinyutIcon={pinyut.icon!}
              label={`${pinyut.name}, ${damoim.name}, ${hugg.name} 앱의 실제 화면`}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
