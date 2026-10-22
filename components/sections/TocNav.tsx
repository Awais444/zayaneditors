"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky table of contents; the heading currently being read is highlighted lime. */
export function TocNav({ toc }: { toc: { id: string; text: string }[] }) {
  const [active, setActive] = useState(toc[0]?.id);

  // Active = the last heading above 30% of the viewport (works for jumps, not just steady scrolling)
  useEffect(() => {
    const els = toc.map((t) => document.getElementById(t.id)).filter((e): e is HTMLElement => !!e);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      const current = els.filter((e) => e.getBoundingClientRect().top < line).pop();
      setActive(current?.id ?? toc[0]?.id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [toc]);

  return (
    <ol className="space-y-1 border-l border-line text-sm">
      {toc.map((t) => (
        <li key={t.id}>
          <a
            href={`#${t.id}`}
            aria-current={active === t.id ? "location" : undefined}
            className={cn("-ml-px block border-l-2 py-1 pl-4 transition-colors", active === t.id ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg")}
          >
            {t.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
