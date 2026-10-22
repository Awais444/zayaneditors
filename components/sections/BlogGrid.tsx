"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { PostMeta } from "@/lib/blog";
import { Tabs } from "@/components/ui/Tabs";
import { PostCard } from "./BlogPreview";

/** Blog grid with category pills; cards re-flow with layout animation on filter. */
export function BlogGrid({ posts }: { posts: PostMeta[] }) {
  const [cat, setCat] = useState("all");
  const reduce = useReducedMotion();
  const options = [{ label: "All", value: "all" }, ...[...new Set(posts.map((p) => p.category))].map((c) => ({ label: c, value: c }))];
  const items = posts.filter((p) => cat === "all" || p.category === cat);

  return (
    <div>
      <Tabs id="blog" options={options} value={cat} onChange={setCat} className="mb-10" />
      <motion.ul layout={!reduce} className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((p) => (
            <motion.li
              key={p.slug}
              layout={!reduce}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            >
              <PostCard p={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
