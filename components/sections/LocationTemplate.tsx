import Link from "next/link";
import { Clock, MapPin, Mic, Smartphone, Users, Youtube, type LucideIcon } from "lucide-react";
import type { Country } from "@/data/locations";
import { locationName } from "@/data/locations";
import { perVideo } from "@/data/pricing";
import { getService } from "@/data/services";
import { toCard, work } from "@/data/portfolio";
import { processSteps, shortProcess } from "@/data/process";
import { formatMoney } from "@/lib/utils";
import { professionalService } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { processVisuals } from "@/components/home/ProcessVisuals";
import { SectionHeader } from "./SectionHeader";
import { BentoGrid, type BentoItem } from "./BentoGrid";
import { VideoRow } from "./VideoRow";
import { PricingCards } from "./PricingCards";
import { StickySteps } from "./StickySteps";
import { LocalTime } from "./LocalTime";
import { FAQAccordion } from "./FAQAccordion";
import { FinalCTA } from "./FinalCTA";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { locationAnswer } from "@/lib/answers";

const topServices: [string, LucideIcon][] = [
  ["youtube-video-editing", Youtube],
  ["short-form-video-editing", Smartphone],
  ["podcast-video-editing", Mic],
  ["video-editing-for-coaches", Users],
];

/** IANA zone for the live time chip (the data only carries display labels). Falls back to the country. */
const zones: Record<string, string> = {
  usa: "America/New_York", california: "America/Los_Angeles", "los-angeles": "America/Los_Angeles", "new-york": "America/New_York", "new-york-city": "America/New_York",
  texas: "America/Chicago", austin: "America/Chicago", florida: "America/New_York", miami: "America/New_York", illinois: "America/Chicago", chicago: "America/Chicago",
  uk: "Europe/London", england: "Europe/London", london: "Europe/London",
  canada: "America/Toronto", ontario: "America/Toronto", toronto: "America/Toronto",
  australia: "Australia/Sydney", "new-south-wales": "Australia/Sydney", sydney: "Australia/Sydney",
  uae: "Asia/Dubai", "dubai-emirate": "Asia/Dubai", dubai: "Asia/Dubai",
};

