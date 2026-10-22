import { Check } from "lucide-react";
import { InViewVideo } from "@/components/ui/InViewVideo";
import { GlassChip } from "./GlassChip";

/**
 * PageHero visual: a 16:9 card playing a muted preview with up to two glass chips on its edges
 * (top-left, bottom-right). Kept inside a 32px safe area so nothing clips.
 */
export function HeroVideoCard({ video, chips = [] }: { video: { src: string; poster: string }; chips?: string[] }) {
  return (
    <div aria-hidden className="relative px-2 py-6 sm:px-6">
      <div className="chip-in" style={{ "--i": 0 } as React.CSSProperties}>
        <div className="relative aspect-video -rotate-1 overflow-hidden rounded-[20px] border border-line bg-surface shadow-[0_40px_120px_-40px_rgba(198,244,50,0.35)]">
          <InViewVideo src={video.src} poster={video.poster} className="size-full object-cover" />
        </div>
      </div>
      {chips[0] && (
        <div className="absolute top-0 left-0">
          <GlassChip i={1}><Check className="size-4 text-accent" aria-hidden /> {chips[0]}</GlassChip>
        </div>
      )}
      {chips[1] && (
        <div className="absolute right-0 bottom-0">
          <GlassChip i={2}><Check className="size-4 text-accent" aria-hidden /> {chips[1]}</GlassChip>
        </div>
      )}
    </div>
  );
}
