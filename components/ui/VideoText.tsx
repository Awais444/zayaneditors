"use client";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Text with the showreel playing inside its letters.
 * - The real word stays in the DOM (SEO, screen readers) and defines the box.
 * - An inline SVG <clipPath> built from the same text (same inherited font, size, tracking)
 *   clips the media layer, so there is no visible box around the word.
 * - Poster first; the video attaches after load/idle and plays only while visible.
 * `filled` controls whether the media shows (false → plain solid text, used for hover/scroll fills).
 */
export function VideoText({
  text,
  className,
  filled = true,
  baseClass = "text-transparent",
  onMediaRef,
  stroke = false,
}: {
  text: string;
  className?: string;
  filled?: boolean;
  baseClass?: string;
  onMediaRef?: (el: HTMLSpanElement | null) => void;
  /** 1px lime outline so the letter shapes stay readable on dark frames */
  stroke?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const box = useRef<HTMLSpanElement>(null);
  const base = useRef<HTMLSpanElement>(null);
  const caret = useRef<HTMLSpanElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [baseline, setBaseline] = useState<number | null>(null);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Measure the text baseline so the clip glyphs sit exactly on the DOM glyphs
  useIsoLayoutEffect(() => {
    const measure = () => caret.current && setBaseline(caret.current.offsetTop);
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1200));
    const start = () => idle(() => setLoad(true));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (visible && filled) v.play().catch(() => {});
    else v.pause();
  }, [visible, filled, load]);

  return (
    <span ref={box} className={cn("relative inline-block", className)}>
      <span ref={base} className={cn(baseClass, stroke && "[-webkit-text-stroke:1px_var(--color-accent)]")}>
        {text}
        <span ref={caret} aria-hidden className="inline-block h-0 w-0 align-baseline" />
      </span>
      <span
        aria-hidden
        data-video-text-media
        ref={onMediaRef}
        className={cn("pointer-events-none absolute inset-0 transition-opacity duration-700", filled ? "opacity-100" : "opacity-0")}
        style={{ clipPath: `url(#${id})` }}
      >
        {/* Fallback until the reel plays: lime gradient letters (never black) */}
        <span className="absolute inset-0 bg-[linear-gradient(120deg,#c6f432,#e4ff8a_45%,#8b5cf6)]" />
        {load && (
          <video
            ref={vid}
            src={site.showreel.src}
            muted
            loop
            playsInline
            preload="none"
            onPlaying={() => setPlaying(true)}
            className={cn("absolute inset-0 size-full object-cover transition-opacity duration-700", playing ? "opacity-100" : "opacity-0")}
          />
        )}
        {/* 20% white lift so busy/dark frames still read as letters */}
        <span className="absolute inset-0 bg-white/20" />
      </span>
      <svg aria-hidden width="0" height="0" className="absolute">
        <clipPath id={id} clipPathUnits="userSpaceOnUse">
          <text x="0" y={baseline ?? "0.8em"}>{text}</text>
        </clipPath>
      </svg>
    </span>
  );
}
