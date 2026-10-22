"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

type VTDocument = Document & { startViewTransition?: (cb: () => Promise<void> | void) => { finished: Promise<void> } };

/**
 * Route changes through the View Transitions API: a quick lime "cut" bar sweeps across
 * while the new page wipes in (350ms). Browsers without the API navigate normally;
 * reduced motion gets a plain crossfade (see globals.css).
 */
export function RouteTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const resolveRef = useRef<(() => void) | null>(null);

  // Finish the pending transition once the new route has rendered
  useEffect(() => {
    resolveRef.current?.();
    resolveRef.current = null;
  }, [pathname]);

  useEffect(() => {
    const doc = document as VTDocument;
    if (!doc.startViewTransition) return;

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // same page / hash links scroll natively
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return; // files (sitemap.xml, PDFs) load normally
      // Capture phase: take over before next/link navigates on its own
      e.preventDefault();
      e.stopPropagation();
      const root = document.documentElement;
      root.classList.add("vt-cut");
      const vt = doc.startViewTransition!(
        () =>
          new Promise<void>((resolve) => {
            resolveRef.current = resolve;
            router.push(url.pathname + url.search + url.hash);
            setTimeout(resolve, 1500); // never hang if the route is slow
          }),
      );
      vt.finished.finally(() => root.classList.remove("vt-cut"));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return <div aria-hidden className="vt-bar" />;
}
