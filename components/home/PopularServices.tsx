import Link from "next/link";
import { getService } from "@/data/services";

/** One compact line of links under the services bento (internal linking); the full list lives on /services. */
const popular: [string, string][] = [
  ["talking-head-video-editing", "Talking head editing"],
  ["youtube-video-editing", "YouTube editing"],
  ["ugc-ad-editing", "UGC ad editing"],
  ["vsl-video-editing", "VSL editing"],
  ["short-form-video-editing", "Short-form editing"],
  ["podcast-video-editing", "Podcast editing"],
  ["ai-video-editing", "AI video"],
  ["3d-animation", "3D animation"],
];

export function PopularServices() {
  const links = popular.filter(([slug]) => getService(slug));
  return (
    <nav aria-label="Popular services" className="container-x -mt-6 pb-4 text-sm text-muted md:-mt-10">
      <span className="text-fg/80">Popular: </span>
      {links.map(([slug, label], i) => (
        <span key={slug}>
          <Link href={`/${slug}`} className="underline-offset-2 hover:text-fg hover:underline">{label}</Link>
          {i < links.length - 1 && <span aria-hidden> · </span>}
        </span>
      ))}
      <span aria-hidden> — </span>
      <Link href="/services" className="font-medium text-fg hover:text-accent">All services →</Link>
    </nav>
  );
}
