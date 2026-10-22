import Image from "next/image";
import Link from "next/link";
import { team } from "@/data/team";
import { caseStudies } from "@/data/portfolio";
import { pageMeta } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/ui/VideoCard";
import { CTABand } from "@/components/sections/CTABand";

export const metadata = pageMeta({
  title: "Meet Your Editors | Our Team of Video Editors",
  description: "Meet the professional video editors, colourists and sound designers behind every edit — their specialties, software, reels and the projects they've cut.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <section className="section pt-10">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Team", href: "/team" }]} />
          <SectionHeading
            as="h1"
            eyebrow="Meet your editors"
            title="The people who'll edit your videos"
            sub="You work with a dedicated editor who learns your style — backed by specialists in colour, motion, sound and short-form."
          />
          <ul className="grid gap-8 md:grid-cols-2">
            {team.map((m) => {
              const work = caseStudies.filter((c) => c.editor === m.slug);
              return (
                <li key={m.slug} id={m.slug} className="card scroll-mt-28 overflow-hidden p-6 md:p-7">
                  <div className="flex items-center gap-5">
                    <Image src={m.avatar} alt={m.name} width={88} height={88} className="size-20 shrink-0 rounded-full object-cover md:size-22" />
                    <div>
                      <h2 className="text-2xl font-semibold">{m.name}</h2>
                      <p className="text-sm text-muted">{m.role}</p>
                      <p className="mt-1 text-sm font-medium text-accent">{m.specialty}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-muted">{m.bio}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Software">
                    {m.software.map((s) => (
                      <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{s}</li>
                    ))}
                  </ul>
                  <VideoCard video={m.reel} title={`${m.name.split(" ")[0]}'s reel`} className="mt-6" />
                  {work.length > 0 && (
                    <div className="mt-6 border-t border-line pt-5">
                      <p className="mb-2 text-xs font-semibold tracking-[0.12em] text-muted uppercase">Projects</p>
                      <ul className="space-y-1.5 text-sm">
                        {work.map((c) => (
                          <li key={c.slug}>
                            <Link href={`/portfolio/${c.slug}`} className="hover:text-accent">{c.title} →</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <CTABand title="Want to work with one of our editors?" />
    </>
  );
}
