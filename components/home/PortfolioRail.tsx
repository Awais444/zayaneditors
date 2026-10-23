"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { PortfolioItem } from "@/data/portfolio";
import { CardRow } from "@/components/ui/CardRow";
import { ReelCard } from "./ReelCard";

const VideoModal = dynamic(() => import("@/components/ui/VideoModal"), { ssr: false });

/** Featured work: the Home (Talking Head) reels in a horizontal CardRow (swipe, drag, arrows, keys). */
export function PortfolioRail({ items }: { items: PortfolioItem[] }) {
  const [open, setOpen] = useState<{ p: PortfolioItem; origin: { x: number; y: number } } | null>(null);

  // Real media only: with no real projects yet the section is hidden rather than showing stock
  if (!items.length) return null;

  return (
    <section data-tl="Work" data-tl-color="rgba(56,189,248,0.4)" className="section" id="work">
      <CardRow
        label="Featured work"
        itemClassName="w-[70vw] sm:w-[16rem] lg:w-[17.5rem]"
        header={
          <div className="mb-10">
            <p className="eyebrow mb-4">Featured work</p>
            <h2 className="h-section max-w-3xl">Talking head videos that keep people watching</h2>
          </div>
        }
      >
        {items.map((c) => (
          <ReelCard key={c.slug} p={c} onOpen={(origin) => setOpen({ p: c, origin })} />
        ))}
        <Link href="/portfolio" className="card pressable grid aspect-[9/16] place-items-center rounded-[20px] p-8 text-center text-2xl font-semibold hover:border-white/20">
          See all work →
        </Link>
      </CardRow>
      {/* Modal plays the original preview in its true aspect ratio */}
      {open && <VideoModal video={{ src: open.p.preview.mp4, poster: open.p.poster, title: open.p.title }} origin={open.origin} onClose={() => setOpen(null)} />}
    </section>
  );
}
