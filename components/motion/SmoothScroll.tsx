"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { canUseDesktopMotion, loadGsap } from "@/lib/motion";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Desktop + fine pointer only: touch devices keep native momentum scrolling, and
 * reduced motion keeps the browser's instant scroll.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!canUseDesktopMotion()) return;
    let cleanup = () => {};
    let cancelled = false;
    Promise.all([import("lenis"), loadGsap()]).then(([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, smoothWheel: true });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        delete window.__lenis;
      };
    });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  // New route: start at the top and let ScrollTrigger re-measure the new page
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    loadGsap().then(({ ScrollTrigger }) => requestAnimationFrame(() => ScrollTrigger.refresh()));
  }, [pathname]);

  return null;
}
