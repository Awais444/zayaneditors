import Link from "next/link";
import { glossary } from "@/data/glossary";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/metadata";
import { definedTermSet } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = pageMeta({
  title: `Video Editing Glossary: Terms Explained | ${site.shortName}`,
  description: "Plain-English definitions of common video editing terms: B-roll, jump cuts, punch-ins, colour grading, aspect ratios, VSLs, UGC ads, SRT files and more.",
  path: "/glossary",
});

export default function GlossaryPage() {
  const terms = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <>
      <JsonLd data={definedTermSet("Video editing glossary", "/glossary", terms)} />
      <PageHero breadcrumbs={[{ name: "Glossary", href: "/glossary" }]} eyebrow="Glossary" title="Video editing glossary" sub={`${terms.length} terms editors use, explained in plain English.`} />
      <section className="section pt-0">
        <div className="container-x">
          <dl className="mx-auto max-w-3xl divide-y divide-line">
            {terms.map((t) => (
              <div key={t.slug} id={t.slug} className="scroll-mt-28 py-5">
                <dt><h2 className="text-lg font-semibold">What does “{t.term}” mean?</h2></dt>
                <dd className="mt-2 text-muted">
                  {t.definition}
                  {t.link && <> <Link href={t.link} className="text-fg underline underline-offset-2">Learn more</Link></>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
