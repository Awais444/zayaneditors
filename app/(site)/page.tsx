import type { Metadata } from "next";
import { site } from "@/data/site";
import { homeFaqs } from "@/data/faqs";
import { verifiedTestimonials } from "@/data/testimonials";
import { pageMeta } from "@/lib/metadata";
import { professionalService, videoObject } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { LazyBeforeAfter } from "@/components/sections/Lazy";
import { realBeforeAfter, realShowreel } from "@/data/real-media";
import { getHomeItems, verticalOf } from "@/data/portfolio";
import { LogoRows } from "@/components/home/LogoRows";
import { BentoServices } from "@/components/home/BentoServices";
import { PortfolioRail } from "@/components/home/PortfolioRail";
import { StatsBand } from "@/components/sections/StatsBand";
import { ProcessStack } from "@/components/home/ProcessStack";
import { TestimonialsMasonry } from "@/components/sections/TestimonialsMasonry";
import { PricingFeature } from "@/components/home/PricingFeature";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PopularServices } from "@/components/home/PopularServices";
import { AboutBrand } from "@/components/sections/AboutBrand";

export const metadata: Metadata = pageMeta({
  title: `Video Editing Services | Dedicated Editors | ${site.shortName}`,
  description: "Dedicated professional editors for every format: talking-head reels, YouTube, ads and podcasts. Not a faceless agency. First cut in 48h.",
  path: "/",
});

export default function Home() {
  // Home shows only Talking Head work (see HOME_CATEGORY); other pages keep every category
  const work = getHomeItems();
  const ctaClip = work[0] ? verticalOf(work[0]).src : undefined;
  const ba = realBeforeAfter(); // hidden until a real raw/final pair exists
  return (
    <>
      <JsonLd data={[professionalService(undefined, verifiedTestimonials), ...(realShowreel ? [videoObject({ ...realShowreel, title: "Showreel", duration: "PT1M30S", uploadDate: "2026-01-15", description: `${site.name} showreel` })] : [])]} />
      <Hero />
      <LogoRows />
      <BentoServices clips={work.slice(3, 5)} />
      <PopularServices />
      <PortfolioRail items={work} />
      {ba && (
      <section data-tl="Before/After" data-tl-color="rgba(248,113,113,0.4)" className="section">
        <div className="container-x">
          <p className="eyebrow mb-4">Before / after</p>
          <h2 className="h-section mb-10 max-w-3xl">Same footage. Different result.</h2>
        </div>
        <div className="mx-auto max-w-[96rem] px-4 md:px-8">
          <LazyBeforeAfter {...ba} />
        </div>
      </section>
      )}
      <StatsBand />
      <ProcessStack />
      <TestimonialsMasonry />
      <PricingFeature />
      <AboutBrand />
      <FAQAccordion items={homeFaqs} />
      <FinalCTA videoSrc={ctaClip} />
    </>
  );
}
