/**
 * Layout for /projects, kept pure and data-free so the list (client) and the detail pages
 * (prev/next order, see ./order.ts) agree on one order without shipping site.ts to the browser.
 *
 * Projects are grouped by `year` (newest first). Inside a year, projects with screenshots get a
 * visual tile (stage + text) and projects without get a compact tile. Tiles are packed into a
 * two-column grid (from md) without holes:
 *   pair      two tiles of the same kind side by side
 *   tall      one visual tile spanning two rows next to two stacked compact tiles
 *   tall-end  the same, mirrored (tall tiles alternate sides down the page)
 *   wide      a tile across both columns (a lone visual or compact tile at the end of a year)
 */

export type Slot = "pair" | "tall" | "tall-end" | "stack" | "wide";
export type Arrangeable = { year: number; visual: boolean };
export type Placed<T> = { item: T; slot: Slot };
export type YearGroup<T> = { year: number; items: Placed<T>[] };

/** Grid placement per slot inside a `md:grid-cols-2 md:grid-flow-row-dense` grid. */
export const SLOT_CLASS: Record<Slot, string> = {
  pair: "",
  tall: "md:row-span-2",
  "tall-end": "md:row-span-2 md:col-start-2",
  stack: "",
  wide: "md:col-span-2",
};

function arrangeYear<T extends Arrangeable>(items: T[], mirror: boolean): { placed: Placed<T>[]; usedTall: boolean } {
  const v = items.filter((x) => x.visual);
  const c = items.filter((x) => !x.visual);
  const placed: Placed<T>[] = [];
  const take = (from: T[], slot: Slot) => placed.push({ item: from.shift() as T, slot });

  // An odd visual tile pairs with two compact tiles when there are at least two of them.
  const useTall = v.length % 2 === 1 && c.length >= 2;
  const pairs = useTall ? (v.length - 1) / 2 : Math.floor(v.length / 2);

  for (let i = 0; i < pairs; i++) {
    take(v, "pair");
    take(v, "pair");
  }
  if (useTall) {
    // DOM order follows the reading order: visual first, or compact / visual / compact when mirrored.
    if (mirror) {
      take(c, "stack");
      take(v, "tall-end");
    } else {
      take(v, "tall");
      take(c, "stack");
    }
    take(c, "stack");
  }
  if (v.length) take(v, "wide");
  while (c.length >= 2) {
    take(c, "pair");
    take(c, "pair");
  }
  if (c.length) take(c, "wide");

  return { placed, usedTall: useTall };
}

/** Group a newest-first list by year and pack each year. Tall tiles alternate sides down the page. */
export function arrangeByYear<T extends Arrangeable>(list: T[]): YearGroup<T>[] {
  const years: { year: number; items: T[] }[] = [];
  for (const x of list) {
    const g = years.find((y) => y.year === x.year);
    if (g) g.items.push(x);
    else years.push({ year: x.year, items: [x] });
  }
  years.sort((a, b) => b.year - a.year);

  let talls = 0;
  return years.map(({ year, items }) => {
    const { placed, usedTall } = arrangeYear(items, talls % 2 === 1);
    if (usedTall) talls++;
    return { year, items: placed };
  });
}
