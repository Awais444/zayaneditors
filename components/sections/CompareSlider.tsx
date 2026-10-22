"use client";
import Image from "next/image";
import { useRef, useState } from "react";

/**
 * Before/after comparison: the "after" frame is clipped with clip-path inset (composite-only),
 * driven by pointer drag or the keyboard via a visually hidden range input.
 * "Before" is the same frame desaturated, flattened and softened to read as raw footage.
 */
export function CompareSlider({ poster, before, after }: { poster: string; before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  const move = (x: number) => {
    const r = box.current?.getBoundingClientRect();
    if (r) setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  };

  return (
    <div>
      <div
        ref={box}
        className="relative aspect-video touch-pan-y overflow-hidden rounded-3xl border border-line bg-black select-none"
        data-cursor="drag"
        onPointerDown={(e) => {
          drag.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => drag.current && move(e.clientX)}
        onPointerUp={() => (drag.current = false)}
        onPointerCancel={() => (drag.current = false)}
      >
        <Image src={poster} alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover [filter:saturate(0.15)_contrast(0.8)_brightness(0.85)_blur(1px)]" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Image src={poster} alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover [filter:saturate(1.25)_contrast(1.08)]" />
        </div>
        <span className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold backdrop-blur-md">Before</span>
        <span className="absolute top-4 right-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-fg">After</span>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-accent" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-sm font-bold text-accent-fg shadow-lg">⇆</span>
        </div>
        <label className="sr-only">
          Compare before and after
          <input type="range" min={0} max={100} value={Math.round(pos)} onChange={(e) => setPos(+e.target.value)} />
        </label>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <p className="text-muted"><span className="font-semibold text-fg">Before: </span>{before}</p>
        <p className="text-muted sm:text-right"><span className="font-semibold text-accent">After: </span>{after}</p>
      </div>
    </div>
  );
}
