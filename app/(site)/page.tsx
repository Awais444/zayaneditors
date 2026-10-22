import type { Metadata } from "next";
import { site } from "@/data/site";
import { homeFaqs } from "@/data/faqs";
import { verifiedTestimonials } from "@/data/testimonials";
import { getAllPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/metadata";
import { professionalService, videoObject } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee, Stats } from "@/components/sections/Stats";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { LazyBeforeAfter, LazyEditTimeline } from "@/components/sections/Lazy";
import { Results } from "@/components/sections/Results";
import { Testimonials } from "@/components/sections/Testimonials";
import { Process } from "@/components/sections/Process";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { FAQ } from "@/components/sections/FAQ";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { CTABand } from "@/components/sections/CTABand";
import { MeetYourEditor } from "@/components/sections/MeetYourEditor";

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
      <LogoMarquee />
      <Stats />
      <ServicesGrid />
      <ProblemSolution />
      <section className="section" id="work">
        <div className="container-x">
          <SectionHeading eyebrow="Featured work" title="Work across every format" />
          <WorkGrid limit={6} />
        </div>
      </section>
      <section className="section">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Before / after" title="Same footage. Different result." sub="Drag the divider to compare raw footage with the final edit — colour, sound, pacing and graphics." />
          <LazyBeforeAfter />
        </div>
      </section>
      <section className="section relative">
        <div className="glow top-0 right-0 size-[30rem]" />
        <div className="container-x">
          <SectionHeading eyebrow="Inside the edit" title="Scrub the edit" sub="Every layer has a job: hook titles, B-roll, sound hits and music drops placed where attention usually fades. Drag the playhead to see it." />
          <LazyEditTimeline />
        </div>
      </section>
      <MeetYourEditor />
      <Results />
      <Testimonials />
      <Process />
      <PricingPreview />
      <FAQ items={homeFaqs} />
      <BlogPreview posts={getAllPosts().slice(0, 3)} title="Editing advice" />
      <QuoteSection />
      <CTABand />
    </>
  );
}
