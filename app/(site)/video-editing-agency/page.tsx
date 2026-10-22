import Image from "next/image";
import Link from "next/link";
import { Check, Minus, X } from "lucide-react";
import { site } from "@/data/site";
import { editors } from "@/data/team";
import { perProject, perVideo } from "@/data/pricing";
import { agencyFaq } from "@/data/faqs";
import { pageMeta } from "@/lib/metadata";
import { faqPage } from "@/lib/schema";
import { absoluteUrl } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { QuoteSection } from "@/components/sections/QuoteSection";

const path = "/video-editing-agency";

export const metadata = pageMeta({
  title: "Video Editing Agency With a Dedicated Team of Editors",
  description: "Looking for a video editing agency or company? Get agency-level capacity with a dedicated team of editors: one named editor, fast turnaround, fair prices.",
  path,
});

type Cell = { v: string; tone: "good" | "mid" | "bad" };
const rows: { label: string; us: Cell; agency: Cell; freelancer: Cell }[] = [
  {
    label: "Dedicated editor",
    us: { v: "Yes — one named editor who learns your style", tone: "good" },
    agency: { v: "Often rotates between whoever is free", tone: "mid" },
    freelancer: { v: "Yes, but only one person", tone: "mid" },
  },
  {
    label: "Price",
    us: { v: `From $${perVideo[0].from}/video, transparent plans`, tone: "good" },
    agency: { v: "Higher — overheads and account managers", tone: "bad" },
    freelancer: { v: "Lowest, but varies widely", tone: "good" },
  },
  {
    label: "Turnaround",
    us: { v: `First cut in ${site.turnaround}, backup editors`, tone: "good" },
    agency: { v: "Reliable, often slower approvals", tone: "mid" },
    freelancer: { v: "Depends on one person's schedule", tone: "bad" },
  },
  {
    label: "Communication",
    us: { v: "Talk to your editor directly (WhatsApp, Slack, email)", tone: "good" },
    agency: { v: "Through an account manager", tone: "mid" },
    freelancer: { v: "Direct, availability varies", tone: "mid" },
  },
  {
    label: "Revisions",
    us: { v: "2 rounds per video, back in 24h", tone: "good" },
    agency: { v: "Included, sometimes billed beyond scope", tone: "mid" },
    freelancer: { v: "Negotiated case by case", tone: "mid" },
  },
  {
    label: "Range of skills",
    us: { v: "Editors + colour, sound and motion specialists", tone: "good" },
    agency: { v: "Broad in-house team", tone: "good" },
    freelancer: { v: "Usually one or two specialties", tone: "bad" },
  },
];

const faqs = [
  agencyFaq,
  { q: "What's the difference between a video editing agency and a video editing company?", a: "In practice, very little — both describe a business that provides editing as a service rather than a single freelancer. What matters more is how the work is delivered: who edits your video, how you communicate, and whether the same people work on your projects each time." },
  { q: "Will I always work with the same editor?", a: "Yes. On monthly plans you're paired with a dedicated editor, and we keep a written style guide so a backup editor can step in seamlessly if your editor is ever away." },
  { q: "What types of video do you edit?", a: "Every kind: YouTube and long-form, Reels and TikTok, ads and product videos, brand films and corporate content, weddings and events, music videos, podcasts and more. See all services on our services page." },
  { q: "How much do your video editing services cost?", a: `Short-form edits start at $${perVideo[0].from}, long-form at $${perVideo[1].from} and podcasts at $${perVideo[2].from}. Monthly plans reduce the per-video price, and weddings, music videos, ads and corporate projects are priced per project.` },
  { q: "Can you handle large volumes like an agency?", a: "Yes. Our team works in shifts with specialists across formats, so we can scale from one video a month to dozens without changing who leads your account." },
  { q: "Do you work white-label for other agencies?", a: "Yes. Many production companies and marketing agencies use us as their post-production team, under NDA and without our branding." },
  { q: "How do I start?", a: "Request a free trial edit or start a project. We'll reply within hours with a recommended plan, price and the editor we'd pair you with." },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Video editing services",
  serviceType: "Video editing agency",
  description: "Video editing services delivered by a dedicated team of professional video editors.",
  url: absoluteUrl(path),
  provider: { "@id": `${site.url}/#org` },
  areaServed: site.markets,
  offers: perVideo.map((p) => ({ "@type": "Offer", name: p.name, price: p.from, priceCurrency: "USD" })),
};

const icon = { good: Check, mid: Minus, bad: X };
const toneCls = { good: "text-accent", mid: "text-muted", bad: "text-danger" };

function CellView({ c }: { c: Cell }) {
  const Icon = icon[c.tone];
  return (
    <span className="flex gap-2">
      <Icon className={`mt-0.5 size-4 shrink-0 ${toneCls[c.tone]}`} aria-hidden />
      {c.v}
    </span>
  );
}

