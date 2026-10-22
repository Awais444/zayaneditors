import { showreel } from "@/data/real-media";
import Link from "next/link";
import { Check, Clock, CreditCard, Film } from "lucide-react";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/metadata";
import { Logo } from "@/components/layout/Logo";
import { TrialForm } from "@/components/forms/TrialForm";
import { VideoFacade } from "@/components/ui/VideoFacade";
import { Accordion } from "@/components/ui/Accordion";

export const metadata = pageMeta({
  title: "Free Trial Video Edit | 30–60s Sample in 48h",
  description: "Send us your raw footage and get a free 30–60 second sample edit in 48 hours. No card, no obligation — judge our style on your own content.",
  path: "/free-trial-edit",
});

const faqs = [
  { q: "Is it really free?", a: "Yes. No card and no obligation. We do it because most people who see their own footage edited well decide to keep working with us." },
  { q: "What should I send?", a: "3–10 minutes of raw footage from a recent video, plus a reference video you like if you have one." },
  { q: "Do I own the sample?", a: "Yes, you can post it wherever you like." },
];

/** Focused landing page: no main navigation, one offer, one form. */
export default function FreeTrialPage() {
  return (
    <main id="main" className="relative min-h-dvh overflow-hidden">
      <div aria-hidden className="mesh-bg" />
      <div className="glow -top-60 left-1/2 size-[44rem] -translate-x-1/2" />
      <header className="container-x flex h-18 items-center justify-between">
        <Logo />
        <Link href="/" className="text-sm text-muted hover:text-fg">Back to site</Link>
      </header>
      <section className="container-x grid gap-12 pt-8 pb-20 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
        <div>
          <p className="eyebrow mb-4">Free trial edit</p>
          <h1 className="h-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-bold">See your footage edited by pros — free.</h1>
          <p className="mt-6 text-lg text-muted">Send a link to your raw footage. Within {site.turnaround} you&apos;ll get a 30–60 second sample edit with our hooks, pacing, captions and sound — so you can judge us on your own content.</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Clock, t: `Back in ${site.turnaround}` },
              { icon: CreditCard, t: "No card required" },
              { icon: Film, t: "30–60s sample" },
            ].map(({ icon: Icon, t }) => (
              <li key={t} className="card flex items-center gap-3 p-4 text-sm font-medium"><Icon className="size-5 text-accent" aria-hidden />{t}</li>
            ))}
          </ul>
          <VideoFacade video={{ ...showreel, title: "Showreel" }} className="mt-10" />
          <ul className="mt-8 space-y-2 text-sm text-muted">
            {["Hook restructure", "Captions & motion text", "Music & sound design", "Colour correction"].map((x) => (
              <li key={x} className="flex gap-2"><Check className="size-4 text-accent" aria-hidden />{x}</li>
            ))}
          </ul>
        </div>
        <div className="lg:sticky lg:top-8 lg:self-start">
          <TrialForm />
          <div className="mt-10"><Accordion items={faqs} /></div>
        </div>
      </section>
    </main>
  );
}
