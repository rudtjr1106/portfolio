import type { CSSProperties, ReactNode } from "react";
import { imageLayoutOf, type Project } from "@/lib/content";
import { PhoneFrame } from "./PhoneFrame";
import { WindowFrame } from "./WindowFrame";
import { ProjectMark } from "./ProjectMark";

type Size = "lg" | "md" | "sm";

type Placed = { left?: string; right?: string; top: string; width: string; rotate: number; z: number; front?: boolean };

const ASPECT: Record<Size, string> = {
  lg: "aspect-[16/10]",
  md: "aspect-[4/3]",
  sm: "aspect-[4/3]",
};

// Phones rise out of the bottom edge of the stage; the front one is taller and centered.
const PHONES: Record<number, Placed[]> = {
  3: [
    { left: "7%", top: "21%", width: "25%", rotate: -5, z: 1 },
    { left: "36.5%", top: "8%", width: "27%", rotate: 0, z: 2, front: true },
    { right: "7%", top: "21%", width: "25%", rotate: 5, z: 1 },
  ],
  2: [
    { left: "13%", top: "10%", width: "39%", rotate: -3, z: 2, front: true },
    { left: "50%", top: "18%", width: "36%", rotate: 6, z: 1 },
  ],
  1: [{ left: "31%", top: "10%", width: "38%", rotate: 0, z: 1, front: true }],
};

// Two layered windows: the first image in front, the second behind and to the right.
const WINDOWS: Record<number, Placed[]> = {
  2: [
    { left: "5%", top: "26%", width: "62%", rotate: 0, z: 2, front: true },
    { right: "5%", top: "8%", width: "56%", rotate: 2, z: 1 },
  ],
  1: [{ left: "10%", top: "14%", width: "80%", rotate: 0, z: 1, front: true }],
};

const MARK_SIZE: Record<Size, number> = { lg: 128, md: 112, sm: 84 };

function Slot({ p, children }: { p: Placed; children: ReactNode }) {
  const style: CSSProperties = { left: p.left, right: p.right, top: p.top, width: p.width, zIndex: p.z, rotate: `${p.rotate}deg` };
  return (
    <div className="absolute" style={style}>
      <div className="lift-on-hover" data-lift={p.front ? undefined : "sm"}>
        {children}
      </div>
    </div>
  );
}

/**
 * A project's picture on a sunk stage (inset well with soft top light), composed from real data:
 *  - phone screenshots: 3 (lg) or 2 (md, sm) phones rising from the bottom edge
 *  - desktop screenshots: two layered windows
 *  - no screenshots: the app icon (or the initial tile) floating over a ground shadow
 * Devices lift slightly when an ancestor with class "group" is hovered.
 * Default aspect: 16/10 for desktop screenshots and for size lg, otherwise 4/3. Override with `aspectClass`.
 * Decorative: images get alt="" because the card around it names the project.
 */
export function ProjectVisual({
  project,
  size = "md",
  preload = false,
  radius = "rounded-card",
  aspectClass,
  className = "",
}: {
  project: Project;
  size?: Size;
  preload?: boolean;
  /** Tailwind radius class, e.g. "rounded-card" (inside a panel) or "rounded-inner" (inside a card). */
  radius?: string;
  aspectClass?: string;
  className?: string;
}) {
  const layout = imageLayoutOf(project);
  const imgs = project.images;
  const maxPhones = size === "lg" ? 3 : 2;

  let content: ReactNode;
  if (imgs.length > 0 && layout === "phone") {
    const count = Math.min(imgs.length, maxPhones);
    const slots = PHONES[count];
    // with 3 slots the first image goes in the middle (front), the next two to the sides
    const order = count === 3 ? [1, 0, 2] : count === 2 ? [0, 1] : [0];
    const sizes = size === "lg" ? "(max-width: 768px) 30vw, 230px" : "(max-width: 768px) 38vw, 200px";
    content = slots.map((slot, i) => (
      <Slot key={i} p={slot}>
        <PhoneFrame img={imgs[order[i]]} sizes={sizes} depth={slot.front ? "near" : "far"} preload={preload && slot.front} decorative />
      </Slot>
    ));
  } else if (imgs.length > 0) {
    const count = Math.min(imgs.length, 2);
    const slots = WINDOWS[count];
    const sizes = size === "lg" ? "(max-width: 768px) 70vw, 560px" : "(max-width: 768px) 70vw, 420px";
    content = slots.map((slot, i) => (
      <Slot key={i} p={slot}>
        <WindowFrame img={imgs[i]} sizes={sizes} depth={slot.front ? "near" : "flat"} preload={preload && slot.front} decorative />
      </Slot>
    ));
  } else {
    const s = MARK_SIZE[size];
    content = (
      <div className="absolute inset-0 grid place-items-center">
        <span aria-hidden className="stage-pool" />
        <div className="lift-on-hover relative" style={{ width: s, height: s }}>
          <span aria-hidden className="ground -bottom-[26%] h-[16%]" />
          <ProjectMark project={project} size={s} float className="-rotate-6" />
        </div>
      </div>
    );
  }

  return (
    <div className={`inset-well relative overflow-hidden ${radius} ${aspectClass ?? (imgs.length > 0 && layout === "desktop" ? "aspect-[16/10]" : ASPECT[size])} ${className}`}>
      <span aria-hidden className="stage-light" />
      {content}
    </div>
  );
}
