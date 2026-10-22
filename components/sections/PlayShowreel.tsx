"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Play } from "lucide-react";
import { realShowreel, showreel } from "@/data/real-media";

const VideoModal = dynamic(() => import("@/components/ui/VideoModal"), { ssr: false });

/** 80px glass "Play showreel" button with a soft pulsing ring; opens the full reel with sound. */
export function PlayShowreel({ className = "" }: { className?: string }) {
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
        className={`group pressable relative flex items-center gap-4 text-left ${className}`}
      >
        <span className="relative grid size-20 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-colors group-hover:bg-white/20">
          <span aria-hidden className="showreel-ring absolute inset-0 rounded-full border border-accent/60" />
          <Play className="size-7 translate-x-0.5 fill-accent text-accent" aria-hidden />
        </span>
        <span className="text-sm font-semibold">Play showreel</span>
      </button>
      {origin && <VideoModal video={{ ...(realShowreel ?? { src: showreel.src, poster: "" }), title: "Showreel" }} origin={origin} onClose={() => setOrigin(null)} />}
    </>
  );
}
