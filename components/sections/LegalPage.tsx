import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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
      <section className="section pt-10">
        <div className="container-x max-w-3xl">
          <Breadcrumbs items={[{ name: title, href: path }]} />
          <h1 className="h-section">{title}</h1>
          <p className="text-muted mt-3 text-sm">Last updated: {updated}</p>
          <div className="prose-site mt-10">{children}</div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
