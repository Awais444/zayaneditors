import Link from "next/link";
import { caseStudies } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Results() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Results" title="Edits measured in watch time" sub="Sample case studies — numbers our clients care about: views, retention and click-through." />
        <div className="grid gap-5 md:grid-cols-3">
          {caseStudies.slice(0, 3).map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <Link href={`/portfolio/${c.slug}`} className="card pressable group block h-full p-7 hover:border-white/20">
                <p className="text-sm text-muted">{c.niche} · {c.platform}</p>
                <p className="display mt-4 text-4xl font-bold text-accent">{c.highlight}</p>
                <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
                <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5 text-sm">
                  <div><dt className="text-muted">Views</dt><dd className="mt-1 font-semibold">{c.results.views}</dd></div>
                  <div><dt className="text-muted">Retention</dt><dd className="mt-1 font-semibold">{c.results.retention}</dd></div>
                  <div><dt className="text-muted">CTR</dt><dd className="mt-1 font-semibold">{c.results.ctr}</dd></div>
                </dl>
                <span className="mt-6 inline-block text-sm font-semibold group-hover:text-accent">Read case study →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
