"use client";

import { useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import type { Img } from "@/lib/content";
import { PhoneFrame } from "./PhoneFrame";
import { WindowFrame } from "./WindowFrame";

type Layout = "phone" | "desktop";

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */

/**
 * Controlled full-screen viewer on a native <dialog> (focus trap, Esc, top layer for free).
 * `index` null = closed. Arrow keys and swipes move between images; clicking the empty
 * area around the image closes it. Focus returns to whatever opened it (see ScreenshotGallery).
 */
export function Lightbox({
  images,
  layout,
  index,
  onIndexChange,
  onClose,
  label,
}: {
  images: Img[];
  layout: Layout;
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
  /** Accessible name of the dialog, e.g. "다모임 화면". */
  label: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const swipeX = useRef<number | null>(null);
  const open = index !== null;
  const n = images.length;
  const img = index !== null ? images[index] : undefined;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const go = (delta: number) => {
    if (index === null || n < 2) return;
    onIndexChange((index + delta + n) % n);
  };

  const dismissIfEmpty = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).dataset.dismiss !== undefined) ref.current?.close();
  };

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={label}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
      }}
    >
      {img && index !== null && (
        <div className="flex h-full flex-col" data-dismiss onClick={dismissIfEmpty}>
          <div className="flex items-center justify-between gap-4 px-4 pb-2 pt-4 sm:px-6 sm:pt-6" data-dismiss>
            <p className="text-[14px] font-medium text-white/70">{label}</p>
            <button type="button" className="lightbox-btn" aria-label="닫기" onClick={() => ref.current?.close()}>
              <X size={20} weight="bold" aria-hidden />
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-24"
            data-dismiss
            onPointerDown={(e) => {
              swipeX.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (swipeX.current === null) return;
              const dx = e.clientX - swipeX.current;
              swipeX.current = null;
              if (Math.abs(dx) > 48) go(dx > 0 ? -1 : 1);
            }}
          >
            <figure key={img.src} className="lightbox-figure">
              {layout === "phone" ? (
                <div style={{ width: "min(78vw, calc((100dvh - 190px) * 0.47))" }}>
                  <PhoneFrame img={img} sizes="(max-width: 768px) 80vw, 460px" depth="near" />
                </div>
              ) : (
                <div style={{ width: `min(92vw, 1280px, calc((100dvh - 190px) * ${(img.w / img.h).toFixed(4)}))` }}>
                  <WindowFrame img={img} sizes="(max-width: 768px) 92vw, 1280px" />
                </div>
              )}
            </figure>

            {n > 1 && (
              <>
                <button type="button" className="lightbox-btn absolute left-6 top-1/2 hidden -translate-y-1/2 sm:grid" aria-label="이전 화면" onClick={() => go(-1)}>
                  <CaretLeft size={20} weight="bold" aria-hidden />
                </button>
                <button type="button" className="lightbox-btn absolute right-6 top-1/2 hidden -translate-y-1/2 sm:grid" aria-label="다음 화면" onClick={() => go(1)}>
                  <CaretRight size={20} weight="bold" aria-hidden />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 px-4 pb-5 pt-4 sm:pb-8" data-dismiss>
            {n > 1 && (
              <button type="button" className="lightbox-btn sm:hidden" aria-label="이전 화면" onClick={() => go(-1)}>
                <CaretLeft size={18} weight="bold" aria-hidden />
              </button>
            )}
            <p aria-live="polite" className="min-w-0 max-w-[36rem] text-center text-[15px] font-medium leading-snug text-white">
              {img.caption ?? img.alt}
            </p>
            {n > 1 && (
              <button type="button" className="lightbox-btn sm:hidden" aria-label="다음 화면" onClick={() => go(1)}>
                <CaretRight size={18} weight="bold" aria-hidden />
              </button>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery                                                             */
/* ------------------------------------------------------------------ */

const GRID_COLS = {
  phone: { 2: "grid-cols-2", 3: "grid-cols-2 sm:grid-cols-3", 4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" },
  desktop: { 2: "grid-cols-1 sm:grid-cols-2", 3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", 4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" },
} as const;

const RAIL_ITEM = {
  phone: "w-[42vw] max-w-[176px] sm:w-[196px] sm:max-w-none lg:w-[212px]",
  desktop: "w-[78vw] max-w-[420px] sm:w-[440px] sm:max-w-none lg:w-[520px]",
} as const;

/**
 * Screenshots of one project, each a button that opens the Lightbox.
 * variant "rail": horizontal scroll-snap strip with prev/next buttons (good for 5+ phone screens).
 * variant "grid": wrapping grid (good for desktop windows or few screens).
 * Captions come from img.caption. Phones use PhoneFrame, desktop shots use WindowFrame.
 */
export function ScreenshotGallery({
  images,
  layout,
  label,
  variant = "grid",
  columns,
  captions = true,
  className = "",
}: {
  images: Img[];
  layout: Layout;
  /** Names the gallery region and the dialog, e.g. "다모임 화면". */
  label: string;
  variant?: "rail" | "grid";
  /** grid only. Default: 4 for phones, 2 for desktop. */
  columns?: 2 | 3 | 4;
  captions?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpened = useRef<number>(0);

  if (images.length === 0) return null;

  const openAt = (i: number) => {
    lastOpened.current = i;
    setIndex(i);
  };
  const close = () => {
    setIndex(null);
    triggers.current[lastOpened.current]?.focus({ preventScroll: true });
  };

  const items = images.map((img, i) => (
    <figure key={img.src} className={variant === "rail" ? `shrink-0 ${RAIL_ITEM[layout]}` : ""}>
      <button
        ref={(el) => {
          triggers.current[i] = el;
        }}
        type="button"
        onClick={() => openAt(i)}
        aria-label={`${img.caption ?? img.alt} 크게 보기`}
        className="group block w-full cursor-zoom-in rounded-inner text-left"
      >
        <div className="lift-on-hover" data-lift="sm">
          {layout === "phone" ? (
            <PhoneFrame img={img} sizes="(max-width: 640px) 42vw, 220px" depth="flat" preload={i < 2} decorative />
          ) : (
            <WindowFrame img={img} sizes="(max-width: 640px) 90vw, 560px" depth="flat" aspect={16 / 10} decorative />
          )}
        </div>
      </button>
      {captions && img.caption && (
        <figcaption className={`mt-4 text-[13.5px] font-medium leading-snug text-ink-2 ${layout === "phone" ? "text-center" : ""}`}>{img.caption}</figcaption>
      )}
    </figure>
  ));

  const lightbox = (
    <Lightbox
      images={images}
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

  if (variant === "rail") {
    return (
      <div className={className}>
        <Rail label={label}>{items}</Rail>
        {lightbox}
      </div>
    );
  }

  const cols = columns ?? (layout === "phone" ? 4 : 2);
  return (
    <div className={className}>
      <div role="list" aria-label={label} className={`grid gap-x-5 gap-y-8 sm:gap-x-6 ${GRID_COLS[layout][cols]}`}>
        {items.map((it) => (
          <div role="listitem" key={it.key}>
            {it}
          </div>
        ))}
      </div>
      {lightbox}
    </div>
  );
}

/** Scroll-snap strip with prev/next buttons that disable at the ends (IntersectionObserver, no scroll listeners). */
function Rail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild;
    const last = el.lastElementChild?.previousElementSibling ?? el.lastElementChild;
    if (!first || !last) return;
    const io = new IntersectionObserver(
      (entries) => {
        setEdge((prev) => {
          const next = { ...prev };
          for (const e of entries) {
            if (e.target === first) next.start = e.intersectionRatio > 0.95;
            if (e.target === last) next.end = e.intersectionRatio > 0.95;
          }
          return next;
        });
      },
      { root: el, threshold: [0, 0.95, 1] },
    );
    io.observe(first);
    io.observe(last);
    return () => io.disconnect();
  }, []);

  const step = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  const hideButtons = edge.start && edge.end;

  return (
    <div className="relative">
      <div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label={`${label}, 가로로 넘겨 보기`}
        className="rail fade-x -mx-1 flex gap-5 overflow-x-auto px-1 pb-8 pt-3 focus-visible:outline-offset-[-2px] sm:gap-6"
      >
        {children}
        <span aria-hidden className="w-10 shrink-0" />
      </div>
      {!hideButtons && (
        <div className="mt-1 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={edge.start}
            aria-label="이전 화면들"
            className="pill pill-ghost pill-icon pill-sm disabled:opacity-40"
          >
            <CaretLeft size={16} weight="bold" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={edge.end}
            aria-label="다음 화면들"
            className="pill pill-ghost pill-icon pill-sm disabled:opacity-40"
          >
            <CaretRight size={16} weight="bold" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
