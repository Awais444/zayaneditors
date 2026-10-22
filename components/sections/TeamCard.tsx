"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { isFile } from "@/lib/video";
import { cn } from "@/lib/utils";
import type { Editor } from "@/data/team";

/** Portrait editor card: photo first, their reel fades in and plays muted on hover (fine pointer). */
export function TeamCard({ m, href }: { m: Editor; href?: string }) {
  const vid = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [on, setOn] = useState(false);
  const hover = (v: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !isFile(m.reel.src) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setLoaded(true);
    setOn(v);
    if (v) requestAnimationFrame(() => vid.current?.play().catch(() => {}));
    else vid.current?.pause();
  };

  const body = (
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface">
      <Image src={m.avatar} alt={m.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.04]" />
      {loaded && <video ref={vid} src={m.reel.src} muted loop playsInline preload="none" className={cn("absolute inset-0 size-full object-cover transition-opacity duration-500", on ? "opacity-100" : "opacity-0")} />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <span className={cn("absolute top-4 right-4 rounded-full bg-accent px-2.5 py-1 text-[0.7rem] font-bold tracking-[0.12em] text-accent-fg uppercase transition-opacity duration-300", on ? "opacity-100" : "opacity-0")}>Reel</span>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-xl font-semibold text-white">{m.name}</h3>
        <p className="text-sm text-white/70">{m.role}</p>
        <p className="mt-1 text-sm font-medium text-accent">{m.specialty}</p>
      </div>
    </div>
  );

  return (
    <div className="group pressable" data-cursor="play" onPointerEnter={hover(true)} onPointerLeave={hover(false)}>
      {href ? <Link href={href} className="block">{body}</Link> : body}
    </div>
  );
}
