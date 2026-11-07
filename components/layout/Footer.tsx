import Link from "next/link";
import { site, whatsappUrl } from "@/data/site";
import { getService } from "@/data/services";
import { countries } from "@/data/locations";
import { Logo } from "./Logo";

/** Top services only; the full list lives on /services. */
const topServices = [
  "youtube-video-editing",
  "short-form-video-editing",
  "podcast-video-editing",
  "video-ad-editing",
  "wedding-video-editing",
  "music-video-editing",
  "brand-film-editing",
  "corporate-video-editing",
];

const company = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Video Editing Agency", href: "/video-editing-agency" },
  { label: "Start a Project", href: "/contact" },
];

const resources = [
  { label: "Blog", href: "/blog" },
  { label: "Our Process", href: "/process" },
  { label: "Pricing Guide 2026", href: "/video-editing-pricing-guide" },
  { label: "Glossary", href: "/glossary" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
];

const socialLabels: Record<keyof typeof site.socials, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  fiverr: "Fiverr",
  upwork: "Upwork",
  behance: "Behance",
};

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-5 text-sm font-semibold">{title}</p>
      <ul className="space-y-3 text-sm text-muted">{children}</ul>
    </div>
  );
}

const item = (href: string, label: string) => (
  <li key={href}>
    <Link href={href} className="hover:text-fg">{label}</Link>
  </li>
);

export function Footer() {
  const socials = (Object.keys(site.socials) as (keyof typeof site.socials)[]).filter((k) => site.socials[k]);
  return (
    <footer className="relative border-t border-line bg-surface/40 pt-20 pb-[max(2.5rem,env(safe-area-inset-bottom))] md:pt-24">
      <div className="container-x">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{site.description}</p>
            {site.email && (
              <a href={`mailto:${site.email}`} className="mt-6 block text-sm font-medium hover:text-accent">{site.email}</a>
            )}
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-muted hover:text-fg">
              WhatsApp us →
            </a>
            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
                {socials.map((k) => (
                  <li key={k}><a href={site.socials[k]} target="_blank" rel="noopener noreferrer me" className="hover:text-fg">{socialLabels[k]}</a></li>
                ))}
              </ul>
            )}
          </div>
          <Column title="Services">
            {topServices.map((slug) => {
              const s = getService(slug);
              return s ? item(`/${slug}`, s.name) : null;
            })}
            <li><Link href="/services" className="font-semibold text-fg hover:text-accent">All services →</Link></li>
          </Column>
          <Column title="Company">{company.map((q) => item(q.href, q.label))}</Column>
          <Column title="Resources">{resources.map((q) => item(q.href, q.label))}</Column>
          <Column title="Locations">
            {countries.map((c) => item(`/locations/${c.slug}`, c.name))}
            <li><Link href="/locations" className="font-semibold text-fg hover:text-accent">All locations →</Link></li>
          </Column>
        </div>
        <div className="mt-20 flex flex-col gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <a href="/sitemap.xml" className="hover:text-fg">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
