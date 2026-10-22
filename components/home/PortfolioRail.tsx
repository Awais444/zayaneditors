"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { caseStudies, portfolioFilters } from "@/data/portfolio";
import { VideoCard } from "@/components/ui/VideoCard";
import { DESKTOP_MOTION, loadGsap } from "@/lib/motion";

const catLabel = (v: string) => portfolioFilters.find((f) => f.value === v)?.label ?? v;

/**
 * Desktop: the section pins and vertical scroll drives the row of cards sideways; the category
 * label updates as each card passes. Elsewhere (touch, narrow, reduced motion): a native
 * horizontal swipe carousel with snap.
 */
export function PortfolioRail() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const items = caseStudies;

  useEffect(() => {
    let revert = () => {};
    let cancelled = false;
    loadGsap().then(({ gsap }) => {
      if (cancelled || !section.current) return;
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const vp = viewport.current!;
        const tr = track.current!;
        vp.classList.add("overflow-hidden");
        vp.classList.remove("overflow-x-auto", "snap-x");
        const distance = () => tr.scrollWidth - vp.clientWidth;
        let last = -1;
        gsap.to(tr, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.5,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (st) => {
              const i = Math.min(items.length - 1, Math.round(st.progress * (items.length - 1)));
              if (i !== last && label.current) {
                last = i;
                label.current.textContent = catLabel(items[i].category);
              }
            },
          },
        });
        return () => {
          vp.classList.remove("overflow-hidden");
          vp.classList.add("overflow-x-auto", "snap-x");
        };
      });
      revert = () => mm.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, [items]);

  return (
    <section ref={section} data-tl="Work" data-tl-color="rgba(56,189,248,0.4)" className="relative flex min-h-[100svh] flex-col justify-center py-16" id="work">
      <div className="container-x mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-4">Featured work</p>
          <h2 className="h-section">Work across every format</h2>
        </div>
        <p className="text-sm text-muted" aria-live="polite">
          Now showing: <span ref={label} className="font-semibold text-accent">{catLabel(items[0].category)}</span>
        </p>
      </div>
      <div ref={viewport} className="no-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain" data-cursor="drag">
        <div ref={track} className="flex w-max gap-6 px-[max(1rem,calc((100vw-80rem)/2+2rem))] will-change-transform">
          {items.map((c) => (
            <div key={c.slug} className="w-[80vw] shrink-0 snap-start sm:w-[55vw] lg:w-[34vw]">
              <VideoCard video={c.video} title={c.title} meta={`${catLabel(c.category)} · ${c.highlight}`} href={`/portfolio/${c.slug}`} />
            </div>
          ))}
          <Link href="/portfolio" className="card pressable grid w-[60vw] shrink-0 snap-start place-items-center p-10 text-center text-2xl font-semibold hover:border-white/20 sm:w-[30vw] lg:w-[20vw]">
            See all work →
          </Link>
        </div>
      </div>
    </section>
  );
}
