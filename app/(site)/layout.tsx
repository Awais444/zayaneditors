import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { MasterTimeline } from "@/components/motion/MasterTimeline";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Ambient gradient mesh (CSS only, composited) */}
      <div aria-hidden className="mesh-bg" />
      <SmoothScroll />
      <AnnouncementBar />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MasterTimeline />
    </>
  );
}
