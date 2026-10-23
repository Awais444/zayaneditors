"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import type { PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * 9:16 reel card. Poster first; the vertical preview plays muted on hover (fine pointer) or
 * while mostly in view (touch). Desktop shows only the cursor's "PLAY" pill; touch gets a small
 * corner play icon. Click opens the modal in the item's true aspect ratio.
 */
export function ReelCard({ p, onOpen }: { p: PortfolioItem; onOpen: (origin: { x: number; y: number }) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [on, setOn] = useState(false);
  const src = p.verticalPreview ?? p.preview.mp4;
  const poster = p.verticalPoster ?? p.poster;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      const v = e.intersectionRatio > 0.7;
      if (v) setLoaded(true);
      setOn(v);
    }, { threshold: [0, 0.7] });
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (on) v.play().catch(() => {});
    else v.pause();
  }, [on, loaded]);

  const hover = (v: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (v) setLoaded(true);
    setOn(v);
  };

  return (
    <div ref={box} className="group" data-cursor="play" onPointerEnter={hover(true)} onPointerLeave={hover(false)}>
      <button
        type="button"
        data-cursor-frame
        className="pressable relative block aspect-[9/16] w-full overflow-hidden rounded-[20px] border border-line bg-black text-left"
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          onOpen({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
        }}
      >
        <span className="sr-only">Play {p.title}</span>
        <Image src={poster} alt={p.altText} fill sizes="(min-width: 1024px) 280px, 70vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.03]" />
        {loaded && <video ref={vid} src={src} muted loop playsInline preload="none" className={cn("absolute inset-0 size-full object-cover transition-opacity duration-300", on ? "opacity-100" : "opacity-0")} />}
        <span className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Touch devices only: small corner play icon */}
        <span aria-hidden className="absolute right-3 bottom-3 hidden size-9 place-items-center rounded-full bg-black/55 backdrop-blur-md [@media(hover:none)]:grid">
          <Play className="size-4 translate-x-px fill-accent text-accent" />
        </span>
      </button>
      <Link href={`/portfolio/${p.slug}`} className="mt-3 block">
        <h3 className="line-clamp-2 font-semibold tracking-tight hover:text-accent">{p.title}</h3>
        <p className="mt-1 text-sm text-muted">{p.category} · {p.platform}</p>
      </Link>
    </div>
  );
}
