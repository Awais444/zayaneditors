import { longFormServices } from "./service-copy/long-form";
import { shortFormServices } from "./service-copy/short-form";
import { podcastServices } from "./service-copy/podcast";
import { businessServices } from "./service-copy/business";
import { addonServices } from "./service-copy/addons";
import { socialServices } from "./service-copy/social";
import { marketingServices } from "./service-copy/marketing";
import { eventServices } from "./service-copy/events";
import { postServices } from "./service-copy/post";
import { extraSections } from "./service-copy/extra-sections";
import { specialtyServices } from "./service-copy/specialty";

export type ServiceCategory =
  | "YouTube & Long-Form"
  | "Social & Short-Form"
  | "Marketing & Ads"
  | "Events & Personal"
  | "Podcast & Audio"
  | "Post-Production Add-ons";

export type PortfolioCategory = "youtube" | "social" | "ads" | "events" | "music" | "podcast";

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  /** Primary keyword the page targets */
  keyword: string;
  /** <title> — keep ≤ 60 chars incl. brand suffix */
  metaTitle: string;
  /** ≤ 155 chars */
  metaDescription: string;
  h1: string;
  short: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  included: string[];
  whoFor: { title: string; text: string }[];
  pricing: { name: string; price: string; unit: string; features: string[] }[];
  turnaround: string;
  faqs: { q: string; a: string }[];
  related: string[];
  portfolioTags: string[];
  blog: string[];
  /** TODO: real service hero video */
  video: { src: string; poster: string; title: string };
};

/** Copy files don't own their category — the menu groups below decide it. */
export type ServiceCopy = Omit<Service, "category"> & { category?: string };

/** Mega-menu / hub / footer grouping. Order here = order on the site. */
export const serviceGroups: { name: ServiceCategory; blurb: string; slugs: string[] }[] = [
  {
    name: "YouTube & Long-Form",
    blurb: "Retention-first edits for YouTube videos, deep dives, documentaries, vlogs, courses, gaming and faceless channels.",
    slugs: ["youtube-video-editing", "long-form-video-editing", "talking-head-video-editing", "vlog-editing", "documentary-video-editing", "course-video-editing", "faceless-youtube-editing", "gaming-video-editing"],
  },
  {
    name: "Social & Short-Form",
    blurb: "Hook-first vertical video for Reels, TikTok and Shorts, plus full social calendars.",
    slugs: ["short-form-video-editing", "instagram-reels-editing", "tiktok-video-editing", "youtube-shorts-editing", "social-media-video-editing"],
  },
  {
    name: "Marketing & Ads",
    blurb: "Ads, product videos, explainers, brand films, testimonials, corporate and real estate video that sells.",
    slugs: ["video-ad-editing", "ugc-ad-editing", "product-video-editing", "explainer-video-editing", "corporate-video-editing", "brand-film-editing", "testimonial-video-editing", "real-estate-video-editing", "video-editing-for-coaches", "vsl-video-editing", "ai-video-editing"],
  },
  {
    name: "Events & Personal",
    blurb: "Weddings, events, music videos, travel films, sports highlights and short films.",
    slugs: ["wedding-video-editing", "event-video-editing", "music-video-editing", "travel-video-editing", "sports-highlight-editing", "short-film-editing"],
  },
  {
    name: "Podcast & Audio",
    blurb: "Multi-cam video podcasts, clips and broadcast-quality audio.",
    slugs: ["podcast-video-editing", "podcast-clips-editing", "podcast-audio-editing"],
  },
  {
    name: "Post-Production Add-ons",
    blurb: "Colour, motion graphics, 3D and logo animation, sound, captions, thumbnails, repurposing and channel management.",
    slugs: ["color-grading", "motion-graphics", "sound-design-and-mixing", "captions-and-subtitles", "youtube-thumbnail-design", "video-repurposing", "youtube-channel-management", "3d-animation", "logo-animation"],
  },
];

export const serviceCategories: ServiceCategory[] = serviceGroups.map((g) => g.name);

const allCopy: ServiceCopy[] = [
  ...longFormServices,
  ...shortFormServices,
  ...podcastServices,
  ...businessServices,
  ...addonServices,
  ...socialServices,
  ...marketingServices,
  ...eventServices,
  ...postServices,
  ...specialtyServices,
];

export const services: Service[] = serviceGroups.flatMap((g) =>
  g.slugs.map((slug) => {
    const copy = allCopy.find((s) => s.slug === slug);
    if (!copy) throw new Error(`Missing service copy for "${slug}"`);
    return { ...copy, category: g.name, sections: [...copy.sections, ...(extraSections[slug] ?? [])] };
  }),
);

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const servicesByCategory = (category: ServiceCategory) =>
  services.filter((s) => s.category === category);

export { sampleVideo } from "./media";

/**
 * Which real portfolio categories each service page may show. `exact` = work of that service itself;
 * `related` = adjacent work shown under "Related work from our editors" when no exact match exists.
 * Services not listed (or with nothing in data) hide the samples section. Never padded with random items.
 */
type SampleCategory = "Talking Head" | "UGC Ads" | "E-commerce Ads" | "VSL" | "3D Animation" | "Logo Animation" | "AI Generation" | "Documentary" | "Real Estate";
export const servicePortfolio: Record<string, { exact?: SampleCategory[]; related?: SampleCategory[] }> = {
  "youtube-video-editing": { exact: ["Talking Head", "Documentary"] },
  "long-form-video-editing": { exact: ["Talking Head", "Documentary"] },
  "talking-head-video-editing": { exact: ["Talking Head"] },
  "vlog-editing": { related: ["Talking Head"] },
  "documentary-video-editing": { exact: ["Documentary"] },
  "course-video-editing": { related: ["Talking Head"] },
  "faceless-youtube-editing": { related: ["Documentary", "AI Generation"] },
  "short-form-video-editing": { exact: ["Talking Head", "UGC Ads"] },
  "instagram-reels-editing": { exact: ["Talking Head", "UGC Ads"] },
  "tiktok-video-editing": { exact: ["Talking Head", "UGC Ads"] },
  "youtube-shorts-editing": { exact: ["Talking Head", "UGC Ads"] },
  "social-media-video-editing": { exact: ["Talking Head", "UGC Ads", "E-commerce Ads"] },
  "video-ad-editing": { exact: ["E-commerce Ads", "UGC Ads"] },
  "ugc-ad-editing": { exact: ["UGC Ads"] },
  "product-video-editing": { exact: ["E-commerce Ads"] },
  "explainer-video-editing": { related: ["AI Generation", "E-commerce Ads"] },
  "brand-film-editing": { related: ["AI Generation", "Logo Animation"] },
  "real-estate-video-editing": { exact: ["Real Estate"] },
  "video-editing-for-coaches": { exact: ["Talking Head", "VSL"] },
  "vsl-video-editing": { exact: ["VSL"] },
  "ai-video-editing": { exact: ["AI Generation"] },
  "podcast-video-editing": { related: ["Talking Head"] },
  "podcast-clips-editing": { related: ["Talking Head"] },
  "color-grading": { related: ["Real Estate", "Documentary"] },
  "motion-graphics": { related: ["Logo Animation", "3D Animation", "E-commerce Ads"] },
  "captions-and-subtitles": { related: ["Talking Head", "UGC Ads"] },
  "youtube-thumbnail-design": { related: ["Talking Head", "Documentary"] },
  "video-repurposing": { related: ["Talking Head"] },
  "youtube-channel-management": { related: ["Talking Head", "Documentary"] },
  "3d-animation": { exact: ["3D Animation"] },
  "logo-animation": { exact: ["Logo Animation"] },
};
