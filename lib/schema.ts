import { site } from "@/data/site";
import { absoluteUrl } from "./utils";
import type { Testimonial } from "@/data/testimonials";

type Faq = { q: string; a: string };

export const organization = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#org`,
  name: site.name,
  description: site.description,
  url: site.url,
  logo: absoluteUrl(site.logo),
  email: site.email,
  sameAs: Object.values(site.socials),
});

export const website = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  publisher: { "@id": `${site.url}/#org` },
});

export const professionalService = (areaServed: string[] = [...site.markets], reviews: Testimonial[] = []) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#service`,
  name: site.name,
  description: site.description,
  url: site.url,
  image: absoluteUrl("/opengraph-image"),
  email: site.email,
  priceRange: `$${site.priceFrom}+`,
  areaServed: areaServed.map((name) => ({ "@type": "Place", name })),
  ...(reviews.length
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1),
          reviewCount: reviews.length,
        },
        review: reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.name },
          reviewRating: { "@type": "Rating", ratingValue: r.rating },
          reviewBody: r.quote,
        })),
      }
    : {}),
});

export const serviceSchema = (s: { name: string; metaDescription: string; slug: string; pricing: { price: string }[] }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  serviceType: s.name,
  description: s.metaDescription,
  url: absoluteUrl(`/${s.slug}`),
  provider: { "@id": `${site.url}/#org` },
  areaServed: site.markets,
  offers: s.pricing
    .filter((p) => /\d/.test(p.price))
    .map((p) => ({ "@type": "Offer", price: p.price.replace(/[^0-9.]/g, ""), priceCurrency: "USD" })),
});

export const faqPage = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const videoObject = (v: { title: string; poster: string; src: string; description?: string; uploadDate?: string; duration?: string }) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: v.title,
  description: v.description || `${v.title} — edited by ${site.name}`,
  thumbnailUrl: [v.poster],
  uploadDate: v.uploadDate || "2026-01-15", // TODO: real upload dates
  duration: v.duration || "PT1M",
  contentUrl: v.src,
});

export const breadcrumbs = (items: { name: string; href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.href) })),
});

export const blogPosting = (p: { title: string; description: string; slug: string; date: string; updated?: string; author: string; cover: string }) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: p.title,
  description: p.description,
  image: p.cover,
  datePublished: p.date,
  dateModified: p.updated || p.date,
  author: { "@type": "Person", name: p.author },
  publisher: { "@id": `${site.url}/#org` },
  mainEntityOfPage: absoluteUrl(`/blog/${p.slug}`),
});