export default function AgencyPage() {
  return (
    <>
      <JsonLd data={[serviceSchema, faqPage(faqs)]} />
      <section className="section relative pt-10">
        <div className="glow -top-40 right-0 size-[34rem]" />
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Video Editing Agency", href: path }]} />
          <p className="eyebrow mb-5">Video editing agency alternative</p>
          <h1 className="h-display max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)] font-bold">Looking for a Video Editing Agency? Meet Your Dedicated Team of Editors</h1>
          <p className="mt-6 max-w-3xl text-lg text-muted">
            If you&apos;re searching for a video editing agency, you probably want three things: reliable capacity, consistent quality and someone who understands your brand. We deliver all three — as a dedicated team of professional video editors rather than a faceless production line. You get one named editor who learns your style, specialists in colour, sound and motion when a project needs them, and prices that make sense for growing creators and businesses.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/free-trial-edit" size="lg">Get a Free Trial Edit</Button>
            <Button href="/team" size="lg" variant="outline">Meet the editors</Button>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="prose-site">
            <h2>Why people look for a video editing company</h2>
            <p>Most people start looking for a video editing company after a frustrating experience. Maybe a freelancer disappeared halfway through a launch. Maybe editing is eating the evenings you should be spending on filming, selling or simply resting. Or maybe your content has outgrown what one person can handle — a YouTube channel plus daily Shorts, a podcast plus clips, an ad account that needs fresh creative every week.</p>
            <p>A traditional agency solves capacity, but often at the cost of personality. Your project passes through an account manager, gets assigned to whoever is free, and the editor may change from month to month. You end up re-explaining your style, your audience and your preferences over and over again.</p>
            <h2>A team of editors, not a ticket queue</h2>
            <p>We built our team to keep the strengths of an agency without the distance. Every client is paired with a dedicated editor who becomes the expert on their brand. That editor writes and maintains your style guide — fonts, colours, captions, pacing, music mood, the things you love and the things you never want to see — and leads every edit. When a project needs extra skills, specialists join in: a colourist for a brand film, a sound designer for a podcast, a motion designer for an explainer, a short-form lead for a month of Reels.</p>
            <p>You talk to the people doing the work. Feedback goes straight to your editor on WhatsApp, Slack, email or time-coded review links, and changes come back within 24 hours. If your editor is ever away, a backup who has read your style guide steps in, so your schedule never slips.</p>
            <h2>Every kind of video, under one roof</h2>
            <p>Agencies are valuable partly because they cover many formats. So do we. Our editors cut <Link href="/youtube-video-editing">YouTube videos</Link> and long-form content, <Link href="/social-media-video-editing">social media video</Link> for every platform, <Link href="/video-ad-editing">video ads</Link> and product videos, <Link href="/brand-film-editing">brand films</Link> and corporate content, <Link href="/wedding-video-editing">weddings</Link> and events, <Link href="/music-video-editing">music videos</Link>, and <Link href="/podcast-video-editing">podcasts</Link>. One team, one style guide, every format — which means your brand looks consistent everywhere it appears.</p>
            <h2>What working with us costs</h2>
            <p>We publish our prices, which many agencies don&apos;t. Per-video pricing suits occasional projects; monthly plans give you a dedicated editor and lower per-video costs; and project pricing covers weddings, music videos, ad campaigns and corporate edits. There are no account-management fees and no surprise charges for revision rounds that fall within your plan. See full details on our <Link href="/pricing">pricing page</Link>.</p>
          </div>
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6">
              <p className="font-semibold">Pricing summary</p>
              <ul className="mt-4 divide-y divide-line text-sm">
                {[...perVideo.map((p) => ({ name: p.name, from: p.from, unit: p.unit })), ...perProject.map((p) => ({ name: p.name, from: p.from, unit: p.unit }))].map((p) => (
                  <li key={p.name} className="flex justify-between gap-4 py-2.5">
                    <span>{p.name}</span>
                    <span className="text-right font-semibold">from ${p.from} <span className="font-normal text-muted">{p.unit}</span></span>
                  </li>
                ))}
              </ul>
              <Button href="/pricing" variant="outline" className="mt-5 w-full">Full pricing</Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading eyebrow="Compare" title="Our team vs. a typical agency vs. a solo freelancer" />
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[46rem] text-left text-sm">
              <thead className="bg-surface">
                <tr>
                  <th scope="col" className="p-4 font-medium text-muted">&nbsp;</th>
                  <th scope="col" className="p-4 font-semibold text-accent">{site.shortName} team</th>
                  <th scope="col" className="p-4 font-semibold">Typical agency</th>
                  <th scope="col" className="p-4 font-semibold">Solo freelancer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="p-4 font-medium text-muted">{r.label}</th>
                    <td className="bg-accent-soft/40 p-4"><CellView c={r.us} /></td>
                    <td className="p-4"><CellView c={r.agency} /></td>
                    <td className="p-4"><CellView c={r.freelancer} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">Agencies and freelancers vary — this reflects common patterns, not every provider.</p>
        </div>
      </section>

      <Process />

      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading eyebrow="Your team" title="The editors you'll actually work with" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {editors.map((m) => (
              <li key={m.slug}>
                <Link href={`/team#${m.slug}`} className="card pressable block h-full p-5 text-center hover:border-white/20">
                  <Image src={m.avatar} alt={m.name} width={80} height={80} className="mx-auto size-20 rounded-full object-cover" />
                  <p className="mt-4 font-semibold">{m.name}</p>
                  <p className="mt-1 text-xs text-muted">{m.specialty}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x prose-site max-w-3xl">
          <h2>How to choose the right video editing partner</h2>
          <p>Whether you pick us, another video editing company or a freelancer, a few questions will tell you a lot. Who will actually edit my videos, and will it be the same person each time? How quickly do first cuts and revisions come back? Do you have work in my niche? How is music licensed? Who owns the final files? Can I see a sample on my own footage before committing?</p>
          <p>We&apos;re happy to answer all of them — and the last one is easy. Send us a few minutes of footage and we&apos;ll return a free 30–60 second edit, so you can judge your future editor on your own content. For a deeper comparison, read our guide on <Link href="/blog/hire-youtube-video-editor">hiring a video editor: freelancer vs agency</Link>.</p>
        </div>
      </section>

      <FAQ items={faqs} title="Video editing agency FAQs" schema={false} />
      <QuoteSection title="Get a plan and price from your future editor" />
    </>
  );
}
