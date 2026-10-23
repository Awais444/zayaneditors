import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Film, Layers, Music, Palette, Sparkles, Subtitles, Type, Wand2, type LucideIcon } from "lucide-react";
import { servicePortfolio, getService, services, type ServiceCategory } from "@/data/services";
import { isVertical, serviceSamples, toCard, verticalOf } from "@/data/portfolio";
import { processSteps, shortProcess } from "@/data/process";
import { site, whatsappUrl } from "@/data/site";
import { getPost } from "@/lib/blog";
import { pageMeta } from "@/lib/metadata";
import { faqPage, serviceSchema, videoObject } from "@/lib/schema";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { KeyFacts } from "@/components/seo/KeyFacts";
import { serviceAnswer, serviceFacts } from "@/lib/answers";
import { firstPublished, lastModified } from "@/lib/lastmod";
import { previewDuration } from "@/data/portfolio";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { HeroVideoCard } from "@/components/sections/HeroVideoCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { BentoGrid, type BentoItem } from "@/components/sections/BentoGrid";
import { VideoRow } from "@/components/sections/VideoRow";
import { PricingCards } from "@/components/sections/PricingCards";
import { StickySteps } from "@/components/sections/StickySteps";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { processVisuals } from "@/components/home/ProcessVisuals";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";

type Props = { params: Promise<{ service: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ service: s.slug }));

export async function generateMetadata({ params }: Props) {
  const s = getService((await params).service);
  if (!s) return {};
  const brand = `${s.metaTitle} | ${site.shortName}`;
  return pageMeta({ title: brand.length <= 60 ? brand : s.metaTitle, description: s.metaDescription, path: `/${s.slug}` });
}

