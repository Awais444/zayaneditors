"use client";
import Image from "next/image";
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
}: {
  text: string;
  className?: string;
  filled?: boolean;
  baseClass?: string;
  onMediaRef?: (el: HTMLSpanElement | null) => void;
}) {
  const id = useId().replace(/:/g, "");
  const box = useRef<HTMLSpanElement>(null);
  const base = useRef<HTMLSpanElement>(null);
  const caret = useRef<HTMLSpanElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [baseline, setBaseline] = useState<number | null>(null);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);

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
      <span ref={base} className={baseClass}>
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
        <Image src={site.showreel.poster} alt="" fill sizes="100vw" className="object-cover" />
        {load && <video ref={vid} src={site.showreel.src} muted loop playsInline preload="none" className="absolute inset-0 size-full object-cover" />}
      </span>
      <svg aria-hidden width="0" height="0" className="absolute">
        <clipPath id={id} clipPathUnits="userSpaceOnUse">
          <text x="0" y={baseline ?? "0.8em"}>{text}</text>
        </clipPath>
      </svg>
    </span>
  );
}
