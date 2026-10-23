"use client";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

/**
 * Preview sound, shared across every card on the page:
 * - at most one preview plays with sound (`active`); unmuting one mutes the rest
 * - the user's choice is remembered for the session: once sound is on, the next preview that
 *   starts playing (hover / tap / in view) takes the sound over, until they mute again
 */
const KEY = "preview-sound";
let active: string | null = null;
let wanted = (() => {
  try {
    return sessionStorage.getItem(KEY) === "on";
  } catch {
    return false;
  }
})();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const setWanted = (v: boolean) => {
  wanted = v;
  try {
    sessionStorage.setItem(KEY, v ? "on" : "off");
  } catch {}
};

export const sound = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  active: () => active,
  wanted: () => wanted,
  /** Give the sound to this preview (user turned it on). */
  on(id: string) {
    active = id;
    setWanted(true);
    emit();
  },
  /** User muted: nothing has sound, and new previews start muted. */
  off() {
    active = null;
    setWanted(false);
    emit();
  },
  /** A preview stopped being audible (scrolled away / paused): release the sound, keep the preference. */
  release(id: string) {
    if (active === id) {
      active = null;
      emit();
    }
  },
  /** A preview started playing: if the user wants sound, it takes over. */
  claim(id: string) {
    if (wanted && active !== id) {
      active = id;
      emit();
    }
  },
};

/**
 * Wire one preview <video> to the shared sound state. Returns `{ unmuted, toggle }`.
 * Turning sound on restarts that clip from 0:00 so it is heard from the start.
 * Out of view: muted; under 30% visible: also paused.
 */
export function usePreviewSound(id: string, video: React.RefObject<HTMLVideoElement | null>) {
  const current = useSyncExternalStore(sound.subscribe, sound.active, () => null);
  const unmuted = current === id;
  const [, force] = useState(0);

  useEffect(() => {
    const v = video.current;
    if (v) v.muted = !unmuted;
  }, [unmuted, video]);

  // Mute when scrolled out of view, pause when less than 30% is visible
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio < 0.3) {
          sound.release(id);
          if (!v.paused && !v.muted) v.pause();
        }
      },
      { threshold: [0, 0.3] },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [id, video, force]);

  // Must run inside the click handler (iOS only allows audible play from a user gesture)
  const toggle = useCallback(
    () => {
      const v = video.current;
      if (unmuted) {
        sound.off();
        return;
      }
      sound.on(id);
      if (v) {
        v.muted = false;
        v.currentTime = 0;
        v.play().catch(() => {
          // Browser refused audible playback: fall back to muted
          sound.off();
        });
      }
      force((n) => n + 1);
    },
    [id, unmuted, video],
  );

  return { unmuted, toggle };
}
