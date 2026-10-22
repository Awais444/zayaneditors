"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPage } from "@/lib/schema";

/**
 * Accordion with a spring on height (the one sanctioned layout animation — there's no transform
 * equivalent). Answers always stay in the DOM for SEO; closed panels are hidden from AT via `inert`.
 */
export function FaqSpring({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  return (
    <section data-tl="FAQ" data-tl-color="rgba(244,244,245,0.25)" className="section cv-auto">
      <JsonLd data={faqPage(items)} />
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="h-section">Frequently asked questions</h2>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-medium"
                  >
                    {f.q}
                    <Plus className={`size-5 shrink-0 text-accent transition-transform duration-300 ease-[var(--ease-ios)] ${isOpen ? "rotate-45" : ""}`} aria-hidden />
                  </button>
                </h3>
                <motion.div
                  id={`faq-${i}`}
                  role="region"
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={reduce ? { duration: 0.15 } : { type: "spring", bounce: 0, duration: 0.4 }}
                  className="overflow-hidden"
                  inert={!isOpen}
                >
                  <p className="pr-10 pb-6 text-muted">{f.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
