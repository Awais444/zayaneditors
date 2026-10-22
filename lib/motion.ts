"use client";
/**
 * Shared motion helpers. GSAP + ScrollTrigger are loaded lazily (never in the critical path)
 * and registered once. Scroll-linked effects only run where they help:
 * desktop, fine pointer, no reduced-motion preference.
 */
import type { gsap as GSAP } from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

let loading: Promise<{ gsap: typeof GSAP; ScrollTrigger: typeof ST }> | null = null;

export const loadGsap = () =>
  (loading ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
    g.gsap.registerPlugin(s.ScrollTrigger);
    return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
  }));

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Desktop + fine pointer + motion allowed: where pinned / scrubbed effects are enabled. */
export const DESKTOP_MOTION = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
export const canUseDesktopMotion = () => typeof window !== "undefined" && window.matchMedia(DESKTOP_MOTION).matches;

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Scroll to an element or y-offset, through Lenis when it's active. */
export const scrollToTarget = (target: HTMLElement | number) => {
  if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.1 });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  else target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
};
