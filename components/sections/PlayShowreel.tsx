"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Play } from "lucide-react";
import { realShowreel, showreel } from "@/data/real-media";

const VideoModal = dynamic(() => import("@/components/ui/VideoModal"), { ssr: false });

/** Glass "▶ Play showreel" pill (sits on the hero's centre reel); opens the full reel with sound. */
export function PlayShowreel({ className = "" }: { className?: string; variant?: "pill" }) {
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  return (
    <>
      <button
        type="button"
        data-cursor="play"
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
        }}
        className={`group pressable relative flex h-11 items-center gap-2 rounded-full border border-white/20 bg-black/40 pr-5 pl-1.5 text-sm font-semibold whitespace-nowrap backdrop-blur-md transition-colors hover:bg-black/60 ${className}`}
      >
        <span className="relative grid size-8 place-items-center rounded-full bg-accent text-accent-fg">
          <span aria-hidden className="showreel-ring absolute inset-0 rounded-full border border-accent/70" />
          <Play className="size-3.5 translate-x-px fill-current" aria-hidden />
        </span>
        Play showreel
      </button>
      {origin && <VideoModal video={{ ...(realShowreel ?? { src: showreel.src, poster: "" }), title: "Showreel" }} origin={origin} onClose={() => setOrigin(null)} />}
    </>
  );
}
