import { site, whatsappUrl } from "@/data/site";
import { WhatsAppLink } from "./WhatsAppLink";

export function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-surface text-[13px] text-muted">
      <div className="container-x flex min-h-9 flex-wrap items-center justify-center gap-x-4 gap-y-1 py-1.5 text-center">
        <span>{site.offerLine}</span>
        <WhatsAppLink href={whatsappUrl()} className="font-semibold text-fg hover:text-accent">
          Chat on WhatsApp →
        </WhatsAppLink>
      </div>
    </div>
  );
}
