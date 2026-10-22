"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { DESKTOP_MOTION, scrollToTarget } from "@/lib/motion";

type Clip = { id: string; label: string; color: string; start: number; end: number; el: HTMLElement };

const tc = (p: number) => {
  // Map page progress onto a 3-minute "edit" so the timecode reads like a real timeline
  const total = 180 * 25;
  const f = Math.round(p * total);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(Math.floor(f / 1500))}:${pad(Math.floor(f / 25) % 60)}:${pad(f % 25)}`;
};

/**
 * Scroll-linked "master timeline" fixed to the bottom (desktop only).
 * Each [data-tl] section becomes a coloured clip; the playhead follows scroll progress;
 * clicking a clip scrolls to that section. Measured on resize, positioned with transforms.
 */
export function MasterTimeline() {
  const pathname = usePathname();
  const [clips, setClips] = useState<Clip[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [trackW, setTrackW] = useState(0);
  const head = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MOTION.replace(" and (prefers-reduced-motion: no-preference)", ""));
    const on = () => setEnabled(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Measure sections → clips
  useEffect(() => {
    if (!enabled) return;
    const measure = () => {
      setTrackW(track.current?.clientWidth ?? 0);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const els = [...document.querySelectorAll<HTMLElement>("[data-tl]")];
      setClips(
        els.map((el, i) => {
          const top = el.getBoundingClientRect().top + window.scrollY;
          return {
            id: `${i}`,
            el,
            label: el.dataset.tl!,
            color: el.dataset.tlColor || "rgba(244,244,245,0.18)",
            start: Math.max(0, Math.min(1, top / max)),
            end: Math.max(0, Math.min(1, (top + el.offsetHeight) / max)),
          };
        }),
      );
    };
    const t = setTimeout(measure, 300);
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [enabled, pathname]);

  // Track width (for label fitting) once the bar has rendered, and on resize
  useEffect(() => {
    if (!track.current) return;
    const ro = new ResizeObserver(([e]) => setTrackW(e.contentRect.width));
    ro.observe(track.current);
    return () => ro.disconnect();
  }, [clips.length]);

  // Playhead follows scroll (rAF-throttled, transform only)
  useEffect(() => {
    if (!enabled || !clips.length) return;
    let raf = 0;
    let last = "";
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const w = track.current?.clientWidth ?? 0;
      if (head.current) head.current.style.transform = `translate3d(${p * w}px,0,0)`;
      const t = tc(p);
      if (label.current && t !== last) label.current.textContent = last = t;
    };
    const onScroll = () => (raf ||= requestAnimationFrame(update));
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled, clips]);

  if (!enabled || clips.length < 3) return null;

  return (
    <nav aria-label="Page timeline" className="chrome fixed inset-x-0 bottom-0 z-40 hidden h-8 items-center gap-3 border-t border-line/60 px-4 lg:flex">
      <span ref={label} className="w-20 shrink-0 font-mono text-[11px] text-muted tabular-nums">00:00:00</span>
      <div ref={track} className="relative h-4 flex-1">
        {clips.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => scrollToTarget(c.el)}
            title={c.label}
            aria-label={`Jump to ${c.label}`}
            className="group absolute inset-y-0 overflow-hidden rounded-[3px] px-1 text-left transition-[filter] duration-150 hover:brightness-150"
            style={{ left: `calc(${c.start * 100}% + 1px)`, width: `calc(${(c.end - c.start) * 100}% - 2px)`, background: c.color }}
          >
            {/* Full label when it fits; otherwise the initial (full name in the tooltip) — never an ellipsis */}
            <span className="block overflow-hidden text-[9px] leading-4 font-semibold tracking-wider whitespace-nowrap text-white/80 uppercase">
              {(c.end - c.start) * trackW >= c.label.length * 6.5 + 12 ? c.label : c.label[0]}
            </span>
          </button>
        ))}
        <div ref={head} className="pointer-events-none absolute -top-1 -bottom-1 left-0 w-0.5 bg-accent will-change-transform">
          <span className="absolute -top-0.5 left-1/2 size-2 -translate-x-1/2 rounded-[2px] bg-accent" />
        </div>
      </div>
    </nav>
  );
}
