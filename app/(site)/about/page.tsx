import Link from "next/link";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatsBand } from "@/components/sections/StatsBand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { homeFaqs } from "@/data/faqs";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = pageMeta({
  title: `About ${site.name} | A Team of Professional Video Editors`,
  description: `Meet ${site.name}: a dedicated team of professional video editors working with creators, brands and couples across the US, UK, Canada, Australia and UAE.`,
  path: "/about",
});

const values = [
  { t: "Story over decoration", d: "Every effect has to earn its place. We judge edits by how they make viewers feel and act, not by how busy the timeline looks." },
  { t: "Reliability is a feature", d: "Creators grow through consistency. We hit deadlines, keep backups for every editor and document your style." },
  { t: "Honest advice", d: "If a hook is weak or a video should be cut in half, we'll tell you — kindly, with a fix." },
  { t: "A real person on your project", d: "You work with a named editor who knows your style — not a ticket in a queue." },
];

export default function AboutPage() {
  return (
    <>
      <section className="section pt-10">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "About", href: "/about" }]} />
          <SectionHeading as="h1" eyebrow="About us" title="A small team of editors who care about your story" />
          <div className="prose-site max-w-3xl">
            {/* TODO: replace with the founder's real story */}
            <p>{site.name} started in {site.foundedYear} when {site.owner.name} — then a freelance editor — noticed the same pattern with every client: great footage losing its impact in the edit, and busy people burning out on twelve-hour editing sessions — or handing their work to big studios where nobody knew their name.</p>
            <p>So we built a team around one idea: a dedicated editor for every client, backed by specialists. Today we&apos;re a remote team of editors, colourists, motion designers and sound engineers editing every kind of video — YouTube channels, social content, ads, brand films, weddings, events, music videos and podcasts — for clients across {site.markets.join(", ")}.</p>
            <p>Our process is simple. You upload footage. Your editor reviews the brief, cuts a first version within {site.turnaround}, and refines it with you until it&apos;s ready to publish. Along the way we keep a style guide for your brand, so every video feels like you — only sharper.</p>
            <p>Want to see the people behind the edits? <Link href="/team">Meet the team</Link>, or look at <Link href="/portfolio">our work</Link>.</p>
          </div>
        </div>
      </section>
      <StatsBand />
      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading title="What we believe" />
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.t} className="card p-7"><h3 className="text-xl font-semibold">{v.t}</h3><p className="mt-2 text-muted">{v.d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <FAQAccordion items={homeFaqs.slice(4, 10)} />
      <FinalCTA />
    </>
  );
}
