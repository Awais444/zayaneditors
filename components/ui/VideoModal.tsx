"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { VideoPlayer, type Video } from "./VideoPlayer";

/**
 * Modal player. Scales from the trigger (origin = trigger center) and exits the same way.
 * Interruptible: AnimatePresence reverses from the current value if closed mid-open.
 */
export default function VideoModal({
  video,
  onClose,
  origin,
}: {
  video: Video | null;
  onClose: () => void;
  origin?: { x: number; y: number } | null;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!video) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      prev?.focus();
    };
  }, [video, onClose]);

  if (typeof document === "undefined") return null;
  const tx = origin ? origin.x - window.innerWidth / 2 : 0;
  const ty = origin ? origin.y - window.innerHeight / 2 : 0;

  return createPortal(
    <AnimatePresence>
      {video && (
        <motion.div
          key="modal"
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          className="fixed inset-0 z-[80] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="chrome absolute inset-0 bg-black/80" onClick={onClose} />
          <motion.div
            className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-black shadow-2xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, x: tx, y: ty }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, x: tx, y: ty }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            <VideoPlayer video={video} />
          </motion.div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="pressable chrome absolute top-[max(1rem,env(safe-area-inset-top))] right-4 grid size-11 place-items-center rounded-full border border-line"
            aria-label="Close video"
          >
            <X className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
