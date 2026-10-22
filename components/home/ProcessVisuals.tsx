"use client";
import { useState } from "react";
import { FrameArt as Frame } from "@/components/ui/FrameArt";
import { Check, FileVideo, Film, MessageSquare, Package, UploadCloud } from "lucide-react";

/**
 * Lightweight HTML/CSS visuals for each process step. Every animated element carries
 * `data-a` plus `--from` (start transform) and `--d` (delay); the shared `.pv-*` CSS in
 * globals.css plays them once when the card becomes active. Without JS or under reduced
 * motion the elements simply render in their final state.
 */
const a = (from: string, d: number) => ({ "data-a": "", style: { "--from": from, "--d": `${d}ms` } as React.CSSProperties });

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative h-full min-h-56 overflow-hidden rounded-2xl border border-white/5 bg-surface-2 p-5 ${className}`}>{children}</div>;
}

function Upload() {
  return (
    <Panel className="flex flex-col justify-center gap-4">
      <div className="relative grid h-36 place-items-center rounded-xl border-2 border-dashed border-white/15">
        <UploadCloud className="size-8 text-muted" aria-hidden />
        <div className="absolute top-3 flex gap-3">
          {[0, 1, 2].map((i) => (
            <span key={i} {...a("translateY(-60px) rotate(-8deg)", 150 + i * 140)} className="grid size-11 place-items-center rounded-lg bg-surface shadow-lg">
              <FileVideo className="size-5 text-accent" aria-hidden />
            </span>
          ))}
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <span {...a("scaleX(0)", 650)} className="block h-full origin-left rounded-full bg-accent" style={{ ...a("scaleX(0)", 650).style, animationDuration: "1400ms" }} />
      </div>
      <p {...a("translateY(8px)", 1900)} className="flex items-center gap-2 text-sm font-medium"><Check className="size-4 text-accent" aria-hidden /> Footage received</p>
    </Panel>
  );
}

function Brief() {
  return (
    <Panel>
      <div className="space-y-2.5 rounded-xl bg-surface p-5 font-mono text-[12px] text-muted">
        <p className="text-fg">SCRIPT — v2</p>
        <p className="relative inline-block text-fg">
          <span {...a("scaleX(0)", 400)} className="absolute -inset-x-1 inset-y-0 origin-left rounded bg-accent/25" />
          <span className="relative">HOOK: “I lost 10k subs in a week. Here’s why.”</span>
        </p>
        <p>Intro: context in 15s, then the payoff.</p>
        <p>Act 1: the mistake (show the graph).</p>
        <p>Act 2: what fixed it.</p>
      </div>
      <div {...a("translateY(16px) rotate(6deg)", 900)} className="absolute right-5 bottom-5 w-44 rotate-[-3deg] rounded-md bg-[#fef08a] p-3 text-xs font-semibold text-black shadow-xl">
        Stronger hook in the first 3s
      </div>
    </Panel>
  );
}

function FirstCut() {
  const tracks = [
    { c: "bg-sky-400", clips: [[0, 28], [30, 62], [64, 100]] },
    { c: "bg-violet-500", clips: [[10, 34], [52, 78]] },
    { c: "bg-emerald-400", clips: [[0, 48], [50, 100]] },
  ];
  return (
    <Panel className="flex flex-col justify-center gap-2">
      <div className="mb-2 flex items-center gap-2 text-xs text-muted"><Film className="size-4" aria-hidden /> edit_v1 · 08:42</div>
      <div className="relative space-y-2">
        {tracks.map((t, ti) => (
          <div key={ti} className="relative h-8 rounded-md bg-white/[0.04]">
            {t.clips.map(([s, e], ci) => (
              <span key={ci} {...a("translateX(-40px)", 150 + ti * 120 + ci * 90)} className={`absolute inset-y-1 rounded ${t.c}`} style={{ ...a("translateX(-40px)", 150 + ti * 120 + ci * 90).style, left: `${s}%`, width: `${e - s - 1}%` }} />
            ))}
          </div>
        ))}
        {/* Playhead sweeps the full track width (wrapper translates by its own width) */}
        <div className="pointer-events-none absolute inset-y-[-6px] left-0 w-full">
          <div data-sweep className="h-full w-full">
            <span className="absolute inset-y-0 left-0 w-0.5 bg-accent"><span className="absolute -top-1 left-1/2 size-2.5 -translate-x-1/2 rounded-sm bg-accent" /></span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Revisions() {
  const notes = [
    { t: "0:12", m: "tighten this", x: "left-5 top-6" },
    { t: "0:47", m: "add b-roll here", x: "right-5 top-20" },
    { t: "1:30", m: "louder music", x: "left-10 bottom-8", done: true },
  ];
  return (
    <Panel className="p-0">
      <Frame className="opacity-70" />
      {/* Review timeline with comment markers */}
      <div className="absolute inset-x-5 bottom-3 h-1.5 rounded-full bg-white/15">
        {[12, 47, 82].map((p) => <span key={p} className="absolute -top-1 size-3.5 -translate-x-1/2 rounded-full border-2 border-surface bg-accent" style={{ left: `${p}%` }} />)}
      </div>
      {notes.map((n, i) => (
        <div key={n.t} {...a("translateY(10px) scale(0.95)", 250 + i * 300)} className={`absolute ${n.x} flex items-center gap-2 rounded-xl bg-surface/90 px-3 py-2 text-xs shadow-xl backdrop-blur`}>
          <MessageSquare className="size-3.5 text-accent" aria-hidden />
          <span className="font-mono text-accent">{n.t}</span> {n.m}
          {n.done && <span {...a("scale(0.4)", 1500)} className="ml-1 grid size-4 place-items-center rounded-full bg-accent text-accent-fg"><Check className="size-3" aria-hidden /></span>}
        </div>
      ))}
    </Panel>
  );
}

function ColorSound() {
  const [split, setSplit] = useState(50);
  return (
    <Panel className="flex flex-col gap-3">
      <div className="relative flex-1 overflow-hidden rounded-xl" data-cursor="drag">
        <Frame className="[filter:saturate(0.2)_contrast(0.7)_brightness(1.15)]" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
          <Frame className="[filter:saturate(1.3)_contrast(1.12)]" />
        </div>
        <span className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${split}%` }} />
        <span className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold tracking-wider">FLAT</span>
        <span className="absolute top-2 right-2 rounded bg-accent px-2 py-0.5 text-[10px] font-bold tracking-wider text-accent-fg">GRADED</span>
        <input type="range" min={0} max={100} value={split} onChange={(e) => setSplit(Number(e.target.value))} aria-label="Compare flat and graded" className="absolute inset-0 size-full cursor-ew-resize opacity-0" />
      </div>
      <div className="flex h-10 items-center gap-[3px]">
        {Array.from({ length: 48 }, (_, i) => (
          <span key={i} className="wave-bar flex-1 rounded-full bg-accent/70" style={{ height: `${Math.round(30 + 70 * Math.abs(Math.sin(i * 0.8)))}%`, "--i": i } as React.CSSProperties} />
        ))}
      </div>
    </Panel>
  );
}

