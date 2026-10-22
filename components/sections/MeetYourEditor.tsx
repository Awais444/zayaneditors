import Image from "next/image";
import Link from "next/link";
import { editors } from "@/data/team";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/ui/VideoCard";
import { Button } from "@/components/ui/Button";

/** Featured editor with reel, plus the rest of the editing team as quick links. */
export function MeetYourEditor() {
  const [lead, ...rest] = editors;
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Meet your editor" title="Real editors, not a faceless queue" sub="Every client gets a dedicated editor who learns their style, backed by specialists for colour, sound, motion and short-form." />
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <VideoCard video={lead.reel} title={`${lead.name}'s reel`} meta={lead.specialty} />
          <div>
            <div className="flex items-center gap-4">
              <Image src={lead.avatar} alt={lead.name} width={72} height={72} className="size-18 rounded-full object-cover" />
              <div>
                <h3 className="text-2xl font-semibold">{lead.name}</h3>
                <p className="text-sm text-muted">{lead.role}</p>
                <p className="mt-0.5 text-sm font-medium text-accent">{lead.specialty}</p>
              </div>
            </div>
            <p className="mt-5 text-muted">{lead.bio}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {rest.map((m) => (
                <li key={m.slug}>
                  <Link href={`/team#${m.slug}`} className="pressable card flex items-center gap-3 p-3 hover:border-white/20">
                    <Image src={m.avatar} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{m.name}</span>
                      <span className="block truncate text-xs text-muted">{m.specialty}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/team" variant="outline" className="mt-8">Meet the whole team</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
