import Image from "next/image";
import Link from "next/link";
import { projectHref, projects, type Project } from "@/lib/content";

type Spot = { slug: string; cls: string; rot: number };

// Hand-placed like objects on a shelf; percentages of a square stage.
const SPOTS: Spot[] = [
  { slug: "pinyut", cls: "left-[34%] top-[26%] w-[27%]", rot: -6 },
  { slug: "umc", cls: "left-[4%] top-[8%] w-[21%]", rot: 7 },
  { slug: "damoim", cls: "left-[68%] top-[6%] w-[22%]", rot: 9 },
  { slug: "hugg", cls: "left-[8%] top-[56%] w-[22%]", rot: -10 },
  { slug: "switchboard", cls: "left-[70%] top-[52%] w-[20%]", rot: 5 },
  { slug: "plub", cls: "left-[40%] top-[73%] w-[16%]", rot: 12 },
  { slug: "poketdesktop", cls: "left-[52%] top-[0%] w-[14%]", rot: -4 },
];

/**
 * The app icons from site.ts scattered on a square stage. With `linked`, each icon is a link to
 * its project (hover lifts it); otherwise the whole shelf is decorative.
 * eager: the shelf is above the fold (the /about header), so its icons skip lazy loading.
 */
export function IconShelf({ linked = false, eager = false, className = "" }: { linked?: boolean; eager?: boolean; className?: string }) {
  const placed = SPOTS.map((s) => ({ ...s, p: projects.find((x) => x.slug === s.slug) })).filter(
    (s): s is Spot & { p: Project & { icon: NonNullable<Project["icon"]> } } => !!s.p?.icon,
  );
  return (
    <div className={`relative mx-auto aspect-square w-full ${className}`} aria-hidden={linked ? undefined : true}>
      {placed.map(({ p, cls, rot }) => {
        const img = (
          <Image
            src={p.icon.src}
            width={p.icon.w}
            height={p.icon.h}
            alt=""
            sizes="(max-width: 768px) 25vw, 140px"
            loading={eager ? "eager" : undefined}
            className="icon-float h-auto w-full"
          />
        );
        return (
          <div key={p.slug} className={`absolute ${cls}`} style={{ rotate: `${rot}deg` }}>
            {linked ? (
              <Link
                href={projectHref(p.slug)}
                aria-label={p.name}
                className="block rounded-[22%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5"
              >
                {img}
              </Link>
            ) : (
              img
            )}
          </div>
        );
      })}
    </div>
  );
}
