"use client";
import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { DESKTOP_MOTION, loadGsap, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";




/**
 * Process as stacking cards (desktop): each card pins below the header, the next slides over it
 * while the previous scales to 0.95 and dims to 60%. Each card's visual plays once when the
 * card becomes active. Mobile: plain vertical cards (visual on top). Reduced motion: final states.
 */
export type Step = { title: string; text?: string; bullets?: string[]; duration?: string; deliverable?: string };

export function StickySteps({
  steps,
  visuals = [],
  eyebrow = "Process",
  title,
  tl = "Process",
}: {
  steps: Step[];
  /** Optional visual per step (rendered on the right / on top on mobile) */
  visuals?: React.ComponentType[];
  eyebrow?: string;
  title: string;
  /** Master-timeline label */
  tl?: string;
}) {
  const list = useRef<HTMLOListElement>(null);

  // Arm visuals (hide their start state) and play each once when its card becomes active
  useEffect(() => {
    if (prefersReducedMotion() || !list.current) return;
    const cards = [...list.current.querySelectorAll<HTMLElement>("[data-step]")];
    cards.forEach((c) => c.classList.add("pv-armed"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("pv-active");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -45% 0px", threshold: 0.35 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  // Desktop stacking: previous card scales down and dims as the next one arrives
  useEffect(() => {
    let revert = () => {};
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !list.current) return;
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const cards = gsap.utils.toArray<HTMLElement>(list.current!.querySelectorAll("[data-step]"));
        cards.slice(0, -1).forEach((card, i) => {
          const st = { trigger: cards[i + 1], start: "top bottom", end: "top 30%", scrub: true };
          gsap.to(card, { scale: 0.95, ease: "none", scrollTrigger: st });
          gsap.to(card.querySelector("[data-dim]"), { opacity: 0.4, ease: "none", scrollTrigger: st });
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
    <section data-tl={tl} data-tl-color="rgba(251,191,36,0.4)" className="section">
      <div className="container-x">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="h-section mb-12 max-w-3xl">{title}</h2>
        <ol ref={list} className="mx-auto max-w-[75rem] space-y-6 lg:space-y-0">
          {steps.map((s, i) => {
            const Visual = visuals[i];
            return (
              <li key={s.title} className="lg:sticky lg:pb-10" style={{ top: `calc(6.5rem + ${i * 16}px)` }}>
                <article
                  data-step
                  className={cn(
                    "relative grid origin-top overflow-hidden rounded-3xl border border-line bg-surface", Visual && "lg:h-[26.25rem] lg:grid-cols-[2fr_3fr]",
                    "bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px]",
                  )}
                >
                  {/* Corner glow alternates lime / violet */}
                  <div aria-hidden className={cn("pointer-events-none absolute size-96 rounded-full blur-3xl", i % 2 ? "-right-32 -bottom-40 bg-accent-2/15" : "-top-40 -left-32 bg-accent/10")} />
                  {/* Step progress */}
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-white/5">
                    <span className="block h-full origin-left bg-accent" style={{ transform: `scaleX(${(i + 1) / steps.length})` }} />
                  </div>

                  <div className="relative order-2 flex flex-col p-6 md:p-8 lg:order-1">
                    <p className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">Step {i + 1} of {steps.length}</p>
                    <span className="mt-2 font-sans text-[4.5rem] leading-none font-bold tracking-[-0.05em] text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">{s.title}</h3>
                    {s.text && <p className="mt-2 text-muted lg:line-clamp-2">{s.text}</p>}
                    {s.bullets && (
                      <ul className="mt-4 space-y-1.5 text-sm">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />{b}</li>
                        ))}
                      </ul>
                    )}
                    {(s.duration || s.deliverable) && (
                      <div className="mt-auto flex flex-wrap gap-2 pt-5 text-xs">
                        {s.duration && <span className="rounded-full border border-line bg-bg/60 px-3 py-1.5">⏱ {s.duration}</span>}
                        {s.deliverable && <span className="rounded-full border border-line bg-bg/60 px-3 py-1.5">📦 {s.deliverable}</span>}
                      </div>
                    )}
                  </div>
                  {Visual && (
                    <div className="relative order-1 p-4 md:p-6 lg:order-2 lg:pl-0">
                      <Visual />
                    </div>
                  )}
                  {/* Dimming overlay driven by the stack animation (≈60% brightness at full) */}
                  <div data-dim aria-hidden className="pointer-events-none absolute inset-0 bg-black opacity-0" />
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
