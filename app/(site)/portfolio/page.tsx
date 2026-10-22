import { pageMeta } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { CTABand } from "@/components/sections/CTABand";

export const metadata = pageMeta({
  title: "Video Editing Portfolio & Case Studies",
  description: "Browse our video editing portfolio: long-form YouTube, Shorts, podcasts and ads, with case studies showing views, retention and CTR results.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <section className="section pt-10">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Portfolio", href: "/portfolio" }]} />
          <SectionHeading as="h1" eyebrow="Portfolio" title="Work that moved the numbers" sub="Filter by format or search by niche. Click any project for the full case study." />
          <WorkGrid search />
        </div>
      </section>
      <CTABand />
    </>
  );
}
