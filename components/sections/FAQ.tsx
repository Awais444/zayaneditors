import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPage } from "@/lib/schema";

export function FAQ({ items, title = "Frequently asked questions", schema = true }: { items: { q: string; a: string }[]; title?: string; schema?: boolean }) {
  return (
    <section className="section">
      {schema && <JsonLd data={faqPage(items)} />}
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow="FAQ" title={title} />
        <Accordion items={items} />
      </div>
    </section>
  );
}
