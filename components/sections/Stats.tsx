import { Clock, Eye, Film, Smile, type LucideIcon } from "lucide-react";
import { site } from "@/data/site";
import { Counter } from "@/components/ui/Counter";
import { Marquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/utils";

// TODO: replace with real client logos when available
const platforms = ["YouTube", "TikTok", "Instagram Reels", "Spotify Video", "LinkedIn", "Meta Ads", "Apple Podcasts", "Twitch", "Facebook"];

const icons: LucideIcon[] = [Film, Eye, Smile, Clock];

export function LogoMarquee() {
  return (
    <section aria-label="Platforms" className="border-y border-line py-8">
      <p className="mb-4 text-center text-xs tracking-[0.2em] text-muted uppercase">Edited for every platform your audience lives on</p>
      <Marquee items={platforms} label="Platforms we edit for" />
    </section>
  );
}

/**
 * Dividers per item: 2×2 below lg (vertical between columns, horizontal between rows),
 * a single row of 4 with vertical dividers from lg.
 */
const dividers = (i: number) =>
  cn(i % 2 === 1 && "border-l", i >= 2 && "border-t lg:border-t-0", i > 0 && "lg:border-l");

export function Stats() {
  return (
    <section aria-label="Results in numbers" className="section">
      <div className="container-x relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(closest-side,rgba(198,244,50,0.06),transparent)]" />
        <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-4">
          {site.stats.map((s, i) => {
            const Icon = icons[i] ?? Film;
            return (
              <div
                key={s.label}
                className={cn(
                  "group flex flex-col items-center border-line px-3 py-6 text-center transition-colors duration-300 hover:bg-surface-2 sm:p-8 md:items-start md:text-left lg:p-10",
                  dividers(i),
                )}
              >
                <Icon className="mb-4 size-[18px] text-muted" aria-hidden />
                {/* dt precedes dd in the DOM (valid <dl>); flex order shows the label below */}
                <dt className="order-last mt-3 text-[0.95rem] text-muted">{s.label}</dt>
                <dd className="font-sans text-[clamp(2.5rem,4vw,3.5rem)] whitespace-nowrap leading-none font-bold tracking-[-0.04em] text-fg transition-transform duration-300 ease-[var(--ease-ios)] group-hover:-translate-y-0.5">
                  <Counter value={s.value} />
                  <span className="text-accent">{s.suffix}</span>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
