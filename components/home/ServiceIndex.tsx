import Link from "next/link";
import { serviceGroups, getService } from "@/data/services";

/** Server-rendered index of every service page, so Home links to all hubs without opening the menu. */
export function ServiceIndex() {
  return (
    <section data-tl="Services" data-tl-color="rgba(139,92,246,0.45)" className="section cv-auto pt-0">
      <div className="container-x">
        <p className="eyebrow mb-4">Every format</p>
        <h2 className="h-section mb-10 max-w-3xl">Which video editing service do you need?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {serviceGroups.map((g) => (
            <div key={g.name}>
              <h3 className="text-sm font-semibold text-fg">{g.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.slugs.map((slug) => {
                  const s = getService(slug);
                  return s ? (
                    <li key={slug}>
                      <Link href={`/${slug}`} className="inline-block rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-white/25 hover:text-fg">{s.name}</Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted">Not sure? <Link href="/services" className="text-fg underline underline-offset-2">Compare all services</Link> or see <Link href="/pricing" className="text-fg underline underline-offset-2">pricing</Link>.</p>
      </div>
    </section>
  );
}
