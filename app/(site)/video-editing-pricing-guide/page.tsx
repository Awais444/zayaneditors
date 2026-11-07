import Link from "next/link";
import { addons, perMinute, perProject, perVideo, plans, volumes, guarantee } from "@/data/pricing";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/metadata";
import { lastModified } from "@/lib/lastmod";
import { PageHero } from "@/components/sections/PageHero";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { QuickAnswer } from "@/components/seo/QuickAnswer";

export const metadata = pageMeta({
  title: `Video Editing Pricing Guide 2026 | ${site.shortName}`,
  description: "How video editing is priced in 2026: per video, per minute, monthly plans and per project, with our real starting prices and what changes a quote.",
  path: "/video-editing-pricing-guide",
});

const low = Math.min(...perVideo.map((p) => p.from));
const minPlan = Math.min(...plans.map((p) => p.pricePerVideo[volumes[volumes.length - 1]]));
const answer = `Video editing is priced per video, per finished minute, as a monthly plan or per project. At ${site.name}, short-form clips start at $${perVideo[0].from}, long-form videos at $${perVideo[1].from} and podcast episodes at $${perVideo[2].from}. Monthly plans lower the per-video price, and weddings, ads and corporate films are quoted per project.`;

const faqs = [
  { q: "What is the cheapest way to pay for video editing?", a: `For regular content, a monthly plan: per-video prices drop with volume, down to $${minPlan} per short on our ${volumes[volumes.length - 1]}-video Starter plan. For one-off projects, per-video pricing is simpler.` },
  { q: "How is long-form editing priced per minute?", a: `Our calculator starts at $${perMinute.base}, which covers up to ${perMinute.includedMinutes} finished minutes, then adds $${perMinute.perMinute} for each extra finished minute.` },
  { q: "What makes a video editing quote go up?", a: "Long raw footage compared with the final length, dense graphics or animation, colour and sound work, rush turnaround and extra revision rounds." },
  { q: "Are revisions included in the price?", a: "Yes. Every plan includes revisions (the number depends on the plan), and an extra round costs $15 if you need one." },
  { q: "Is there a guarantee?", a: guarantee },
  { q: "Can I see more samples before I order?", a: "Yes — browse our portfolio or ask us on WhatsApp for samples in your niche." },
];

const th = "p-4 font-medium";
const td = "p-4";

export default function PricingGuide() {
  const updated = lastModified("data/pricing.ts", "app/(site)/video-editing-pricing-guide/page.tsx");
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Pricing", href: "/pricing" }, { name: "Pricing guide", href: "/video-editing-pricing-guide" }]}
        eyebrow="Guide"
        title="Video editing pricing guide 2026"
        sub={<>How editing is priced, what each model suits and our real starting prices. Updated <time dateTime={updated.toISOString()}>{updated.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>.</>}
      />
      <QuickAnswer question="How much does video editing cost?" answer={answer} />

      <section className="section">
        <div className="container-x">
          <article className="prose-site mx-auto max-w-3xl">
            <h2>What are the main video editing pricing models?</h2>
            <p>There are four common ways editors charge. Most creators and businesses use one or two of them, depending on how often they publish and how much each video varies.</p>
            <div className="not-prose overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-surface text-muted"><tr><th className={th}>Model</th><th className={th}>Best for</th><th className={th}>Our starting price</th></tr></thead>
                <tbody className="divide-y divide-line">
                  <tr><td className={td}>Per video</td><td className={td}>Occasional uploads, consistent formats</td><td className={td}>From ${low} per clip</td></tr>
                  <tr><td className={td}>Per finished minute</td><td className={td}>Long-form videos of varying length</td><td className={td}>${perMinute.base} + ${perMinute.perMinute}/min after {perMinute.includedMinutes} min</td></tr>
                  <tr><td className={td}>Monthly plan</td><td className={td}>Weekly publishing, dedicated editor</td><td className={td}>From ${minPlan} per video at volume</td></tr>
                  <tr><td className={td}>Per project</td><td className={td}>Weddings, ads, music and corporate videos</td><td className={td}>From ${Math.min(...perProject.map((p) => p.from))} per project</td></tr>
                </tbody>
              </table>
            </div>

            <h2>How much does each type of video cost to edit?</h2>
            <div className="not-prose overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-surface text-muted"><tr><th className={th}>Video type</th><th className={th}>From</th><th className={th}>Covers</th></tr></thead>
                <tbody className="divide-y divide-line">
                  {perVideo.map((p) => <tr key={p.name}><td className={td}>{p.name}</td><td className={td}>${p.from} {p.unit}</td><td className={td}>{p.desc}</td></tr>)}
                  {perProject.map((p) => <tr key={p.name}><td className={td}><Link href={p.href} className="hover:text-accent">{p.name}</Link></td><td className={td}>${p.from} {p.unit}</td><td className={td}>{p.features[0]}</td></tr>)}
                </tbody>
              </table>
            </div>

            <h2>How do monthly plans compare?</h2>
            <div className="not-prose overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-surface text-muted"><tr><th className={th}>Plan</th>{volumes.map((v) => <th key={v} className={th}>{v} videos/mo</th>)}<th className={th}>For</th></tr></thead>
                <tbody className="divide-y divide-line">
                  {plans.map((p) => <tr key={p.name}><td className={td}>{p.name}</td>{volumes.map((v) => <td key={v} className={td}>${p.pricePerVideo[v]}/video</td>)}<td className={td}>{p.desc}</td></tr>)}
                </tbody>
              </table>
            </div>

            <h2>What changes the price of an edit?</h2>
            <ul>
              <li><strong>Raw footage length.</strong> Two hours cut to ten minutes takes longer than a tight, scripted recording.</li>
              <li><strong>Editing density.</strong> Captions, B-roll, motion graphics and sound design all add time.</li>
              <li><strong>Turnaround.</strong> Rush 24-hour delivery adds 50% to the edit price.</li>
              <li><strong>Revisions.</strong> Included rounds vary by plan; extra rounds are $15 each.</li>
              <li><strong>Extras.</strong> Thumbnails, subtitles and vertical reformats are priced as add-ons.</li>
            </ul>

            <h2>Which add-ons cost extra?</h2>
            <ul>{addons.map((a) => <li key={a.name}>{a.name}: {a.price} {a.note}</li>)}</ul>

            <h2>How do I get an exact quote?</h2>
            <p>See every price and the per-minute calculator on our <Link href="/pricing">pricing page</Link>, read the longer <Link href="/blog/youtube-video-editing-cost">YouTube editing cost guide</Link>, or <Link href="/contact">send us your project</Link> for a quote. You can also browse <Link href="/portfolio">our portfolio</Link> first.</p>
          </article>
        </div>
      </section>
      <FAQAccordion items={faqs} title="Pricing guide FAQs" />
      <FinalCTA />
    </>
  );
}
