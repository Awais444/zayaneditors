"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
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

const STEP_MS = 1800;

/** Home "How it works": steps list (left) + phone card with the final video (right). */
export function HowItWorksRow({ steps }: { steps: HowStep[] }) {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [auto, setAuto] = useState(steps.length - 1);
  const [hover, setHover] = useState<number | null>(null);
  const [sound, setSound] = useState(false);
  const final = steps.find((s) => s.video)?.video;
  const active = reduce ? null : hover ?? auto;

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Highlight steps one after another while in view (static under reduced motion)
  useEffect(() => {
    if (reduce || !inView || hover !== null) return;
    setAuto((a) => (a === steps.length - 1 ? 0 : a));
    const id = setInterval(() => setAuto((a) => (a + 1) % steps.length), STEP_MS);
    return () => clearInterval(id);
  }, [reduce, inView, hover, steps.length]);

  // Final video plays muted while in view
  useEffect(() => {
    const v = vid.current;
    if (!v || reduce) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce]);

  const toggleSound = () => {
    const v = vid.current;
    if (!v) return;
    v.muted = !v.muted;
    setSound(!v.muted);
    if (v.paused) v.play().catch(() => { v.muted = true; setSound(false); });
  };

  const shown = active !== null ? steps[active]?.image : undefined;
  const fill = active === null ? 100 : (active / (steps.length - 1)) * 100;

  return (
    <section ref={section} data-tl="Process" className="py-12 lg:py-14">
      <div className="container-x grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-4">How it works</p>
          <h2 className="mb-6 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:mb-8 lg:text-[2.75rem]">From raw footage to a finished video in 48 hours.</h2>
          <ol className="relative" onMouseLeave={() => setHover(null)}>
            {/* vertical line through the step numbers, filling down to the active step */}
            <span aria-hidden className="absolute bottom-8 left-[15px] top-8 w-px bg-line">
              <span className="absolute inset-x-0 top-0 bg-accent transition-[height] duration-500 ease-out" style={{ height: `${fill}%` }} />
            </span>
            {steps.map((s, i) => {
              const on = active === null || i <= active;
              return (
                <li
                  key={s.title}
                  onMouseEnter={() => setHover(i)}
                  className={cn("relative flex items-center gap-4 border-b border-line py-4 last:border-b-0")}
                >
                  <span className={cn("relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full border bg-bg text-xs font-semibold transition-colors duration-300", on ? "border-accent text-accent" : "border-line text-muted")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className={cn("font-semibold transition-colors duration-300", i === active || active === null ? "text-fg" : "text-fg/70")}>{s.title}</h3>
                    <p className="text-sm text-muted">{s.text}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold">{s.duration}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex flex-col items-center">
          {final && (
            <figure className="flex flex-col items-center gap-3">
              <div className="relative aspect-[9/16] w-[70vw] overflow-hidden rounded-[28px] border border-accent/40 bg-surface shadow-[0_30px_80px_-30px_rgba(198,244,50,0.35)] sm:w-[260px]">
                <video ref={vid} src={final.src} poster={final.poster} muted loop playsInline preload="metadata" aria-label="The finished video" className="size-full object-cover" />
                {steps.map((s) => s.image && (
                  <Image key={s.image} src={s.image} alt={s.alt} fill sizes="260px" className={cn("object-cover transition-opacity duration-500", shown === s.image ? "opacity-100" : "opacity-0")} aria-hidden={shown !== s.image} />
                ))}
                <button type="button" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Mute video" : "Turn on sound"} className="absolute bottom-3 right-3 inline-flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:text-accent">
                  {sound ? <Volume2 aria-hidden className="size-4" /> : <VolumeX aria-hidden className="size-4" />}
                </button>
              </div>
              <figcaption className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Final delivery</figcaption>
            </figure>
          )}
          <Button href="/contact" size="lg" className="mt-6">Start a Project</Button>
        </div>
      </div>
    </section>
  );
}
