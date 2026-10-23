import Link from "next/link";
import { Clapperboard, Megaphone, Mic, Music, Sparkles } from "lucide-react";
import { getService, services } from "@/data/services";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { BentoGrid, type BentoItem } from "@/components/sections/BentoGrid";
import { verticalOf, type PortfolioItem } from "@/data/portfolio";

const small = [
  { slug: "video-ad-editing", icon: Megaphone, stat: "5 hooks", note: "per ad concept" },
  { slug: "podcast-video-editing", icon: Mic, stat: "10 clips", note: "from every episode" },
  { slug: "music-video-editing", icon: Music, stat: "On beat", note: "every cut" },
  { slug: "color-grading", icon: Sparkles, stat: "1 look", note: "across every camera" },
];

/** Home services: two large cards (previews from the Home clips, or none) + four stat cards. */
export function BentoServices({ clips = [] }: { clips?: PortfolioItem[] }) {
  const items: BentoItem[] = [
    ...["youtube-video-editing", "wedding-video-editing"].map((slug, i) => {
      const s = getService(slug)!;
      const clip = clips[i];
      return { href: `/${slug}`, title: s.name, text: s.short, icon: Clapperboard, large: true, video: clip ? verticalOf(clip) : undefined };
    }),
    ...small.map(({ slug, icon, stat, note }) => ({ href: `/${slug}`, title: getService(slug)!.name, icon, stat, note })),
  ];
  return (
    <section data-tl="Services" data-tl-color="rgba(139,92,246,0.45)" className="section" id="services">
      <div className="container-x">
        <SectionHeader eyebrow="Services" title="Every kind of video, one team" intro="Specialists for every format, sharing one style guide for your brand." />
        <BentoGrid items={items} />
        <div className="mt-10 text-center">
          <Link href="/services" className="font-semibold hover:text-accent">View all {services.length} services →</Link>
        </div>
      </div>
    </section>
  );
}
