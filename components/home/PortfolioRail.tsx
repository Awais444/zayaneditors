"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { PortfolioItem } from "@/data/portfolio";
import { ReelCard } from "./ReelCard";

const VideoModal = dynamic(() => import("@/components/ui/VideoModal"), { ssr: false });
import { DESKTOP_MOTION, loadGsap } from "@/lib/motion";


/**
 * Desktop: the section pins and vertical scroll drives the row of cards sideways; the category
 * row shows the Home (Talking Head) items. Elsewhere (touch, narrow, reduced motion): a native
 * horizontal swipe carousel with snap.
 */
export function PortfolioRail({ items }: { items: PortfolioItem[] }) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<{ p: PortfolioItem; origin: { x: number; y: number } } | null>(null);

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

  // Real media only: with no real projects yet the section is hidden rather than showing stock
  if (!items.length) return null;

  return (
    <section ref={section} data-tl="Work" data-tl-color="rgba(56,189,248,0.4)" className="relative flex min-h-[100svh] flex-col justify-center py-16" id="work">
      <div className="container-x mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-4">Featured work</p>
          <h2 className="h-section max-w-3xl">Talking head videos that keep people watching</h2>
        </div>
      </div>
      {/* Right-edge fade so the peeking last card reads as intentional */}
      <div ref={viewport} className="no-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain [mask-image:linear-gradient(to_right,#000_85%,transparent)]" data-cursor="drag">
        <div ref={track} className="flex w-max gap-5 px-[max(1rem,calc((100vw-80rem)/2+2rem))] will-change-transform">
          {items.map((c) => (
            <div key={c.slug} className="w-[70vw] shrink-0 snap-start sm:w-[16rem] lg:w-[17.5rem]">
              <ReelCard p={c} onOpen={(origin) => setOpen({ p: c, origin })} />
            </div>
          ))}
          <Link href="/portfolio" className="card pressable grid aspect-[9/16] w-[70vw] shrink-0 snap-start place-items-center self-start rounded-[20px] p-8 text-center text-2xl font-semibold hover:border-white/20 sm:w-[16rem] lg:w-[17.5rem]">
            See all work →
          </Link>
        </div>
      </div>
      {/* Modal plays the original preview in its true aspect ratio */}
      {open && <VideoModal video={{ src: open.p.preview.mp4, poster: open.p.poster, title: open.p.title }} origin={open.origin} onClose={() => setOpen(null)} />}
    </section>
  );
}
