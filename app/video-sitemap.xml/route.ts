import { site } from "@/data/site";
import { previewDuration, work } from "@/data/portfolio";
import { firstPublished } from "@/lib/lastmod";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Video sitemap: one <video:video> per published portfolio item (its hosted preview clip). */
export function GET() {
  const published = firstPublished("data/portfolio-items.ts").toISOString();
  const urls = work
    .map(
      (p) => `  <url>
    <loc>${site.url}/portfolio/${p.slug}</loc>
    <video:video>
      <video:thumbnail_loc>${site.url}${p.poster}</video:thumbnail_loc>
      <video:title>${esc(p.title)}</video:title>
      <video:description>${esc(p.description)}</video:description>
      <video:content_loc>${site.url}${p.preview.mp4}</video:content_loc>
      <video:player_loc>${site.url}/portfolio/${p.slug}</video:player_loc>
      <video:duration>${previewDuration(p)}</video:duration>
      <video:publication_date>${published}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
