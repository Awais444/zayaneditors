"use client";
import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect } from "react";
import { Check } from "lucide-react";
import { site } from "@/data/site";
import { getCaseStudy } from "@/data/portfolio";
import { InViewVideo } from "@/components/ui/InViewVideo";
import { cn } from "@/lib/utils";
import { GlassChip as Chip } from "./GlassChip";

// TODO: swap for a real showreel poster frame and a real talking-head / UGC vertical reel
const reelPoster = getCaseStudy("travel-vlog-rebrand")!.video.poster;
const verticalReel = getCaseStudy("dtc-skincare-ugc-ads")!.video;
const captionWords = ["This", "edit", "doubled", "our", "sales"];
const bars = [45, 80, 60, 95, 55, 75, 40, 85];

/** Absolutely positioned layer (positions in % of the 5:4 wrapper) that shifts with the pointer by `depth` px. */
function Layer({ px, py, depth, className, children }: { px: MotionValue<number>; py: MotionValue<number>; depth: number; className: string; children: React.ReactNode }) {
  const transform = useTransform([px, py], ([x, y]: number[]) => `translate3d(${(x * depth).toFixed(2)}px, ${(y * depth).toFixed(2)}px, 0)`);
  return (
    <motion.div style={{ transform }} className={cn("absolute", className)}>
      {/* Inner element for HeroMotion's scroll drift, so GSAP and the parallax never share a transform */}
      <div data-depth={depth}>{children}</div>
    </motion.div>
  );
}

/** 9:16 phone with a vertical reel and burned-in style captions (word-by-word lime highlight). */
export function PhoneReel({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-[28px] border-[5px] border-surface-2 bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]", className)}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[23px] bg-black">
        <InViewVideo src={verticalReel.src} poster={verticalReel.poster} className="size-full object-cover" />
        <span className="absolute top-2 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-black/70" />
        <p className="absolute inset-x-2 bottom-[18%] flex flex-wrap justify-center gap-x-1 text-center text-[clamp(0.75rem,1.1vw,0.95rem)] leading-tight font-extrabold uppercase [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">
          {captionWords.map((w, i) => (
            <span key={w} className="caption-word" style={{ "--i": i, "--n": captionWords.length } as React.CSSProperties}>
              {w}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

/**
 * "Editing Workspace" collage (desktop): a fixed 5:4 wrapper with children positioned in %,
 * inset by a 32px safe area so nothing is clipped. Main 16:9 card (80%), phone card (30%)
 * overlapping only its bottom-right corner, and three chips on the card edges.
 * Pointer parallax at small, separated depths so chips never collide; scroll drift via HeroMotion.
 */
export function EditingWorkspace() {
  const reduce = useReducedMotion();
  const px = useSpring(0, { stiffness: 120, damping: 22 });
  const py = useSpring(0, { stiffness: 120, damping: 22 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  return (
    <div aria-hidden data-collage className="hidden p-8 lg:block">
      <div className="relative mx-auto aspect-[5/4] w-full max-w-[38rem]">
        {/* Main 16:9 showreel card: 80% wide, top-left, subtle -2° */}
        <Layer px={px} py={py} depth={6} className="top-[6%] left-[2%] w-[80%]">
          <div className="chip-in" style={{ "--i": 0 } as React.CSSProperties}>
            <div className="relative aspect-video -rotate-2 overflow-hidden rounded-[20px] border border-line bg-surface shadow-[0_40px_120px_-40px_rgba(198,244,50,0.35)]">
              <InViewVideo src={site.showreel.src} poster={reelPoster} className="size-full object-cover" />
            </div>
          </div>
        </Layer>

        {/* Phone card: 30% wide, bottom-right, overlapping only the main card's corner */}
        <Layer px={px} py={py} depth={12} className="right-[1%] bottom-[1%] w-[30%]">
          <div className="chip-in" style={{ "--i": 1 } as React.CSSProperties}>
            <PhoneReel className="rotate-[4deg]" />
          </div>
        </Layer>

        {/* Chips, each anchored to a card edge */}
        <Layer px={px} py={py} depth={9} className="top-[1%] left-0">
          <Chip i={2}><Check className="size-4 text-accent" aria-hidden /> Color graded</Chip>
        </Layer>
        <Layer px={px} py={py} depth={10} className="right-[30%] bottom-[30%]">
          <Chip i={3}><Check className="size-4 text-accent" aria-hidden /> Captions added</Chip>
        </Layer>
        <Layer px={px} py={py} depth={8} className="bottom-[2%] left-[2%] w-[52%]">
          <Chip i={4} className="gap-3">
            <span className="flex h-6 items-center gap-[2px]" aria-hidden>
              {bars.map((h, i) => (
                <span key={i} className="wave-bar w-[3px] rounded-full bg-accent" style={{ height: `${h}%`, "--i": i } as React.CSSProperties} />
              ))}
            </span>
            <span className="flex flex-1 flex-col gap-1.5">
              <span className="flex justify-between gap-3"><span>Export 4K</span><span className="text-accent">100%</span></span>
              <span className="block h-1.5 overflow-hidden rounded-full bg-white/10"><span className="export-bar block h-full rounded-full bg-accent" /></span>
            </span>
          </Chip>
        </Layer>
      </div>
    </div>
  );
}
