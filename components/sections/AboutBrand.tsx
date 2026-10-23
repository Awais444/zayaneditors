import Link from "next/link";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { lowestPrice } from "@/data/pricing";
import { KeyFacts } from "@/components/seo/KeyFacts";

/**
 * "About [brand]" entity block: one clear paragraph plus facts, all from data/site.ts, data/services.ts
 * and data/pricing.ts. Placeholder trust numbers (site.stats / site.trust) are deliberately not used.
 */
export function AboutBrand() {
  const facts = [
    { label: "What we do", value: "Professional video editing as a remote team" },
    { label: "Services", value: `${services.length} editing services` },
    { label: "Clients in", value: site.markets.join(", ") },
    { label: "First cut", value: `Within ${site.turnaround}` },
    { label: "Prices from", value: `$${lowestPrice} per video` },
    { label: "Free trial", value: "Yes, on your own footage" },
  ];
  return (
    <section data-tl="About" data-tl-color="rgba(244,244,245,0.2)" className="section cv-auto pt-0">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow mb-4">About us</p>
          <h2 className="h-section mb-6">What is {site.name}?</h2>
          <p className="text-lg text-muted">
            {site.name} is {site.description.charAt(0).toLowerCase() + site.description.slice(1)}
          </p>
          <p className="mt-4 text-muted">
            See <Link href="/process" className="text-fg underline underline-offset-2">how we work</Link>, <Link href="/team" className="text-fg underline underline-offset-2">meet the team</Link> or <Link href="/contact" className="text-fg underline underline-offset-2">contact us</Link>.
          </p>
        </div>
        <KeyFacts title={`${site.shortName} at a glance`} facts={facts} />
      </div>
    </section>
  );
}