function ThumbsCaptions() {
  const words = ["This", "edit", "changed", "everything"];
  return (
    <Panel className="flex items-center justify-center gap-6">
      <div className="relative h-36 w-48">
        {[-1, 0, 1].map((k, i) => (
          <div
            key={k}
            {...a("translateX(0) rotate(0deg)", 200 + i * 120)}
            className={`absolute inset-0 overflow-hidden rounded-lg border-2 shadow-xl ${k === 0 ? "border-accent" : "border-transparent"}`}
            style={{ ...a("translateX(0) rotate(0deg)", 200 + i * 120).style, transform: `translateX(${k * 34}px) rotate(${k * 8}deg)`, zIndex: k === 0 ? 2 : 1 }}
          >
            <Frame />
            {k === 0 && <span {...a("scale(0.4)", 800)} className="absolute top-1.5 right-1.5 grid size-5 place-items-center rounded-full bg-accent text-accent-fg"><Check className="size-3.5" aria-hidden /></span>}
          </div>
        ))}
      </div>
      <div className="relative hidden aspect-[9/16] h-48 overflow-hidden rounded-2xl border-4 border-surface bg-black sm:block">
        <Frame className="opacity-70" />
        <p className="absolute inset-x-2 bottom-6 flex flex-wrap justify-center gap-x-1 text-center text-sm font-extrabold uppercase">
          {words.map((w, i) => (
            <span key={w} {...a("translateY(6px) scale(0.9)", 600 + i * 220)} className={i === 2 ? "text-accent" : "text-white"}>{w}</span>
          ))}
        </p>
      </div>
    </Panel>
  );
}

function Deliver() {
  return (
    <Panel className="flex flex-col justify-center gap-4">
      <div className="rounded-xl bg-surface p-4">
        <div className="mb-2 flex justify-between text-sm"><span>Export 4K · H.264</span><span className="text-accent">100%</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <span {...a("scaleX(0)", 200)} className="block h-full origin-left rounded-full bg-accent" style={{ ...a("scaleX(0)", 200).style, animationDuration: "1600ms" }} />
        </div>
      </div>
      <div {...a("translateX(40px)", 1900)} className="pv-pulse flex items-center gap-3 self-end rounded-xl border border-accent/40 bg-surface px-4 py-3 shadow-xl">
        <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-fg"><Package className="size-4" aria-hidden /></span>
        <span className="text-sm"><span className="block font-semibold">Delivered ✓</span><span className="text-muted">final_master_4k.mp4</span></span>
      </div>
    </Panel>
  );
}

export const processVisuals = [Upload, Brief, FirstCut, Revisions, ColorSound, ThumbsCaptions, Deliver];
