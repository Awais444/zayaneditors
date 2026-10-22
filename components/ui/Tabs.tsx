"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Segmented control with a spring-animated active pill. */
export function Tabs<T extends string>({
  options,
  value,
  onChange,
  id,
  className,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
  id: string;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn("no-scrollbar inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1", className)}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={value === o.value}
          onClick={() => onChange(o.value)}
          className="pressable relative h-10 shrink-0 rounded-full px-4 text-sm font-medium text-muted aria-selected:text-accent-fg"
        >
          {value === o.value && (
            <motion.span
              layoutId={`tab-${id}`}
              className="absolute inset-0 rounded-full bg-accent"
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            />
          )}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  );
}
