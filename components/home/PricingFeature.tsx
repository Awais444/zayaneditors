import { Check } from "lucide-react";
import { perVideo } from "@/data/pricing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Three plans; the featured one gets a rotating lime border (transform-only conic layer). */
export function PricingFeature() {
  return (
    <section data-tl="Pricing" data-tl-color="rgba(52,211,153,0.4)" className="section cv-auto">
      <div className="container-x">
        <SectionHeading eyebrow="Pricing" title="Simple pricing, no surprises" sub="Per-video, monthly or per-project. Every plan includes revisions and a free trial edit." center />
        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {perVideo.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <div className={cn("card flex h-full flex-col p-8", p.featured && "border-spin border-transparent md:-my-4 md:py-12")}>
                {p.featured && <span className="mb-4 self-start rounded-full bg-accent px-3 py-1 text-xs font-bold tracking-[0.12em] text-accent-fg uppercase">Most popular</span>}
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">{p.desc}</p>
                <p className="mt-6 font-sans text-5xl font-bold tracking-[-0.04em]">
                  <span className="text-base font-medium text-muted">from </span>${p.from}
                  <span className="text-base font-medium text-muted"> {p.unit}</span>
                </p>
                <ul className="mt-6 mb-8 space-y-2.5 text-sm">
                  {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="size-4 shrink-0 text-accent" aria-hidden />{f}</li>)}
                </ul>
                <Button href="/pricing" variant={p.featured ? "primary" : "outline"} className="mt-auto w-full">See plans</Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
