import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { site } from "@/data/site";
import { editors } from "@/data/team";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { RotatingWord } from "./HeroClient";
import { HeroShowreel } from "./HeroShowreel";

const words = ["YouTube", "Weddings", "Ads", "Podcasts", "Brand Films", "Music Videos"];

export function Hero() {
  return (
    <section data-hero className="relative isolate overflow-hidden">
      {/* Solid background with two soft glows: lime behind the card, violet bottom-left */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(40rem 30rem at 78% 30%, rgba(198,244,50,0.10), transparent 70%), radial-gradient(36rem 28rem at 8% 95%, rgba(139,92,246,0.08), transparent 70%)",
        }}
      />
      <div className="container-x grid items-center gap-12 pt-12 pb-16 lg:grid-cols-[55fr_45fr] lg:gap-14 lg:pt-16 lg:pb-20">
        <div>
          <p className="mb-5 text-xs font-semibold tracking-[0.14em] text-accent uppercase">A team of professional video editors</p>
          <h1 className="text-[clamp(2.75rem,5.5vw,5rem)] leading-[1.02] font-bold tracking-[-0.03em]">
            Video Editing for{" "}
            <br />
            <RotatingWord words={words} />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Send raw footage, get a polished first cut in {site.turnaround}. From YouTube to weddings, one dedicated team edits it all.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Magnetic>
              <Button href="/free-trial-edit" size="lg">Get a Free Trial Edit</Button>
            </Magnetic>
            <Link href="/portfolio" className="font-semibold text-fg underline-offset-4 hover:text-accent hover:underline">
              Watch our work →
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
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
        <HeroShowreel />
      </div>
    </section>
  );
}
