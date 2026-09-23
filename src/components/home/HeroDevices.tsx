"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import type { Img } from "@/lib/content";
import { PhoneFrame } from "@/components/ui/PhoneFrame";

type Layer = {
  key: string;
  kind: "phone" | "icon";
  img: Img;
  /** position in % of the stage */
  left: string;
  top: string;
  width: string;
  rotate: number;
  /** 0 = far, 1 = near; drives parallax distance and stacking */
  depth: number;
  z: number;
  order: number;
};

function ParallaxLayer({
  layer,
  scrollY,
  px,
  py,
  still,
  children,
}: {
  layer: Layer;
  scrollY: MotionValue<number>;
  px: MotionValue<number>;
  py: MotionValue<number>;
  still: boolean;
  children: React.ReactNode;
}) {
  // The style prop is the same on the server and the client (motion values, all 0 on the first
  // render), so hydration matches for everyone. Reduced motion is applied inside the transforms:
  // `still` zeroes every offset instead of swapping the style prop.
  const lift = still ? 0 : 40 + layer.depth * 110;
  const scrollOffset = useTransform(scrollY, [0, 900], [0, -lift]);
  const pointerX = useTransform(px, (v) => (still ? 0 : v * (6 + layer.depth * 16)));
  const pointerY = useTransform(py, (v) => (still ? 0 : v * (4 + layer.depth * 10)));
  const y = useTransform([scrollOffset, pointerY], ([a, b]) => (a as number) + (b as number));

  return (
    <div
      className="absolute"
      style={{ left: layer.left, top: layer.top, width: layer.width, zIndex: layer.z, transform: `rotate(${layer.rotate}deg)` }}
    >
      <motion.div style={{ x: pointerX, y }}>
        <div className="float-in" style={{ ["--i" as string]: layer.order, ["--from-rot" as string]: `${layer.rotate > 0 ? 6 : -6}deg` }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Hero visual: three real app screens in phone frames plus two floating app icons, with scroll and
 * pointer parallax by depth (Motion values, no React state). Static under reduced motion.
 */
export function HeroDevices({
  pinyut,
  damoim,
  hugg,
  umcIcon,
  pinyutIcon,
  label,
}: {
  pinyut: Img;
  damoim: Img;
  hugg: Img;
  umcIcon: Img;
  pinyutIcon: Img;
  label: string;
}) {
  const reduce = useReducedMotion();
  const still = !!reduce;
  const { scrollY } = useScroll();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const py = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (still) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [still, rawX, rawY]);

  const layers: Layer[] = [
    { key: "damoim", kind: "phone", img: damoim, left: "1%", top: "5%", width: "37%", rotate: -7, depth: 0.35, z: 1, order: 1 },
    { key: "hugg", kind: "phone", img: hugg, left: "62%", top: "15%", width: "37%", rotate: 6, depth: 0.5, z: 2, order: 2 },
    { key: "pinyut", kind: "phone", img: pinyut, left: "29%", top: "2%", width: "43%", rotate: -1.5, depth: 1, z: 3, order: 0 },
    { key: "umc", kind: "icon", img: umcIcon, left: "76%", top: "0%", width: "13%", rotate: 8, depth: 0.2, z: 0, order: 3 },
    { key: "pinyut-icon", kind: "icon", img: pinyutIcon, left: "13%", top: "74%", width: "15%", rotate: -9, depth: 1.25, z: 4, order: 4 },
  ];

  return (
    <div className="relative mx-auto aspect-[1/1.02] w-full" aria-label={label} role="img">
      {/* soft light pool behind the devices */}
      <div
        aria-hidden
        className="absolute inset-x-0 inset-y-[-8%] rounded-full sm:inset-[-8%] opacity-90 [background:radial-gradient(closest-side,rgb(255_255_255/0.85),transparent)] dark:[background:radial-gradient(closest-side,rgb(120_134_158/0.18),transparent)]"
      />
      {layers.map((layer) => (
        <ParallaxLayer key={layer.key} layer={layer} scrollY={scrollY} px={px} py={py} still={still}>
          {layer.kind === "phone" ? (
            <PhoneFrame
              img={layer.img}
              preload={layer.key === "pinyut"}
              sizes="(max-width: 768px) 45vw, 300px"
              depth={layer.depth >= 1 ? "near" : "far"}
              decorative
            />
          ) : (
            <Image src={layer.img.src} width={layer.img.w} height={layer.img.h} alt="" sizes="120px" loading="eager" className="icon-float h-auto w-full" />
          )}
        </ParallaxLayer>
      ))}
    </div>
  );
}
