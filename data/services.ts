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
    slugs: ["video-ad-editing", "ugc-ad-editing", "product-video-editing", "explainer-video-editing", "corporate-video-editing", "brand-film-editing", "testimonial-video-editing", "real-estate-video-editing", "video-editing-for-coaches"],
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
    blurb: "Colour, motion graphics, sound, captions, thumbnails, repurposing and channel management.",
    slugs: ["color-grading", "motion-graphics", "sound-design-and-mixing", "captions-and-subtitles", "youtube-thumbnail-design", "video-repurposing", "youtube-channel-management"],
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
