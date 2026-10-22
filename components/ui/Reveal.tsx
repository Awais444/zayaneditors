import { cn } from "@/lib/utils";

/**
 * Scroll reveal: fade + rise as the element enters the viewport.
 * Pure CSS scroll-driven animation (see `.reveal` in globals.css): no JS, no hydration wait,
 * and content is never hidden at first paint — elements already in view render fully visible,
 * which keeps LCP fast. Browsers without `animation-timeline` simply show the content.
 * `delay` staggers siblings by shifting the start of the animation range.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={cn("reveal", className)} style={delay ? ({ "--reveal-offset": `${Math.round(delay * 100)}px` } as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}
