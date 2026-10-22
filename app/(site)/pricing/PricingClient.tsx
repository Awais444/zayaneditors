"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { estimateLongForm, perMinute, perVideo, plans, volumes, type Volume } from "@/data/pricing";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Mode = "per-video" | "monthly";

export function PricingClient() {
  const [mode, setMode] = useState<Mode>("per-video");
  const [vol, setVol] = useState<Volume>(8);
  const [minutes, setMinutes] = useState(12);
  const reduce = useReducedMotion();

  const switchMode = (m: Mode) => {
    setMode(m);
    track("pricing_toggle", { mode: m });
  };

  return (
    <div>
      <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs id="pricing" value={mode} onChange={switchMode} options={[{ label: "Per Video", value: "per-video" }, { label: "Monthly Plans", value: "monthly" }]} />
        {mode === "monthly" && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted">Videos / month</span>
            <Tabs id="volume" value={String(vol) as `${Volume}`} onChange={(v) => setVol(Number(v) as Volume)} options={volumes.map((v) => ({ label: String(v), value: String(v) as `${Volume}` }))} />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -10 }}
          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          className="grid gap-5 md:grid-cols-3"
        >
          {mode === "per-video"
            ? perVideo.map((p) => (
                <div key={p.name} className={cn("card flex flex-col p-7", p.featured && "border-accent/60")}>
                  <h2 className="text-xl font-semibold">{p.name}</h2>
                  <p className="mt-1 text-sm text-muted">{p.desc}</p>
                  <p className="display mt-6 text-5xl font-bold"><span className="text-base font-medium text-muted">from </span>${p.from}<span className="text-base font-medium text-muted"> {p.unit}</span></p>
                  <ul className="mt-6 mb-8 space-y-2.5 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><Check className="size-4 shrink-0 text-accent" aria-hidden />{f}</li>)}</ul>
                  <Button href="/contact" variant={p.featured ? "primary" : "outline"} className="mt-auto w-full">Get started</Button>
                </div>
              ))
            : plans.map((p) => {
                const total = p.pricePerVideo[vol] * vol;
                return (
                  <div key={p.name} className={cn("card relative flex flex-col p-7", p.featured && "border-accent/60")}>
                    {p.featured && <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-semibold">Most popular</span>}
                    <h2 className="text-xl font-semibold">{p.name}</h2>
                    <p className="mt-1 text-sm text-muted">{p.desc}</p>
                    <p className="display mt-6 text-5xl font-bold tabular-nums">${total.toLocaleString("en-US")}<span className="text-base font-medium text-muted"> /month</span></p>
                    <p className="mt-1 text-sm text-muted">{vol} videos · ${p.pricePerVideo[vol]} each</p>
                    <ul className="mt-6 mb-8 space-y-2.5 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><Check className="size-4 shrink-0 text-accent" aria-hidden />{f}</li>)}</ul>
                    <Button href="/contact" variant={p.featured ? "primary" : "outline"} className="mt-auto w-full">Choose {p.name}</Button>
                  </div>
                );
              })}
        </motion.div>
      </AnimatePresence>

      <div className="card mt-10 grid gap-8 p-7 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
        <div>
          <h2 className="text-2xl font-semibold">Long-form price calculator</h2>
          <p className="mt-2 text-sm text-muted">Priced per finished minute: ${perMinute.base} base (includes {perMinute.includedMinutes} min) + ${perMinute.perMinute} per extra minute.</p>
          <label htmlFor="minutes" className="mt-6 block text-sm font-medium">Final video length: <span className="tabular-nums">{minutes}</span> min</label>
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
        <div className="rounded-2xl bg-bg p-6 text-center">
          <p className="text-sm text-muted">Estimated price</p>
          <p className="display mt-1 text-5xl font-bold tabular-nums">${estimateLongForm(minutes)}</p>
          <p className="mt-1 text-xs text-muted">per video · final quote after brief</p>
        </div>
      </div>
    </div>
  );
}
