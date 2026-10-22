"use client";
import { motion, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/** Magnetic pull toward the cursor. Desktop + fine pointer only. */
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 250, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 250, damping: 20, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x, y }} className="inline-block">
      {children}
    </motion.div>
  );
}
