"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { Video } from "./VideoPlayer";
import { isFile } from "@/lib/video";
import { cn } from "@/lib/utils";

const VideoModal = dynamic(() => import("./VideoModal"), { ssr: false });

/**
 * Poster card with a muted preview: plays on hover (fine pointer) or while in view (touch).
 * Click opens the modal player, or navigates when `href` is set.
 */
export function VideoCard({
  video,
  title,
  meta,
  href,
  aspect = "aspect-video",
  className,
}: {
  video: Video;
  title: string;
  meta?: string;
  href?: string;
  aspect?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [preview, setPreviewState] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const setPreview = (on: boolean) => {
    if (on) setLoaded(true);
    setPreviewState(on);
  };
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const reduce = useReducedMotion();
  const canPreview = isFile(video.src) && !reduce;

  // Touch devices: play the preview while the card is mostly in view
  useEffect(() => {
    if (!canPreview || window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      const on = e.intersectionRatio > 0.7;
      if (on) setLoaded(true);
      setPreviewState(on);
    }, { threshold: [0, 0.7] });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [canPreview]);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (preview) v.play().catch(() => {});
    else v.pause();
  }, [preview]);

  const hover = (on: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && canPreview) setPreview(on);
  };

  const inner = (
    <>
      <div data-cursor-frame className={cn("relative overflow-hidden rounded-2xl border border-line bg-black", aspect)}>
        <Image src={video.poster} alt={title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.04]" />
        {canPreview && loaded && (
          <video
            ref={vid}
            src={video.src}
            muted
            loop
            playsInline
            preload="none"
            className={cn("absolute inset-0 size-full object-cover transition-opacity duration-300", preview ? "opacity-100" : "opacity-0")}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {/* Centered Play badge: appears on hover (fine pointer); always visible on touch */}
        <span className="play-badge pointer-events-none absolute top-1/2 left-1/2 grid size-16 place-items-center rounded-full bg-accent text-accent-fg shadow-[0_10px_30px_-8px_rgb(198_244_50/0.35)]">
          <Play className="size-6 translate-x-0.5 fill-current" aria-hidden />
        </span>
      </div>
      <div className="mt-4">
        {!href && <span className="sr-only">Play video: </span>}
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        {meta && <p className="mt-1 text-sm text-muted">{meta}</p>}
      </div>
    </>
  );

  return (
    <div ref={ref} data-cursor="play" className={cn("group pressable", className)} onPointerEnter={hover(true)} onPointerLeave={hover(false)}>
      {href ? (
        <Link href={href} className="block">
          {inner}
        </Link>
      ) : (
        <button
          type="button"
          className="block w-full text-left"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
            setOpen(true);
          }}
        >
          {inner}
        </button>
      )}
      {open && <VideoModal video={video} origin={origin} onClose={() => setOpen(false)} />}
    </div>
  );
}
