import Link from "next/link";
import { CardRow } from "@/components/ui/CardRow";
import { VideoCard } from "./VideoCard";

type Item = { slug: string; title: string; meta: string; video: { src: string; poster: string; title: string } };

/** Row of video cards (16:9, or 9:16 for vertical work) linking to their case studies, ending in a "See all work" card. */
export function VideoRow({ items, header, label = "Video samples", moreHref = "/portfolio", vertical = false }: { items: Item[]; header?: React.ReactNode; label?: string; moreHref?: string; vertical?: boolean }) {
  return (
    <CardRow header={header} label={label} itemClassName={vertical ? "w-[62vw] sm:w-[15rem] lg:w-[16.5rem]" : undefined}>
      {items.map((c) => (
        <VideoCard key={c.slug} ratio={vertical ? "9:16" : "16:9"} video={c.video} title={c.title} meta={c.meta} href={`/portfolio/${c.slug}`} />
      ))}
      <Link href={moreHref} className={`card pressable grid place-items-center ${vertical ? "aspect-[9/16]" : "aspect-video"} p-8 text-center text-xl font-semibold hover:border-white/20`}>
        See all work →
      </Link>
    </CardRow>
  );
}
