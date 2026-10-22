import Link from "next/link";
import { getService, services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/ui/VideoCard";
import { Reveal } from "@/components/ui/Reveal";

const featured = [
  "youtube-video-editing",
  "social-media-video-editing",
  "video-ad-editing",
  "wedding-video-editing",
  "podcast-video-editing",
  "music-video-editing",
];

export function ServicesGrid() {
  const list = featured.map((s) => getService(s)!).filter(Boolean);
  return (
    <section className="section" id="services">
      <div className="container-x">
        <SectionHeading eyebrow="Services" title="Every kind of video, one team" sub="YouTube, social, ads, brand films, weddings, events, music videos and podcasts — edited by specialists who share one style guide for your brand." />
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06}>
              <VideoCard video={s.video} title={s.name} meta={s.short} href={`/${s.slug}`} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/services" className="font-semibold hover:text-accent">View all {services.length} services →</Link>
        </div>
      </div>
    </section>
  );
}
