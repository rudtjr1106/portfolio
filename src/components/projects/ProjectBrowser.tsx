"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { FilterPills, type FilterOption } from "@/components/ui/FilterPills";
import { Container } from "@/components/ui/Container";
import { arrangeByYear, SLOT_CLASS } from "./arrange";

/*
  /projects browsing: a 팀/개인 filter in the page header and the year-grouped tiles below it share
  one piece of state through this provider. Tiles are rendered on the server and passed in as
  nodes, so the browser only receives slugs, years and the rendered markup, not site.ts.

  The filter lives in the URL (?kind=team | ?kind=solo), so a filtered view can be linked and
  survives going back from a detail page. It is read with useSyncExternalStore: the prerendered
  HTML (and hydration) always shows 전체, then the client switches to the URL's filter. No
  useSearchParams, so the page stays fully static without a Suspense fallback.
*/

export type Kind = "all" | "team" | "solo";

const KIND_LABEL: Record<Kind, string> = { all: "전체", team: "팀 프로젝트", solo: "개인 프로젝트" };

const PARAM = "kind";
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("popstate", onChange);
  };
}

function kindFromUrl(): Kind {
  const v = new URLSearchParams(window.location.search).get(PARAM);
  return v === "team" || v === "solo" ? v : "all";
}

const serverKind = (): Kind => "all";

/** Replace (not push) the URL, so the back button still leaves the page in one step. */
function writeKind(kind: Kind) {
  const url = new URL(window.location.href);
  if (kind === "all") url.searchParams.delete(PARAM);
  else url.searchParams.set(PARAM, kind);
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  listeners.forEach((l) => l());
}

type FilterState = { kind: Kind; changes: number; setKind: (k: Kind) => void };

const FilterContext = createContext<FilterState | null>(null);

function useFilter(): FilterState {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("ProjectFilterProvider is missing");
  return ctx;
}

export function ProjectFilterProvider({ children }: { children: ReactNode }) {
  const kind = useSyncExternalStore(subscribe, kindFromUrl, serverKind);
  // Counts user changes only: a filter restored from the URL does not replay the entrance.
  const [changes, setChanges] = useState(0);
  const setKind = useCallback(
    (next: Kind) => {
      if (next === kind) return;
      writeKind(next);
      setChanges((c) => c + 1);
    },
    [kind],
  );
  const value = useMemo<FilterState>(() => ({ kind, changes, setKind }), [kind, changes, setKind]);
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function ProjectFilterBar({ counts }: { counts: Record<Kind, number> }) {
  const { kind, setKind } = useFilter();
  const options: FilterOption<Kind>[] = (["all", "team", "solo"] as const).map((k) => ({ value: k, label: KIND_LABEL[k], count: counts[k] }));
  return <FilterPills label="프로젝트 구분" options={options} value={kind} onChange={setKind} />;
}

export type BrowserItem = {
  slug: string;
  year: number;
  /** has screenshots: gets a visual tile */
  visual: boolean;
  team: boolean;
  node: ReactNode;
};

/**
 * Year groups: the year sits in a sticky left column on lg (above the tiles below lg), tiles pack
 * into two columns from md (see ./arrange). After the first filter change, tiles rise in again so
 * the change is visible; the first paint relies on the page entrance and scroll reveal only.
 */
export function ProjectYearList({ items }: { items: BrowserItem[] }) {
  const { kind, changes } = useFilter();
  const shown = kind === "all" ? items : items.filter((x) => (kind === "team") === x.team);
  const groups = arrangeByYear(shown);

  const offsets: number[] = [];
  for (let i = 0, n = 0; i < groups.length; i++) {
    offsets.push(n);
    n += groups[i].items.length;
  }

  return (
    <>
      <p className="sr-only" aria-live="polite">
        {changes > 0 ? `${KIND_LABEL[kind]} ${shown.length}개` : ""}
      </p>
      <div key={kind}>
        {groups.map((g, gi) => (
          <section key={g.year} aria-labelledby={`y${g.year}`} className="pb-16 lg:pb-24">
            <Container>
              <div className="grid gap-5 lg:grid-cols-12 lg:gap-5">
                <div className="lg:col-span-2">
                  <h2 id={`y${g.year}`} className="flex items-baseline gap-3 lg:sticky lg:top-28 lg:flex-col lg:gap-2">
                    <span className="tnum font-sans text-[clamp(1.9rem,1.5vw+1.35rem,3rem)] font-semibold leading-none tracking-[-0.045em] text-ink">
                      {g.year}
                      <span className="sr-only">년</span>
                    </span>
                    <span className="tnum type-label text-muted">프로젝트 {g.items.length}개</span>
                  </h2>
                </div>
                <ul role="list" className="grid gap-4 md:grid-flow-row-dense md:grid-cols-2 lg:col-span-10 lg:gap-5">
                  {g.items.map(({ item, slot }, i) => (
                    <li key={item.slug} className={`reveal ${SLOT_CLASS[slot]}`}>
                      <div
                        className={changes > 0 ? "rise h-full" : "h-full"}
                        style={{ "--i": Math.min(offsets[gi] + i, 6) } as CSSProperties}
                      >
                        {item.node}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </section>
        ))}
      </div>
    </>
  );
}
