"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calculator } from "lucide-react";
import { estimateLongForm, perMinute, perVideo, plans, volumes, type Volume } from "@/data/pricing";
import { Tabs } from "@/components/ui/Tabs";
import { PricingCards, type PriceCard } from "@/components/sections/PricingCards";
import { track } from "@/lib/analytics";

type Mode = "per-video" | "monthly";

/** Per Video / Monthly toggle (spring pill) over the shared pricing cards, plus the per-minute calculator. */
export function PricingClient() {
  const [mode, setMode] = useState<Mode>("per-video");
  const [vol, setVol] = useState<Volume>(8);
  const [minutes, setMinutes] = useState(12);
  const reduce = useReducedMotion();

  const switchMode = (m: Mode) => {
    setMode(m);
    track("pricing_toggle", { mode: m });
  };

  const cards: PriceCard[] =
    mode === "per-video"
      ? perVideo.map((p) => ({ name: p.name, desc: p.desc, price: `$${p.from}`, unit: `${p.unit}, from`, features: p.features }))
      : plans.map((p) => ({
          name: p.name,
          desc: `${vol} videos · $${p.pricePerVideo[vol]} each`,
          price: `$${(p.pricePerVideo[vol] * vol).toLocaleString("en-US")}`,
          unit: "/month",
          features: p.features,
          cta: { label: `Choose ${p.name}`, href: "/contact" },
        }));
  const list: { featured?: boolean }[] = mode === "per-video" ? perVideo : plans;
  const featured = Math.max(0, list.findIndex((p) => p.featured));

  return (
    <div>
      <div className="mb-14 flex flex-col items-center gap-4">
        <Tabs id="pricing" value={mode} onChange={switchMode} options={[{ label: "Per Video", value: "per-video" }, { label: "Monthly", value: "monthly" }]} />
        <div className={mode === "monthly" ? "flex items-center gap-3 text-sm" : "invisible flex items-center gap-3 text-sm max-sm:hidden"} aria-hidden={mode !== "monthly"}>
          <span className="text-muted">Videos / month</span>
          <Tabs id="volume" value={String(vol) as `${Volume}`} onChange={(v) => setVol(Number(v) as Volume)} options={volumes.map((v) => ({ label: String(v), value: String(v) as `${Volume}` }))} />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={{ opacity: 0, transform: reduce ? "none" : "translateY(10px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={{ opacity: 0, transform: reduce ? "none" : "translateY(-10px)" }}
          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
        >
          <PricingCards plans={cards} featured={featured} />
        </motion.div>
      </AnimatePresence>

      {/* Per-minute calculator in a glass panel */}
      <div className="relative mt-20 overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-7 shadow-[0_40px_120px_-50px_rgba(198,244,50,0.35)] backdrop-blur-xl md:p-10">
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <p className="eyebrow mb-3 flex items-center gap-2"><Calculator className="size-4" aria-hidden /> Calculator</p>
            <h2 className="text-2xl font-semibold md:text-3xl">Long-form, priced per minute</h2>
            <p className="mt-2 text-sm text-muted">${perMinute.base} base (includes {perMinute.includedMinutes} min) + ${perMinute.perMinute} per extra finished minute.</p>
            <label htmlFor="minutes" className="mt-6 block text-sm font-medium">Final video length: <span className="tabular-nums text-accent">{minutes}</span> min</label>
            <input
              id="minutes"
              type="range"
              min={perMinute.min}
              max={perMinute.max}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--color-accent)]"
            />
            <div className="mt-1 flex justify-between text-xs text-muted"><span>{perMinute.min} min</span><span>{perMinute.max} min</span></div>
          </div>
          <div className="rounded-2xl border border-line bg-bg/70 p-6 text-center">
            <p className="text-sm text-muted">Estimated price</p>
            <p className="mt-1 font-sans text-6xl font-bold tracking-[-0.04em] tabular-nums">${estimateLongForm(minutes)}</p>
            <p className="mt-1 text-xs text-muted">per video · final quote after brief</p>
          </div>
        </div>
      </div>
    </div>
  );
}
