import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type PriceCard = { name: string; price: string; unit: string; features: string[]; desc?: string; cta?: { label: string; href: string } };

/** Shared pricing cards: three across, the middle one raised with the rotating lime border. */
export function PricingCards({ plans, featured = 1 }: { plans: PriceCard[]; featured?: number }) {
  return (
    <div className="grid items-stretch gap-5 md:grid-cols-3">
      {plans.map((p, i) => {
        const hot = i === featured;
        return (
          <Reveal key={p.name} delay={i * 0.06}>
            <div className={cn("card flex h-full flex-col p-8", hot && "border-spin border-transparent md:-my-4 md:py-12")}>
              {hot && <span className="mb-4 self-start rounded-full bg-accent px-3 py-1 text-xs font-bold tracking-[0.12em] text-accent-fg uppercase">Most popular</span>}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              {p.desc && <p className="mt-1 text-sm text-muted">{p.desc}</p>}
              <p className="mt-6 font-sans text-5xl font-bold tracking-[-0.04em]">
                {p.price} <span className="text-base font-medium tracking-normal text-muted">{p.unit}</span>
              </p>
              <ul className="mt-6 mb-8 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><Check className="size-4 shrink-0 text-accent" aria-hidden />{f}</li>
                ))}
              </ul>
              <Button href={p.cta?.href ?? "/contact"} variant={hot ? "primary" : "outline"} className="mt-auto w-full">{p.cta?.label ?? "Get started"}</Button>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
