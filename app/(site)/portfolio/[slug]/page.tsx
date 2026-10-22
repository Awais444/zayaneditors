import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/data/portfolio";
import { pageMeta } from "@/lib/metadata";
import { videoObject } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { VideoCard } from "@/components/ui/VideoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/sections/CTABand";
import { getEditor } from "@/data/team";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => caseStudies.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props) {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return pageMeta({ title: `${c.title} | Case Study`, description: `${c.niche} case study: ${c.goal}`, path: `/portfolio/${c.slug}` });
}

export default async function CaseStudyPage({ params }: Props) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  const related = caseStudies.filter((x) => x.slug !== c.slug && x.tags.some((t) => c.tags.includes(t))).slice(0, 3);
  const editor = getEditor(c.editor);
  const facts = [
    ["Client", c.client],
    ["Niche", c.niche],
    ["Platform", c.platform],
  ];
  const results = [
    ["Views", c.results.views],
    ["Retention", c.results.retention],
    ["CTR", c.results.ctr],
    ["Subscribers", c.results.subscribers],
  ];

  return (
    <>
      <JsonLd data={videoObject({ ...c.video, title: c.title, description: c.goal, uploadDate: c.uploadDate, duration: c.duration })} />
      <section className="section pt-10">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Portfolio", href: "/portfolio" }, { name: c.title, href: `/portfolio/${c.slug}` }]} />
          <p className="eyebrow mb-4">Case study · {c.niche}</p>
          <h1 className="h-display max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)] font-bold">{c.title}</h1>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
            {facts.map(([k, v]) => <div key={k}><dt className="text-muted">{k}</dt><dd className="font-medium">{v}</dd></div>)}
            {editor && <div><dt className="text-muted">Edited by</dt><dd className="font-medium"><Link href={`/team#${editor.slug}`} className="hover:text-accent">{editor.name}</Link></dd></div>}
          </dl>
          <VideoFacade video={c.video} className="mt-10" priority />
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {results.map(([k, v]) => (
              <div key={k} className="bg-bg p-6">
                <dt className="text-sm text-muted">{k}</dt>
                <dd className="display mt-1 text-3xl font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-muted">TODO: sample figures — replace with verified client results.</p>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold">The goal</h2>
            <p className="mt-4 text-lg text-muted">{c.goal}</p>
            <h2 className="mt-12 text-3xl font-semibold">What we did</h2>
            <ul className="mt-5 space-y-3">
              {c.whatWeDid.map((w) => <li key={w} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden />{w}</li>)}
            </ul>
          </div>
          <div className="grid gap-5 self-start">
            <div className="card p-6"><p className="eyebrow mb-2 text-muted!">Before</p><p className="text-lg">{c.before}</p></div>
            <div className="card border-accent/50 p-6"><p className="eyebrow mb-2">After</p><p className="text-lg">{c.after}</p></div>
            {c.testimonial && (
              <figure className="card p-6">
                <blockquote className="text-lg">“{c.testimonial.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-muted">{c.testimonial.name} · {c.testimonial.role}</figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section pt-0">
          <div className="container-x">
            <SectionHeading title="Related work" />
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <VideoCard key={r.slug} video={r.video} title={r.title} meta={r.highlight} href={`/portfolio/${r.slug}`} />)}
            </div>
          </div>
        </section>
      )}
      <CTABand title="Want results like these?" />
    </>
  );
}
