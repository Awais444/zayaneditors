"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Rotating accent word: crossfade + slight rise every 2.2s (spring, no bounce).
 * Pauses while hovered; static (first word) under reduced motion.
 */
export function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, [words.length, reduce, paused]);

  return (
    <span
      className="relative inline-grid text-accent"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ opacity: 0, y: "0.25em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-0.25em" }}
          transition={{ type: "spring", bounce: 0, duration: 0.45 }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
