import Link from "next/link";
import { site, whatsappUrl } from "@/data/site";
import { serviceCategories, servicesByCategory } from "@/data/services";
import { countries } from "@/data/locations";
import { Logo } from "./Logo";

const quick = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Trial Edit", href: "/free-trial-edit" },
  { label: "Start a Project", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "FAQ", href: "/faq" },
  { label: "Video Editing Agency", href: "/video-editing-agency" },
];

const socialLabels: Record<keyof typeof site.socials, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  fiverr: "Fiverr",
  upwork: "Upwork",
  behance: "Behance",
};

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface/40 pt-16 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="container-x">
        <div className="grid gap-10 xl:grid-cols-[1fr_4fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">{site.description}</p>
            <a href={`mailto:${site.email}`} className="mt-5 block text-sm font-medium hover:text-accent">
              {site.email}
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm text-muted hover:text-fg">
              WhatsApp us →
            </a>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
              {(Object.keys(site.socials) as (keyof typeof site.socials)[]).map((k) => (
                <li key={k}>
                  <a href={site.socials[k]} target="_blank" rel="noopener noreferrer me" className="hover:text-fg">
                    {socialLabels[k]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Site directory: every service, grouped (internal-link hub) */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {serviceCategories.map((cat) => (
              <div key={cat}>
                <p className="mb-3 text-sm font-semibold">{cat}</p>
                <ul className="space-y-2 text-sm text-muted">
                  {servicesByCategory(cat).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/${s.slug}`} className="hover:text-fg">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="mb-3 text-sm font-semibold">Company</p>
              <ul className="space-y-2 text-sm text-muted">
                {quick.map((q) => (
                  <li key={q.href}>
                    <Link href={q.href} className="hover:text-fg">
                      {q.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 mb-3 text-sm font-semibold">Locations</p>
              <ul className="space-y-2 text-sm text-muted">
                {countries.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/locations/${c.slug}`} className="hover:text-fg">
                      {c.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/locations" className="hover:text-fg">
                    All locations
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-5">
            <li><Link href="/privacy-policy" className="hover:text-fg">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-fg">Terms</Link></li>
            <li><a href="/sitemap.xml" className="hover:text-fg">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
