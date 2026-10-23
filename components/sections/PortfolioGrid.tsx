"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { categoryLabel, categorySlug, isVertical, work, workCategories, type PortfolioItem } from "@/data/portfolio";
import { ReelCard } from "@/components/home/ReelCard";
import { cn } from "@/lib/utils";

const VideoModal = dynamic(() => import("@/components/ui/VideoModal"), { ssr: false });

/** Vertical cards per row: 4 desktop, 3 tablet, 2 mobile (horizontal: 2, 2, 1). SSR renders desktop. */
function useColumns() {
  const [cols, setCols] = useState({ v: 4, h: 2 });
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 768px)");
    const set = () => setCols(lg.matches ? { v: 4, h: 2 } : md.matches ? { v: 3, h: 2 } : { v: 2, h: 1 });
    set();
    lg.addEventListener("change", set);
    md.addEventListener("change", set);
    return () => {
      lg.removeEventListener("change", set);
      md.removeEventListener("change", set);
    };
  }, []);
  return cols;
}

/** Filter order by importance (display names); categories not listed follow alphabetically. */
const ORDER = ["Talking Head", "E-commerce Ads", "AI Video", "UGC Ads", "VSLs", "3D Animation", "Real Estate", "Documentary", "Logo Animation"];
const rank = (c: string) => (ORDER.indexOf(categoryLabel(c)) + 1 || 99);

const featuredFirst = (a: PortfolioItem, b: PortfolioItem) => Number(b.featured) - Number(a.featured);
const chunk = <T,>(xs: T[], n: number) => Array.from({ length: Math.ceil(xs.length / n) }, (_, i) => xs.slice(i * n, i * n + n));

/** Alternating rows by format: a row of 9:16 cards, then a row of 16:9 cards, until both run out. */
function buildRows(items: PortfolioItem[], cols: { v: number; h: number }) {
  const v = chunk(items.filter(isVertical).sort(featuredFirst), cols.v);
  const h = chunk(items.filter((p) => !isVertical(p)).sort(featuredFirst), cols.h);
  const rows: { kind: "v" | "h"; items: PortfolioItem[] }[] = [];
  for (let i = 0; i < Math.max(v.length, h.length); i++) {
    if (v[i]) rows.push({ kind: "v", items: v[i] });
    if (h[i]) rows.push({ kind: "h", items: h[i] });
  }
  return rows;
}

/**
 * Portfolio grid: sticky category filter (reflected in ?category=), rows by format with a shared
 * layout animation, and the same card everywhere (media + chip, title and "Category · Platform" below).
 */
export function PortfolioGrid() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<{ p: PortfolioItem; origin: { x: number; y: number } } | null>(null);
  const reduce = useReducedMotion();
  const cols = useColumns();
  const top = useRef<HTMLDivElement>(null);
  const pills = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  const measurePills = () => {
    const el = pills.current;
    if (el) setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2 });
  };
  useEffect(() => {
    measurePills();
    window.addEventListener("resize", measurePills);
    return () => window.removeEventListener("resize", measurePills);
  }, []);

  // Read ?category= once on load; write it back on change (replaceState: no history spam)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("category");
    const match = workCategories.find((c) => categorySlug(c.name) === q);
    if (match) setFilter(match.name);
  }, []);
  const choose = (value: string) => {
    setFilter(value);
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", categorySlug(value));
    window.history.replaceState(null, "", url);
    // Keep the grid's top in view after a filter change
    const y = top.current ? top.current.getBoundingClientRect().top : 0;
    if (y < 0) top.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  const options = useMemo(() => [{ value: "all", label: "All" }, ...[...workCategories].sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name)).map((c) => ({ value: c.name, label: categoryLabel(c.name) }))], []);
  const items = work.filter((p) => filter === "all" || p.category === filter);
  const rows = buildRows(items, cols);
  const spring = { type: "spring" as const, bounce: 0, duration: 0.45 };

  return (
    <div ref={top} className="scroll-mt-20">
      <div data-cursor-occlude className="sticky top-16 z-20 -mx-4 mb-10 bg-bg/85 px-4 py-3 backdrop-blur-md md:top-18 md:mx-0 md:px-0">
        <div
          ref={pills}
          role="tablist"
          aria-label="Filter projects by category"
          onScroll={measurePills}
          data-lenis-prevent
          className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain"
          style={{ maskImage: `linear-gradient(to right, ${edges.start ? "#000" : "transparent"}, #000 ${edges.start ? "0" : "8%"}, #000 ${edges.end ? "100%" : "88%"}, ${edges.end ? "#000" : "transparent"})` }}
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              role="tab"
              aria-selected={filter === o.value}
              onClick={() => choose(o.value)}
              className="pressable relative flex h-10 shrink-0 snap-start items-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium text-fg transition-colors hover:border-white/25 aria-selected:border-transparent aria-selected:text-accent-fg"
            >
              {filter === o.value && <motion.span layoutId="portfolio-filter" className="absolute inset-0 rounded-full bg-accent" transition={spring} />}
              <span className="relative">{o.label}</span>
            </button>
          ))}
        </div>
      </div>

      <LayoutGroup>
        <div className="space-y-10">
          {rows.map((row, ri) => (
            <div key={`${row.kind}-${ri}`} className={cn("grid items-start gap-6", row.kind === "v" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2")}>
              <AnimatePresence mode="popLayout" initial={false}>
                {row.items.map((p) => (
                  <motion.div
                    key={p.slug}
                    layoutId={reduce ? undefined : p.slug}
                    initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                    transition={spring}
                  >
                    <ReelCard
                      p={p}
                      chip
                      ratio={row.kind === "v" ? "9:16" : "16:9"}
                      sizes={row.kind === "v" ? "(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw" : "(min-width: 768px) 50vw, 100vw"}
                      onOpen={(origin) => setOpen({ p, origin })}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </LayoutGroup>
      {open && <VideoModal video={{ src: open.p.preview.mp4, poster: open.p.poster, title: open.p.title }} origin={open.origin} onClose={() => setOpen(null)} />}
    </div>
  );
}
