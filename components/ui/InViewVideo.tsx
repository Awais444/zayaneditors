"use client";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Muted looping preview. Poster renders immediately; the video only attaches when the element
 * nears the viewport and plays only while visible. Reduced motion: poster only.
 */
export function InViewVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        if (e.isIntersecting) {
          setActive(true);
          if (el.src) el.play().catch(() => {});
        } else el.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // First activation: src has just been attached, start playback if still on screen
  useEffect(() => {
    if (active && visible.current) ref.current?.play().catch(() => {});
  }, [active]);

  return <video ref={ref} src={active ? src : undefined} poster={poster} muted loop playsInline preload="none" aria-hidden className={className} />;
}
