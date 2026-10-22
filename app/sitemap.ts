import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { caseStudies } from "@/data/portfolio";
import { countries } from "@/data/locations";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${site.url}${p}`;
  const now = new Date();
  const staticRoutes = ["", "/services", "/portfolio", "/pricing", "/contact", "/free-trial-edit", "/blog", "/about", "/team", "/faq", "/locations", "/video-editing-agency", "/privacy-policy", "/terms"];
  const locations = countries.flatMap((c) => [
    `/locations/${c.slug}`,
    ...c.states.flatMap((s) => [`/locations/${c.slug}/${s.slug}`, ...s.cities.map((city) => `/locations/${c.slug}/${s.slug}/${city.slug}`)]),
  ]);
  return [
    ...staticRoutes.map((p) => ({ url: u(p), lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: u(`/${s.slug}`), lastModified: now, priority: 0.9 })),
    ...caseStudies.map((c) => ({ url: u(`/portfolio/${c.slug}`), lastModified: now, priority: 0.6 })),
    ...getAllPosts().map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: new Date(p.updated || p.date), priority: 0.7 })),
    ...locations.map((p) => ({ url: u(p), lastModified: now, priority: 0.6 })),
  ];
}
