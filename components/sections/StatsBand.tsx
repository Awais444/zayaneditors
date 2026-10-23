import { Clock, Eye, Film, Smile, type LucideIcon } from "lucide-react";
import { site } from "@/data/site";
import { Counter } from "@/components/ui/Counter";

const icons: LucideIcon[] = [Film, Eye, Smile, Clock];
// Deterministic bar heights (integers → identical on server and client)
const bars = Array.from({ length: 72 }, (_, i) => Math.round(30 + 70 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.37))));

type Stat = { value: number; suffix: string; label: string };

/** Full-width band: large count-up numbers over a slowly breathing waveform (scaleY only). Defaults to site.stats. */
export function StatsBand({ stats = site.stats, icons: iconList = icons, label = "Results in numbers" }: { stats?: readonly Stat[]; icons?: LucideIcon[]; label?: string }) {
  return (
    <section data-tl="Results" data-tl-color="rgba(198,244,50,0.3)" aria-label={label} className="relative overflow-hidden border-y border-line bg-surface/60 py-16 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center gap-[3px] px-2 opacity-[0.15] [mask-image:linear-gradient(90deg,#000,transparent_28%,transparent_72%,#000)]">
        {bars.map((h, i) => (
          <span key={i} className="wave-bar flex-1 rounded-full bg-accent" style={{ height: `${h}%`, "--i": i } as React.CSSProperties} />
        ))}
      </div>
      <dl className="container-x relative grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = iconList[i] ?? Film;
          return (
            <div key={s.label} className="flex flex-col items-center text-center">
              <Icon className="mb-3 size-5 text-muted" aria-hidden />
              <dt className="order-last mt-2 text-[0.95rem] text-muted">{s.label}</dt>
              <dd className="font-sans text-[clamp(2.75rem,6vw,5rem)] leading-none font-bold tracking-[-0.04em] whitespace-nowrap">
                <Counter value={s.value} />
                <span className="text-accent">{s.suffix}</span>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
