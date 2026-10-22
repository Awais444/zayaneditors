import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/data/portfolio";
import { getEditor } from "@/data/team";
import { pageMeta } from "@/lib/metadata";
import { videoObject } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InViewVideo } from "@/components/ui/InViewVideo";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { Counter } from "@/components/ui/Counter";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CompareSlider } from "@/components/sections/CompareSlider";
import { StickySteps } from "@/components/sections/StickySteps";
import { NextProject } from "@/components/sections/NextProject";
import { FinalCTA } from "@/components/sections/FinalCTA";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => caseStudies.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props) {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return pageMeta({ title: `${c.title} | Case Study`, description: `${c.niche} case study: ${c.goal}`, path: `/portfolio/${c.slug}` });
}

/** Splits "4.2M" / "+58%" / "71% avg" into a count-up number and its affixes. */
function stat(v: string) {
  const m = v.match(/^([^\d]*)([\d.]+)(.*)$/);
  return m ? { prefix: m[1], value: parseFloat(m[2]), decimals: m[2].includes("."), suffix: m[3] } : null;
}

export default async function CaseStudyPage({ params }: Props) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  const i = caseStudies.indexOf(c);
  const next = caseStudies[(i + 1) % caseStudies.length];
  const editor = getEditor(c.editor);
  const results = [
    ["Views", c.results.views],
    ["Retention", c.results.retention],
    ["CTR", c.results.ctr],
    ["Subscribers", c.results.subscribers],
  ] as const;

  return (
    <>
      <JsonLd data={videoObject({ ...c.video, title: c.title, description: c.goal, uploadDate: c.uploadDate, duration: c.duration })} />

      {/* Full-bleed video hero */}
      <section data-tl="Intro" data-tl-color="rgba(198,244,50,0.35)" className="relative isolate -mt-px overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={c.video.poster} alt="" fill priority sizes="100vw" className="object-cover" />
          <InViewVideo src={c.video.src} poster={c.video.poster} className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20" />
        </div>
        <div className="container-x flex min-h-[78svh] flex-col justify-end pt-10 pb-14 md:pb-20">
          <Breadcrumbs items={[{ name: "Portfolio", href: "/portfolio" }, { name: c.title, href: `/portfolio/${c.slug}` }]} />
          <p className="mb-5 text-xs font-semibold tracking-[0.14em] text-accent uppercase">Case study · {c.niche}</p>
          <h1 className="max-w-5xl text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.95] font-bold tracking-[-0.035em]">
            {c.title.split(" ").map((w, n) => (
              <span key={`${w}-${n}`} className="kinetic-word mr-[0.22em]" style={{ "--i": n } as React.CSSProperties}>{w}</span>
            ))}
          </h1>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
            {[["Client", c.client], ["Platform", c.platform]].map(([k, v]) => (
              <div key={k}><dt className="text-muted">{k}</dt><dd className="font-medium">{v}</dd></div>
            ))}
            {editor && <div><dt className="text-muted">Edited by</dt><dd className="font-medium"><Link href={`/team#${editor.slug}`} className="hover:text-accent">{editor.name}</Link></dd></div>}
          </dl>
        </div>
      </section>

      {/* Results band */}
      <section data-tl="Results" data-tl-color="rgba(198,244,50,0.3)" aria-label="Results" className="border-y border-line bg-surface/60 py-14 md:py-20">
        <dl className="container-x grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {results.map(([k, v]) => {
            const s = stat(v);
            return (
              <div key={k} className="flex flex-col items-center text-center">
                <dt className="order-last mt-2 text-muted">{k}</dt>
                <dd className="font-sans text-[clamp(2.5rem,5.5vw,4.5rem)] leading-none font-bold tracking-[-0.04em] whitespace-nowrap">
                  {s && !s.decimals ? <>{s.prefix}<Counter value={s.value} />{s.suffix}</> : v}
                </dd>
              </div>
            );
          })}
        </dl>
        <p className="container-x mt-8 text-center text-xs text-muted">TODO: sample figures — replace with verified client results.</p>
      </section>

      <section data-tl="The edit" data-tl-color="rgba(56,189,248,0.4)" className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4">The goal</p>
            <h2 className="h-section">What they needed</h2>
            <p className="mt-5 text-lg text-muted">{c.goal}</p>
          </div>
          <VideoFacade video={c.video} />
        </div>
      </section>

      <section data-tl="Before / after" data-tl-color="rgba(139,92,246,0.45)" className="section pt-0">
        <div className="container-x">
          <SectionHeader eyebrow="Before / after" title="Drag to see the difference" />
          <CompareSlider poster={c.video.poster} before={c.before} after={c.after} />
        </div>
      </section>

      <StickySteps steps={c.whatWeDid.map((w) => ({ title: w }))} eyebrow="What we did" title="How we got there" tl="What we did" />

      {c.testimonial && (
        <section data-tl="Quote" data-tl-color="rgba(244,114,182,0.4)" className="section pt-0">
          <figure className="container-x mx-auto max-w-4xl text-center">
            <blockquote className="text-[clamp(1.5rem,3.2vw,2.5rem)] leading-tight font-semibold tracking-[-0.02em]">“{c.testimonial.quote}”</blockquote>
            <figcaption className="mt-6 text-muted">{c.testimonial.name} · {c.testimonial.role}</figcaption>
          </figure>
        </section>
      )}

      <NextProject href={`/portfolio/${next.slug}`} title={next.title} meta={`${next.niche} · ${next.highlight}`} video={next.video} />
      <FinalCTA />
    </>
  );
}
