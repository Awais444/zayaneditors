import manifest from "./media-manifest.json";
import { caseStudies, type CaseStudy } from "./portfolio";
import { sampleVideo } from "./media";

/**
 * Real media lives in /public/videos (listed into media-manifest.json by scripts/media-manifest.mjs):
 *   <case-study-slug>.mp4 + <case-study-slug>.webp   portfolio preview clip + poster frame
 *   showreel.mp4 + showreel.webp                       hero / CTA showreel
 *   reel-vertical.mp4 + reel-vertical.webp             9:16 reel in the hero phone card
 *   before-after-raw.mp4 + before-after-final.mp4 + before-after.webp
 *                                                      one clip, ungraded vs final, identical framing
 * Real files always win; until they exist, the stock sample media is used as a fallback.
 */
const files = new Set<string>(manifest);

export type RealVideo = { src: string; poster: string };

/** `<name>.mp4` + `<name>.webp` from /public/videos, or null when either is missing. */
export function realMedia(name: string): RealVideo | null {
  return files.has(`${name}.mp4`) && files.has(`${name}.webp`) ? { src: `/videos/${name}.mp4`, poster: `/videos/${name}.webp` } : null;
}

const stockShowreel = { src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=70" };
export const showreel: RealVideo = realMedia("showreel") ?? stockShowreel;
export const verticalReel: RealVideo = realMedia("reel-vertical") ?? sampleVideo("Vertical reel", 2);

/** Every case study, with `video` swapped for the real clip and poster when they exist. */
export function caseStudiesWithRealMedia(): CaseStudy[] {
  return caseStudies.map((c) => {
    const m = realMedia(c.slug);
    return m ? { ...c, video: { ...c.video, ...m } } : c;
  });
}

export function beforeAfterMedia() {
  return files.has("before-after-raw.mp4") && files.has("before-after-final.mp4") && files.has("before-after.webp")
    ? { raw: "/videos/before-after-raw.mp4", final: "/videos/before-after-final.mp4", poster: "/videos/before-after.webp" }
    : { raw: stockShowreel.src, final: stockShowreel.src, poster: stockShowreel.poster }; // same clip in both halves
}
