// Prices in USD. Confirm before launch.

export const perVideo = [
  {
    name: "Short-form",
    from: 25,
    unit: "per clip",
    desc: "Shorts, Reels and TikToks up to 60 seconds.",
    features: ["Hook-first edit", "Animated captions", "Music + SFX", "1 revision"],
  },
  {
    name: "Long-form",
    from: 79,
    unit: "per video",
    desc: "YouTube videos up to 15 minutes final runtime.",
    features: ["Retention pacing", "B-roll + motion text", "Sound + colour", "2 revisions"],
    featured: true,
  },
  {
    name: "Podcast",
    from: 99,
    unit: "per episode",
    desc: "Multi-cam video podcast up to 60 minutes.",
    features: ["Multi-cam switching", "Audio cleanup", "Chapters", "2 revisions"],
  },
];

export const volumes = [4, 8, 12] as const;
export type Volume = (typeof volumes)[number];

export const plans: {
  name: string;
  desc: string;
  pricePerVideo: Record<Volume, number>;
  features: string[];
  featured?: boolean;
}[] = [
  {
    name: "Starter",
    desc: "Short-form focus for consistent posting.",
    pricePerVideo: { 4: 39, 8: 35, 12: 32 },
    features: ["Shorts / Reels / TikToks", "Animated captions", "48h turnaround", "1 revision each"],
  },
  {
    name: "Growth",
    desc: "Long-form YouTube with thumbnails.",
    pricePerVideo: { 4: 149, 8: 135, 12: 125 },
    features: ["Long-form up to 15 min", "Thumbnail per video", "Dedicated editor", "2 revisions each"],
    featured: true,
  },
  {
    name: "Pro",
    desc: "Full content engine: long-form + clips.",
    pricePerVideo: { 4: 249, 8: 229, 12: 209 },
    features: ["Long-form up to 25 min", "5 Shorts per video", "Thumbnails + channel strategy", "Unlimited minor revisions"],
  },
];

/** Long-form per-finished-minute calculator */
export const perMinute = { base: 49, perMinute: 8, includedMinutes: 5, min: 1, max: 90 };
export const estimateLongForm = (minutes: number) =>
  perMinute.base + Math.max(0, minutes - perMinute.includedMinutes) * perMinute.perMinute;

export const addons = [
  { name: "YouTube thumbnail", price: "$25", note: "per design (3 variations $59)" },
  { name: "Captions (styled)", price: "$15", note: "per short" },
  { name: "SRT subtitles", price: "$1.50", note: "per minute" },
  { name: "Vertical reformat", price: "$20", note: "per clip from long-form" },
  { name: "Rush delivery (24h)", price: "+50%", note: "of edit price" },
  { name: "Extra revision round", price: "$15", note: "per round" },
];

export const comparison: { feature: string; values: [string, string, string] }[] = [
  { feature: "Videos per month", values: ["4–12 shorts", "4–12 long-form", "4–12 long + 5 shorts each"] },
  { feature: "Turnaround", values: ["48h", "48h", "48h (priority queue)"] },
  { feature: "Revisions", values: ["1 per video", "2 per video", "Unlimited minor"] },
  { feature: "Thumbnails", values: ["—", "✓", "✓ + A/B variations"] },
  { feature: "Dedicated editor", values: ["—", "✓", "✓"] },
  { feature: "Channel strategy call", values: ["—", "—", "Monthly"] },
];

export const guarantee =
  "If the first cut misses your brief, we re-edit it free. If you're still unhappy after revisions, you don't pay for that video.";

export const pricingFaqs = [
  { q: "Do unused videos roll over?", a: "Yes, up to one month. Unused videos roll into the next billing period once." },
  { q: "Can I cancel anytime?", a: "Monthly plans are month-to-month. Cancel before your next billing date and you won't be charged again." },
  { q: "How do I pay?", a: "Card, PayPal, Wise or bank transfer. Monthly plans are billed at the start of each period." },
  { q: "What counts as a revision?", a: "One round of consolidated feedback on a draft. Small text or timing tweaks after final delivery are free." },
  { q: "Are there any hidden fees?", a: "No. Stock footage from our libraries and licensed music are included. Premium assets you request are quoted first." },
];

/** Per-project pricing for edits that aren't priced per video or monthly. TODO: confirm prices. */
export const perProject = [
  { name: "Wedding film", from: 449, unit: "per wedding", href: "/wedding-video-editing", features: ["3–8 min highlight film", "60s teaser + vertical Reel", "Multi-cam + audio sync", "Grade to your preset"] },
  { name: "Music video", from: 690, unit: "per song", href: "/music-video-editing", features: ["Performance or narrative cut", "Creative grade + effects", "Vertical teasers available", "3 revision rounds"] },
  { name: "Ad campaign", from: 399, unit: "per concept", href: "/video-ad-editing", features: ["5 hooks × 3 lengths", "All aspect ratios", "Ad-licensed music", "Named for your ad account"] },
  { name: "Corporate video", from: 449, unit: "per video", href: "/corporate-video-editing", features: ["Up to 5 minutes", "Brand template + motion", "Accessible captions", "Stakeholder review rounds"] },
];

/** Lowest per-video starting price: drives the announcement bar and schema so they always match the pricing section. */
export const lowestPrice = Math.min(...perVideo.map((p) => p.from));
