import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { work } from "@/data/portfolio";
import { countries } from "@/data/locations";
import { getAllPosts } from "@/lib/blog";
import { lastModified } from "@/lib/lastmod";

/** Every indexable route, with lastModified taken from the git history of the files behind it. */
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${site.url}${p}`;
  const page = (p: string, files: string[], priority: number) => ({ url: u(p), lastModified: lastModified(...files), priority });

  const staticRoutes: [string, string[], number][] = [
    ["", ["app/(site)/page.tsx", "components/home", "data/portfolio-items.ts"], 1],
    ["/services", ["app/(site)/services", "data/services.ts"], 0.9],
    ["/portfolio", ["app/(site)/portfolio/page.tsx", "data/portfolio-items.ts"], 0.8],
    ["/pricing", ["app/(site)/pricing", "data/pricing.ts"], 0.8],
    ["/video-editing-pricing-guide", ["app/(site)/video-editing-pricing-guide", "data/pricing.ts"], 0.8],
    ["/process", ["app/(site)/process", "data/process.ts"], 0.7],
    ["/glossary", ["app/(site)/glossary", "data/glossary.ts"], 0.6],
    ["/video-editing-agency", ["app/(site)/video-editing-agency"], 0.8],
    ["/contact", ["app/(site)/contact"], 0.7],
    ["/free-trial-edit", ["app/(landing)/free-trial-edit"], 0.7],
    ["/blog", ["app/(site)/blog/page.tsx", "content/blog"], 0.7],
    ["/about", ["app/(site)/about"], 0.6],
    ["/team", ["app/(site)/team", "data/team.ts"], 0.6],
    ["/faq", ["app/(site)/faq", "data/faqs.ts"], 0.6],
    ["/locations", ["app/(site)/locations/page.tsx", "data/locations.ts"], 0.6],
    ["/privacy-policy", ["app/(site)/privacy-policy"], 0.2],
    ["/terms", ["app/(site)/terms"], 0.2],
  ];
  const locations = countries.flatMap((c) => [
    `/locations/${c.slug}`,
    ...c.states.flatMap((s) => [`/locations/${c.slug}/${s.slug}`, ...s.cities.map((city) => `/locations/${c.slug}/${s.slug}/${city.slug}`)]),
  ]);

  return [
    ...staticRoutes.map(([p, files, prio]) => page(p, files, prio)),
    ...services.map((s) => page(`/${s.slug}`, ["data/service-copy", "data/services.ts", "app/(site)/[service]"], 0.9)),
    ...work.map((c) => page(`/portfolio/${c.slug}`, ["data/portfolio-items.ts", "app/(site)/portfolio/[slug]"], 0.6)),
    ...getAllPosts().map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: new Date(p.updated || p.date), priority: 0.7 })),
    ...locations.map((p) => page(p, ["data/locations.ts", "components/sections/LocationTemplate.tsx"], 0.6)),
  ];
}
