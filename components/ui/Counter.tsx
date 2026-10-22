"use client";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Count-up number. Starts once 40% in view, ~1.2s ease-out, runs once.
 * An invisible copy of the final value reserves the width so nothing shifts.
 * SSR (and reduced motion) render the final value.
 */
export function Counter({ value, className }: { value: number; className?: string }) {
  const box = useRef<HTMLSpanElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const inView = useInView(box, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  // Reset to 0 before it scrolls into view (client only, never under reduced motion)
  useEffect(() => {
    if (!reduce && num.current && !inView) num.current.textContent = "0";
  }, [reduce, inView]);

  useEffect(() => {
    if (!inView || reduce || !num.current) return;
    const el = num.current;
    const c = animate(0, value, { duration: 1.2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (el.textContent = fmt(v)) });
    return () => c.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={box} className={cn("inline-grid tabular-nums", className)}>
      <span aria-hidden className="invisible col-start-1 row-start-1">{fmt(value)}</span>
      <span ref={num} className="col-start-1 row-start-1 text-right">{fmt(value)}</span>
    </span>
  );
}