/** First hero chip per category; the second is always the turnaround. */
const categoryChip: Record<ServiceCategory, string> = {
  "YouTube & Long-Form": "Retention-focused",
  "Social & Short-Form": "Hook in the first 1s",
  "Marketing & Ads": "Built to convert",
  "Events & Personal": "Story-led edit",
  "Podcast & Audio": "Broadcast-clean audio",
  "Post-Production Add-ons": "Pixel-level finish",
};
const includedIcons: LucideIcon[] = [Wand2, Layers, Film, Type, Music, Palette, Subtitles, Sparkles];

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).service);
  if (!s) notFound();
  const samples = serviceSamples(servicePortfolio[s.slug]);
  const work = samples.items;
  // Every published portfolio item has a case-study page (portfolio/[slug] is generated from `work`)
  // Talking head, UGC and most social work is 9:16: show the row vertically when most samples are
  const vertical = work.length > 0 && work.filter(isVertical).length * 2 >= work.length;
  const cards = work.map((p) => (vertical ? { ...toCard(p), video: { ...verticalOf(p), title: p.title } } : toCard(p)));
  const clickCopy = "click for the full case study";
  const updated = lastModified("data/services.ts", "data/service-copy");
  const related = s.related.map(getService).filter((x): x is NonNullable<typeof x> => !!x);
  const posts = s.blog.map((b) => getPost(b)?.meta).filter((x): x is NonNullable<typeof x> => !!x);
  const firstCut = s.turnaround.split("·")[0].trim();

  const included: BentoItem[] = [
    { title: `${s.name}, done properly`, text: s.short, large: true, video: work[0] ? toCard(work[0]).video : s.video, icon: Film },
    ...s.included.map((t, i) => ({ title: t, icon: includedIcons[i % includedIcons.length] })),
  ];
  const relatedItems: BentoItem[] = related.map((r, i) => ({ href: `/${r.slug}`, title: r.name, text: r.short, icon: includedIcons[(i + 2) % includedIcons.length] }));

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(s),
          // A real portfolio clip for this service (never the stock sample)
          ...(samples.mode === "exact" && work[0]
            ? [videoObject({ title: work[0].title, description: work[0].description, poster: work[0].poster, src: work[0].preview.mp4, uploadDate: firstPublished("data/portfolio-items.ts").toISOString(), duration: `PT${previewDuration(work[0])}S`, page: `/portfolio/${work[0].slug}` })]
            : []),
          faqPage(s.faqs),
        ]}
      />

      <PageHero
        breadcrumbs={[{ name: "Services", href: "/services" }, { name: s.name, href: `/${s.slug}` }]}
        eyebrow={s.category}
        title={s.h1}
        sub={
          <>
            <p>{s.short}</p>
            <p className="mt-4 flex items-center gap-2 text-sm"><Clock className="size-4 text-accent" aria-hidden /> {s.turnaround}</p>
          </>
        }
        ctas={[{ label: "Get a Free Trial Edit", href: "/free-trial-edit" }, { label: "See pricing", href: "#pricing", variant: "outline" }]}
        visual={<HeroVideoCard video={work[0] ? toCard(work[0]).video : s.video} chips={[categoryChip[s.category], firstCut]} />}
      />

      <QuickAnswer question={`What does ${s.name} from ${site.shortName} include?`} answer={serviceAnswer(s)} />

      <section data-tl="Included" data-tl-color="rgba(139,92,246,0.45)" className="section cv-auto pt-4">
        <div className="container-x">
          <SectionHeader eyebrow="What's included" title={`Everything in a ${s.name.toLowerCase()} edit`} />
          <BentoGrid items={included} />
        </div>
      </section>

      <section data-tl="Why it works" data-tl-color="rgba(244,244,245,0.2)" className="section cv-auto pt-0">
        <div className="container-x">
          <article className="prose-site mx-auto max-w-3xl">
            <p className="text-lg text-fg">{s.intro}</p>
            {s.sections.map((sec) => (
              <div key={sec.heading}>
                <h2>{sec.heading}</h2>
                {sec.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            ))}
            <p>
              Ready to see it on your own footage? Compare <Link href="/pricing">plans and pricing</Link>, browse <Link href="/portfolio">our portfolio</Link>, or{" "}
              <Link href="/contact">start a project</Link> today.
            </p>
            <KeyFacts title={`${s.name}: key facts`} facts={serviceFacts(s, work.length)} />
            <p className="text-sm text-muted">
              Last updated <time dateTime={updated.toISOString()}>{updated.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
            </p>
          </article>
        </div>
      </section>

      <section data-tl="Work" data-tl-color="rgba(56,189,248,0.4)" className="section cv-auto pt-0">
        {samples.mode === "none" ? (
          <div className="container-x">
            <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
              <p className="text-lg font-semibold">Want to see samples for this?</p>
              <WhatsAppLink href={whatsappUrl(`Hi! Can I see samples of your ${s.name.toLowerCase()} work?`)} className="font-semibold text-accent">Ask us on WhatsApp →</WhatsAppLink>
            </div>
          </div>
        ) : (
          <VideoRow
            label={samples.mode === "exact" ? `${s.name} samples` : "Related work"}
            header={
              samples.mode === "exact" ? (
                <SectionHeader eyebrow="Work" title={`${s.name} samples`} intro={`Real projects from this category. Hover to preview, ${clickCopy}.`} />
              ) : (
                <SectionHeader eyebrow="Work" title="Related work from our editors" intro="Examples of the editing we deliver for channels like yours." />
              )
            }
            vertical={vertical}
            items={cards}
          />
        )}
      </section>

      <section id="pricing" data-tl="Pricing" data-tl-color="rgba(52,211,153,0.4)" className="section cv-auto pt-0">
        <div className="container-x">
          <SectionHeader eyebrow="Pricing" title={`${s.name} pricing`} intro={`Turnaround: ${s.turnaround}. ${s.pricing.some((p) => /d/.test(p.price)) ? "All prices in USD." : "Priced per project — send your brief for a quote."}`} center />
          <PricingCards plans={s.pricing} />
          <p className="mt-10 text-center text-sm text-muted">Need volume? See <Link href="/pricing" className="text-fg underline underline-offset-2">monthly plans</Link>.</p>
        </div>
      </section>

      <StickySteps
        steps={shortProcess.map((i) => processSteps[i])}
        visuals={shortProcess.map((i) => processVisuals[i])}
        title="How it works"
        tl="Process"
      />

      <section data-tl="Who it's for" data-tl-color="rgba(244,114,182,0.4)" className="section cv-auto pt-0">
        <div className="container-x">
          <SectionHeader eyebrow="Who it's for" title="Built for people like you" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.whoFor.map((w) => (
              <div key={w.title} className="glow-card card p-6">
                <h3 className="text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted">{w.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted">
            Not sure it fits?{" "}
            <WhatsAppLink href={whatsappUrl(`Hi! I'm interested in ${s.name}.`)} className="font-semibold text-fg hover:text-accent">Ask us on WhatsApp →</WhatsAppLink>
          </div>
        </div>
      </section>

      <QuoteSection service={s.name} title={`Get a ${s.name.toLowerCase()} quote`} />
      <FAQAccordion items={s.faqs} title={`${s.name} FAQs`} schema={false} />

      <section data-tl="Related" data-tl-color="rgba(251,191,36,0.4)" className="section cv-auto pt-0">
        <div className="container-x">
          <SectionHeader eyebrow="Related" title="Related services" />
          <BentoGrid items={relatedItems} />
        </div>
      </section>
      <BlogPreview posts={posts} title="Related reading" />
      <FinalCTA />
    </>
  );
}
