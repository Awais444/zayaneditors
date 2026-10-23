"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { isVertical, work, workCategories, type PortfolioItem } from "@/data/portfolio";
import { Tabs } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";

const VideoModal = dynamic(() => import("@/components/ui/VideoModal"), { ssr: false });


/**
 * Portfolio masonry of the real portfolio items (data/portfolio-items.ts): 16:9 cards span two columns, 9:16 cards one, packed with grid-flow-dense.
 * Filter pills re-flow the grid with layout animation; hover plays a muted preview;
 * click opens the modal player with a link through to the case study.
 */
export function PortfolioMasonry() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<{ c: PortfolioItem; origin: { x: number; y: number } } | null>(null);
  const reduce = useReducedMotion();

  const options = useMemo(
    () => [{ value: "all", label: `All ${work.length}` }, ...workCategories.map((c) => ({ value: c.name, label: `${c.name} ${c.count}` }))],
    [],
  );
  const items = work.filter((c) => filter === "all" || c.category === filter);

  return (
    <div>
      <Tabs id="portfolio" options={options} value={filter} onChange={setFilter} className="mb-10" />
      <motion.ul layout={!reduce} className="grid grid-flow-dense grid-cols-2 items-start gap-4 md:gap-6 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((c) => (
            <motion.li
              key={c.slug}
              layout={!reduce}
              className={isVertical(c) ? "col-span-1" : "col-span-2"}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            >
              <MasonryCard c={c} onOpen={(origin) => setOpen({ c, origin })} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {open && (
        <VideoModal video={{ src: open.c.preview.mp4, poster: open.c.poster, title: open.c.title }} origin={open.origin} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}

function MasonryCard({ c, onOpen }: { c: PortfolioItem; onOpen: (origin: { x: number; y: number }) => void }) {
  const vid = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [preview, setPreview] = useState(false);
  const reduce = useReducedMotion();
  const canPreview = !reduce;
  const vertical = isVertical(c);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (preview) v.play().catch(() => {});
    else v.pause();
  }, [preview, loaded]);

  const hover = (on: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !canPreview) return;
    if (on) setLoaded(true);
    setPreview(on);
  };

  return (
    <div className="group" data-cursor="play" onPointerEnter={hover(true)} onPointerLeave={hover(false)}>
      <button
        type="button"
        className={cn("pressable relative block w-full overflow-hidden rounded-2xl border border-line bg-black text-left", vertical ? "aspect-[9/16]" : "aspect-video")}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          onOpen({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
        }}
      >
        <Image src={c.poster} alt={c.altText} fill sizes={vertical ? "(min-width: 1024px) 25vw, 50vw" : "(min-width: 1024px) 50vw, 100vw"} className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.04]" />
        {canPreview && loaded && (
          <video ref={vid} muted loop playsInline preload="none" className={cn("absolute inset-0 size-full object-cover transition-opacity duration-300", preview ? "opacity-100" : "opacity-0")}>
            <source src={c.preview.webm} type="video/webm" />
            <source src={c.preview.mp4} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute top-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-accent backdrop-blur-md">{c.category}</span>
        <span className="play-badge pointer-events-none absolute top-1/2 left-1/2 grid size-14 place-items-center rounded-full bg-accent text-accent-fg">
          <Play className="size-5 translate-x-0.5 fill-current" aria-hidden />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <p className={cn("text-xs text-white/70", vertical && "hidden md:block")}>{c.platform} · {c.aspectRatio}</p>
          <h3 className={cn("mt-1 font-semibold tracking-tight text-white", vertical ? "text-base" : "text-lg md:text-xl")}><span className="sr-only">Play video: </span>{c.title}</h3>
        </div>
      </button>
      <Link href={`/portfolio/${c.slug}`} className="mt-3 inline-flex text-sm font-semibold text-muted hover:text-accent">
        View project →
      </Link>
    </div>
  );
}
