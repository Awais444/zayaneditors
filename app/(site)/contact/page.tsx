import { CalendarDays, Mail, MessageCircle } from "lucide-react";
import { site, whatsappUrl } from "@/data/site";
import { pageMeta } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { CalendlyLink } from "@/components/sections/CalendlyLink";

export const metadata = pageMeta({
  title: "Start a Project | Hire a Video Editor",
  description: "Tell us about your videos and get a plan, price and turnaround within hours. Hire a YouTube video editor or a full editing team today.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="section relative pt-10">
      <div className="glow -top-40 -left-40 size-[32rem]" />
      <div className="container-x">
        <Breadcrumbs items={[{ name: "Start a Project", href: "/contact" }]} />
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="eyebrow mb-4">Start a project</p>
            <h1 className="h-display text-[clamp(2.25rem,5vw,4rem)] font-bold">Let&apos;s make your next video the best one yet</h1>
            <p className="mt-6 text-lg text-muted">Five quick steps. We&apos;ll reply with a recommended plan, price and timeline — {site.replyTime.toLowerCase()}.</p>
            <ul className="mt-10 space-y-3">
              <li>
                <WhatsAppLink href={whatsappUrl()} className="pressable card flex items-center gap-4 p-4 hover:border-white/20">
                  <MessageCircle className="size-5 text-[#25D366]" aria-hidden />
                  <span><span className="block font-semibold">WhatsApp</span><span className="text-sm text-muted">Fastest way to reach us</span></span>
                </WhatsAppLink>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="pressable card flex items-center gap-4 p-4 hover:border-white/20">
                  <Mail className="size-5 text-muted" aria-hidden />
                  <span><span className="block font-semibold">{site.email}</span><span className="text-sm text-muted">Email</span></span>
                </a>
              </li>
              <li>
                <CalendlyLink className="pressable card flex items-center gap-4 p-4 hover:border-white/20">
                  <CalendarDays className="size-5 text-accent" aria-hidden />
                  <span><span className="block font-semibold">Book a call</span><span className="text-sm text-muted">15 minutes on Calendly</span></span>
                </CalendlyLink>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
