import { portfolioItems, type PortfolioItem } from "./portfolio-items";

export * from "./portfolio-items";

/** Items shown on the site, in curated order (category order, featured first). */
export const work = portfolioItems.filter((p) => p.published);

export const getWorkItem = (slug: string) => work.find((p) => p.slug === slug);

/** Categories in display order, with counts (for filter pills). */
export const workCategories = [...new Set(work.map((p) => p.category))].map((name) => ({
  name,
  count: work.filter((p) => p.category === name).length,
}));

export const isVertical = (p: PortfolioItem) => p.aspectRatio === "9:16" || p.aspectRatio === "4:5";

/** Shape used by the shared video cards / rows. */
export const toCard = (p: PortfolioItem) => ({
  slug: p.slug,
  title: p.title,
  meta: `${p.category} · ${p.platform}`,
  video: { src: p.preview.mp4, poster: p.poster, title: p.title },
});

const featured = work.filter((p) => p.featured);

/** Service-page tags → words that appear in an item's category, platform, tags or format. */
const synonyms: Record<string, string[]> = {
  ads: ["ads", "ad", "ugc", "e-commerce"],
  brand: ["brand", "logo", "vsl"],
  "long-form": ["long-form", "vsl", "documentary"],
  documentary: ["documentary"],
  events: ["weddings", "venue"],
  shorts: ["shorts"],
  instagram: ["instagram", "shorts"],
  tiktok: ["tiktok", "shorts"],
  social: ["shorts", "instagram", "tiktok"],
  podcast: ["podcast"],
  "talking-head": ["talking head"],
  education: ["education"],
  youtube: ["youtube"],
};

const haystack = (p: PortfolioItem) =>
  [p.category, p.platform, ...p.tags, isVertical(p) ? "shorts" : "", p.duration > 60 && !isVertical(p) ? "long-form" : ""].join(" ").toLowerCase();

/** Real work matching a service's portfolio tags; padded with featured work so a row is never thin. */
export function relatedWork(tags: string[], limit = 6) {
  const words = tags.flatMap((t) => synonyms[t] ?? [t]);
  const scored = work
    .map((p) => ({ p, s: words.filter((w) => haystack(p).includes(w)).length }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || Number(b.p.featured) - Number(a.p.featured))
    .map((x) => x.p);
  const rest = featured.filter((p) => !scored.includes(p));
  return [...scored, ...rest].slice(0, Math.max(3, limit));
}

/** Category the Home page is limited to (change here to show something else on Home). */
export const HOME_CATEGORY = "Talking Head";

/** Home-page work: only HOME_CATEGORY items, featured first (other pages keep every category). */
export function getHomeItems() {
  return work.filter((p) => p.category === HOME_CATEGORY).sort((a, b) => Number(b.featured) - Number(a.featured));
}

/** 9:16 source for an item: its vertical preview when generated, else the original (already vertical) preview. */
export const verticalOf = (p: PortfolioItem) => ({
  src: p.verticalPreview ?? p.preview.mp4,
  poster: p.verticalPoster ?? p.poster,
});

/** Length in seconds of the hosted preview clip (what contentUrl points at): up to 12s of the original. */
export const previewDuration = (p: PortfolioItem) => Math.max(1, Math.min(12, Math.round(p.duration)));

/**
 * Samples for a service page from its explicit category mapping (data/services.ts → servicePortfolio).
 * Exact matches first; related categories only when there is no exact work; otherwise nothing.
 */
export function serviceSamples(map: { exact?: string[]; related?: string[] } | undefined, limit = 8) {
  // Round-robin across the mapped categories so a secondary category isn't crowded out
  const pick = (cats: string[] = []) => {
    const lists = cats.map((c) => work.filter((p) => p.category === c).sort((a, b) => Number(b.featured) - Number(a.featured)));
    const out: PortfolioItem[] = [];
    for (let i = 0; out.length < limit && lists.some((l) => l[i]); i++) for (const l of lists) if (l[i] && out.length < limit) out.push(l[i]);
    return out;
  };
  const exact = pick(map?.exact);
  if (exact.length) return { mode: "exact" as const, items: exact, categories: map!.exact! };
  const related = pick(map?.related);
  if (related.length) return { mode: "related" as const, items: related, categories: map!.related! };
  return { mode: "none" as const, items: [], categories: [] as string[] };
}

/** Display names for portfolio categories (data keeps the original folder names). */
const categoryLabels: Record<string, string> = { "AI Generation": "AI Video", VSL: "VSLs" };
export const categoryLabel = (c: string) => categoryLabels[c] ?? c;
/** URL value for ?category= (e.g. "UGC Ads" → "ugc-ads"). */
export const categorySlug = (c: string) => categoryLabel(c).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
