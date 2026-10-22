import { cn } from "@/lib/utils";

/**
 * Glass status chip (surface at 90% + blur, legible on any background).
 * `i` staggers the entrance (80ms steps); `float` adds the slow ≤3px drift. Both are CSS-only
 * and fall back to static under reduced motion (see .chip-in / .chip-float in globals.css).
 */
export function GlassChip({ i = 0, float = true, children, className }: { i?: number; float?: boolean; children: React.ReactNode; className?: string }) {
  const chip = (
    <div className={cn("flex items-center gap-2 rounded-2xl border border-white/10 bg-surface/90 px-4 py-2.5 text-sm font-medium whitespace-nowrap shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-md", className)}>
      {children}
    </div>
  );
  return (
    <div className="chip-in" style={{ "--i": i } as React.CSSProperties}>
      {float ? <div className="chip-float" style={{ "--f": i } as React.CSSProperties}>{chip}</div> : chip}
    </div>
  );
}
