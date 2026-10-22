"use client";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

// TODO: replace with a real edit and its actual timeline markers
const SRC = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
const POSTER = "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400&q=70";

type Clip = { start: number; end: number; label: string };
const tracks: { name: string; color: string; clips: Clip[] }[] = [
  { name: "Text", color: "bg-sky-400 text-accent-fg", clips: [{ start: 0, end: 0.12, label: "Hook title" }, { start: 0.45, end: 0.58, label: "Callout" }, { start: 0.85, end: 1, label: "CTA" }] },
  { name: "B-roll", color: "bg-violet-600 text-white", clips: [{ start: 0.1, end: 0.3, label: "Product B-roll" }, { start: 0.6, end: 0.78, label: "Cutaway" }] },
  { name: "Video", color: "bg-lime-300 text-accent-fg", clips: [{ start: 0, end: 0.22, label: "Cold open" }, { start: 0.22, end: 0.5, label: "Setup" }, { start: 0.5, end: 0.8, label: "Payoff" }, { start: 0.8, end: 1, label: "Outro" }] },
  { name: "SFX", color: "bg-amber-400 text-accent-fg", clips: [{ start: 0.02, end: 0.06, label: "Whoosh" }, { start: 0.49, end: 0.53, label: "Hit" }, { start: 0.79, end: 0.83, label: "Riser" }] },
  { name: "Music", color: "bg-emerald-400 text-accent-fg", clips: [{ start: 0, end: 0.5, label: "Track A" }, { start: 0.5, end: 1, label: "Track B (drop)" }] },
];

/** Signature feature: drag the playhead to scrub the edit. */
export default function EditTimeline() {
  const vid = useRef<HTMLVideoElement>(null);
  const lane = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0); // 0..1
  const left = useTransform(progress, (p) => `${p * 100}%`);
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [time, setTime] = useState("0:00");
  const dragging = useRef<{ offset: number; startX: number; moved: boolean } | null>(null);
  const reduce = useReducedMotion();

  // Drive the playhead from the video while playing (rAF, not timeupdate, for smoothness)
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = vid.current;
      if (v && v.duration && !dragging.current) {
        progress.set(v.currentTime / v.duration);
        const s = Math.floor(v.currentTime);
        setTime(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  const seek = (p: number) => {
    const v = vid.current;
    const clamped = Math.min(1, Math.max(0, p));
    progress.set(clamped);
    if (v && v.duration) v.currentTime = clamped * v.duration;
  };

  const ratioAt = (clientX: number) => {
    const r = lane.current!.getBoundingClientRect();
    return (clientX - r.left) / r.width;
  };

  const onDown = (e: React.PointerEvent) => {
    const v = vid.current;
    if (v && v.readyState < 1) v.load();
    const onHead = (e.target as HTMLElement).closest("[data-playhead]");
    // Respect the grab offset when grabbing the playhead itself
    const offset = onHead ? ratioAt(e.clientX) - progress.get() : 0;
    dragging.current = { offset, startX: e.clientX, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (!onHead) {
      if (reduce) seek(ratioAt(e.clientX));
      else animate(progress, Math.min(1, Math.max(0, ratioAt(e.clientX))), { type: "spring", bounce: 0, duration: 0.3, onUpdate: (p) => { if (v?.duration) v.currentTime = p * v.duration; } });
    }
  };
  const onMove = (e: React.PointerEvent) => {
    const d = dragging.current;
    if (!d) return;
    if (!d.moved && Math.abs(e.clientX - d.startX) < 10 && e.pointerType !== "mouse") return;
    d.moved = true;
    progress.stop();
    seek(ratioAt(e.clientX) - d.offset);
  };
  const onUp = () => (dragging.current = null);

  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") seek(progress.get() - 0.02);
    if (e.key === "ArrowRight") seek(progress.get() + 0.02);
    if (e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className="card overflow-hidden p-3 md:p-5">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
        <video ref={vid} src={SRC} poster={POSTER} muted playsInline preload="none" className="size-full object-cover" onEnded={() => setPlaying(false)} />
        {hover && <span className="chrome absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-semibold">{hover}</span>}
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm">
        <button type="button" onClick={toggle} className="pressable grid size-10 place-items-center rounded-full bg-accent text-accent-fg" aria-label={playing ? "Pause" : "Play"}>
          {playing ? <Pause className="size-4" /> : <Play className="size-4 translate-x-px fill-current" />}
        </button>
        <span className="font-mono text-muted tabular-nums">{time}</span>
        <span className="ml-auto hidden text-xs text-muted sm:block">Drag the playhead to scrub · hover a clip</span>
      </div>
      <div className="mt-4 flex gap-3">
        <div className="hidden w-16 shrink-0 flex-col gap-1.5 pt-6 text-[11px] text-muted sm:flex">
          {tracks.map((t) => <span key={t.name} className="flex h-7 items-center">{t.name}</span>)}
        </div>
        <div
          ref={lane}
          role="slider"
          tabIndex={0}
          aria-label="Timeline playhead"
          data-cursor="drag"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          onKeyDown={onKey}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="relative flex-1 cursor-pointer touch-pan-y select-none"
        >
          <div className="mb-1.5 flex h-4.5 justify-between border-b border-line text-[10px] text-muted">
            {Array.from({ length: 6 }, (_, i) => <span key={i}>{i * 20}%</span>)}
          </div>
          <div className="flex flex-col gap-1.5">
            {tracks.map((t) => (
              <div key={t.name} className="relative h-7 rounded-md bg-white/[0.03]">
                {t.clips.map((c) => (
                  <div
                    key={c.label}
                    onPointerEnter={() => setHover(c.label)}
                    onPointerLeave={() => setHover(null)}
                    style={{ left: `${c.start * 100}%`, width: `${(c.end - c.start) * 100}%` }}
                    className={cn("absolute inset-y-0.5 truncate rounded px-1.5 text-[10px] leading-6 font-medium transition-[filter,opacity] duration-150", t.color, hover && hover !== c.label ? "opacity-50" : "brightness-110")}
                  >
                    {c.label}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <motion.div data-playhead style={{ left }} className="absolute -top-1 bottom-0 z-10 w-0.5 -translate-x-1/2 cursor-ew-resize bg-white">
            <span className="absolute -top-1 left-1/2 block size-4 -translate-x-1/2 rounded-sm bg-white shadow" />
            <span className="absolute inset-y-0 -left-3 -right-3" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
