import { VideoCard as BaseVideoCard } from "@/components/ui/VideoCard";
import type { Video } from "@/components/ui/VideoPlayer";

/**
 * Shared video card in the two formats the site uses: 16:9 (long-form) and 9:16 (short-form).
 * Poster first, muted preview on hover (fine pointer) or in view (touch), modal or link on click.
 */
export function VideoCard({ ratio = "16:9", ...props }: { ratio?: "16:9" | "9:16"; video: Video; title: string; meta?: string; href?: string; className?: string }) {
  return <BaseVideoCard {...props} aspect={ratio === "9:16" ? "aspect-[9/16]" : "aspect-video"} />;
}
