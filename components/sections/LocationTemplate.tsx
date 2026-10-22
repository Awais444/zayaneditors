import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import type { Country } from "@/data/locations";
import { locationName } from "@/data/locations";
import { perVideo } from "@/data/pricing";
import { getService } from "@/data/services";
import { formatMoney } from "@/lib/utils";
import { professionalService } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { FAQ } from "./FAQ";
import { CTABand } from "./CTABand";

const topServices = ["youtube-video-editing", "short-form-video-editing", "podcast-video-editing", "video-editing-for-coaches"];

type Place = { name: string; h1: string; intro: string; paragraphs: { heading: string; text: string }[]; niches: string[]; timeOverlap: string; faqs: { q: string; a: string }[]; nearby: string[]; localProof?: { quote: string; name: string } };

export function LocationTemplate({
  place,
  country,
  crumbs,
  children,
  areaServed,
}: {
  place: Place;
  country: Country;
  crumbs: { name: string; href: string }[];
  children?: React.ReactNode;
  areaServed: string[];
}) {
  const { currency } = country;
  const parent = crumbs.length > 2 ? crumbs[crumbs.length - 2] : null;
  return (
    <>
      <JsonLd data={professionalService(areaServed)} />
      <section className="section relative pt-10">
        <div className="glow -top-40 right-0 size-[32rem]" />
        <div className="container-x">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mb-4 flex items-center gap-2"><MapPin className="size-3.5" aria-hidden /> {place.name}</p>
          <h1 className="h-display max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)] font-bold">{place.h1}</h1>
          <p className="mt-6 max-w-3xl text-lg text-muted">{place.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/free-trial-edit" size="lg">Get a Free Trial Edit</Button>
            <Button href="/contact" size="lg" variant="outline">Start a Project</Button>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="prose-site">
            {place.paragraphs.map((p) => (
              <div key={p.heading}>
                <h2>{p.heading}</h2>
                <p>{p.text}</p>
              </div>
            ))}
            <h2>Popular creator niches in {place.name}</h2>
            <ul>{place.niches.map((n) => <li key={n}>{n}</li>)}</ul>
          </div>
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6">
              <p className="flex items-center gap-2 font-semibold"><Clock className="size-4 text-accent" aria-hidden /> Time-zone overlap</p>
              <p className="mt-2 text-sm text-muted">{place.timeOverlap}</p>
              <p className="mt-2 text-xs text-muted">Local time: {country.timezone}</p>
            </div>
            <div className="card p-6">
              <p className="font-semibold">Prices in {currency.code}</p>
              <p className="mt-1 text-xs text-muted">Approximate — invoices in {currency.code} or USD.</p>
              <ul className="mt-4 divide-y divide-line text-sm">
                {perVideo.map((p) => (
                  <li key={p.name} className="flex justify-between py-2.5">
                    <span>{p.name}</span>
                    <span className="font-semibold">from {formatMoney(p.from, currency.rate, currency.symbol)}</span>
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="mt-4 inline-block text-sm font-semibold hover:text-accent">Full pricing →</Link>
            </div>
            <div className="card p-6">
              <p className="font-semibold">Local case study</p>
              {place.localProof ? (
                <blockquote className="mt-2 text-sm">“{place.localProof.quote}” — {place.localProof.name}</blockquote>
              ) : (
                <p className="mt-2 text-sm text-muted">{/* TODO: add a real local case study or testimonial */}Working with a creator in {place.name}? Your story could be here. <Link href="/portfolio" className="text-fg underline underline-offset-2">See our work</Link>.</p>
              )}
            </div>
          </aside>
        </div>
      </section>

      {children}

      <section className="section pt-0">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Popular services in {place.name}</h2>
            <ul className="mt-5 grid gap-3">
              {topServices.map((slug) => {
                const s = getService(slug)!;
                return (
                  <li key={slug}><Link href={`/${slug}`} className="card pressable block p-4 hover:border-white/20"><span className="font-semibold">{s.name}</span><span className="block text-sm text-muted">{s.short}</span></Link></li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Nearby locations</h2>
            <ul className="mt-5 grid gap-3">
              {parent && (
                <li><Link href={parent.href} className="card pressable block p-4 hover:border-white/20">↑ All of {parent.name}</Link></li>
              )}
              {place.nearby.map((path) => (
                <li key={path}><Link href={`/locations/${path}`} className="card pressable block p-4 hover:border-white/20">{locationName(path)}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <FAQ items={place.faqs} title={`${place.name} FAQs`} />
      <CTABand />
    </>
  );
}

export function ChildList({ title, items }: { title: string; items: { name: string; href: string; text: string }[] }) {
  if (!items.length) return null;
  return (
    <section className="section pt-0">
      <div className="container-x">
        <h2 className="mb-6 text-3xl font-semibold">{title}</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <li key={i.href}><Link href={i.href} className="card pressable block h-full p-6 hover:border-white/20"><span className="text-lg font-semibold">{i.name}</span><span className="mt-2 line-clamp-3 block text-sm text-muted">{i.text}</span></Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
