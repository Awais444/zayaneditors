"use client";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/** 36px glass mute toggle for preview cards. Never opens the card's modal (the handler stops propagation). */
export function SoundToggle({ unmuted, onToggle, className }: { unmuted: boolean; onToggle: () => void; className?: string }) {
  return (
    <button
      type="button"
      data-cursor="link"
      aria-label={unmuted ? "Turn sound off" : "Turn sound on"}
      aria-pressed={unmuted}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onToggle();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      className={cn(
        "absolute bottom-3 left-3 z-10 grid size-9 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70",
        "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        unmuted && "border-accent/60 text-accent",
        className,
      )}
    >
      {unmuted ? <Volume2 className="size-4" aria-hidden /> : <VolumeX className="size-4" aria-hidden />}
    </button>
  );
}
