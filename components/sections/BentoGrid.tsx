import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { InViewVideo } from "@/components/ui/InViewVideo";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

export type BentoItem = {
  /** Optional: cards without a link render as static panels (e.g. "What's included") */
  href?: string;
  title: string;
  text?: string;
  icon?: LucideIcon;
  /** Large cards span 2×2 on desktop and play a looping preview */
  large?: boolean;
  video?: { src: string; poster: string };
  stat?: string;
  note?: string;
};

/** Link when there is an href, otherwise a plain panel. */
function Card({ href, className, children }: { href?: string; className: string; children: React.ReactNode }) {
  return href ? <Link href={href} className={className}>{children}</Link> : <div className={className}>{children}</div>;
}

/** Shared bento grid: large video cards + compact icon/stat cards, tilt + glow border on fine pointers. */
export function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <div className="grid auto-rows-[minmax(13rem,auto)] gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => {
        const Icon = it.icon;
        return (
          <Reveal key={it.href ?? it.title} delay={Math.min(i, 5) * 0.05} className={cn(it.large && "lg:col-span-2 lg:row-span-2")}>
            <TiltCard className="h-full">
              {it.large ? (
                <Card href={it.href} className="group relative flex h-full min-h-[22rem] flex-col justify-end p-7">
                  {it.video && <InViewVideo src={it.video.src} poster={it.video.poster} className="absolute inset-0 -z-10 size-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90" />}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
                  {Icon && <Icon className="mb-auto size-6 text-accent" aria-hidden />}
                  <h3 className="text-3xl font-semibold tracking-tight">{it.title}</h3>
                  {it.text && <p className="mt-2 max-w-md text-muted">{it.text}</p>}
                  {it.href && <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold group-hover:text-accent">Explore <ArrowUpRight className="size-4" aria-hidden /></span>}
                </Card>
              ) : (
                <Card href={it.href} className="group flex h-full flex-col p-6">
                  {Icon && <Icon className="size-6 text-accent" aria-hidden />}
                  {it.stat && <p className="mt-auto pt-8 font-sans text-3xl font-bold tracking-[-0.03em]">{it.stat}</p>}
                  {it.note && <p className="text-sm text-muted">{it.note}</p>}
                  {!it.stat && it.text && <p className="mt-auto pt-8 text-sm text-muted">{it.text}</p>}
                  <h3 className={cn("flex items-center justify-between font-semibold group-hover:text-accent", it.stat || it.text ? "mt-4" : "mt-auto pt-8")}>
                    {it.title} {it.href && <ArrowUpRight className="size-4" aria-hidden />}
                  </h3>
                </Card>
              )}
            </TiltCard>
          </Reveal>
        );
      })}
    </div>
  );
}
