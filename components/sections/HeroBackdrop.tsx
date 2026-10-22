"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { showreel, showreelVertical } from "@/data/real-media";
import { DESKTOP_MOTION, loadGsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Full-bleed showreel behind the hero. The poster paints instantly; the muted loop attaches after
 * the page has loaded (16:9 on desktop, the 9:16 cut on phones). Reduced motion: poster only.
 * Desktop scroll: the frame scales 1 → 0.92 and gains 24px corners as the next section arrives.
 */
export function HeroBackdrop() {
  const frame = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const pick = () => setSrc(window.matchMedia("(max-width: 767px)").matches ? showreelVertical.src : showreel.src);
    if (document.readyState === "complete") pick();
    else window.addEventListener("load", pick, { once: true });
  }, []);

  useEffect(() => {
    let revert = () => {};
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !frame.current) return;
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        gsap.fromTo(
          frame.current,
          { scale: 1, borderRadius: 0 },
          { scale: 0.92, borderRadius: 24, ease: "none", scrollTrigger: { trigger: frame.current!.closest("section"), start: "top top", end: "bottom top", scrub: true } },
        );
      });
      revert = () => mm.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div ref={frame} className="absolute inset-0 origin-center overflow-hidden bg-surface will-change-transform">
        <Image src={showreel.poster} alt="" fill sizes="100vw" quality={60} className="object-cover max-md:hidden" />
        <Image src={showreelVertical.poster} alt="" fill sizes="100vw" quality={60} className="object-cover md:hidden" />
        {src && (
          <video
            src={src}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            onPlaying={() => setPlaying(true)}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
          />
        )}
        {/* Readability: #0B0C0E at 85% bottom-left fading to clear top-right */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(11,12,14,0.85)_15%,rgba(11,12,14,0.55)_50%,transparent_85%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg/70 to-transparent" />
      </div>
    </div>
  );
}
