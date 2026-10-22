"use client";
import { useEffect, useRef } from "react";
import { processSteps } from "@/components/sections/Process";
import { DESKTOP_MOTION, loadGsap } from "@/lib/motion";

/**
 * Sticky stacking cards: each step pins under the header and the next one slides over it,
 * scaling the previous card down slightly. Desktop with motion only; elsewhere a simple list.
 */
export function ProcessStack() {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    let revert = () => {};
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !list.current) return;
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const cards = gsap.utils.toArray<HTMLElement>(list.current!.querySelectorAll("[data-step]"));
        cards.slice(0, -1).forEach((card, i) => {
          // Scale the card and fade in a dark overlay (not card opacity, which would show the card beneath)
          const st = { trigger: cards[i + 1], start: "top bottom", end: "top 22%", scrub: true };
          gsap.to(card, { scale: 0.92, ease: "none", scrollTrigger: st });
          gsap.to(card.querySelector("[data-dim]"), { opacity: 0.55, ease: "none", scrollTrigger: st });
        });
      });
      revert = () => mm.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <section data-tl="Process" data-tl-color="rgba(251,191,36,0.4)" className="section">
      <div className="container-x">
        <p className="eyebrow mb-4">Process</p>
        <h2 className="h-section mb-12 max-w-3xl">From raw footage to upload in 7 steps</h2>
        <ol ref={list} className="space-y-4 lg:space-y-0">
          {processSteps.map((s, i) => (
            <li key={s.title} className="lg:sticky lg:h-[60vh]" style={{ top: `calc(7rem + ${i * 14}px)` }}>
              <div data-step className="card relative flex h-full origin-top flex-col justify-between gap-8 p-8 md:flex-row md:items-end md:p-12">
                <div data-dim aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] bg-bg opacity-0" />
                <span className="font-sans text-[clamp(4rem,10vw,8rem)] leading-none font-bold tracking-[-0.05em] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div className="max-w-xl">
                  <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">{s.title}</h3>
                  <p className="mt-3 text-lg text-muted">{s.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
