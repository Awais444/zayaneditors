"use client";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { GlassChip } from "./GlassChip";

/** Glass chip with the live local time for a place (client-only, so SSR never mismatches). */
export function LocalTime({ tz, label }: { tz: string; label: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz, timeZoneName: "short" });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [tz]);

  return (
    <GlassChip i={3} float={false}>
      <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" /><span className="relative inline-flex size-2 rounded-full bg-accent" /></span>
      <Clock className="size-4 text-accent" aria-hidden />
      <span>{label}: <span className="tabular-nums">{now ?? "—"}</span></span>
    </GlassChip>
  );
}
