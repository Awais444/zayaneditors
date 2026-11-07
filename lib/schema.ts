import { site } from "@/data/site";
import { lowestPrice } from "@/data/pricing";
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
  logo: absoluteUrl("/icon.svg"),
  ...(site.email ? { email: site.email } : {}),
  foundingDate: String(site.foundedYear),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: absoluteUrl("/contact"),
    availableLanguage: ["English"],
    ...(site.email ? { email: site.email } : {}),
  },
  sameAs: Object.values(site.socials).filter(Boolean),
});

export const website = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  publisher: { "@id": `${site.url}/#org` },
});

/** Service groups offered (kept in sync with data/services.ts). */
const serviceTypes = ["YouTube & long-form editing", "Short-form & social video editing", "Ad & marketing video editing", "Event & wedding video editing", "Podcast video editing", "Colour grading, motion graphics & sound"];

export const professionalService = (areaServed: string[] = [...site.markets], reviews: Testimonial[] = []) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#service`,
  name: site.name,
  description: site.description,
  url: site.url,
  image: absoluteUrl("/opengraph-image"),
  ...(site.email ? { email: site.email } : {}),
  priceRange: `${lowestPrice}+`,
  serviceType: serviceTypes,
  provider: { "@id": `${site.url}/#org` },
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

export const serviceSchema = (s: { name: string; metaDescription: string; slug: string; pricing: { name?: string; price: string; unit?: string }[] }) => ({
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
    .map((p) => ({
      "@type": "Offer",
      ...(p.name ? { name: p.name } : {}),
      price: p.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      url: absoluteUrl(`/${s.slug}#pricing`),
      ...(p.unit ? { description: p.unit } : {}),
    })),
});

export const faqPage = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

/** VideoObject for a hosted clip. uploadDate = when it was published on this site (pass it in). */
export const videoObject = (v: { title: string; poster: string; src: string; uploadDate: string; description?: string; duration?: string; page?: string; sameAs?: string }) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: v.title,
  description: v.description || `${v.title} — edited by ${site.name}`,
  thumbnailUrl: [absoluteUrl(v.poster)],
  uploadDate: v.uploadDate,
  ...(v.duration ? { duration: v.duration } : {}),
  contentUrl: absoluteUrl(v.src),
  ...(v.page ? { embedUrl: absoluteUrl(v.page) } : {}),
  ...(v.sameAs ? { sameAs: [v.sameAs] } : {}),
  publisher: { "@id": `${site.url}/#org` },
});

/** Portfolio project as a CreativeWork made by the organisation. */
export const creativeWork = (p: { title: string; description: string; slug: string; poster: string; category: string; tags: string[]; instagramUrl?: string }) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: p.title,
  description: p.description,
  url: absoluteUrl(`/portfolio/${p.slug}`),
  image: absoluteUrl(p.poster),
  genre: p.category,
  keywords: p.tags.join(", "),
  ...(p.instagramUrl ? { sameAs: [p.instagramUrl] } : {}),
  creator: { "@id": `${site.url}/#org` },
});

/** Pricing as an OfferCatalog (USD). */
export const offerCatalog = (name: string, items: { name: string; price: number; unit: string; description?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name,
  url: absoluteUrl("/pricing"),
  itemListElement: items.map((i) => ({
    "@type": "Offer",
    name: i.name,
    price: i.price,
    priceCurrency: "USD",
    description: [i.unit, i.description].filter(Boolean).join(" · "),
    seller: { "@id": `${site.url}/#org` },
  })),
});

/** Team member. */
export const person = (m: { name: string; role: string; avatar: string; slug: string; software: string[]; sameAs?: string[] }) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: m.name,
  jobTitle: m.role,
  image: m.avatar,
  url: absoluteUrl(`/team#${m.slug}`),
  knowsAbout: m.software,
  worksFor: { "@id": `${site.url}/#org` },
  ...(m.sameAs?.length ? { sameAs: m.sameAs } : {}),
});

/** Glossary as a DefinedTermSet. */
export const definedTermSet = (name: string, path: string, terms: { term: string; definition: string; slug: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name,
  url: absoluteUrl(path),
  hasDefinedTerm: terms.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition,
    url: absoluteUrl(`${path}#${t.slug}`),
  })),
});

export const breadcrumbs = (items: { name: string; href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.href) })),
});

export const blogPosting = (p: { title: string; description: string; slug: string; date: string; updated?: string; author: string; cover: string; authorUrl?: string }) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: p.title,
  description: p.description,
  image: p.cover,
  datePublished: p.date,
  dateModified: p.updated || p.date,
  author: { "@type": "Person", name: p.author, ...(p.authorUrl ? { url: absoluteUrl(p.authorUrl) } : {}) },
  publisher: { "@id": `${site.url}/#org` },
  mainEntityOfPage: absoluteUrl(`/blog/${p.slug}`),
});
