import type { Metadata } from "next";
import { site } from "@/data/site";
import { homeFaqs } from "@/data/faqs";
import { verifiedTestimonials } from "@/data/testimonials";
import { pageMeta } from "@/lib/metadata";
import { professionalService, videoObject } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { LazyBeforeAfter } from "@/components/sections/Lazy";
import { LogoRows } from "@/components/home/LogoRows";
import { BentoServices } from "@/components/home/BentoServices";
import { PortfolioRail } from "@/components/home/PortfolioRail";
import { StatsBand } from "@/components/home/StatsBand";
import { ProcessStack } from "@/components/home/ProcessStack";
import { TestimonialsMasonry } from "@/components/home/TestimonialsMasonry";
import { PricingFeature } from "@/components/home/PricingFeature";
import { FaqSpring } from "@/components/home/FaqSpring";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = pageMeta({
  title: `Video Editing Services by a Dedicated Team of Editors | ${site.shortName}`,
  description: "Not a faceless video editing agency: a dedicated team of professional editors for YouTube, ads, weddings, podcasts and more. First cut in 48h, free trial.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={[professionalService(undefined, verifiedTestimonials), videoObject({ ...site.showreel, description: `${site.name} showreel` })]} />
      <Hero />
      <LogoRows />
      <BentoServices />
      <PortfolioRail />
      <section data-tl="Before/After" data-tl-color="rgba(248,113,113,0.4)" className="section">
        <div className="container-x">
          <p className="eyebrow mb-4">Before / after</p>
          <h2 className="h-section mb-10 max-w-3xl">Same footage. Different result.</h2>
        </div>
        <div className="mx-auto max-w-[96rem] px-4 md:px-8">
          <LazyBeforeAfter />
        </div>
      </section>
      <StatsBand />
      <ProcessStack />
      <TestimonialsMasonry />
      <PricingFeature />
      <FaqSpring items={homeFaqs} />
      <FinalCta />
    </>
  );
}
