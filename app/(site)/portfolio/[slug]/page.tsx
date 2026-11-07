import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getWorkItem, isVertical, previewDuration, work } from "@/data/portfolio";
import { firstPublished } from "@/lib/lastmod";
import { pageMeta } from "@/lib/metadata";
import { creativeWork, videoObject } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { NextProject } from "@/components/sections/NextProject";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => work.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props) {
  const p = getWorkItem((await params).slug);
  if (!p) return {};
  const m = pageMeta({ title: p.metaTitle, description: p.metaDescription, path: `/portfolio/${p.slug}` });
  return { ...m, openGraph: { ...m.openGraph, images: [{ url: p.poster, alt: p.altText }] } };
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

export default async function ProjectPage({ params }: Props) {
  const p = getWorkItem((await params).slug);
  if (!p) notFound();
  const i = work.indexOf(p);
  const next = work[(i + 1) % work.length];
  const vertical = isVertical(p);
  const more = work.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const facts = [
    ["Category", p.category],
    ["Platform", p.platform],
    ["Format", p.aspectRatio],
    ["Length", fmt(p.duration)],
  ];

  return (
    <>
      <JsonLd data={[videoObject({ title: p.title, description: p.description, poster: p.poster, src: p.preview.mp4, uploadDate: firstPublished("data/portfolio-items.ts").toISOString(), duration: `PT${previewDuration(p)}S`, page: `/portfolio/${p.slug}`, sameAs: p.instagramUrl }), creativeWork(p)]} />

      <section data-tl="Intro" data-tl-color="rgba(198,244,50,0.35)" className="relative isolate overflow-hidden">
        <div aria-hidden className="glow -top-48 right-0 -z-10 size-[36rem]" />
        <div className={cn("container-x grid items-center gap-10 pt-10 pb-16 md:pb-20", vertical ? "lg:grid-cols-[1.2fr_1fr]" : "")}>
          <div>
            <Breadcrumbs items={[{ name: "Portfolio", href: "/portfolio" }, { name: p.title, href: `/portfolio/${p.slug}` }]} />
            <p className="mb-5 text-xs font-semibold tracking-[0.14em] text-accent uppercase">{p.category}</p>
            <h1 className="max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.035em]">
              {p.title.split(" ").map((w, n) => (
                <span key={`${w}-${n}`} className="kinetic-word mr-[0.22em]" style={{ "--i": n } as React.CSSProperties}>{w}</span>
              ))}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">{p.description}</p>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
              {facts.map(([k, v]) => (
                <div key={k}><dt className="text-muted">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
            </dl>
          </div>
          {/* Preview player: muted 12s highlight; the full video is shared on request */}
          <figure className={cn("mx-auto w-full", vertical ? "max-w-sm" : "")}>
            <div className={cn("relative overflow-hidden rounded-3xl border border-line bg-black shadow-[0_40px_120px_-40px_rgba(198,244,50,0.35)]", vertical ? "aspect-[9/16]" : "aspect-video")}>
              <Image src={p.poster} alt={p.altText} fill priority sizes={vertical ? "384px" : "(min-width: 1280px) 1200px, 100vw"} className="object-cover" />
              <video controls muted loop playsInline preload="none" poster={p.poster} className="absolute inset-0 size-full object-cover">
                <source src={p.preview.webm} type="video/webm" />
                <source src={p.preview.mp4} type="video/mp4" />
              </video>
            </div>
            <figcaption className="mt-3 text-center text-xs text-muted">Highlight preview · full edit available on request</figcaption>
          </figure>
        </div>
      </section>

      <section data-tl="The edit" data-tl-color="rgba(56,189,248,0.4)" className="section pt-0">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="What we did" title="The edit" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {p.editingStyle.map((s) => (
                <li key={s} className="card flex items-center gap-3 p-4 text-sm font-medium capitalize"><Check className="size-4 shrink-0 text-accent" aria-hidden />{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="Tags" title="Niche & format" />
            <ul className="flex flex-wrap gap-2" aria-label="Tags">
              {p.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-4 py-2 text-sm text-muted capitalize">{t}</li>
              ))}
            </ul>
            <Link href="/contact" className="mt-8 inline-flex font-semibold hover:text-accent">Want an edit like this? Start a project →</Link>
            {p.instagramUrl && (
              <a href={p.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex font-semibold text-muted hover:text-accent">View on Instagram ↗</a>
            )}
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section data-tl="More" data-tl-color="rgba(139,92,246,0.45)" className="section cv-auto pt-0">
          <div className="container-x">
            <SectionHeader eyebrow={p.category} title="More in this category" />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((m) => (
                <li key={m.slug}>
                  <Link href={`/portfolio/${m.slug}`} className="group pressable block">
                    <div className={cn("relative overflow-hidden rounded-2xl border border-line bg-black", isVertical(m) ? "aspect-[4/5]" : "aspect-video")}>
                      <Image src={m.poster} alt={m.altText} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                    </div>
                    <h3 className="mt-3 font-semibold group-hover:text-accent">{m.title}</h3>
                    <p className="text-sm text-muted">{m.shortDescription}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <NextProject href={`/portfolio/${next.slug}`} title={next.title} meta={`${next.category} · ${next.platform}`} video={{ src: next.preview.mp4, poster: next.poster }} />
      <FinalCTA />
    </>
  );
}
