import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** Search engines and AI crawlers we explicitly welcome (search, answer engines and model training). */
const crawlers = [
  "Googlebot",
  "Bingbot",
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
];

const disallow = ["/api/", "/_next/", "/preview/", "/draft/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [...crawlers.map((userAgent) => ({ userAgent, allow: "/", disallow })), { userAgent: "*", allow: "/", disallow }],
    sitemap: [`${site.url}/sitemap.xml`, `${site.url}/video-sitemap.xml`],
    host: site.url,
  };
}
