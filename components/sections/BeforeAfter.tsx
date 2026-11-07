"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Props = { raw: string; edited: string; rawPoster: string; editedPoster: string };

const changes = ["Tight cuts & pacing", "Animated captions", "Color & sound"];

/**
 * Home Before/After: one real 9:16 clip split into its raw and edited versions (same timing),
 * shown as two phone cards that play in sync. EDITED is the master clock; RAW follows it.
 */
export function BeforeAfter({ raw, edited, rawPoster, editedPoster }: Props) {
  const section = useRef<HTMLElement>(null);
  const rawRef = useRef<HTMLVideoElement>(null);
  const editRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(false);
  /** The user paused on purpose: don't auto-resume when scrolling back. */
  const userPaused = useRef(false);

  const play = () => {
    const r = rawRef.current, e = editRef.current;
    if (!r || !e) return;
    r.currentTime = e.currentTime;
    const start = () => Promise.all([e.play(), r.play()]);
    start()
      .catch(() => {
        // Sound blocked by the browser: fall back to muted so both stay in sync
        if (e.muted) throw new Error("blocked");
        e.muted = true;
        setSound(false);
        return start();
      })
      .then(() => setPlaying(true))
      .catch(() => {
        r.pause();
        e.pause();
        setPlaying(false);
      });
  };
  const pause = () => {
    rawRef.current?.pause();
    editRef.current?.pause();
    setPlaying(false);
  };

  // Keep RAW locked to EDITED; resync on drift > 0.1s
  useEffect(() => {
    let id = 0;
    const tick = () => {
      const r = rawRef.current, e = editRef.current;
      if (r && e && !e.paused && Math.abs(r.currentTime - e.currentTime) > 0.1) r.currentTime = e.currentTime;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  // Autoplay (muted) while in view, unless reduced motion or the user paused
  useEffect(() => {
    if (reduce) return;
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !userPaused.current) play();
      else if (!en.isIntersecting) pause();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const toggle = () => {
    if (playing) {
      userPaused.current = true;
      pause();
    } else {
      userPaused.current = false;
      play();
    }
  };
  const toggleSound = () => {
    const e = editRef.current;
    if (!e) return;
    e.muted = !e.muted;
    setSound(!e.muted);
    if (!e.muted && e.paused) {
      userPaused.current = false;
      play();
    }
  };

  const card = "relative aspect-[9/16] overflow-hidden rounded-[28px] border bg-surface shadow-2xl";
  return (
    <section ref={section} data-tl="Before/After" data-tl-color="rgba(248,113,113,0.4)" className="py-10 lg:py-10">
      <div className="container-x grid items-center gap-10 lg:max-h-[720px] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div>
          <p className="eyebrow mb-4">Before / after</p>
          <h2 className="h-section mb-5 max-w-xl lg:mb-6">Same footage. Different result.</h2>
          <ul className="mb-6 space-y-2 text-lg text-muted lg:mb-8 lg:space-y-3">
            {changes.map((c) => (
              <li key={c} className="flex items-center gap-3">
                <Check aria-hidden className="size-5 shrink-0 text-accent" />
                {c}
              </li>
            ))}
          </ul>
          <Button href="/contact" size="lg">Start a Project</Button>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 sm:gap-4">
            <figure className="flex w-[40vw] flex-col items-center gap-3 lg:w-[236px]">
              <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-muted">RAW</span>
              <div className={cn(card, "w-full border-line")}>
                <video ref={rawRef} src={raw} poster={rawPoster} muted loop playsInline preload="metadata" className="size-full object-cover" aria-label="Raw footage, before editing" />
              </div>
            </figure>
            <ArrowRight aria-hidden className="mt-8 size-4 shrink-0 text-accent sm:size-6" />
            <figure className="relative z-10 flex w-[43vw] flex-col items-center gap-3 lg:w-[260px]">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold tracking-[0.14em] text-bg">EDITED</span>
              <div className={cn(card, "w-full border-accent/40 shadow-[0_30px_80px_-30px_rgba(198,244,50,0.35)]")}>
                <video ref={editRef} src={edited} poster={editedPoster} muted loop playsInline preload="metadata" className="size-full object-cover" aria-label="The same footage after editing" />
              </div>
            </figure>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button type="button" onClick={toggle} className="pressable inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold hover:border-accent hover:text-accent">
              {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
              {playing ? "Pause" : "Play both"}
            </button>
            <button type="button" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Mute the edited video" : "Turn on sound for the edited video"} className="pressable inline-flex size-11 items-center justify-center rounded-full border border-line hover:border-accent hover:text-accent">
              {sound ? <Volume2 aria-hidden className="size-4" /> : <VolumeX aria-hidden className="size-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;
