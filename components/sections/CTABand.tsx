import Image from "next/image";
import { team } from "@/data/team";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

export function CTABand({ title = "Ready to stop editing and start growing?" }: { title?: string }) {
  return (
    <section className="section pt-0">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 text-center md:px-16 md:py-24">
          <div className="glow -z-10 top-0 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2" />
          <div className="mb-8 flex justify-center -space-x-3">
            {team.slice(0, 5).map((m) => (
              <Image key={m.name} src={m.avatar} alt={m.name} width={52} height={52} className="size-13 rounded-full border-2 border-surface object-cover" />
            ))}
          </div>
          <h2 className="h-section mx-auto max-w-3xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">Send a few minutes of footage. Get a free sample edit back — no card, no obligation. {site.replyTime}.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Magnetic><Button href="/free-trial-edit" size="lg">Get a Free Trial Edit</Button></Magnetic>
            <Button href="/contact" size="lg" variant="outline">Start a Project</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
