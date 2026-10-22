import { ogImage, ogSize } from "@/lib/og";
import { getPost, getPostSlugs } from "@/lib/blog";

export const size = ogSize;
export const contentType = "image/png";
export const generateStaticParams = () => getPostSlugs().map((slug) => ({ slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  return ogImage(p?.meta.title ?? "Blog", p ? `Blog · ${p.meta.category}` : "Blog");
}
