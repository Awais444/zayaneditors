"use client";
import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Left/right inset that lines the first card up with .container-x content (max-w 80rem, 1rem / 2rem padding). */
const INSET = "max(1rem, calc((100vw - 80rem) / 2 + 2rem))";

/**
 * Horizontal card row used everywhere a row of cards scrolls sideways.
 * Native scroll + snap (touch swipe, trackpad, shift+wheel), mouse drag on desktop (a drag never
 * fires a card click), arrow buttons and arrow keys, edge fades only where more cards exist,
 * and a "3 / 8" counter. `data-lenis-prevent` stops smooth scroll from swallowing horizontal input.
 */
export function CardRow({
  header,
  label,
  children,
  itemClassName = "w-[78vw] sm:w-[24rem]",
  className,
}: {
  header?: React.ReactNode;
  label: string;
  children: React.ReactNode;
  itemClassName?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const [state, setState] = useState({ start: true, end: false, index: 1 });
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const first = el.firstElementChild?.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 20 : el.clientWidth;
    const atEnd = el.scrollLeft >= max - 4;
    setState({
      start: el.scrollLeft <= 4,
      end: atEnd,
      index: atEnd ? items.length : Math.min(items.length, Math.round(el.scrollLeft / step) + 1),
    });
  }, [items.length]);

  useEffect(() => {
    measure();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const by = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild?.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * (first ? first.offsetWidth + 20 : el.clientWidth * 0.8), behavior: "smooth" });
  };

  // Mouse drag to scroll; touch and pen keep native scrolling
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: ref.current!.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      el.style.scrollSnapType = "none";
      el.setPointerCapture(e.pointerId);
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = ref.current;
    drag.current = null;
    if (!d?.moved || !el) return;
    suppressClick.current = true;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    // Settle on the nearest card, then restore snapping
    const first = el.firstElementChild?.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 20 : 1;
    el.scrollTo({ left: Math.round(el.scrollLeft / step) * step, behavior: "smooth" });
    window.setTimeout(() => (el.style.scrollSnapType = ""), 400);
  };

  const mask = `linear-gradient(to right, ${state.start ? "#000" : "transparent"} 0, #000 ${state.start ? "0" : "6%"}, #000 ${state.end ? "100%" : "88%"}, ${state.end ? "#000" : "transparent"} 100%)`;
  const btn = "chrome pressable grid size-11 place-items-center rounded-full border border-line text-fg transition-opacity disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className={className}>
      <div className="container-x flex items-end justify-between gap-6">
        <div className="min-w-0 flex-1">{header}</div>
        <div className="mb-10 hidden shrink-0 gap-2 md:flex">
          <button type="button" className={btn} onClick={() => by(-1)} disabled={state.start} aria-label={`Previous: ${label}`}>
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button type="button" className={btn} onClick={() => by(1)} disabled={state.end} aria-label={`Next: ${label}`}>
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        data-lenis-prevent
        data-cursor="drag"
        onScroll={measure}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") (e.preventDefault(), by(1));
          if (e.key === "ArrowLeft") (e.preventDefault(), by(-1));
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        className="no-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        style={{ scrollPaddingInline: INSET, maskImage: mask, WebkitMaskImage: mask }}
      >
        <div className="flex w-max gap-5" style={{ paddingInline: INSET }}>
          {items.map((child, i) => (
            <div key={i} className={cn("shrink-0 snap-start", itemClassName)}>
              {child}
            </div>
          ))}
        </div>
      </div>
      {items.length > 1 && (
        <p className="container-x mt-5 text-sm text-muted tabular-nums" aria-live="polite">
          {state.index} / {items.length}
        </p>
      )}
    </div>
  );
}
