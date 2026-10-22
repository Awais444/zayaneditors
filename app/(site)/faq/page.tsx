import { faqCategories } from "@/data/faqs";
import { pageMeta } from "@/lib/metadata";
import { faqPage } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { slugify } from "@/lib/blog";
import Link from "next/link";

export const metadata = pageMeta({
  title: "Video Editing FAQ | Turnaround, Pricing, Revisions",
  description: "Answers to common questions about our video editing services: turnaround, revisions, pricing, payment, file delivery, rights and security.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPage(faqCategories.flatMap((c) => c.faqs))} />
      <section className="section pt-10">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "FAQ", href: "/faq" }]} />
          <SectionHeading as="h1" eyebrow="FAQ" title="Questions, answered" />
          <nav aria-label="FAQ categories" className="mb-12 flex flex-wrap gap-2">
            {faqCategories.map((c) => (
              <a key={c.name} href={`#${slugify(c.name)}`} className="pressable rounded-full border border-line px-4 py-2 text-sm text-muted hover:text-fg">{c.name}</a>
            ))}
          </nav>
          <div className="space-y-16">
            {faqCategories.map((c) => (
              <section key={c.name} id={slugify(c.name)} className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                <h2 className="text-2xl font-semibold">{c.name}</h2>
                <Accordion items={c.faqs} />
              </section>
            ))}
          </div>
          <p className="mt-16 text-muted">Comparing us with a video editing agency? See <Link href="/video-editing-agency" className="text-fg underline decoration-accent underline-offset-4">how our dedicated team of editors compares</Link>.</p>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
