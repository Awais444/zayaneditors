"use client";
import { embedUrl, isFile } from "@/lib/video";
import { track } from "@/lib/analytics";

export type Video = { src: string; poster: string; title: string; captions?: string };

/** Real player (file or provider iframe). Only mount after user interaction. */
export function VideoPlayer({ video, autoPlay = true }: { video: Video; autoPlay?: boolean }) {
  if (isFile(video.src)) {
    return (
      <video
        className="size-full bg-black object-contain"
        src={video.src}
        poster={video.poster}
        controls
        autoPlay={autoPlay}
        playsInline
        preload="none"
        onPlay={() => track("video_play", { video_title: video.title })}
      >
        {/* Captions toggle appears in native controls when a track is supplied. TODO: add .vtt files */}
        {video.captions && <track kind="captions" src={video.captions} srcLang="en" label="English" default />}
      </video>
    );
  }
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
