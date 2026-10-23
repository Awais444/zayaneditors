import Link from "next/link";
import { Clapperboard, Handshake, MessageSquareQuote, UserRound } from "lucide-react";
import { site } from "@/data/site";
import { editors } from "@/data/team";
import { homeFaqs } from "@/data/faqs";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { TeamCard } from "@/components/sections/TeamCard";
import { BentoGrid, type BentoItem } from "@/components/sections/BentoGrid";
import { StatsBand } from "@/components/sections/StatsBand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { AboutBrand } from "@/components/sections/AboutBrand";

export const metadata = pageMeta({
  title: `About ${site.name} | Professional Video Editors`,
  description: `Meet ${site.name}: a dedicated team of professional video editors working with creators, brands and couples across the US, UK, Canada, Australia and UAE.`,
  path: "/about",
});

const values: BentoItem[] = [
  { title: "Story over decoration", text: "Every effect has to earn its place. We judge edits by how they make viewers feel and act, not by how busy the timeline looks.", icon: Clapperboard, large: true },
  { title: "Reliability is a feature", text: "Creators grow through consistency. We hit deadlines, keep backups for every editor and document your style.", icon: Handshake },
  { title: "Honest advice", text: "If a hook is weak or a video should be cut in half, we'll tell you — kindly, with a fix.", icon: MessageSquareQuote },
  { title: "A real person on your project", text: "You work with a named editor who knows your style — not a ticket in a queue.", icon: UserRound },
];

// TODO: replace with the founder's real story and milestones
const story = [
  { year: site.foundedYear, title: "One editor, one laptop", text: `${site.owner.name}, then a freelance editor, kept seeing great footage lose its impact in the edit — and busy people burning out on twelve-hour editing sessions.` },
  { year: site.foundedYear + 1, title: "A dedicated editor per client", text: "The first hires: editors matched to clients by niche, each keeping a style guide so every video feels like the creator — only sharper." },
  { year: site.foundedYear + 2, title: "Specialists join", text: "Colourists, motion designers and sound engineers came on board to back every editor, so no project waits on one person." },
  { year: site.foundedYear + 3, title: "Every kind of video", text: `YouTube, social, ads, brand films, weddings, events, music videos and podcasts — for clients across ${site.markets.join(", ")}.` },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "About", href: "/about" }]}
        eyebrow="About us"
        title="A TEAM OF EDITORS"
        sub={`A remote team of editors, colourists, motion designers and sound engineers. You upload footage; your editor cuts a first version within ${site.turnaround} and refines it with you until it's ready to publish.`}
        ctas={[{ label: "Start a Project", href: "/contact" }, { label: "See our work", href: "/portfolio", variant: "outline" }]}
      />

      <AboutBrand />

      <section data-tl="Team" data-tl-color="rgba(139,92,246,0.45)" className="section pt-0">
        <div className="container-x">
          <SectionHeader eyebrow="The editors" title="The people behind the edits" intro="Hover a card to play their reel." />
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {editors.slice(0, 4).map((m) => <TeamCard key={m.slug} m={m} href={`/team#${m.slug}`} />)}
          </div>
          <Link href="/team" className="mt-8 inline-flex text-sm font-semibold hover:text-accent">Meet the whole team →</Link>
        </div>
      </section>

      <section data-tl="Values" data-tl-color="rgba(56,189,248,0.4)" className="section cv-auto pt-0">
        <div className="container-x">
          <SectionHeader eyebrow="Values" title="What we believe" />
          <BentoGrid items={values} />
        </div>
      </section>

      <StatsBand />

      <section data-tl="Story" data-tl-color="rgba(251,191,36,0.4)" className="section cv-auto">
        <div className="container-x">
          <SectionHeader eyebrow="Our story" title="How the team came together" />
          <ol className="relative ml-3 border-l border-line md:mx-auto md:ml-auto md:max-w-3xl">
            {story.map((s) => (
              <li key={s.year} className="reveal relative pb-12 pl-8 last:pb-0 md:pl-12">
                <span aria-hidden className="absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 border-bg bg-accent shadow-[0_0_0_4px_rgba(198,244,50,0.15)]" />
                <p className="font-sans text-sm font-bold tracking-[0.12em] text-accent">{s.year}</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQAccordion items={homeFaqs.slice(4, 10)} />
      <FinalCTA />
    </>
  );
}
