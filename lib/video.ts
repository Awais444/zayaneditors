/**
 * Video provider abstraction. Set NEXT_PUBLIC_VIDEO_PROVIDER to "bunny" | "vimeo" | "mp4".
 * - mp4: `src` is a direct file URL (never self-host large files in /public)
 * - vimeo: `src` is a Vimeo video id
 * - bunny: `src` is a Bunny Stream video id (needs NEXT_PUBLIC_BUNNY_LIBRARY_ID)
 * Direct .mp4 URLs always play as files, whatever the provider.
 */
export type Provider = "bunny" | "vimeo" | "mp4";
export const provider = (process.env.NEXT_PUBLIC_VIDEO_PROVIDER || "mp4") as Provider;

export const isFile = (src: string) => /\.(mp4|webm|m3u8)(\?|$)/i.test(src) || provider === "mp4";

export const embedUrl = (src: string, autoplay = true) => {
  if (provider === "vimeo") return `https://player.vimeo.com/video/${src}?autoplay=${autoplay ? 1 : 0}&texttrack=en`;
  const lib = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
  return `https://iframe.mediadelivery.net/embed/${lib}/${src}?autoplay=${autoplay}&preload=false`;
};
