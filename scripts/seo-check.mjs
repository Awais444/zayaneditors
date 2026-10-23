// SEO checks over the prerendered HTML in .next/server/app (no JavaScript is executed, the way most
// AI crawlers read a page). Run after `next build`:  npm run seo:check
//   - duplicate <title> / meta description, length limits (title <= 60, description <= 155)
//   - exactly one <h1>, lang, canonical (absolute, https/http-localhost, lowercase, no trailing slash)
//   - broken internal links, links to redirecting variants, and orphan pages (no inbound links)
//   - JSON-LD: valid JSON, @context/@type present, required properties per type
//   - raw HTML contains the content that matters (H1, body copy; FAQ answers; prices; portfolio titles)
import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), ".next/server/app");
const pages = new Map(); // route -> html
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) {
      let route = "/" + path.relative(root, p).replace(/\\/g, "/").replace(/\.html$/, "");
      route = route.replace(/\/index$/, "") || "/";
      if (route === "/index") route = "/";
      pages.set(route, fs.readFileSync(p, "utf8"));
    }
  }
};
walk(root);
for (const r of ["/_not-found", "/_global-error"]) pages.delete(r);

const errors = [];
const warn = [];
const err = (route, msg) => errors.push(`${route}: ${msg}`);
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const text = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");

const titles = new Map();
const descs = new Map();
const inbound = new Map([...pages.keys()].map((r) => [r, 0]));
const REQUIRED = {
  Organization: ["name", "url", "logo"],
  WebSite: ["name", "url"],
  ProfessionalService: ["name", "url", "areaServed"],
  Service: ["name", "provider"],
  FAQPage: ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
  VideoObject: ["name", "description", "thumbnailUrl", "uploadDate", "contentUrl"],
  CreativeWork: ["name", "url"],
  BlogPosting: ["headline", "datePublished", "author", "image"],
  OfferCatalog: ["itemListElement"],
  Person: ["name"],
  DefinedTermSet: ["hasDefinedTerm"],
};

for (const [route, html] of pages) {
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (!title) err(route, "missing <title>");
  else if (title.length > 60) err(route, `title ${title.length} chars "${title}"`);
  if (!desc) err(route, "missing meta description");
  else if (desc.length > 155) err(route, `description ${desc.length} chars`);
  if (!noindex) {
    titles.set(title, [...(titles.get(title) ?? []), route]);
    descs.set(desc, [...(descs.get(desc) ?? []), route]);
  }
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) err(route, `${h1s} <h1> elements`);
  if (!/<html[^>]+lang="en"/.test(html)) err(route, "missing lang=en");
  if (!noindex) {
    if (!canonical) err(route, "missing canonical");
    else if (!/^https?:\/\//.test(canonical) || canonical !== canonical.toLowerCase() || (canonical.endsWith("/") && new URL(canonical).pathname !== "/"))
      err(route, `bad canonical ${canonical}`);
  }
  if (!/<main[\s>]/.test(html)) err(route, "no <main>");
  const body = text(html);
  if (body.split(" ").length < 120 && !noindex) warn.push(`${route}: only ${body.split(" ").length} words of server-rendered text`);

  // Quick answers must be 40–60 words
  for (const m of html.matchAll(/data-quick-answer="true">([\s\S]*?)<\/p>/g)) {
    const n = decode(m[1].replace(/<[^>]+>/g, "")).trim().split(/\s+/).length;
    if (n < 40 || n > 60) warn.push(`${route}: quick answer ${n} words`);
  }

  // JSON-LD
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      err(route, "invalid JSON-LD");
      continue;
    }
    for (const node of [data].flat()) {
      if (!node["@context"] || !node["@type"]) err(route, `JSON-LD node without @context/@type`);
      for (const k of REQUIRED[node["@type"]] ?? []) if (node[k] === undefined || node[k] === "" || (Array.isArray(node[k]) && !node[k].length)) err(route, `${node["@type"]} missing ${k}`);
      if (node["@type"] === "FAQPage")
        for (const q of node.mainEntity ?? []) {
          // FAQ answers must also be in the raw HTML, not only in JSON-LD
          const snippet = q.acceptedAnswer?.text?.slice(0, 40);
          if (snippet && !body.includes(snippet)) err(route, `FAQ answer not in HTML: "${snippet}…"`);
        }
    }
  }

  // Internal links
  for (const m of html.matchAll(/<a[^>]+href="(\/[^"#?]*)/g)) {
    const href = m[1] === "" ? "/" : m[1];
    if (/\.[a-z0-9]+$/.test(href)) continue; // files (sitemap.xml, llms.txt…)
    const clean = href !== "/" && href.endsWith("/") ? href.slice(0, -1) : href;
    if (clean !== href || clean !== clean.toLowerCase()) err(route, `link to redirecting variant ${href}`);
    if (!pages.has(clean)) err(route, `broken link ${href}`);
    else if (clean !== route) inbound.set(clean, inbound.get(clean) + 1);
  }
}

for (const [t, rs] of titles) if (rs.length > 1) err(rs.join(", "), `duplicate title "${t}"`);
for (const [d, rs] of descs) if (rs.length > 1) err(rs.join(", "), `duplicate description "${d.slice(0, 60)}…"`);
for (const [r, n] of inbound) if (n === 0 && r !== "/") warn.push(`${r}: orphan page (no internal links point to it)`);

// Raw-HTML content spot checks
const must = [
  ["/pricing", /\$\d+/, "prices"],
  ["/portfolio", /View project/, "portfolio titles/links"],
  ["/faq", /<h2/, "FAQ headings"],
];
for (const [r, re, what] of must) if (pages.has(r) && !re.test(pages.get(r))) err(r, `${what} missing from raw HTML`);

console.log(`seo-check: ${pages.size} pages, ${errors.length} error(s), ${warn.length} warning(s)`);
if (warn.length) console.log("warnings:\n  " + warn.slice(0, 60).join("\n  "));
if (errors.length) {
  console.error("errors:\n  " + errors.slice(0, 80).join("\n  "));
  process.exit(1);
}
