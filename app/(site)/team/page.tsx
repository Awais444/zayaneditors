import Link from "next/link";
import { team } from "@/data/team";
import { caseStudies } from "@/data/portfolio";
import { faqCategories } from "@/data/faqs";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { TeamCard } from "@/components/sections/TeamCard";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = pageMeta({
  title: "Meet Your Editors | Our Team of Video Editors",
  description: "Meet the professional video editors, colourists and sound designers behind every edit — their specialties, software, reels and the projects they've cut.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Team", href: "/team" }]}
        eyebrow="Meet your editors"
        title="The people who'll edit your videos"
        sub="You work with a dedicated editor who learns your style — backed by specialists in colour, motion, sound and short-form. Hover a portrait to play their reel."
      />
      <section data-tl="Team" data-tl-color="rgba(139,92,246,0.45)" className="section pt-0">
        <div className="container-x">
          <h2 className="sr-only">Team</h2>
          <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => {
              const work = caseStudies.filter((c) => c.editor === m.slug);
              return (
                <li key={m.slug} id={m.slug} className="scroll-mt-28">
                  <TeamCard m={m} />
                  <p className="mt-5 text-muted">{m.bio}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Software">
                    {m.software.map((s) => (
                      <li key={s} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{s}</li>
                    ))}
                  </ul>
                  {work.length > 0 && (
                    <div className="mt-5 border-t border-line pt-4">
                      <p className="mb-2 text-xs font-semibold tracking-[0.12em] text-muted uppercase">Projects</p>
                      <ul className="space-y-1.5 text-sm">
                        {work.map((c) => (
                          <li key={c.slug}><Link href={`/portfolio/${c.slug}`} className="hover:text-accent">{c.title} →</Link></li>
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
      <FAQAccordion items={faqCategories[1].faqs} />
      <FinalCTA />
    </>
  );
}
