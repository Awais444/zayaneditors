import { Check } from "lucide-react";
import { perVideo } from "@/data/pricing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function PricingPreview() {
  return (
    <section className="section relative">
      <div className="glow -right-40 bottom-0 size-[28rem]" />
      <div className="container-x">
        <SectionHeading eyebrow="Pricing" title="Simple pricing, no surprises" sub="Per-video pricing or monthly plans. Every plan includes revisions." />
        <div className="grid gap-5 md:grid-cols-3">
          {perVideo.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className={cn("card flex flex-col p-7", p.featured && "border-accent/60 bg-[linear-gradient(180deg,var(--color-accent-soft),transparent_60%)]")}>
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.desc}</p>
              <p className="display mt-6 text-5xl font-bold">
                <span className="text-base font-medium text-muted">from </span>${p.from}
                <span className="text-base font-medium text-muted"> {p.unit}</span>
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><Check className="size-4 shrink-0 text-accent" aria-hidden />{f}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/pricing" size="lg">See all pricing</Button>
          <Button href="/contact" size="lg" variant="outline">Start a Project</Button>
        </div>
      </div>
    </section>
  );
}
