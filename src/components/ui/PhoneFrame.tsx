import Image from "next/image";
import type { Img } from "@/lib/content";

/** Screen aspect shared by every phone on the site (width / height). */
export const SCREEN_ASPECT = 452 / 980;

type Crop = { x: number; y: number; w: number; h: number };

/**
 * 다모임 screens are design exports: the screen sits on a grey canvas with padding.
 * This crop keeps only the screen so it can live inside a device frame.
 */
function cropFor(src: string): Crop | undefined {
  if (src.includes("/damoim/")) return { x: 54, y: 36, w: 452, h: 980 };
  return undefined;
}

/**
 * The screen box for an image: the shared aspect, unless the screenshot is clearly wider or narrower
 * (e.g. 1:2 captures), in which case the screen takes the image's own aspect so nothing is cropped.
 */
export function screenAspectFor(img: Img): number {
  if (cropFor(img.src)) return SCREEN_ASPECT;
  const own = img.w / img.h;
  return Math.abs(own - SCREEN_ASPECT) > 0.03 ? own : SCREEN_ASPECT;
}

/**
 * A real screenshot inside a phone body. The frame scales with its container width (container
 * query units), so size it with the wrapper: <div className="w-[220px]"><PhoneFrame .../></div>.
 * depth: near (strong layered shadow, hero/featured), far (behind another device), flat (grids, rails).
 */
export function PhoneFrame({
  img,
  sizes = "280px",
  preload = false,
  eager = false,
  depth = "near",
  className = "",
  showGround = false,
  decorative = false,
}: {
  img: Img;
  sizes?: string;
  preload?: boolean;
  /** Skip lazy loading without a head preload (several same-size screens above the fold). */
  eager?: boolean;
  depth?: "near" | "far" | "flat";
  className?: string;
  showGround?: boolean;
  /** alt="" when a caption or the surrounding link already names the screen. */
  decorative?: boolean;
}) {
  const crop = cropFor(img.src);
  const alt = decorative ? "" : img.alt;
  return (
    <div className={`phone ${className}`} data-depth={depth}>
      {showGround && <span className="ground" aria-hidden />}
      <div className="phone-body">
        <div className="phone-bezel">
          <div className="phone-screen" style={{ aspectRatio: screenAspectFor(img) }}>
            {crop ? (
              <Image
                src={img.src}
                width={img.w}
                height={img.h}
                alt={alt}
                sizes={sizes}
                preload={preload}
                loading={eager && !preload ? "eager" : undefined}
                draggable={false}
                style={{
                  position: "absolute",
                  maxWidth: "none",
                  width: `${(img.w / crop.w) * 100}%`,
                  height: "auto",
                  left: `${(-crop.x / crop.w) * 100}%`,
                  top: `${(-crop.y / crop.h) * 100}%`,
                }}
              />
            ) : (
              <Image
                src={img.src}
                width={img.w}
                height={img.h}
                alt={alt}
                sizes={sizes}
                preload={preload}
                loading={eager && !preload ? "eager" : undefined}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            )}
            <span className="phone-glare" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
