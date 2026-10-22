"use client";
import { site } from "@/data/site";
import { track } from "@/lib/analytics";

export function CalendlyLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a href={site.calendly} target="_blank" rel="noopener noreferrer" className={className} onClick={() => track("calendly_open", { page: location.pathname })}>
      {children}
    </a>
  );
}
