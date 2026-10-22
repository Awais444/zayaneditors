"use client";
import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect } from "react";
import { Check } from "lucide-react";
import { site } from "@/data/site";
import { sampleVideo } from "@/data/media";
import { InViewVideo } from "@/components/home/InViewVideo";
import { cn } from "@/lib/utils";

const shortClip = sampleVideo("Short-form clip", 2);
const bars = [40, 70, 55, 90, 65, 35, 80, 60, 95, 50, 70, 45, 85, 55, 30, 75];

/** Layer that shifts with the pointer by `depth` px (critically damped spring, full transform string). */
function Depth({ px, py, depth, className, children }: { px: MotionValue<number>; py: MotionValue<number>; depth: number; className?: string; children: React.ReactNode }) {
  const transform = useTransform([px, py], ([x, y]: number[]) => `translate3d(${(x * depth).toFixed(2)}px, ${(y * depth).toFixed(2)}px, 0)`);
  return (
    <motion.div style={{ transform }} className={cn("absolute", className)}>
      {/* Separate element for HeroMotion's scroll drift so GSAP and the parallax don't fight over one transform */}
      <div data-depth={depth}>{children}</div>
    </motion.div>
  );
}

/** Glass chip: enters with a staggered spring-like rise, then floats gently (CSS, composited). */
function Chip({ i, children, className }: { i: number; children: React.ReactNode; className?: string }) {
  return (
    <div className="chip-in" style={{ "--i": i } as React.CSSProperties}>
      <div className="chip-float" style={{ "--f": i } as React.CSSProperties}>
        <div className={cn("flex items-center gap-2 rounded-2xl border border-white/10 bg-surface/80 px-4 py-2.5 text-sm font-medium shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md", className)}>
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * "Editing Workspace" collage for the hero's right column (desktop only):
 * a 16:9 showreel card, an overlapping 9:16 phone card, and floating status chips.
 * Pointer parallax at different depths (fine pointer, motion allowed); scroll drift is
 * driven by HeroMotion's timeline via the [data-depth] layers.
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
    <div aria-hidden data-collage className="relative hidden h-[34rem] lg:block">
      {/* Main 16:9 showreel card */}
      <Depth px={px} py={py} depth={8} className="top-16 left-0 w-[min(32.5rem,84%)]">
        <div className="chip-in" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="relative aspect-video overflow-hidden rounded-[20px] border border-line bg-surface shadow-[0_40px_120px_-40px_rgba(198,244,50,0.35)]">
            <InViewVideo src={site.showreel.src} poster={site.showreel.poster} className="size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-3 text-xs text-white/80">
              <span className="size-2 rounded-full bg-accent" /> showreel_final_v3.mp4
            </div>
          </div>
        </div>
      </Depth>

      {/* 9:16 phone card overlapping the top-right corner */}
      <Depth px={px} py={py} depth={14} className="top-0 right-[2%] w-[12.5rem]">
        <div className="chip-in" style={{ "--i": 1 } as React.CSSProperties}>
          <div className="rotate-[4deg] rounded-[28px] border-[5px] border-surface-2 bg-surface p-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[23px]">
              <InViewVideo src={shortClip.src} poster={shortClip.poster} className="size-full object-cover" />
              <span className="absolute top-2 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/60" />
            </div>
          </div>
        </div>
      </Depth>

      {/* Floating chips at different depths */}
      <Depth px={px} py={py} depth={12} className="top-[18.5rem] -left-6">
        <Chip i={2}><Check className="size-4 text-accent" /> Color graded</Chip>
      </Depth>
      <Depth px={px} py={py} depth={10} className="top-[22.5rem] left-[38%]">
        <Chip i={3}><Check className="size-4 text-accent" /> Captions added</Chip>
      </Depth>
      <Depth px={px} py={py} depth={13} className="top-[27rem] left-[6%]">
        <Chip i={4} className="w-60 flex-col items-stretch gap-1.5">
          <span className="flex justify-between"><span>Export 4K</span><span className="text-accent">100%</span></span>
          <span className="block h-1.5 overflow-hidden rounded-full bg-white/10"><span className="export-bar block h-full rounded-full bg-accent" /></span>
        </Chip>
      </Depth>
      <Depth px={px} py={py} depth={9} className="top-[26rem] right-[4%]">
        <Chip i={5} className="h-11 gap-[3px] px-3">
          {bars.map((h, i) => (
            <span key={i} className="wave-bar w-[3px] rounded-full bg-accent" style={{ height: `${h}%`, "--i": i } as React.CSSProperties} />
          ))}
        </Chip>
      </Depth>
    </div>
  );
}
