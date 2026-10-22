import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { site } from "@/data/site";
import { editors } from "@/data/team";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroBackdrop } from "./HeroBackdrop";
import { PlayShowreel } from "./PlayShowreel";

/** One staggered reveal line (transform only, so the H1 is painted at first paint for LCP). */
const line = (i: number) => ({ className: "hero-line block", style: { "--i": i } as React.CSSProperties });

/**
 * Full-screen showreel hero: background reel with a readability gradient, content anchored
 * bottom-left in the page container, glass "Play showreel" button bottom-right.
 */
export function Hero() {
  return (
    <section data-hero data-tl="Hero" data-tl-color="rgba(198,244,50,0.35)" className="relative isolate flex min-h-[min(100svh,900px)] overflow-hidden">
      <HeroBackdrop />
      <div className="container-x relative flex w-full flex-col justify-end gap-10 pt-16 pb-12 md:pb-16">
        <div className="max-w-6xl">
          <p {...line(0)} className="hero-line mb-5 text-xs font-semibold tracking-[0.14em] text-accent uppercase">A team of professional video editors</p>
          <h1 className="text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.03em]">
            <span {...line(1)}>Video editing</span>
            <span {...line(2)} className="hero-line block md:whitespace-nowrap">for <span className="text-accent">every kind</span> of video</span>
          </h1>
          <p {...line(3)} className="hero-line mt-6 max-w-xl text-lg text-white/80">
            Send raw footage, get a polished first cut in {site.turnaround} — one dedicated team for it all.
          </p>
          <div {...line(4)} className="hero-line mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Magnetic>
              <Button href="/free-trial-edit" size="lg">Get a Free Trial Edit</Button>
            </Magnetic>
            <Link href="/portfolio" className="font-semibold underline-offset-4 hover:text-accent hover:underline">Watch our work →</Link>
          </div>
          <div {...line(5)} className="hero-line mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/75">
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
        </div>
        <div {...line(6)} className="hero-line md:absolute md:right-8 md:bottom-16">
          <PlayShowreel />
        </div>
      </div>
    </section>
  );
}
