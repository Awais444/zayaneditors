"use client";
import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { VideoPlayer, type Video } from "./VideoPlayer";
import { cn } from "@/lib/utils";

/** Click-to-play facade: poster only until interaction, then mounts the player. Fixed aspect → no CLS. */
export function VideoFacade({ video, className, aspect = "aspect-video", priority }: { video: Video; className?: string; aspect?: string; priority?: boolean }) {
  const [on, setOn] = useState(false);
  return (
    <div data-cursor={on ? "hide" : "play"} className={cn("relative overflow-hidden rounded-2xl border border-line bg-black", aspect, className)}>
      {on ? (
        <VideoPlayer video={video} />
      ) : (
        <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 size-full" aria-label={`Play video: ${video.title}`}>
          <Image src={video.poster} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover opacity-80 transition-opacity group-hover:opacity-100" priority={priority} />
          <span className="pressable absolute top-1/2 left-1/2 grid size-18 -translate-1/2 place-items-center rounded-full bg-accent text-accent-fg shadow-2xl group-active:scale-95">
            <Play className="size-7 translate-x-0.5 fill-current" aria-hidden />
          </span>
        </button>
      )}
    </div>
  );
}
