import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { MasterTimeline } from "@/components/motion/MasterTimeline";
import { serviceGroups, getService } from "@/data/services";

const navGroups = serviceGroups.map((g) => ({ name: g.name, items: g.slugs.map((slug) => ({ slug, name: getService(slug)!.name })) }));

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Ambient gradient mesh (CSS only, composited) */}
      <div aria-hidden className="mesh-bg" />
      <SmoothScroll />
      <AnnouncementBar />
      <Header groups={navGroups} />
      <main id="main" className="lg:pb-8">{children}</main>
      <Footer />
      <MasterTimeline />
    </>
  );
}
