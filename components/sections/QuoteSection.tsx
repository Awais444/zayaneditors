import { Mail, MessageCircle, CalendarDays } from "lucide-react";
import { site, whatsappUrl } from "@/data/site";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { CalendlyLink } from "./CalendlyLink";

export function QuoteSection({ service, title = "Get a quote in a few hours" }: { service?: string; title?: string }) {
  return (
    <section data-tl="Quote" data-tl-color="rgba(198,244,50,0.3)" className="section cv-auto" id="quote">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-4">Start here</p>
          <h2 className="h-section">{title}</h2>
          <p className="mt-5 text-lg text-muted">Tell us what you&apos;re making. We&apos;ll reply with a plan, price and turnaround — usually within two hours during business days.</p>
          <ul className="mt-8 space-y-3">
            <li>
              <WhatsAppLink href={whatsappUrl()} className="pressable card flex items-center gap-4 p-4 hover:border-white/20">
                <MessageCircle className="size-5 text-[#25D366]" aria-hidden />
                <span><span className="block font-semibold">Chat on WhatsApp</span><span className="text-sm text-muted">Fastest reply</span></span>
              </WhatsAppLink>
            </li>
            <li>
              <CalendlyLink className="pressable card flex items-center gap-4 p-4 hover:border-white/20">
                <CalendarDays className="size-5 text-accent" aria-hidden />
                <span><span className="block font-semibold">Book a 15-min call</span><span className="text-sm text-muted">Pick a time on Calendly</span></span>
              </CalendlyLink>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="pressable card flex items-center gap-4 p-4 hover:border-white/20">
                <Mail className="size-5 text-muted" aria-hidden />
                <span><span className="block font-semibold">{site.email}</span><span className="text-sm text-muted">Email us anytime</span></span>
              </a>
            </li>
          </ul>
        </div>
        <QuoteForm service={service} />
      </div>
    </section>
  );
}
