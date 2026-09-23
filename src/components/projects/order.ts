import { hasImages, projectsSorted, type Project } from "@/lib/content";
import { arrangeByYear } from "./arrange";

/** Every project in the order /projects shows it with the "전체" filter. Prev/next on detail pages follow this. */
export const projectsInListOrder: Project[] = arrangeByYear(projectsSorted.map((p) => ({ year: p.year, visual: hasImages(p), p }))).flatMap(
  (g) => g.items.map((x) => x.item.p),
);
