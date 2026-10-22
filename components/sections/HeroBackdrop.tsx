"use client";
import { useEffect, useRef, useState } from "react";
import { realShowreel, realShowreelVertical } from "@/data/real-media";
import { DESKTOP_MOTION, loadGsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Hero background. Only the real showreel is used (public/videos/showreel.mp4 with poster
 * public/posters/showreel.webp; showreel-vertical.* for phones). Until it exists: plain #0B0C0E
 * with a soft lime/violet glow — never a stock image. The muted loop attaches after the page has
 * loaded; reduced motion keeps the poster. Desktop scroll: scales 1 → 0.92 with 24px corners.
 */
export function HeroBackdrop() {
  const frame = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const reel = realShowreel;

  useEffect(() => {
    if (!reel || prefersReducedMotion()) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const pick = () => setSrc(window.matchMedia("(max-width: 767px)").matches && realShowreelVertical ? realShowreelVertical.src : reel.src);
    if (document.readyState === "complete") pick();
    else window.addEventListener("load", pick, { once: true });
  }, [reel]);

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
      <div ref={frame} className="absolute inset-0 origin-center overflow-hidden bg-bg will-change-transform">
        {reel ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- local WebP poster, already sized */}
            <img src={realShowreelVertical?.poster ?? reel.poster} alt="" className="absolute inset-0 size-full object-cover md:hidden" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={reel.poster} alt="" className="absolute inset-0 size-full object-cover max-md:hidden" />
            {src && (
              <video
                src={src}
                muted
                loop
                playsInline
                autoPlay
                preload="none"
                onPlaying={() => setPlaying(true)}
                className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
              />
            )}
          </>
        ) : (
          <>
            <div className="absolute -top-1/4 right-[-10%] size-[60vmax] rounded-full bg-accent/10 blur-[120px]" />
            <div className="absolute -bottom-1/3 right-1/4 size-[50vmax] rounded-full bg-accent-2/15 blur-[120px]" />
          </>
        )}
        {/* Calm dark backing for the text: left-to-right scrim plus a bottom fade into the page */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,12,14,0.92)_0%,rgba(11,12,14,0.75)_45%,rgba(11,12,14,0.25)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
      </div>
    </div>
  );
}
