import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceGroups, services, servicesByCategory } from "@/data/services";
import { pageMeta } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/sections/CTABand";

export const metadata = pageMeta({
  title: "All Video Editing Services | YouTube, Ads, Weddings & More",
  description: "Every video editing service we offer: YouTube, social, ads, brand films, weddings, events, music videos, podcasts, plus colour, sound and motion graphics.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <div className="container-x pt-10">
        <Breadcrumbs items={[{ name: "Services", href: "/services" }]} />
        <SectionHeading as="h1" eyebrow="Services" title="Video editing services for every kind of video" sub={`${services.length} specialised services from one dedicated team of editors. Pick what you need or let us recommend a plan.`} />
      </div>
      {serviceGroups.map(({ name: cat, blurb }) => (
        <section key={cat} className="container-x border-t border-line py-14" aria-labelledby={`cat-${cat}`}>
          <div className="grid gap-8 lg:grid-cols-[1fr_2.2fr]">
            <div>
              <h2 id={`cat-${cat}`} className="text-3xl font-semibold">{cat}</h2>
              <p className="mt-3 text-muted">{blurb}</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {servicesByCategory(cat).map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="card pressable group flex h-full flex-col p-6 hover:border-white/20">
                    <span className="flex items-start justify-between gap-4">
                      <span className="text-lg font-semibold">{s.name}</span>
                      <ArrowUpRight className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden />
                    </span>
                    <span className="mt-2 text-sm text-muted">{s.short}</span>
                    <span className="mt-4 text-sm font-medium">From {s.pricing[0].price} <span className="text-muted">{s.pricing[0].unit}</span></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <CTABand />
    </>
  );
}
