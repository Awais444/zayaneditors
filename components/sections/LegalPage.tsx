import { PageHero } from "./PageHero";
import { FinalCTA } from "./FinalCTA";

export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero breadcrumbs={[{ name: title, href: path }]} eyebrow="Legal" title={title} sub={<p className="text-sm">Last updated: {updated}</p>} />
      <section data-tl="Terms" data-tl-color="rgba(244,244,245,0.2)" className="section pt-0">
        <div className="container-x">
          <div className="prose-site mx-auto max-w-3xl rounded-3xl border border-line bg-surface/40 p-6 md:p-12">{children}</div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
