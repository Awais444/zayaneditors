"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePreviewSound } from "@/lib/sound";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { PlayShowreel } from "./PlayShowreel";

export type HeroReel = { slug: string; label: string; src: string; poster: string; alt: string };

const spring = { type: "spring" as const, bounce: 0, duration: 0.7 };

/** Slot geometry: centre card in front; side cards smaller, rotated ±8°, pushed outward and dimmed. */
const slots = [
  { x: -150, rotate: -8, scale: 0.85, z: 1, dim: 0.7 },
  { x: 0, rotate: 0, scale: 1, z: 3, dim: 1 },
  { x: 150, rotate: 8, scale: 0.85, z: 2, dim: 0.7 },
];

function Reel({ r, play, className }: { r: HeroReel; play: boolean; className?: string }) {
  const vid = useRef<HTMLVideoElement>(null);
  const { unmuted, toggle } = usePreviewSound(r.slug, vid);
  // Muted loops start after load; the <video> is always mounted so the sound toggle can play it
  // audibly inside the click itself (required on iOS)
  useEffect(() => {
    if (play) vid.current?.play().catch(() => {});
  }, [play]);
  return (
    <div className={cn("relative aspect-[9/16] overflow-hidden rounded-[24px] border border-white/10 bg-surface shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]", className)}>
      <Image src={r.poster} alt={r.alt} fill sizes="(min-width: 1024px) 260px, 60vw" className="object-cover" />
      <video ref={vid} src={r.src} poster={r.poster} muted loop playsInline preload="none" className="absolute inset-0 size-full object-cover" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
      <SoundToggle unmuted={unmuted} onToggle={toggle} />
    </div>
  );
}

/**
 * Hero "reels fan" (desktop): three real vertical clips. Cards fan out from the centre on load,
 * spread a little wider on hover with ≤8px pointer parallax, and rotate positions every 5s
 * (paused on hover). Reduced motion: static fan, posters only.
 */
export function HeroReels({ reels }: { reels: HeroReel[] }) {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState([0, 1, 2]); // order[slot] = reel index
  const [hover, setHover] = useState(false);
  const [play, setPlay] = useState(false);
  const px = useSpring(0, { stiffness: 120, damping: 20 });
  const py = useSpring(0, { stiffness: 120, damping: 20 });
  const tx = useTransform(px, (v) => v * 8);
  const ty = useTransform(py, (v) => v * 8);

  // Videos attach after first paint / page load
  useEffect(() => {
    if (reduce) return;
    const start = () => setPlay(true);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }, [reduce]);

  // Rotate left → centre → right every 5s, paused on hover
  useEffect(() => {
    if (reduce || hover) return;
    const id = setInterval(() => setOrder(([l, c, r]) => [r, l, c]), 5000);
    return () => clearInterval(id);
  }, [reduce, hover]);

  const centre = reels[order[1]];

  return (
    <motion.div
      className="relative mx-auto h-[min(34rem,62svh)] w-full max-w-[34rem]"
      style={reduce ? undefined : { x: tx, y: ty }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        px.set(0);
        py.set(0);
      }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const b = e.currentTarget.getBoundingClientRect();
        px.set(((e.clientX - b.left) / b.width - 0.5) * 2);
        py.set(((e.clientY - b.top) / b.height - 0.5) * 2);
      }}
    >
      {order.map((ri, slot) => {
        const s = slots[slot];
        const r = reels[ri];
        const spread = hover ? 1.18 : 1;
        return (
          <motion.div
            key={r.slug}
            className="absolute top-1/2 left-1/2 w-[16.25rem]"
            style={{ zIndex: s.z, translateX: "-50%", translateY: "-50%" }}
            initial={reduce ? false : { x: 0, rotate: 0, scale: 0.9, opacity: 0 }}
            animate={{ x: s.x * spread, rotate: s.rotate * spread, scale: s.scale, opacity: 1, filter: `brightness(${s.dim})` }}
            transition={{ ...spring, delay: reduce ? 0 : ri * 0.08 }}
          >
            <Reel r={r} play={play} />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-semibold whitespace-nowrap backdrop-blur-md" style={{ bottom: slot === 1 ? "4.75rem" : undefined }}>
              {r.label}
            </span>
          </motion.div>
        );
      })}
      {/* Play showreel: glass pill on the centre card */}
      <div className="absolute bottom-[calc(50%-14.4rem+1rem)] left-1/2 z-10 -translate-x-1/2" aria-label={`Now showing: ${centre.label}`}>
        <PlayShowreel variant="pill" />
      </div>
    </motion.div>
  );
}

/** Mobile: just the centre card (60vw) with its chip and the showreel pill. */
export function HeroReelMobile({ reel }: { reel: HeroReel }) {
  const reduce = useReducedMotion();
  const [play, setPlay] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const start = () => setPlay(true);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }, [reduce]);
  return (
    <div className="relative mx-auto w-[60vw] max-w-[16rem]">
      <Reel r={reel} play={play} />
      <span className="absolute bottom-[4.25rem] left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-semibold whitespace-nowrap backdrop-blur-md">{reel.label}</span>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <PlayShowreel variant="pill" />
      </div>
    </div>
  );
}
