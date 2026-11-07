import { site } from "@/data/site";
import { perVideo } from "@/data/pricing";
import type { Service } from "@/data/services";

/**
 * "Quick answer" copy for answer engines, assembled only from data (no invented claims).
 * Each answer is a 40–60 word, self-contained paragraph; seo-check warns when one drifts out of range.
 */
const list = (xs: readonly string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}` : xs[0] ?? "");
const startingPrice = (s: Service) => {
  const nums = s.pricing.map((p) => Number(p.price.replace(/[^\d.]/g, ""))).filter((n) => n > 0);
  return nums.length ? `Prices start at $${Math.min(...nums)} ${s.pricing.find((p) => p.price.includes(String(Math.min(...nums))))?.unit ?? ""}`.trim() : "Projects are quoted individually";
};

export function serviceAnswer(s: Service) {
  const short = s.short.replace(/\.$/, "");
  const build = (n: number, tail: string) =>
    `${site.name}'s ${s.name} service: ${short.charAt(0).toLowerCase()}${short.slice(1)}. A dedicated editor handles ${list(s.included.slice(0, n).map((x) => x.toLowerCase()))}. ${s.turnaround}. ${startingPrice(s)}${tail}`;
  // Longest version that stays within 60 words
  const options = [build(2, ", revisions included.")];
  return options.find((o) => words(o) <= 60) ?? options[options.length - 1];
}

export function locationAnswer(place: { name: string; niches: string[]; timeOverlap: string }) {
  const from = perVideo.map((p) => `$${p.from} ${p.unit}`);
  return `${site.name} edits videos for creators and businesses in ${place.name} remotely, from YouTube and podcasts to short-form for ${list(place.niches.slice(0, 2).map((n) => n.toLowerCase()))}. First cuts arrive in ${site.turnaround}. Prices start at ${list(from)}, and you can browse the portfolio for samples in your niche.`;
}

export const words = (s: string) => s.trim().split(/\s+/).length;

/** Key facts for a service, from data only. */
export function serviceFacts(s: Service, workCount: number) {
  return [
    { label: "Turnaround", value: s.turnaround },
    { label: "Pricing", value: startingPrice(s) },
    { label: "Plans", value: s.pricing.map((p) => p.name).join(" · ") },
    { label: "Revisions", value: "Included in every plan" },
    { label: "Samples", value: "Portfolio by niche, more on request" },
    { label: "Portfolio", value: `${workCount} real ${workCount === 1 ? "project" : "projects"} shown on this page` },
  ];
}
