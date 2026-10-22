import Link from "next/link";
import { VideoCard } from "./VideoCard";

type Item = { slug: string; title: string; meta: string; video: { src: string; poster: string; title: string } };

/** Horizontal swipe row of video cards with scroll snap (all devices; edge-to-edge on mobile). */
export function VideoRow({ items, moreHref = "/portfolio" }: { items: Item[]; moreHref?: string }) {
  return (
    <div className="no-scrollbar -mx-4 snap-x snap-mandatory overflow-x-auto overscroll-x-contain px-4 md:mx-0 md:px-0" data-cursor="drag">
      <div className="flex w-max gap-5">
        {items.map((c) => (
          <div key={c.slug} className="w-[78vw] shrink-0 snap-start sm:w-[24rem]">
            <VideoCard video={c.video} title={c.title} meta={c.meta} href={`/portfolio/${c.slug}`} />
          </div>
        ))}
        <Link href={moreHref} className="card pressable grid w-[60vw] shrink-0 snap-start place-items-center p-8 text-center text-xl font-semibold hover:border-white/20 sm:w-[16rem]">
          See all work →
        </Link>
      </div>
    </div>
  );
}
