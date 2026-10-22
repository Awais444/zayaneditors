import { ogImage, ogSize } from "@/lib/og";
import { getService, services } from "@/data/services";

export const size = ogSize;
export const contentType = "image/png";
export const generateStaticParams = () => services.map((s) => ({ service: s.slug }));

export default async function Image({ params }: { params: Promise<{ service: string }> }) {
  const s = getService((await params).service);
  return ogImage(s?.h1 ?? "Video Editing Services", s?.category);
}
