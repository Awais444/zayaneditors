import Link from "next/link";
import { ArrowUpRight, Clapperboard, Megaphone, Mic, Music, Sparkles } from "lucide-react";
import { getService, services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { InViewVideo } from "./InViewVideo";
import { TiltCard } from "./TiltCard";

const small = [
  { slug: "video-ad-editing", icon: Megaphone, stat: "5 hooks", note: "per ad concept" },
  { slug: "podcast-video-editing", icon: Mic, stat: "10 clips", note: "from every episode" },
  { slug: "music-video-editing", icon: Music, stat: "On beat", note: "every cut" },
  { slug: "color-grading", icon: Sparkles, stat: "1 look", note: "across every camera" },
];

/** Bento grid: two large cards with looping previews, four compact cards with icon + stat. */
export function BentoServices() {
  const yt = getService("youtube-video-editing")!;
  const wed = getService("wedding-video-editing")!;
  return (
    <section data-tl="Services" data-tl-color="rgba(139,92,246,0.45)" className="section" id="services">
      <div className="container-x">
        <SectionHeading eyebrow="Services" title="Every kind of video, one team" sub="Specialists for every format, sharing one style guide for your brand." />
        <div className="grid auto-rows-[minmax(13rem,auto)] gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[yt, wed].map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06} className="md:col-span-1 lg:col-span-2 lg:row-span-2">
              <TiltCard className="h-full">
                <Link href={`/${s.slug}`} className="group relative flex h-full min-h-[22rem] flex-col justify-end p-7">
                  <InViewVideo src={s.video.src} poster={s.video.poster} className="absolute inset-0 -z-10 size-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
                  <Clapperboard className="mb-auto size-6 text-accent" aria-hidden />
                  <h3 className="text-3xl font-semibold tracking-tight">{s.name}</h3>
                  <p className="mt-2 max-w-md text-muted">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold group-hover:text-accent">Explore <ArrowUpRight className="size-4" aria-hidden /></span>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
          {small.map(({ slug, icon: Icon, stat, note }, i) => {
            const s = getService(slug)!;
            return (
              <Reveal key={slug} delay={0.12 + i * 0.05}>
                <TiltCard className="h-full">
                  <Link href={`/${slug}`} className="group flex h-full flex-col p-6">
                    <Icon className="size-6 text-accent" aria-hidden />
                    <p className="mt-auto pt-8 font-sans text-3xl font-bold tracking-[-0.03em]">{stat}</p>
                    <p className="text-sm text-muted">{note}</p>
                    <h3 className="mt-4 flex items-center justify-between font-semibold group-hover:text-accent">
                      {s.name} <ArrowUpRight className="size-4" aria-hidden />
                    </h3>
                  </Link>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="font-semibold hover:text-accent">View all {services.length} services →</Link>
        </div>
      </div>
    </section>
  );
}
