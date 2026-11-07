"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type HowStep = {
  title: string;
  text: string;
  duration: string;
  ratio: "9:16" | "16:9";
  alt: string;
  image?: string;
  video?: { src: string; poster: string };
};

/** Final video: plays muted while in view, with a sound toggle. */
function FinalVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setSound(!v.muted);
    if (v.paused) v.play().catch(() => { v.muted = true; setSound(false); });
  };
  return (
    <>
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} className="size-full object-cover" />
      <button type="button" onClick={toggle} aria-pressed={sound} aria-label={sound ? "Mute video" : "Turn on sound"} className="absolute bottom-2 right-2 inline-flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:text-accent">
        {sound ? <Volume2 aria-hidden className="size-4" /> : <VolumeX aria-hidden className="size-4" />}
      </button>
    </>
  );
}

export function HowItWorksRow({ steps }: { steps: HowStep[] }) {
  const reduce = useReducedMotion();
  return (
    <section data-tl="Process" className="py-12 lg:py-14">
      <div className="container-x">
        <p className="eyebrow mb-4">How it works</p>
        <h2 className="mb-8 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:mb-10 lg:text-5xl">From raw footage to a finished video in 48 hours.</h2>
        <ol className="relative grid gap-4 lg:grid-cols-4 lg:items-start lg:gap-6">
          {/* thin lime connector (desktop: horizontal under the visuals; mobile: vertical) */}
          <span aria-hidden className="absolute left-[12%] right-[12%] top-[34px] hidden h-px bg-accent/60 lg:block" />
          <span aria-hidden className="absolute bottom-6 left-[27px] top-6 w-px bg-accent/40 lg:hidden" />
          {steps.map((s, i) => {
            const has = s.image || s.video;
            return (
              <motion.li
                key={s.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                className="relative flex items-center gap-4 rounded-2xl border border-line bg-surface p-3 lg:flex-col lg:items-stretch lg:p-4"
              >
                {has && (
                  <div className={cn("relative shrink-0 overflow-hidden rounded-xl bg-surface-2", s.ratio === "9:16" ? "aspect-[9/16] w-14 lg:mx-auto lg:w-[112px]" : "aspect-video w-24 lg:w-full lg:self-center")}>
                    {s.video ? <FinalVideo src={s.video.src} poster={s.video.poster} label={s.alt} /> : <Image src={s.image!} alt={s.alt} fill sizes="(min-width:1024px) 300px, 96px" className="object-cover" />}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-[0.14em] text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                  <span className="mt-3 inline-block rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold">{s.duration}</span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight aria-hidden className="absolute -right-[19px] top-[26px] z-10 hidden size-4 rounded-full bg-bg text-accent lg:block" />
                )}
              </motion.li>
            );
          })}
        </ol>
        <div className="mt-8"><Button href="/contact" size="lg">Start a Project</Button></div>
      </div>
    </section>
  );
}
