"use client";
import { useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { embedUrl, isFile } from "@/lib/video";
import { track } from "@/lib/analytics";

export type Video = { src: string; poster: string; title: string; captions?: string };

const fmt = (s: number) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

/**
 * File player with custom controls: play/pause, scrubber, mute + volume slider, fullscreen.
 * Opens with sound (it is mounted from a click). Keyboard: Space/K play-pause, M mute.
 */
function FilePlayer({ video, autoPlay }: { video: Video; autoPlay: boolean }) {
  const v = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);

  const toggle = () => {
    const el = v.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };
  const setMute = (m: boolean) => {
    const el = v.current;
    if (!el) return;
    el.muted = m;
    if (!m && el.volume === 0) el.volume = 0.5;
  };

  // Autoplay can start before React's handlers see it: sync the button state once mounted
  useEffect(() => {
    const el = v.current;
    if (el) setPlaying(!el.paused);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea")) return;
      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        setMute(!v.current?.muted);
      } else if (e.key === " " || e.key === "k") {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={box} className="group/player relative size-full bg-black">
      <video
        ref={v}
        className="size-full object-contain"
        src={video.src}
        poster={video.poster}
        autoPlay={autoPlay}
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => {
          setPlaying(true);
          track("video_play", { video_title: video.title });
        }}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onVolumeChange={(e) => {
          setMuted(e.currentTarget.muted);
          setVolume(e.currentTarget.volume);
        }}
      >
        {video.captions && <track kind="captions" src={video.captions} srcLang="en" label="English" default />}
      </video>
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pt-8 pb-3 text-white">
        <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="grid size-9 place-items-center rounded-full outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-accent">
          {playing ? <Pause className="size-4 fill-current" /> : <Play className="size-4 translate-x-px fill-current" />}
        </button>
        <span className="w-20 shrink-0 font-mono text-xs tabular-nums">{fmt(time)} / {fmt(dur)}</span>
        <input
          type="range"
          aria-label="Seek"
          min={0}
          max={dur || 0}
          step={0.1}
          value={time}
          onChange={(e) => v.current && (v.current.currentTime = Number(e.target.value))}
          className="h-1 flex-1 cursor-pointer accent-[var(--color-accent)]"
        />
        <button
          type="button"
          onClick={() => setMute(!muted)}
          aria-label={muted ? "Unmute (M)" : "Mute (M)"}
          aria-pressed={muted}
          className="grid size-9 place-items-center rounded-full outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-accent"
        >
          {muted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>
        <input
          type="range"
          aria-label="Volume"
          min={0}
          max={1}
          step={0.05}
          value={muted ? 0 : volume}
          onChange={(e) => {
            const el = v.current;
            if (!el) return;
            el.volume = Number(e.target.value);
            el.muted = el.volume === 0;
          }}
          className="hidden h-1 w-20 cursor-pointer accent-[var(--color-accent)] sm:block"
        />
        <button
          type="button"
          onClick={() => (document.fullscreenElement ? document.exitFullscreen() : box.current?.requestFullscreen?.())}
          aria-label="Fullscreen"
          className="grid size-9 place-items-center rounded-full outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Maximize className="size-4" />
        </button>
      </div>
    </div>
  );
}

/** Real player (file or provider iframe). Only mount after user interaction. */
export function VideoPlayer({ video, autoPlay = true }: { video: Video; autoPlay?: boolean }) {
  if (isFile(video.src)) return <FilePlayer video={video} autoPlay={autoPlay} />;
  return (
    <iframe
      className="size-full"
      src={embedUrl(video.src, autoPlay)}
      title={video.title}
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      allowFullScreen
      onLoad={() => track("video_play", { video_title: video.title })}
    />
  );
}
