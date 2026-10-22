import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const processSteps = [
  { title: "Upload footage", text: "Drop raw files in a shared Drive, Dropbox or Frame.io folder." },
  { title: "Brief & hook review", text: "A two-minute brief; we review your hook and flag pickups before cutting." },
  { title: "First cut in 48h", text: "Structured, paced edit with B-roll, text and music." },
  { title: "Revisions", text: "Time-coded notes, changes back within 24 hours." },
  { title: "Colour & sound", text: "Grade, audio cleanup, levelling and final mix." },
  { title: "Thumbnail & captions", text: "CTR-focused thumbnail options and accurate captions." },
  { title: "Deliver", text: "Upload-ready masters plus Shorts cut-downs if you want them." },
];

export function Process({ short = false }: { short?: boolean }) {
  const steps = short ? [processSteps[0], processSteps[2], processSteps[3], processSteps[6]] : processSteps;
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Process" title={short ? "How it works" : "From raw footage to upload in 7 steps"} />
        <ol className={`grid gap-4 sm:grid-cols-2 ${short ? "lg:grid-cols-4" : "lg:grid-cols-4 xl:grid-cols-7"}`}>
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.05} className="card h-full p-6">
                <span className="display text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
