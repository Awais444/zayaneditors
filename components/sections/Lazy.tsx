"use client";
import dynamic from "next/dynamic";

/** Heavy interactive pieces are split out and rendered client-only behind fixed-aspect placeholders (no CLS). */
const Placeholder = () => <div className="aspect-video w-full animate-pulse rounded-3xl border border-line bg-surface" />;

export const LazyBeforeAfter = dynamic(() => import("./BeforeAfter"), { ssr: false, loading: Placeholder });
export const LazyEditTimeline = dynamic(() => import("./EditTimeline"), { ssr: false, loading: Placeholder });
