import manifest from "./media-manifest.json";
import { sampleVideo } from "./media";

/**
 * Real media lives in /public/videos (listed into media-manifest.json by scripts/media-manifest.mjs):
 *   <portfolio-slug>.mp4/.webm + posters/<slug>.webp  portfolio previews (see data/portfolio-items.ts)
 *   showreel.mp4 + showreel.webp                       hero / CTA showreel
 *   reel-vertical.mp4 + reel-vertical.webp             9:16 reel in the hero phone card
 *   showreel-vertical.mp4 + showreel-vertical.webp     9:16 cut of the showreel for the mobile hero
 *   before-after-raw.mp4 + before-after-final.mp4 + before-after.webp
 *                                                      one clip, ungraded vs final, identical framing
 * Posters may also live in /public/posters/<name>.webp.
 * Real files always win; until they exist, the stock sample media is used as a fallback.
 */
const files = new Set<string>(manifest);

export type RealVideo = { src: string; poster: string };

/** `<name>.mp4` + `<name>.webp` from /public/videos, or null when either is missing. */
export function realMedia(name: string): RealVideo | null {
  if (!files.has(`videos/${name}.mp4`)) return null;
  const poster = files.has(`posters/${name}.webp`) ? `/posters/${name}.webp` : files.has(`videos/${name}.webp`) ? `/videos/${name}.webp` : null;
  return poster ? { src: `/videos/${name}.mp4`, poster } : null;
}

const stockShowreel = { src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=70" };
/** Hero uses only the real showreel (no stock fallback); null until the files exist. */
export const realShowreel = realMedia("showreel");
export const realShowreelVertical = realMedia("showreel-vertical");
export const showreel: RealVideo = realMedia("showreel") ?? stockShowreel;
export const verticalReel: RealVideo = realMedia("reel-vertical") ?? sampleVideo("Vertical reel", 2);
/** 9:16 cut of the showreel for phones (showreel-vertical.*), falling back to the 16:9 showreel (cropped). */
export const showreelVertical: RealVideo = realMedia("showreel-vertical") ?? showreel;

/** Real raw/final pair only (null otherwise), for pages that must not show stock. */
export function realBeforeAfter() {
  return files.has("videos/before-after-raw.mp4") && files.has("videos/before-after-final.mp4") && files.has("videos/before-after.webp")
    ? { raw: "/videos/before-after-raw.mp4", final: "/videos/before-after-final.mp4", poster: "/videos/before-after.webp" }
    : null;
}

export function beforeAfterMedia() {
  return files.has("videos/before-after-raw.mp4") && files.has("videos/before-after-final.mp4") && files.has("videos/before-after.webp")
    ? { raw: "/videos/before-after-raw.mp4", final: "/videos/before-after-final.mp4", poster: "/videos/before-after.webp" }
    : { raw: stockShowreel.src, final: stockShowreel.src, poster: stockShowreel.poster }; // same clip in both halves
}
