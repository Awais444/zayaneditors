import { faqCategories } from "@/data/faqs";
import { pageMeta } from "@/lib/metadata";
import { faqPage } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
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
      <PageHero breadcrumbs={[{ name: "FAQ", href: "/faq" }]} eyebrow="FAQ" title="Questions, answered" sub="Pricing, turnaround, revisions, files and how we work — everything people ask before their first edit." />
      <section data-tl="Answers" data-tl-color="rgba(139,92,246,0.45)" className="section pt-0">
        <div className="container-x">
          <nav aria-label="FAQ categories" className="no-scrollbar sticky top-16 z-10 -mx-4 mb-12 flex gap-2 overflow-x-auto bg-bg/85 px-4 py-3 backdrop-blur-md md:top-18 md:mx-0 md:flex-wrap md:px-0">
            {faqCategories.map((c) => (
              <a key={c.name} href={`#${slugify(c.name)}`} className="pressable shrink-0 rounded-full border border-line bg-bg/80 px-4 py-2 text-sm text-muted backdrop-blur-md hover:border-accent hover:text-fg">{c.name}</a>
            ))}
          </nav>
          <div className="space-y-16">
            {faqCategories.map((c) => (
              <section key={c.name} id={slugify(c.name)} className="grid scroll-mt-40 gap-6 lg:grid-cols-[1fr_2fr]">
                <h2 className="text-2xl font-semibold lg:sticky lg:top-44 lg:self-start">{c.name}</h2>
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
