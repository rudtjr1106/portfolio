"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import type { Img } from "@/lib/content";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Lightbox } from "@/components/ui/ScreenshotGallery";

type Layout = "phone" | "desktop";
type Block = { start: number; size: number; flip: boolean };

/** A screenshot this wide or wider stays sharp in the large slot of a block. */
const SHARP_WIDTH = 1000;

/**
 * Images clearly taller than a 16/10 window (a sprite sheet, a table) would lose whole rows to the
 * top crop, so they are shown whole on a neutral fill instead.
 */
const showWhole = (img: Img) => img.w / img.h < 1.4;

/** The first screens are above the fold on a detail page: preload them (LCP). */
const PRELOAD_COUNT = 2;

/**
 * Desktop screenshots in blocks: 3 = one large window beside two small ones (alternating sides),
 * 2 = a pair, 1 = alone. Inside a block of three, the first sharp enough screenshot takes the large
 * slot. Returns the images in display order (the Lightbox uses the same order) and the blocks.
 */
function planDesktop(images: Img[]): { ordered: Img[]; blocks: Block[] } {
  const ordered: Img[] = [];
  const blocks: Block[] = [];
  let left = images.length;
  let bento = 0;
  while (left > 0) {
    const size = left === 3 || left >= 5 ? 3 : left >= 2 ? 2 : 1;
    const start = ordered.length;
    const chunk = images.slice(start, start + size);
    if (size === 3) {
      const big = Math.max(0, chunk.findIndex((img) => img.w >= SHARP_WIDTH));
      chunk.unshift(...chunk.splice(big, 1));
    }
    ordered.push(...chunk);
    blocks.push({ start, size, flip: size === 3 && bento % 2 === 1 });
    if (size === 3) bento++;
    left -= size;
  }
  return { ordered, blocks };
}

function Caption({ img, center = false }: { img: Img; center?: boolean }) {
  if (!img.caption) return null;
  return <figcaption className={`mt-3.5 text-[13.5px] font-medium leading-snug text-ink-2 ${center ? "text-center" : ""}`}>{img.caption}</figcaption>;
}

/**
 * A desktop screenshot inside the shared window frame, cropped from the top when its box is shorter.
 * Clearly taller images (see showWhole) are contained on the surface color instead of cropped.
 */
function Window({ img, sizes, preload = false, className = "" }: { img: Img; sizes: string; preload?: boolean; className?: string }) {
  const whole = showWhole(img);
  return (
    <div className={`window lift-on-hover ${whole ? "window-whole" : ""} ${className}`} data-depth="flat" data-lift="sm">
      <Image
        src={img.src}
        alt=""
        fill
        sizes={sizes}
        preload={preload}
        draggable={false}
        className={whole ? "object-contain" : "object-cover object-top"}
      />
    </div>
  );
}

/**
 * Screenshot gallery for a project detail page when the shared rail does not fit:
 *  - phone, up to 5 screens: the phones stand together on one sunk stage (2 or 3 per row on phones)
 *  - desktop: windows in blocks (see planDesktop); windows never lose their sides, only the bottom
 * Every screenshot is a button that opens the shared Lightbox; focus returns to the last one viewed.
 */
export function ProjectGallery({ images, layout, label }: { images: Img[]; layout: Layout; label: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpened = useRef(0);

  if (images.length === 0) return null;

  const { ordered, blocks } = layout === "desktop" ? planDesktop(images) : { ordered: images, blocks: [] };

  const openAt = (i: number) => {
    lastOpened.current = i;
    setIndex(i);
  };
  const close = () => {
    setIndex(null);
    triggers.current[lastOpened.current]?.focus({ preventScroll: true });
  };

  const trigger = (i: number, children: ReactNode, className = "") => (
    <button
      ref={(el) => {
        triggers.current[i] = el;
      }}
      type="button"
      onClick={() => openAt(i)}
      aria-label={`${ordered[i].caption ?? ordered[i].alt} 크게 보기`}
      className={`group block w-full cursor-zoom-in rounded-inner text-left ${className}`}
    >
      {children}
    </button>
  );

  const lightbox = (
    <Lightbox
      images={ordered}
      layout={layout}
      index={index}
      onIndexChange={(i) => {
        lastOpened.current = i;
        setIndex(i);
      }}
      onClose={close}
      label={label}
    />
  );

  if (layout === "phone") {
    const cols = ordered.length === 3 ? "grid-cols-3" : "grid-cols-2";
    const width = ordered.length <= 3 ? "sm:w-[196px] lg:w-[236px]" : "sm:w-[188px] lg:w-[208px]";
    return (
      <div>
        <div className="inset-well relative overflow-hidden rounded-panel px-4 pb-9 pt-10 sm:px-10 sm:pb-14 sm:pt-14 lg:pt-16">
          <span aria-hidden className="stage-light" />
          <ul
            role="list"
            aria-label={label}
            className={`relative grid ${cols} gap-x-3 gap-y-9 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-10 lg:gap-x-14`}
          >
            {ordered.map((img, i) => (
              <li key={img.src} className={`min-w-0 ${width}`}>
                <figure>
                  {trigger(
                    i,
                    <div className="lift-on-hover" data-lift="sm">
                      <PhoneFrame img={img} sizes="(max-width: 640px) 30vw, 236px" depth="far" preload={i < PRELOAD_COUNT} eager decorative />
                    </div>,
                  )}
                  <Caption img={img} center />
                </figure>
              </li>
            ))}
          </ul>
        </div>
        {lightbox}
      </div>
    );
  }

  return (
    <div>
      <ul role="list" aria-label={label} className="grid gap-y-8 lg:gap-y-12">
        {blocks.map(({ start, size, flip }) => {
          const ids = Array.from({ length: size }, (_, k) => start + k);
          if (size === 3) {
            const [a, b, c] = ids;
            return (
              <li key={start}>
                <div className={`grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:flex lg:items-stretch lg:gap-x-6 ${flip ? "lg:flex-row-reverse" : ""}`}>
                  <figure className="sm:col-span-2 lg:w-[65%] lg:shrink-0">
                    {trigger(a, <Window img={ordered[a]} sizes="(max-width: 1024px) 92vw, 820px" preload={a < PRELOAD_COUNT} className="aspect-[16/10]" />)}
                    <Caption img={ordered[a]} />
                  </figure>
                  <div className="contents lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:gap-y-8">
                    {[b, c].map((k) => (
                      <figure key={k} className="lg:flex lg:flex-1 lg:flex-col">
                        {trigger(
                          k,
                          <Window
                            img={ordered[k]}
                            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 420px"
                            preload={k < PRELOAD_COUNT}
                            className="aspect-[16/10] lg:aspect-auto lg:flex-1"
                          />,
                          "lg:flex lg:flex-1 lg:flex-col",
                        )}
                        <Caption img={ordered[k]} />
                      </figure>
                    ))}
                  </div>
                </div>
              </li>
            );
          }
          return (
            <li key={start}>
              <div className={`grid gap-x-5 gap-y-8 ${size === 2 ? "sm:grid-cols-2 lg:gap-x-6" : "mx-auto max-w-[960px]"}`}>
                {ids.map((k) => (
                  <figure key={k}>
                    {trigger(k, <Window img={ordered[k]} sizes="(max-width: 640px) 92vw, 620px" preload={k < PRELOAD_COUNT} className="aspect-[16/10]" />)}
                    <Caption img={ordered[k]} />
                  </figure>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
      {lightbox}
    </div>
  );
}
