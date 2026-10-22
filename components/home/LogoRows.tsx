import { Marquee } from "@/components/ui/Marquee";

// TODO: replace with real client logos when available
const platforms = ["YouTube", "TikTok", "Instagram Reels", "Spotify Video", "LinkedIn", "Meta Ads"];
const formats = ["Weddings", "Brand Films", "Podcasts", "Music Videos", "Courses", "Product Launches"];

/** Two marquee rows running in opposite directions; both pause on hover. */
export function LogoRows() {
  return (
    <section data-tl="Platforms" aria-label="Platforms and formats" className="border-y border-line py-8">
      <p className="mb-4 text-center text-xs tracking-[0.2em] text-muted uppercase">Edited for every platform and format</p>
      <div className="space-y-2">
        <Marquee items={platforms} label="Platforms we edit for" />
        <Marquee items={formats} label="Formats we edit" reverse />
      </div>
    </section>
  );
}
