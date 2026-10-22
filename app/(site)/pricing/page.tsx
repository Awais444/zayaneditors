import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Check } from "lucide-react";
import { addons, comparison, guarantee, perProject, plans, pricingFaqs } from "@/data/pricing";
import { pageMeta } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
      <section className="section relative pt-10">
        <div className="glow -top-40 left-1/2 size-[36rem] -translate-x-1/2" />
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Pricing", href: "/pricing" }]} />
          <SectionHeading as="h1" eyebrow="Pricing" title="Pricing that scales with your channel" sub="Pay per video, save with a monthly plan, or get a per-project quote. All prices in USD; every plan includes revisions." />
          <PricingClient />
        </div>
      </section>

      <section className="section pt-0" id="projects">
        <div className="container-x">
          <h2 className="text-3xl font-semibold">Per-project pricing</h2>
          <p className="mt-3 max-w-2xl text-muted">Weddings, music videos, ad campaigns and corporate edits are quoted per project. Starting prices below; your final quote depends on footage and deliverables.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perProject.map((p) => (
              <div key={p.name} className="card flex flex-col p-6">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="display mt-3 text-4xl font-bold"><span className="text-sm font-medium text-muted">from </span>${p.from}</p>
                <p className="text-sm text-muted">{p.unit}</p>
                <ul className="mt-5 mb-6 space-y-2 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><Check className="size-4 shrink-0 text-accent" aria-hidden />{f}</li>)}</ul>
                <Link href={p.href} className="mt-auto text-sm font-semibold hover:text-accent">Details →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold">Add-ons</h2>
            <table className="mt-6 w-full text-left text-sm">
              <thead className="text-muted"><tr><th className="py-3 font-medium">Add-on</th><th className="py-3 font-medium">Price</th></tr></thead>
              <tbody className="divide-y divide-line border-t border-line">
                {addons.map((a) => (
                  <tr key={a.name}><td className="py-4 pr-4 font-medium">{a.name}</td><td className="py-4"><span className="font-semibold">{a.price}</span> <span className="text-muted">{a.note}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card self-start p-8">
            <ShieldCheck className="size-9 text-accent" aria-hidden />
            <h2 className="mt-4 text-2xl font-semibold">Our guarantee & revisions policy</h2>
            <p className="mt-3 text-muted">{guarantee}</p>
            <p className="mt-3 text-muted">Revision rounds are returned within 24 hours. Small text or timing fixes after final delivery are always free.</p>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <h2 className="mb-6 text-3xl font-semibold">Compare monthly plans</h2>
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-surface">
                <tr><th className="p-4 font-medium text-muted">Feature</th>{plans.map((p) => <th key={p.name} className="p-4 font-semibold">{p.name}</th>)}</tr>
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
