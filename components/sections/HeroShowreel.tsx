"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { site } from "@/data/site";

const VideoModal = dynamic(() => import("@/components/ui/VideoModal"), { ssr: false });

// Fake edit layout for the mini timeline (fractions of the reel's duration)
const videoClips = [0, 0.18, 0.34, 0.52, 0.71, 0.86, 1];
const brollClips: [number, number][] = [[0.08, 0.26], [0.44, 0.6], [0.76, 0.92]];
// Deterministic waveform so server and client render the same bars
const wave = Array.from({ length: 64 }, (_, i) => Math.round(25 + 75 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.43))));

/** Keep the slider's aria-valuenow in sync without re-rendering */
const setNow = (el: HTMLElement | null, p: number) => {
  const v = String(Math.round(p * 100));
  if (el && el.getAttribute("aria-valuenow") !== v) el.setAttribute("aria-valuenow", v);
};

const tc = (sec: number) => {
  const p = (n: number) => String(n).padStart(2, "0");
  const s = Math.floor(sec);
  return `${p(Math.floor(s / 60))}:${p(s % 60)}:${p(Math.floor((sec % 1) * 25))}`;
};

/** Hero showreel card: poster first, muted loop after load, plus a scrubbable mini timeline. */
export function HeroShowreel() {
  const reduce = useReducedMotion();
  const vid = useRef<HTMLVideoElement>(null);
  const lane = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const dragging = useRef(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  // Load the reel only after the page is interactive, never under reduced motion or Save-Data
  useEffect(() => {
    if (reduce) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const start = () => setLoadVideo(true);
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1200));
    if (document.readyState === "complete") idle(start);
    else window.addEventListener("load", () => idle(start), { once: true });
  }, [reduce]);

  // Playhead follows the video's currentTime (refs only, no re-render per frame)
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = vid.current;
      if (v && v.duration && !dragging.current) {
        const p = v.currentTime / v.duration;
        if (head.current) head.current.style.transform = `translate3d(${p * (track.current?.clientWidth ?? 0)}px, 0, 0)`;
        if (label.current) label.current.textContent = tc(v.currentTime);
        setNow(lane.current, p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const seekTo = (clientX: number) => {
    const r = track.current!.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    if (head.current) head.current.style.transform = `translate3d(${p * r.width}px, 0, 0)`;
    setNow(lane.current, p);
    const v = vid.current;
    if (v && v.duration) {
      v.currentTime = p * v.duration;
      if (label.current) label.current.textContent = tc(v.currentTime);
    }
  };

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    seekTo(e.clientX);
  };
  const onMove = (e: React.PointerEvent) => dragging.current && seekTo(e.clientX);
  const onUp = () => (dragging.current = false);
  const onKey = (e: React.KeyboardEvent) => {
    const v = vid.current;
    if (!v?.duration) return;
    if (e.key === "ArrowRight") v.currentTime = Math.min(v.duration, v.currentTime + 1);
    if (e.key === "ArrowLeft") v.currentTime = Math.max(0, v.currentTime - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0, duration: 0.6, delay: 0.15 }}
      className="relative"
    >
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(198,244,50,0.14),transparent)] blur-2xl" />
      <div className="relative aspect-video overflow-hidden rounded-[20px] border border-line bg-surface">
        <Image src={site.showreel.poster} alt="Showreel preview" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        {loadVideo && (
          <video
            ref={vid}
            src={site.showreel.src}
            muted
            loop
            autoPlay
            playsInline
            preload="none"
            aria-hidden
            onPlaying={() => setPlaying(true)}
            className="absolute inset-0 size-full object-cover transition-opacity duration-700"
            style={{ opacity: playing ? 1 : 0 }}
          />
        )}
        <button
          type="button"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            setOpen(true);
          }}
          className="pressable chrome absolute bottom-4 left-4 inline-flex h-10 items-center gap-2 rounded-full border border-white/10 pr-4 pl-3 text-sm font-semibold"
        >
          <Play className="size-4 fill-accent text-accent" aria-hidden /> Play full showreel
        </button>
      </div>

      {/* Mini timeline: playhead synced to the reel, drag to scrub */}
      <div
        ref={lane}
        role="slider"
        tabIndex={0}
        aria-label="Scrub the showreel"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        data-cursor="drag"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={onKey}
        className="relative mt-3 cursor-ew-resize touch-pan-y space-y-1 rounded-xl border border-line bg-surface p-2 select-none"
      >
        <div className="relative h-4">
          {videoClips.slice(0, -1).map((s, i) => (
            <span key={s} className="absolute inset-y-0 rounded-[3px] bg-white/[0.14]" style={{ left: `calc(${s * 100}% + 1px)`, width: `calc(${(videoClips[i + 1] - s) * 100}% - 2px)` }} />
          ))}
        </div>
        <div className="relative h-3">
          {brollClips.map(([s, e]) => (
            <span key={s} className="absolute inset-y-0 rounded-[3px] bg-accent-2/70" style={{ left: `${s * 100}%`, width: `${(e - s) * 100}%` }} />
          ))}
        </div>
        <div className="flex h-4 items-center gap-px">
          {wave.map((h, i) => (
            <span key={i} className="flex-1 rounded-full bg-white/25" style={{ height: `${h}%` }} />
          ))}
        </div>
        <span ref={label} className="pointer-events-none absolute top-1.5 right-2 rounded bg-bg/80 px-1.5 font-mono text-[10px] text-muted tabular-nums">00:00:00</span>
        <div ref={track} className="pointer-events-none absolute inset-y-0 left-2 right-2">
          <div ref={head} className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-accent will-change-transform">
            <span className="absolute -top-1 left-1/2 size-2.5 -translate-x-1/2 rounded-sm bg-accent" />
          </div>
        </div>
      </div>
      {open && <VideoModal video={site.showreel} origin={origin} onClose={() => setOpen(false)} />}
    </motion.div>
  );
}
