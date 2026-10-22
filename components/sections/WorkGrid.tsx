"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { caseStudies, portfolioFilters } from "@/data/portfolio";
import type { PortfolioCategory } from "@/data/services";
import { Tabs } from "@/components/ui/Tabs";
import { VideoCard } from "@/components/ui/VideoCard";

export function WorkGrid({ search = false, limit }: { search?: boolean; limit?: number }) {
  const [filter, setFilter] = useState<"all" | PortfolioCategory>("all");
  const [q, setQ] = useState("");
  const reduce = useReducedMotion();

  const items = useMemo(() => {
    const term = q.trim().toLowerCase();
    return caseStudies
      .filter((c) => filter === "all" || c.category === filter)
      .filter((c) => !term || `${c.title} ${c.niche} ${c.platform} ${c.tags.join(" ")}`.toLowerCase().includes(term))
      .slice(0, limit);
  }, [filter, q, limit]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs id="work" options={portfolioFilters} value={filter} onChange={setFilter} />
        {search && (
          <label className="relative block md:w-72">
            <span className="sr-only">Search work</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search niche or platform"
              className="h-11 w-full rounded-full border border-line bg-surface pr-4 pl-10 outline-none placeholder:text-muted focus:border-white/30"
            />
          </label>
        )}
      </div>
      <motion.ul layout={!reduce} className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((c) => (
            <motion.li
              key={c.slug}
              layout={!reduce}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            >
              <VideoCard video={c.video} title={c.title} meta={`${c.niche} · ${c.platform} · ${c.highlight}`} href={`/portfolio/${c.slug}`} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {!items.length && <p className="py-16 text-center text-muted">No projects match that search yet.</p>}
    </div>
  );
}
