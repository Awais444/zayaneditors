"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { isFile } from "@/lib/video";
import { cn } from "@/lib/utils";

/** Full-width "next project" link: big title, poster that plays a muted preview on hover. */
export function NextProject({ href, title, meta, video }: { href: string; title: string; meta: string; video: { src: string; poster: string } }) {
  const vid = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [on, setOn] = useState(false);
  const hover = (v: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !isFile(video.src) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setLoaded(true);
    setOn(v);
    if (v) requestAnimationFrame(() => vid.current?.play().catch(() => {}));
    else vid.current?.pause();
  };

  return (
    <section data-tl="Next" data-tl-color="rgba(198,244,50,0.35)" className="section pt-0">
      <div className="container-x">
        <Link href={href} className="group relative block overflow-hidden rounded-3xl border border-line" onPointerEnter={hover(true)} onPointerLeave={hover(false)} data-cursor="play">
          <div className="relative aspect-[16/10] md:aspect-[21/9]">
            <Image src={video.poster} alt="" fill sizes="100vw" className="object-cover transition-transform duration-1000 ease-[var(--ease-out-quint)] group-hover:scale-[1.05]" />
            {loaded && <video ref={vid} src={video.src} muted loop playsInline preload="none" className={cn("absolute inset-0 size-full object-cover transition-opacity duration-500", on ? "opacity-100" : "opacity-0")} />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-12">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Next project</p>
                <p className="mt-3 max-w-3xl text-[clamp(1.75rem,4.5vw,4rem)] leading-[0.98] font-bold tracking-[-0.035em] text-white">{title}</p>
                <p className="mt-3 text-sm text-white/70">{meta}</p>
              </div>
              <span className="hidden size-16 shrink-0 place-items-center rounded-full bg-accent text-accent-fg transition-transform duration-300 group-hover:translate-x-1 md:grid">
                <ArrowRight className="size-6" aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
