import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock } from "lucide-react";
import { getService, services } from "@/data/services";
import { caseStudiesByTags } from "@/data/portfolio";
import { getPost } from "@/lib/blog";
import { pageMeta } from "@/lib/metadata";
import { faqPage, serviceSchema, videoObject } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { VideoCard } from "@/components/ui/VideoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { whatsappUrl } from "@/data/site";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ service: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ service: s.slug }));

export async function generateMetadata({ params }: Props) {
  const s = getService((await params).service);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).service);
  if (!s) notFound();
  const work = caseStudiesByTags(s.portfolioTags, 6);
  const related = s.related.map(getService).filter((x): x is NonNullable<typeof x> => !!x);
  const posts = s.blog.map((b) => getPost(b)?.meta).filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <>
      <JsonLd data={[serviceSchema(s), videoObject({ ...s.video, description: s.short })]} />
      <section className="relative overflow-hidden pt-10 pb-16">
        <div className="glow -top-40 right-0 size-[34rem]" />
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Services", href: "/services" }, { name: s.name, href: `/${s.slug}` }]} />
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="eyebrow mb-5">{s.category}</p>
              <h1 className="h-display text-[clamp(2.25rem,5vw,4.25rem)] font-bold">{s.h1}</h1>
              <p className="mt-6 text-lg text-muted">{s.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/free-trial-edit" size="lg">Get a Free Trial Edit</Button>
                <Button href="#pricing" size="lg" variant="outline">See pricing</Button>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-muted"><Clock className="size-4 text-accent" aria-hidden /> {s.turnaround}</p>
            </div>
            <VideoFacade video={s.video} priority />
          </div>
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-x grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <article className="prose-site max-w-none">
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
          </article>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card p-7">
              <h2 className="text-xl font-semibold">What&apos;s included</h2>
              <ul className="mt-5 space-y-3">
                {s.included.map((i) => (
                  <li key={i} className="flex gap-3 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />{i}</li>
                ))}
              </ul>
              <Button href="/contact" className="mt-7 w-full">Start a Project</Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading eyebrow="Work" title={`${s.name} samples`} />
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((c) => <VideoCard key={c.slug} video={c.video} title={c.title} meta={`${c.niche} · ${c.highlight}`} href={`/portfolio/${c.slug}`} />)}
          </div>
        </div>
      </section>

      <section className="section pt-0" id="pricing">
        <div className="container-x">
          <SectionHeading eyebrow="Pricing" title={`${s.name} pricing`} sub={`Turnaround: ${s.turnaround}. All prices in USD.`} />
          <div className="grid gap-5 md:grid-cols-3">
            {s.pricing.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06} className={cn("card flex flex-col p-7", i === 1 && "border-accent/60")}>
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="display mt-4 text-4xl font-bold">{p.price} <span className="text-base font-medium text-muted">{p.unit}</span></p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="size-4 shrink-0 text-accent" aria-hidden />{f}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">Need volume? See <Link href="/pricing" className="text-fg underline underline-offset-2">monthly plans</Link>.</p>
        </div>
      </section>

      <Process short />

      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading eyebrow="Who it's for" title="Built for people like you" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.whoFor.map((w) => (
              <div key={w.title} className="card p-6">
                <h3 className="text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={faqPage(s.faqs)} />
      <FAQ items={s.faqs} title={`${s.name} FAQs`} schema={false} />

      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading eyebrow="Related" title="Related services" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/${r.slug}`} className="card pressable block h-full p-6 hover:border-white/20">
                  <span className="font-semibold">{r.name}</span>
                  <span className="mt-2 block text-sm text-muted">{r.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BlogPreview posts={posts} title="Related reading" />

      <section className="container-x">
        <div className="card flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold">Try us on your own footage — free.</h2>
            <p className="mt-2 text-muted">A 30–60 second sample edit in 48 hours. No card required.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/free-trial-edit">Free Trial Edit</Button>
            <WhatsAppLink href={whatsappUrl(`Hi! I'm interested in ${s.name}.`)} className="pressable inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-semibold hover:bg-white/5">WhatsApp us</WhatsAppLink>
          </div>
        </div>
      </section>
      <QuoteSection service={s.name} title={`Get a ${s.name.toLowerCase()} quote`} />
    </>
  );
}
