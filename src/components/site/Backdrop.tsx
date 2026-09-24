import type { CSSProperties } from "react";

/**
 * Page backdrop: the plaster wall (.field) plus real app fragments floating far behind the content,
 * out of focus. Server Component, no JS: the fragments are pre-blurred WebPs in public/backdrop
 * (a crop or icon, a soft shadow, then a depth-of-field blur), three depth planes drift with the
 * page scroll through a CSS scroll-driven animation, and everything stays put under reduced motion.
 */

/** asset box in css px at 1440 wide (shadow and blur included), and the object's center inside it in % */
const ASSETS = {
  "damoim-card": [392, 356, 48.0, 43.3],
  "pinyut-map": [342, 360, 47.7, 43.3],
  "icon-hugg": [107, 109, 49.3, 46.1],
  "icon-switchboard": [119, 120, 49.4, 46.4],
  "scoi-chart": [405, 492, 46.9, 43.9],
  "switchboard-panel": [470, 315, 48.4, 44.8],
  "hugg-card": [427, 343, 48.0, 43.2],
  "icon-damoim": [141, 143, 47.6, 44.5],
  "icon-scoi": [152, 153, 48.5, 45.3],
  "icon-pinyut": [125, 128, 48.0, 45.1],
} as const;

type Plane = "far" | "mid" | "near";

type Frag = {
  name: keyof typeof ASSETS;
  /** center: x in % of the viewport width, y in svh on a track the plane pulls upward as you scroll */
  x: number;
  y: number;
  r: number;
  /** light mode quiets the saturated icons, dark mode the white screens (they would glow) */
  tone: "pale" | "vivid";
  /** phone placement; omitted = hidden below 640px */
  m?: { x: number; y: number };
};

// Edges only: text columns and the real screenshots own the middle. y > 100 enters from below later.
const PLANES: Record<Plane, Frag[]> = {
  far: [
    { name: "scoi-chart", x: -6, y: 70, r: -4, tone: "pale" },
    { name: "switchboard-panel", x: 57, y: 91, r: 3, tone: "pale" },
  ],
  mid: [
    { name: "icon-hugg", x: 46, y: 11, r: 6, tone: "pale", m: { x: 88, y: 15 } },
    { name: "damoim-card", x: 97, y: 64, r: 5, tone: "pale", m: { x: 104, y: 108 } },
    { name: "icon-switchboard", x: 84, y: 118, r: -8, tone: "vivid" },
    { name: "pinyut-map", x: 17, y: 99, r: -5, tone: "pale", m: { x: -8, y: 150 } },
  ],
  near: [
    { name: "icon-scoi", x: 98, y: 22, r: 8, tone: "vivid" },
    { name: "icon-damoim", x: -1, y: 88, r: -10, tone: "vivid", m: { x: 2, y: 97 } },
    { name: "hugg-card", x: 99, y: 140, r: -6, tone: "pale", m: { x: 104, y: 175 } },
    { name: "icon-pinyut", x: 1, y: 190, r: 9, tone: "vivid", m: { x: 0, y: 235 } },
  ],
};

export function Backdrop() {
  return (
    <>
      <div className="field" aria-hidden />
      <div className="drift" aria-hidden>
        {(Object.keys(PLANES) as Plane[]).map((plane) => (
          <div key={plane} className="drift-plane" data-plane={plane}>
            {PLANES[plane].map((f) => {
              const [w, h, ox, oy] = ASSETS[f.name];
              return (
                <span
                  key={f.name}
                  className="frag"
                  data-tone={f.tone}
                  data-m={f.m ? "" : undefined}
                  style={
                    {
                      backgroundImage: `url(/backdrop/${f.name}.webp)`,
                      "--w": w,
                      "--ar": `${w} / ${h}`,
                      "--ox": `${-ox}%`,
                      "--oy": `${-oy}%`,
                      "--x": f.x,
                      "--y": f.y,
                      "--r": `${f.r}deg`,
                      "--mx": f.m?.x,
                      "--my": f.m?.y,
                    } as CSSProperties
                  }
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
