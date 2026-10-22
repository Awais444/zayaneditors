import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { site } from "@/data/site";
import { editors } from "@/data/team";
import { sampleVideo } from "@/data/media";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { VideoText } from "@/components/ui/VideoText";
import { InViewVideo } from "@/components/home/InViewVideo";
import { HeroMotion } from "./HeroMotion";
import { EditingWorkspace } from "./EditingWorkspace";

const tail = ["for", "every", "kind", "of", "video"];
const shortClip = sampleVideo("Short-form clip", 2);
const big = "block text-[clamp(3rem,min(6.6vw,15svh),7.25rem)] leading-[0.9]";

/**
 * Kinetic hero: text column (left) + "Editing Workspace" collage (right, desktop).
 * All copy is real DOM text (SEO); the word "EDITING" is a video mask.
 * Desktop: pinned, and the masked word scales up into a full-bleed showreel on scroll.
 * Mobile / reduced motion: stacked layout with a single 9:16 card under the CTAs.
 */
export function Hero() {
  return (
    <HeroMotion>
      <div className="container-x relative grid min-h-[calc(100svh-6.5rem)] items-center gap-12 pt-10 pb-14 lg:grid-cols-2 lg:gap-10">
        <div>
          <p className="hero-fade mb-6 text-xs font-semibold tracking-[0.14em] text-accent uppercase">A team of professional video editors</p>
          <h1 className="font-bold uppercase">
            <span className={`hero-fade ${big} tracking-[-0.04em]`}>
              <span className="kinetic-word" style={{ "--i": 0 } as React.CSSProperties}>Video</span>
            </span>
            <span className={`${big} tracking-[-0.02em]`}>
              <span className="kinetic-word" style={{ "--i": 1 } as React.CSSProperties}>
                <span data-mask-word className="inline-block">
                  <VideoText text="EDITING" stroke />
                </span>
              </span>
            </span>
            <span className="hero-fade mt-4 block text-[clamp(1.25rem,2.2vw,2rem)] leading-tight font-semibold tracking-[-0.02em] normal-case text-muted">
              {tail.map((w, i) => (
                <span key={w} className="kinetic-word mr-[0.25em]" style={{ "--i": i + 2 } as React.CSSProperties}>
                  {w}
                </span>
              ))}
            </span>
          </h1>
          <div className="hero-fade mt-7">
            <p className="max-w-xl text-lg text-muted">
              Send raw footage, get a polished first cut in {site.turnaround}. From YouTube to weddings, one dedicated team edits it all.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Magnetic>
                <Button href="/free-trial-edit" size="lg">Get a Free Trial Edit</Button>
              </Magnetic>
              <Link href="/portfolio" className="font-semibold underline-offset-4 hover:text-accent hover:underline">Watch our work →</Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
              <Link href="/team" className="flex -space-x-2.5" aria-label="Meet your editors">
                {editors.slice(0, 4).map((m) => (
                  <Image key={m.slug} src={m.avatar} alt={m.name} width={36} height={36} className="size-9 rounded-full border-2 border-bg object-cover" />
                ))}
              </Link>
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-accent text-accent" aria-hidden />
                <span><strong className="font-semibold text-fg">{site.trust.rating}</strong> from {site.trust.clients} clients</span>
              </span>
              <span><strong className="font-semibold text-fg">{site.trust.videosDelivered}</strong> videos delivered</span>
            </div>
            {/* Mobile: one vertical short-form card instead of the collage */}
            <div className="relative mx-auto mt-10 aspect-[9/16] w-56 overflow-hidden rounded-[28px] border-4 border-surface-2 bg-surface shadow-[0_30px_80px_-30px_rgba(198,244,50,0.35)] lg:hidden">
              <InViewVideo src={shortClip.src} poster={shortClip.poster} className="size-full object-cover" />
            </div>
          </div>
        </div>
        <EditingWorkspace />
      </div>
    </HeroMotion>
  );
}
