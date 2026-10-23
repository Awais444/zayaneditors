import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { site } from "@/data/site";
import { editors } from "@/data/team";
import { work } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroReelMobile, HeroReels, type HeroReel } from "./HeroReels";

/** One staggered reveal line (transform only, so the H1 is painted at first paint for LCP). */
const line = (i: number) => ({ className: "hero-line block", style: { "--i": i } as React.CSSProperties });

/** Three real vertical clips from different categories for the reels fan (left, centre, right). */
const pick = (slug: string, label: string): HeroReel | null => {
  const p = work.find((w) => w.slug === slug);
  return p?.verticalPreview && p.verticalPoster ? { slug, label, src: p.verticalPreview, poster: p.verticalPoster, alt: p.altText } : null;
};
const reels = [
  pick("foundation-cushion-ugc-ad", "UGC Ad"),
  pick("doctor-sleep-tips-raw-vs-edit-reel", "Talking Head"),
  pick("locsmart-ai-story-ad", "AI Video"),
].filter((r): r is HeroReel => !!r);

function Trust({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/75 ${className}`}>
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
  );
}

/**
 * Hero: text (55%) and a "reels fan" of real portfolio clips (45%), vertically centred inside the
 * page container. Mobile: text, CTAs, the centre reel, then the trust row.
 */
export function Hero() {
  return (
    <section
      data-hero
      data-tl="Hero"
      data-tl-color="rgba(198,244,50,0.35)"
      className="relative isolate flex min-h-[min(820px,calc(100svh-7rem))] items-center overflow-hidden pt-[clamp(48px,8vh,96px)] pb-[clamp(64px,8vh,96px)]"
    >
      <HeroBackdrop />
      <div className="container-x grid w-full items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-8">
        <div>
          <p {...line(0)} className="hero-line mb-4 text-xs font-semibold tracking-[0.14em] text-accent uppercase">A team of professional video editors</p>
          <h1 className="text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[1.02] font-bold tracking-[-0.03em]">
            <span {...line(1)}>Video editing</span>
            <span {...line(2)}>for <span className="text-accent">every kind</span> of video</span>
          </h1>
          <p {...line(3)} className="hero-line mt-5 max-w-xl text-lg text-white/80">
            Send raw footage, get a polished first cut in {site.turnaround} — one dedicated team for it all.
          </p>
          <div {...line(4)} className="hero-line mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Magnetic>
              <Button href="/free-trial-edit" size="lg">Get a Free Trial Edit</Button>
            </Magnetic>
            <Link href="/portfolio" className="font-semibold underline-offset-4 hover:text-accent hover:underline">Watch our work →</Link>
          </div>
          {reels[1] && (
            <div {...line(5)} className="hero-line mt-10 lg:hidden">
              <HeroReelMobile reel={reels[1]} />
            </div>
          )}
          <div {...line(6)} className="hero-line mt-8">
            <Trust />
          </div>
        </div>
        {reels.length === 3 && (
          <div className="hidden lg:block">
            <HeroReels reels={reels} />
          </div>
        )}
      </div>
    </section>
  );
}
