"use client";
import { useEffect, useState, type ComponentType } from "react";

/**
 * Loads the Playhead cursor after hydration, and only on fine-pointer devices without
 * reduced motion — touch devices never download it.
 */
export function CursorLoader() {
  const [Cursor, setCursor] = useState<ComponentType | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => {
      if (fine.matches && !reduce.matches) {
        const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 300));
        idle(() => import("./PlayheadCursor").then((m) => setCursor(() => m.default)));
      } else setCursor(null);
    };
    check();
    reduce.addEventListener("change", check);
    fine.addEventListener("change", check);
    return () => {
      reduce.removeEventListener("change", check);
      fine.removeEventListener("change", check);
    };
  }, []);

  return Cursor ? <Cursor /> : null;
}
