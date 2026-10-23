import Link from "next/link";
import { processSteps } from "@/data/process";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { QuickAnswer } from "@/components/seo/QuickAnswer";

export const metadata = pageMeta({
  title: `Our Video Editing Process, Step by Step | ${site.shortName}`,
  description: "How a video goes from raw footage to final masters with our editors: upload, brief, first cut in 48 hours, revisions, colour and sound, captions, delivery.",
  path: "/process",
});

const answer = `Working with ${site.name} takes ${processSteps.length} steps: you upload raw footage to a shared folder, give a short brief, and receive a first cut in ${site.turnaround}. You leave time-coded notes for revisions, then we finish colour, sound, thumbnails and captions and deliver upload-ready masters in every format you need.`;

const faqs = [
  { q: "How long does the whole process take?", a: `A first cut usually arrives within ${site.turnaround} of the brief, and revisions come back within 24 hours.` },
  { q: "How do I send footage?", a: "Through a shared Google Drive, Dropbox, Frame.io or WeTransfer folder. Send original files, not copies from messaging apps." },
  { q: "How do I give feedback?", a: "With time-coded comments on a review link or in a shared doc. Every note is tracked until it is done." },
  { q: "How many revisions are included?", a: "Two rounds on most plans; small text or timing fixes after final delivery are free." },
  { q: "Do I get the project files?", a: "Yes, on request, along with final masters in every aspect ratio you need." },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero breadcrumbs={[{ name: "Process", href: "/process" }]} eyebrow="Process" title="Our video editing process" sub="From raw footage to final masters in seven clear steps, with one editor who knows your style." />
      <QuickAnswer question="How does working with our editors work?" answer={answer} />
      <section className="section">
        <div className="container-x">
          <ol className="mx-auto max-w-3xl space-y-6">
            {processSteps.map((s, i) => (
              <li key={s.title} className="card p-6">
                <h2 className="text-xl font-semibold"><span className="mr-2 text-accent">{String(i + 1).padStart(2, "0")}</span>{s.title}</h2>
                <p className="mt-2 text-muted">{s.text}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{s.bullets?.map((b) => <li key={b}>{b}</li>)}</ul>
                <p className="mt-3 text-sm"><span className="text-muted">Timing:</span> {s.duration} · <span className="text-muted">You receive:</span> {s.deliverable}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-3xl text-muted">Preparing footage? Read <Link href="/blog/how-to-send-raw-footage-to-video-editor" className="text-fg underline underline-offset-2">how to send raw footage to a video editor</Link>, compare <Link href="/pricing" className="text-fg underline underline-offset-2">pricing</Link>, or <Link href="/contact" className="text-fg underline underline-offset-2">start a project</Link>.</p>
        </div>
      </section>
      <FAQAccordion items={faqs} title="Process FAQs" />
      <FinalCTA />
    </>
  );
}
