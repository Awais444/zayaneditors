"use client";
import { useState } from "react";
import { Pause, Play } from "lucide-react";

/** Pause/play control for auto-moving content (WCAG 2.2.2). Sets data-paused on the target. */
export function MotionToggle({ target, label }: { target: string; label: string }) {
  const [paused, setPaused] = useState(false);
  const toggle = () => {
    const next = !paused;
    setPaused(next);
    document.getElementById(target)?.setAttribute("data-paused", String(next));
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-controls={target}
      className="pressable inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-muted hover:bg-surface-2 hover:text-fg"
    >
      {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
      {paused ? `Play ${label}` : `Pause ${label}`}
    </button>
  );
}
