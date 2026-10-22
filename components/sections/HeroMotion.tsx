"use client";
import { useEffect, useRef } from "react";
import { DESKTOP_MOTION, loadGsap } from "@/lib/motion";

/**
 * Pins the hero on desktop and scrubs the masked word up into a full-bleed showreel.
 * Text fades out first; near the end the letter clip is released so the reel fills the screen.
 */
export function HeroMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    let revert = () => {};
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const section = root.current!;
        const word = section.querySelector<HTMLElement>("[data-mask-word]")!;
        const media = word.querySelector<HTMLElement>("[data-video-text-media]")!;
        const clip = media.style.clipPath;
        // Fade the parents of the CSS-animated words (CSS animations would override inline styles on the words)
        const fades = section.querySelectorAll<HTMLElement>(".hero-fade");
        // Layout offsets ignore transforms, so this stays correct when re-measured mid-animation
        const fit = () => {
          let left = 0, top = 0;
          for (let el: HTMLElement | null = word; el && el !== section; el = el.offsetParent as HTMLElement | null) {
            left += el.offsetLeft;
            top += el.offsetTop;
          }
          const w = word.offsetWidth, h = word.offsetHeight;
          return {
            x: window.innerWidth / 2 - (left + w / 2),
            y: window.innerHeight / 2 - (top + h / 2),
            scale: Math.max(window.innerWidth / w, window.innerHeight / h) * 1.15,
          };
        };
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=130%",
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
            // Letters are huge by now; drop the clip so the showreel goes full-bleed
            onUpdate: (st) => (media.style.clipPath = st.progress > 0.72 ? "none" : clip),
          },
        });
        // Collage layers drift up at different speeds (deeper = faster) and fade as the reel takes over
        section.querySelectorAll<HTMLElement>("[data-collage] [data-depth]").forEach((el) => {
          const d = Number(el.dataset.depth);
          tl.to(el, { y: -d * 14, opacity: 0, duration: 0.35 }, 0);
        });
        tl.to(fades, { opacity: 0, y: -40, duration: 0.25 }, 0)
          .to(word, { x: () => fit().x, y: () => fit().y, scale: () => fit().scale, duration: 0.8, transformOrigin: "50% 50%" }, 0.05)
          .to({}, { duration: 0.25 }); // hold on the full-bleed reel before unpinning
      });
      revert = () => mm.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <section ref={root} data-hero data-tl="Hero" data-tl-color="rgba(198,244,50,0.35)" className="relative isolate overflow-hidden">
      {children}
    </section>
  );
}
