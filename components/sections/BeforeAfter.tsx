"use client";
import { animate, motion, useMotionValue, useMotionTemplate, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";


/** Snap stops for the divider: all raw, half/half, all edited (and the quarters). */
const SNAPS = [0, 25, 50, 75, 100];

/** Rubber-band past the edges (iOS-style). */
const rubber = (v: number, min: number, max: number, c = 0.25) =>
  v < min ? min - (min - v) * c : v > max ? max + (v - max) * c : v;

/** One real clip in two versions (raw vs final edit) with identical framing; see lib/real-media.ts. */
export default function BeforeAfter({ raw: RAW, final: FINAL, poster: POSTER }: { raw: string; final: string; poster: string }) {
  const box = useRef<HTMLDivElement>(null);
  const raw = useRef<HTMLVideoElement>(null);
  const fin = useRef<HTMLVideoElement>(null);
  const pos = useMotionValue(50); // percent
  const clip = useMotionTemplate`inset(0 0 0 ${pos}%)`;
  const left = useTransform(pos, (p) => `${p}%`);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();
  const drag = useRef<{ startX: number; startPos: number; moved: boolean; lastX: number; lastT: number; v: number } | null>(null);

  // Keep the raw clip in sync with the final edit
  useEffect(() => {
    const f = fin.current, r = raw.current;
    if (!f || !r) return;
    const sync = () => {
      if (Math.abs(r.currentTime - f.currentTime) > 0.15) r.currentTime = f.currentTime;
    };
    f.addEventListener("timeupdate", sync);
    return () => f.removeEventListener("timeupdate", sync);
  }, []);

  const toggle = () => {
    const f = fin.current, r = raw.current;
    if (!f || !r) return;
    if (f.paused) {
      r.currentTime = f.currentTime;
      Promise.all([f.play(), r.play()]).then(() => setPlaying(true)).catch(() => {});
    } else {
      f.pause();
      r.pause();
      setPlaying(false);
    }
  };

  const toPct = (dx: number) => (dx / box.current!.clientWidth) * 100;

  const onDown = (e: React.PointerEvent) => {
    pos.stop();
    const rect = box.current!.getBoundingClientRect();
    const startPos = e.target === box.current || (e.target as HTMLElement).dataset.track ? ((e.clientX - rect.left) / rect.width) * 100 : pos.get();
    drag.current = { startX: e.clientX, startPos, moved: false, lastX: e.clientX, lastT: e.timeStamp, v: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) < 10 && e.pointerType !== "mouse") return; // touch threshold
    d.moved = true;
    const dt = Math.max(1, e.timeStamp - d.lastT);
    d.v = toPct(e.clientX - d.lastX) / dt; // %/ms
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    pos.set(rubber(d.startPos + toPct(dx), 0, 100));
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.moved) {
      // tap: jump to the tapped point
      animate(pos, Math.min(100, Math.max(0, d.startPos)), { type: "spring", bounce: 0, duration: reduce ? 0 : 0.35 });
      return;
    }
    // Momentum projection, clamped, with a little bounce after a flick
    // Project momentum (Apple-style decay), then snap to the nearest stop
    const projected = pos.get() + ((d.v * 1000) / 1000) * (0.998 / (1 - 0.998)) * 0.2;
    const target = SNAPS.reduce((a, b) => (Math.abs(b - projected) < Math.abs(a - projected) ? b : a));
    animate(pos, target, { type: "spring", velocity: d.v * 1000, bounce: reduce ? 0 : 0.15, duration: 0.5 });
  };
  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") pos.set(Math.max(0, pos.get() - step));
    if (e.key === "ArrowRight") pos.set(Math.min(100, pos.get() + step));
  };

  return (
    <div>
      <div
        ref={box}
        data-track="1"
        data-cursor="drag"
        className="relative aspect-video touch-pan-y overflow-hidden rounded-3xl border border-line bg-black select-none"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <video ref={raw} src={RAW} poster={POSTER} muted loop playsInline preload="none" className="pointer-events-none absolute inset-0 size-full object-cover grayscale-[0.6] saturate-50 contrast-75" />
        <motion.video ref={fin} src={FINAL} poster={POSTER} muted loop playsInline preload="none" style={{ clipPath: clip }} className="pointer-events-none absolute inset-0 size-full object-cover" />
        <span className="chrome pointer-events-none absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold tracking-[0.14em]">RAW</span>
        <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-accent px-3 py-1 text-xs font-bold tracking-[0.14em] text-accent-fg">EDITED</span>
        <motion.div style={{ left }} className="absolute inset-y-0 w-0.5 -translate-x-1/2 cursor-ew-resize bg-white">
          <div
            role="slider"
            tabIndex={0}
            aria-label="Compare raw footage and final edit"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={50}
            onKeyDown={onKey}
            className="absolute top-1/2 left-1/2 grid size-12 -translate-1/2 place-items-center rounded-full bg-white text-black shadow-xl"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
          </div>
        </motion.div>
      </div>
      <button type="button" onClick={toggle} className="pressable mt-5 inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold hover:bg-white/5">
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />} {playing ? "Pause" : "Play both"}
      </button>
    </div>
  );
}
