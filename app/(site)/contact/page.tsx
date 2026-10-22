import Image from "next/image";
import { CalendarDays, Clock, Mail, MessageCircle, Star } from "lucide-react";
import { site, whatsappUrl } from "@/data/site";
import { editors } from "@/data/team";
import { testimonials } from "@/data/testimonials";
import { pageMeta } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { CalendlyLink } from "@/components/sections/CalendlyLink";

export const metadata = pageMeta({
  title: "Start a Project | Hire a Video Editor",
  description:
    "Tell us about your videos and get a plan, price and turnaround within hours. Hire a YouTube video editor or a full editing team today.",
  path: "/contact",
});

const title = "Let's make your next video the best one yet";

export default function ContactPage() {
  const quote = testimonials[1];
  return (
    <section data-tl="Start" data-tl-color="rgba(198,244,50,0.35)" className="relative isolate overflow-hidden pb-24">
      <div aria-hidden className="glow -top-48 -left-40 -z-10 size-[36rem]" />
      <div aria-hidden className="glow top-1/3 -right-48 -z-10 size-[30rem] opacity-60" />
      <div className="container-x pt-10">
        <Breadcrumbs items={[{ name: "Start a Project", href: "/contact" }]} />
        <p className="mb-5 text-xs font-semibold tracking-[0.14em] text-accent uppercase">Start a project</p>
        <h1 className="max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.95] font-bold tracking-[-0.035em]">
          {title.split(" ").map((w, i) => (
            <span key={`${w}-${i}`} className="kinetic-word mr-[0.22em]" style={{ "--i": i } as React.CSSProperties}>{w}</span>
          ))}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">Five quick steps. We&apos;ll reply with a recommended plan, price and timeline.</p>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          {/* Multi-step form in a glass card */}
          <div className="rounded-[28px] border border-white/10 bg-surface/50 p-1.5 shadow-[0_40px_120px_-50px_rgba(198,244,50,0.3)] backdrop-blur-xl">
            <ContactForm />
          </div>

          <aside className="grid gap-4 lg:sticky lg:top-28">
            {/* Who replies */}
            <div className="card p-6">
              <div className="flex -space-x-3">
                {editors.slice(0, 5).map((e) => (
                  <Image key={e.slug} src={e.avatar} alt={e.name} width={48} height={48} className="size-12 rounded-full border-2 border-bg object-cover" />
                ))}
              </div>
              <p className="mt-4 font-semibold">Real editors read every brief</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" /><span className="relative inline-flex size-2 rounded-full bg-accent" /></span>
                <Clock className="size-4" aria-hidden /> {site.replyTime}
              </p>
            </div>

            <WhatsAppLink href={whatsappUrl()} className="pressable card flex items-center gap-4 p-5 hover:border-[#25D366]/50">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#25D366]/15"><MessageCircle className="size-5 text-[#25D366]" aria-hidden /></span>
              <span>
                <span className="block font-semibold">Chat on WhatsApp</span>
                <span className="text-sm text-muted">Fastest way to reach us</span>
              </span>
            </WhatsAppLink>

            <CalendlyLink className="pressable card flex items-center gap-4 p-5 hover:border-accent/50">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent/15"><CalendarDays className="size-5 text-accent" aria-hidden /></span>
              <span>
                <span className="block font-semibold">Book a 15-minute call</span>
                <span className="text-sm text-muted">Pick a slot on Calendly</span>
              </span>
            </CalendlyLink>

            <a href={`mailto:${site.email}`} className="pressable card flex items-center gap-4 p-5 hover:border-white/20">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/5"><Mail className="size-5 text-muted" aria-hidden /></span>
              <span>
                <span className="block font-semibold">{site.email}</span>
                <span className="text-sm text-muted">Email</span>
              </span>
            </a>

            {quote && (
              <figure className="card p-6">
                <div className="flex gap-0.5 text-accent" role="img" aria-label={`${quote.rating} out of 5 stars`}>
                  {Array.from({ length: quote.rating }, (_, i) => <Star key={i} className="size-4 fill-current" aria-hidden />)}
                </div>
                <blockquote className="mt-3">“{quote.quote}”</blockquote>
                <figcaption className="mt-3 text-sm text-muted">{quote.name} · {quote.role}</figcaption>
              </figure>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
