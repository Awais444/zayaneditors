import { pageMeta } from "@/lib/metadata";
import { caseStudies } from "@/data/portfolio";
import { homeFaqs } from "@/data/faqs";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioMasonry } from "@/components/sections/PortfolioMasonry";
import { StatsBand } from "@/components/sections/StatsBand";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = pageMeta({
  title: "Video Editing Portfolio & Case Studies",
  description: "Browse our video editing portfolio: long-form YouTube, Shorts, podcasts and ads, with case studies showing views, retention and CTR results.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Portfolio", href: "/portfolio" }]}
        eyebrow="Portfolio"
        title="OUR WORK"
        sub={`${caseStudies.length} projects across YouTube, social, ads, weddings, music and podcasts. Hover to preview, click to watch, read the case study for the numbers.`}
      />
      <section data-tl="Work" data-tl-color="rgba(56,189,248,0.4)" className="section pt-0">
        <div className="container-x">
          <h2 className="sr-only">Projects</h2>
          <PortfolioMasonry />
        </div>
      </section>
      <StatsBand />
      <FAQAccordion items={homeFaqs.slice(5, 10)} title="Portfolio FAQs" />
      <FinalCTA />
    </>
  );
}
