"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EnvelopeSimple } from "@phosphor-icons/react";

export const NAV_LINKS = [
  { href: "/projects", label: "프로젝트" },
  { href: "/study", label: "공부" },
  { href: "/about", label: "소개" },
] as const;

/**
 * Fixed pill navigation. Brand pill on the left (home), one frosted pill on the right with the
 * routes and the mail CTA. Everything stays visible down to 360px: on phones the brand collapses
 * to its monogram and the CTA to its icon.
 */
export function Nav({ name, email }: { name: string; email: string }) {
  const pathname = usePathname() ?? "/";
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-3 sm:px-6 lg:pt-4">
      <nav aria-label="주요 메뉴" className="mx-auto flex max-w-[1320px] items-center justify-between gap-2">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className="glass flex h-11 items-center gap-2.5 rounded-full p-1.5 font-semibold text-ink sm:pr-4"
        >
          <span aria-hidden className="grid size-8 place-items-center rounded-full bg-pill font-kr text-[13px] font-bold text-pill-ink">
            {Array.from(name)[0]}
          </span>
          <span className="sr-only text-[15px] tracking-tight sm:not-sr-only">{name}</span>
        </Link>

        <div className="glass flex h-11 items-center gap-0.5 rounded-full p-1">
          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex h-9 items-center rounded-full px-3 text-[14px] font-medium transition-[background-color,color,box-shadow] duration-200 sm:px-3.5 lg:px-4 ${
                      active
                        ? "bg-surface text-ink [box-shadow:0_0_0_1px_var(--edge),0_2px_6px_-2px_rgb(var(--sh)/0.2)]"
                        : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a href={`mailto:${email}`} className="pill pill-primary ml-0.5 h-9 w-9 px-0 sm:w-auto sm:px-4 sm:text-[14px]">
            <EnvelopeSimple size={16} weight="bold" aria-hidden />
            <span className="sr-only sm:not-sr-only">메일 보내기</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