type Place = { slug: string; name: string; h1: string; intro: string; paragraphs: { heading: string; text: string }[]; niches: string[]; timeOverlap: string; faqs: { q: string; a: string }[]; nearby: string[]; localProof?: { quote: string; name: string } };


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
  const tz = zones[place.slug] ?? zones[country.slug] ?? "UTC";
  const services: BentoItem[] = topServices.map(([slug, icon], i) => {
    const s = getService(slug)!;
    return { href: `/${slug}`, title: s.name, text: s.short, icon, large: i === 0, video: i === 0 ? s.video : undefined };
  });
  const plans = perVideo.map((p) => ({ name: p.name, desc: p.desc, price: formatMoney(p.from, currency.rate, currency.symbol), unit: `${p.unit}, from`, features: p.features }));
  const featured = Math.max(0, perVideo.findIndex((p) => "featured" in p && p.featured));

  return (
    <>
      <JsonLd data={professionalService(areaServed)} />

      <section data-tl="Intro" data-tl-color="rgba(198,244,50,0.35)" className="relative isolate overflow-hidden">
        <div aria-hidden className="glow -top-48 right-0 -z-10 size-[36rem]" />
        <div className="container-x pt-10 pb-16 md:pb-20">
          <Breadcrumbs items={crumbs} />
          {/* Kinetic place name: decorative display type; the H1 below carries the keyword */}
          <p aria-hidden className="pb-[0.06em] text-[clamp(3.5rem,13vw,11rem)] leading-[0.9] font-bold tracking-[-0.05em] uppercase">
            {place.name.split(" ").map((w, i) => (
              <span key={`${w}-${i}`} className="kinetic-word mr-[0.18em]" style={{ "--i": i } as React.CSSProperties}>{w}</span>
            ))}
          </p>
          <div className="mt-6">
            <LocalTime tz={tz} label={`${place.name} time`} />
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase"><MapPin className="size-3.5" aria-hidden /> Video editing in {place.name}</p>
              <h1 className="max-w-3xl text-[clamp(1.75rem,3.2vw,2.75rem)] leading-tight font-bold tracking-[-0.03em]">{place.h1}</h1>
              <p className="mt-5 max-w-3xl text-lg text-muted">{place.intro}</p>
            </div>
            <div className="flex flex-col items-start gap-5 lg:items-end">
              <div className="flex flex-wrap gap-3">
                <Magnetic><Button href="/free-trial-edit" size="lg">Get a Free Trial Edit</Button></Magnetic>
                <Button href="/contact" size="lg" variant="outline">Start a Project</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuickAnswer question={`Can I hire a video editor in ${place.name}?`} answer={locationAnswer(place)} />

      <section data-tl="Services" data-tl-color="rgba(139,92,246,0.45)" className="section cv-auto pt-4">
        <div className="container-x">
          <SectionHeader eyebrow="Services" title={`Popular in ${place.name}`} />
          <BentoGrid items={services} />
        </div>
      </section>

      <section data-tl="Local" data-tl-color="rgba(244,244,245,0.2)" className="section cv-auto pt-0">
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

      <section data-tl="Work" data-tl-color="rgba(56,189,248,0.4)" className="section cv-auto pt-0">
        <VideoRow label="Recent edits" header={<SectionHeader eyebrow="Work" title="Recent edits" intro="Hover to preview, click for the full case study." />} items={work.filter((p) => p.featured).slice(0, 6).map(toCard)} />
      </section>

      <section data-tl="Pricing" data-tl-color="rgba(52,211,153,0.4)" className="section cv-auto pt-0">
        <div className="container-x">
          <SectionHeader eyebrow="Pricing" title={`Prices in ${currency.code}`} intro={`Approximate — invoices in ${currency.code} or USD.`} center />
          <PricingCards plans={plans} featured={featured} />
          <p className="mt-10 text-center text-sm text-muted">Need volume? See <Link href="/pricing" className="text-fg underline underline-offset-2">monthly plans</Link>.</p>
        </div>
      </section>

      <StickySteps steps={shortProcess.map((i) => processSteps[i])} visuals={shortProcess.map((i) => processVisuals[i])} title="How it works" tl="Process" />

      {children}

      {(parent || place.nearby.length > 0) && (
        <section data-tl="Nearby" data-tl-color="rgba(251,191,36,0.4)" className="section cv-auto pt-0">
          <div className="container-x">
            <SectionHeader eyebrow="Nearby" title="Other locations we serve" />
            <ul className="flex flex-wrap gap-3">
              {parent && <li><Link href={parent.href} className="pressable inline-flex rounded-full border border-line px-5 py-2.5 text-sm hover:border-accent hover:text-accent">↑ All of {parent.name}</Link></li>}
              {place.nearby.map((path) => (
                <li key={path}><Link href={`/locations/${path}`} className="pressable inline-flex rounded-full border border-line px-5 py-2.5 text-sm hover:border-accent hover:text-accent">{locationName(path)}</Link></li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <FAQAccordion items={place.faqs} title={`${place.name} FAQs`} />
      <FinalCTA />
    </>
  );
}

export function ChildList({ title, items }: { title: string; items: { name: string; href: string; text: string }[] }) {
  if (!items.length) return null;
  return (
    <section data-tl="Areas" data-tl-color="rgba(244,114,182,0.4)" className="section cv-auto pt-0">
      <div className="container-x">
        <SectionHeader eyebrow="Areas" title={title} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <li key={i.href}>
              <Link href={i.href} className="glow-card card pressable block h-full p-6 hover:border-white/20">
                <span className="flex items-center gap-2 text-lg font-semibold"><MapPin className="size-4 text-accent" aria-hidden />{i.name}</span>
                <span className="mt-2 line-clamp-3 block text-sm text-muted">{i.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
