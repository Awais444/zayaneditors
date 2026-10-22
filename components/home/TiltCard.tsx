"use client";
import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Card that tilts toward the pointer (max 4°, critically damped spring) with a glow border
 * that follows it. Fine pointer only; touch and reduced motion get a flat card.
 */
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useSpring(0, { stiffness: 220, damping: 30 });
  const py = useSpring(0, { stiffness: 220, damping: 30 });
  // Full transform string → composited
  const transform = useTransform([px, py], ([x, y]: number[]) => `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    px.set(x * 2 - 1);
    py.set(y * 2 - 1);
    // Glow position is set on this card only (no inherited-variable fan-out to many children)
    ref.current!.style.setProperty("--mx", `${x * 100}%`);
    ref.current!.style.setProperty("--my", `${y * 100}%`);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ transform }} className={cn("glow-card card overflow-hidden", className)}>
      {children}
    </motion.div>
  );
}
