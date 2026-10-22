import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

type Cta = { label: string; href: string; variant?: "primary" | "outline" | "ghost" };

/**
 * Shared page hero in the Home design language: eyebrow, kinetic headline (words rise in,
 * staggered, CSS-only so LCP isn't delayed), sub-headline, CTAs, optional breadcrumbs and an
 * optional right-side visual slot (two columns on desktop, stacked on mobile).
 */
export function PageHero({
  eyebrow,
  title,
  sub,
  ctas = [],
  visual,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: React.ReactNode;
  ctas?: Cta[];
  visual?: React.ReactNode;
  breadcrumbs?: { name: string; href: string }[];
  children?: React.ReactNode;
}) {
  const words = title.split(" ");
  return (
    <section data-tl="Intro" data-tl-color="rgba(198,244,50,0.35)" className="relative isolate overflow-hidden">
      <div aria-hidden className="glow -top-48 right-0 -z-10 size-[36rem]" />
      <div className={cn("container-x grid items-center gap-12 pt-10 pb-16 md:pb-20", !!visual && "lg:grid-cols-2 lg:gap-10")}>
        <div>
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          {eyebrow && <p className="mb-5 text-xs font-semibold tracking-[0.14em] text-accent uppercase">{eyebrow}</p>}
          <h1 className="max-w-4xl text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.95] font-bold tracking-[-0.035em]">
            {words.map((w, i) => (
              <span key={`${w}-${i}`} className="kinetic-word mr-[0.22em]" style={{ "--i": i } as React.CSSProperties}>
                {w}
              </span>
            ))}
          </h1>
          {sub && <div className="mt-6 max-w-2xl text-lg text-muted">{sub}</div>}
          {ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {ctas.map((c, i) =>
                i === 0 && (c.variant ?? "primary") === "primary" ? (
                  <Magnetic key={c.href}>
                    <Button href={c.href} size="lg">{c.label}</Button>
                  </Magnetic>
                ) : (
                  <Button key={c.href} href={c.href} size="lg" variant={c.variant ?? "outline"}>{c.label}</Button>
                ),
              )}
            </div>
          )}
          {children}
        </div>
        {visual && <div className="relative">{visual}</div>}
      </div>
    </section>
  );
}
