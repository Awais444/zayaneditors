import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { addons, comparison, guarantee, perProject, perVideo, plans, pricingFaqs } from "@/data/pricing";
import { offerCatalog } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PricingClient } from "./PricingClient";

export const metadata = pageMeta({
  title: "Video Editing Pricing | Per Video, Monthly & Projects",
  description: "Transparent video editing prices: per-video, monthly plans, and per-project pricing for weddings, music videos, ads and corporate edits. Per-minute calculator included.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={offerCatalog("Video editing prices", [
          ...perVideo.map((p) => ({ name: `${p.name} video editing`, price: p.from, unit: `from, ${p.unit}`, description: p.desc })),
          ...perProject.map((p) => ({ name: p.name, price: p.from, unit: `from, ${p.unit}` })),
        ])}
      />
      <PageHero
        breadcrumbs={[{ name: "Pricing", href: "/pricing" }]}
        eyebrow="Pricing"
        title="Pricing that scales with you"
        sub="Pay per video, save with a monthly plan, or get a per-project quote. All prices in USD; every plan includes revisions."
      />

      <section data-tl="Plans" data-tl-color="rgba(52,211,153,0.4)" className="section pt-0">
        <div className="container-x">
          <h2 className="sr-only">Plans</h2>
          <PricingClient />
        </div>
      </section>

      <section id="projects" data-tl="Projects" data-tl-color="rgba(139,92,246,0.45)" className="section cv-auto pt-0">
        <div className="container-x">
          <SectionHeader eyebrow="Per project" title="Weddings, music videos, ads and corporate" intro="Quoted per project. Starting prices below; your final quote depends on footage and deliverables." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perProject.map((p) => (
              <Link key={p.name} href={p.href} className="glow-card card pressable flex flex-col p-6 hover:border-white/20">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-3 font-sans text-4xl font-bold tracking-[-0.04em]"><span className="text-sm font-medium tracking-normal text-muted">from </span>${p.from}</p>
                <p className="text-sm text-muted">{p.unit}</p>
                <ul className="mt-5 mb-6 space-y-2 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><Check className="size-4 shrink-0 text-accent" aria-hidden />{f}</li>)}</ul>
                <span className="mt-auto text-sm font-semibold text-accent">Details →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section data-tl="Add-ons" data-tl-color="rgba(56,189,248,0.4)" className="section cv-auto pt-0">
        <div className="container-x grid gap-12 lg:grid-cols-[3fr_2fr]">
          <div>
            <SectionHeader eyebrow="Add-ons" title="Extras, priced up front" />
            <div className="overflow-hidden rounded-2xl border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface text-muted"><tr><th className="p-4 font-medium">Add-on</th><th className="p-4 font-medium">Price</th></tr></thead>
                <tbody className="divide-y divide-line">
                  {addons.map((a) => (
                    <tr key={a.name} className="transition-colors hover:bg-white/[0.02]">
                      <td className="p-4 font-medium">{a.name}</td>
                      <td className="p-4"><span className="font-semibold text-accent">{a.price}</span> <span className="text-muted">{a.note}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card self-end p-8">
            <ShieldCheck className="size-9 text-accent" aria-hidden />
            <h2 className="mt-4 text-2xl font-semibold">Our guarantee & revisions policy</h2>
            <p className="mt-3 text-muted">{guarantee}</p>
            <p className="mt-3 text-muted">Revision rounds are returned within 24 hours. Small text or timing fixes after final delivery are always free.</p>
          </div>
        </div>
      </section>

      <section data-tl="Compare" data-tl-color="rgba(251,191,36,0.4)" className="section cv-auto pt-0">
        <div className="container-x">
          <SectionHeader eyebrow="Compare" title="Monthly plans side by side" />
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-surface">
                <tr><th className="p-4 font-medium text-muted">Feature</th>{plans.map((p) => <th key={p.name} className={p.featured ? "p-4 font-semibold text-accent" : "p-4 font-semibold"}>{p.name}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-line">
                {comparison.map((r) => (
                  <tr key={r.feature}><td className="p-4 text-muted">{r.feature}</td>{r.values.map((v, i) => <td key={i} className="p-4">{v}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <FAQAccordion items={pricingFaqs} title="Pricing FAQs" />
      <FinalCTA />
    </>
  );
}
