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

  const stage = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  // Arm visuals (hide their start state) and play each once when its card becomes active.
  // Mobile: as each card scrolls into view. Desktop: driven by the pinned timeline below.
  useEffect(() => {
    if (prefersReducedMotion() || !list.current) return;
    const cards = [...list.current.querySelectorAll<HTMLElement>("[data-step]")];
    cards.forEach((c) => c.classList.add("pv-armed"));
    if (window.matchMedia(DESKTOP_MOTION).matches) return;
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

  // Desktop: pin the stage and swap cards in place, ~20vh of scroll per step. The incoming card
  // slides up over the active one (opaque, so nothing shows through); the previous two shrink
  // back to thin edges above it and anything older fades out. One scrubbed progress bar.
  useEffect(() => {
    let revert = () => {};
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !list.current || !stage.current) return;
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const ol = list.current!;
        const items = gsap.utils.toArray<HTMLElement>(ol.children);
        const cards = items.map((li) => li.querySelector<HTMLElement>("[data-step]")!);
        const h = Math.max(...cards.map((c) => c.offsetHeight));
        gsap.set(ol, { position: "relative", height: h + 32, overflow: "hidden" });
        gsap.set(items, { position: "absolute", left: 0, right: 0, top: 32 });
        gsap.set(items.slice(1), { yPercent: 110 });
        cards[0].classList.add("pv-active");

        const tl = gsap.timeline({
          defaults: { ease: "none", duration: 1 },
          scrollTrigger: {
            trigger: stage.current,
            start: "top 88px",
            end: () => `+=${(items.length - 1) * window.innerHeight * 0.2}`,
            pin: true,
            scrub: 0.4,
            invalidateOnRefresh: true,
            onUpdate: (st) => {
              const active = Math.round(st.progress * (items.length - 1));
              cards.slice(0, active + 1).forEach((c) => c.classList.add("pv-active"));
            },
          },
        });
        tl.fromTo(bar.current, { scaleX: 1 / items.length }, { scaleX: 1, duration: items.length - 1 }, 0);
        items.slice(1).forEach((li, i) => {
          const at = i;
          tl.to(li, { yPercent: 0 }, at);
          tl.to(items[i], { y: -12, scale: 0.96 }, at);
          tl.to(cards[i].querySelector("[data-dim]"), { opacity: 0.45 }, at);
          if (items[i - 1]) tl.to(items[i - 1], { y: -24, scale: 0.92 }, at);
          if (items[i - 2]) tl.to(items[i - 2], { autoAlpha: 0 }, at);
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
        <div ref={stage} className="mx-auto max-w-[75rem]">
        {/* The one progress bar (desktop pinned stage only) */}
        <div aria-hidden className="hidden h-[3px] overflow-hidden rounded-full bg-white/10 lg:block">
          <span ref={bar} className="block h-full origin-left scale-x-0 bg-accent" />
        </div>
        <ol ref={list} className="space-y-6 lg:space-y-0">
          {steps.map((s, i) => {
            const Visual = visuals[i];
            return (
              <li key={s.title} className="origin-top">
                <article
                  data-step
                  className={cn(
                    "relative grid origin-top overflow-hidden rounded-3xl border border-line bg-surface", Visual && "lg:h-[26.25rem] lg:grid-cols-[2fr_3fr]",
                    "bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px]",
                  )}
                >
                  {/* Corner glow alternates lime / violet */}
                  <div aria-hidden className={cn("pointer-events-none absolute size-96 rounded-full blur-3xl", i % 2 ? "-right-32 -bottom-40 bg-accent-2/15" : "-top-40 -left-32 bg-accent/10")} />

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
      </div>
    </section>
  );
}
