"use client";
import { track } from "@/lib/analytics";

/** External WhatsApp link that fires the whatsapp_click event. */
export function WhatsAppLink({ href, className, children, label }: { href: string; className?: string; children: React.ReactNode; label?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className} onClick={() => track("whatsapp_click", { page: location.pathname })}>
      {children}
    </a>
  );
}
