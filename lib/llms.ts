import { site } from "@/data/site";
import { serviceGroups, getService } from "@/data/services";
import { perVideo, perProject, plans, volumes, perMinute, addons, guarantee } from "@/data/pricing";
import { processSteps } from "@/data/process";
import { glossary } from "@/data/glossary";
import { homeFaqs } from "@/data/faqs";
import { getAllPosts } from "@/lib/blog";

/** llms.txt (https://llmstxt.org) built from the same data as the pages, so it can't drift. */
const u = (p: string) => `${site.url}${p}`;

export function llmsTxt(full = false) {
  const out: string[] = [];
  out.push(`# ${site.name}`, "", `> ${site.description}`, "");
  out.push(
    `- Clients in: ${site.markets.join(", ")}`,
    `- First cut: within ${site.turnaround}`,
    `- Prices from: $${Math.min(...perVideo.map((p) => p.from))} per video (USD)`,
    `- Contact: ${u("/contact")}${site.email ? ` · ${site.email}` : ""}`,
    "",
  );
  out.push("## Key pages", "");
  for (const [name, path] of [["Home", "/"], ["All services", "/services"], ["Pricing", "/pricing"], ["Pricing guide 2026", "/video-editing-pricing-guide"], ["Process", "/process"], ["Portfolio", "/portfolio"], ["About", "/about"], ["Team", "/team"], ["FAQ", "/faq"], ["Glossary", "/glossary"], ["Blog", "/blog"]])
    out.push(`- [${name}](${u(path)})`);
  out.push("");
  for (const g of serviceGroups) {
    out.push(`## ${g.name}`, "", g.blurb, "");
    for (const slug of g.slugs) {
      const s = getService(slug)!;
      out.push(`- [${s.name}](${u(`/${slug}`)}): ${s.short}`);
      if (full) {
        out.push("", `  ${s.intro}`, "", `  Turnaround: ${s.turnaround}.`, `  Plans: ${s.pricing.map((p) => `${p.name} ${/\d/.test(p.price) ? p.price : "custom quote"} ${p.unit}`).join("; ")}.`);
        for (const f of s.faqs) out.push(`  - Q: ${f.q} A: ${f.a}`);
        out.push("");
      }
    }
    out.push("");
  }
  out.push("## Guides", "");
  for (const p of getAllPosts()) out.push(`- [${p.title}](${u(`/blog/${p.slug}`)}): ${p.description}`);
  out.push("");
  if (full) {
    out.push("## Pricing (USD)", "");
    for (const p of perVideo) out.push(`- ${p.name}: from $${p.from} ${p.unit}. ${p.desc}`);
    for (const p of perProject) out.push(`- ${p.name}: from $${p.from} ${p.unit}`);
    for (const p of plans) out.push(`- ${p.name} monthly plan: ${volumes.map((v) => `$${p.pricePerVideo[v]}/video at ${v} videos`).join(", ")}. ${p.desc}`);
    out.push(`- Long-form per-minute: $${perMinute.base} up to ${perMinute.includedMinutes} finished minutes, then $${perMinute.perMinute}/minute`);
    for (const a of addons) out.push(`- Add-on, ${a.name}: ${a.price} ${a.note}`);
    out.push(`- Guarantee: ${guarantee}`, "");
    out.push("## Process", "");
    processSteps.forEach((s, i) => out.push(`${i + 1}. ${s.title} (${s.duration}): ${s.text}`));
    out.push("", "## FAQ", "");
    for (const f of homeFaqs) out.push(`- Q: ${f.q} A: ${f.a}`);
    out.push("", "## Glossary", "");
    for (const t of glossary) out.push(`- ${t.term}: ${t.definition}`);
    out.push("");
  } else {
    out.push("## Optional", "", `- [Full version with pricing, process, FAQs and glossary](${u("/llms-full.txt")})`, "");
  }
  return out.join("\n");
}
