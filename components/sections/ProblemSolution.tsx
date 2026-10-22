import { Anchor, Gauge, Volume2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  { icon: Anchor, problem: "Weak hook", pain: "Viewers decide in seconds. A slow intro sends them back to the feed before your idea lands.", fix: "We restructure the opening to promise the payoff immediately — often pulling your best moment to the front." },
  { icon: Gauge, problem: "Slow pacing", pain: "Repeated points, dead air and long setups quietly drain retention minute by minute.", fix: "Tight cuts, pattern interrupts and B-roll timed to where your retention graph usually dips." },
  { icon: Volume2, problem: "Poor sound & visuals", pain: "Echoey audio and flat colour make good content feel amateur — viewers leave without knowing why.", fix: "Noise cleanup, levelling, music beds and a consistent grade on every upload." },
];

export function ProblemSolution() {
  return (
    <section className="section relative">
      <div className="glow top-1/3 -left-40 size-[30rem]" />
      <div className="container-x">
        <SectionHeading eyebrow="The problem" title="Why your videos lose viewers" sub="Great ideas don't fail on concept. They fail in the edit." />
        <div className="grid gap-5 md:grid-cols-3">
          {items.map(({ icon: Icon, problem, pain, fix }, i) => (
            <Reveal key={problem} delay={i * 0.08} className="card flex flex-col p-7">
              <Icon className="size-7 text-accent" aria-hidden />
              <h3 className="mt-5 text-2xl font-semibold">{problem}</h3>
              <p className="mt-3 text-muted">{pain}</p>
              <div className="mt-auto pt-6">
                <p className="border-t border-line pt-5 text-sm"><span className="font-semibold text-accent">Our fix: </span>{fix}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
