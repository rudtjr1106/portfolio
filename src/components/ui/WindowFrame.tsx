import Image from "next/image";
import type { Img } from "@/lib/content";

/**
 * A desktop screenshot as a floating app window: 12px corners, hairline edge, layered tinted shadow.
 * No fake title bar: the screenshots already carry their own window chrome.
 * By default the image keeps its natural aspect. Pass `aspect` (width / height, e.g. 16 / 10) to crop
 * from the top into a fixed box so several windows line up in a grid.
 */
export function WindowFrame({
  img,
  sizes = "(max-width: 768px) 90vw, 640px",
  preload = false,
  depth = "near",
  aspect,
  className = "",
  decorative = false,
}: {
  img: Img;
  sizes?: string;
  preload?: boolean;
  depth?: "near" | "flat";
  aspect?: number;
  className?: string;
  decorative?: boolean;
}) {
  const alt = decorative ? "" : img.alt;
  return (
    <div className={`window ${className}`} data-depth={depth} style={aspect ? { aspectRatio: aspect } : undefined}>
      <Image
        src={img.src}
        width={img.w}
        height={img.h}
        alt={alt}
        sizes={sizes}
        preload={preload}
        draggable={false}
        className={aspect ? "absolute inset-0 h-full w-full object-cover object-top" : "block h-auto w-full"}
      />
    </div>
  );
}
