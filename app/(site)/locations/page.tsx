import Link from "next/link";
import { countries } from "@/data/locations";
import { pageMeta } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = pageMeta({
  title: "Locations We Serve | Remote Video Editing Worldwide",
  description:
    "Remote video editing for creators and brands in the USA, UK, Canada, Australia and UAE, with time-zone-friendly schedules and local pricing.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <section className="section pt-10">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Locations", href: "/locations" }]} />
          <SectionHeading
            as="h1"
            eyebrow="Locations"
            title="Remote editing, local hours"
            sub="We work with creators worldwide. These are the markets where we have the most clients."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {countries.map((c) => (
              <div key={c.slug} className="card p-7">
                <h2 className="text-2xl font-semibold">
                  <Link href={`/locations/${c.slug}`} className="hover:text-accent">
                    {c.name}
                  </Link>
                </h2>
                <ul className="text-muted mt-4 space-y-2 text-sm">
                  {c.states.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/locations/${c.slug}/${s.slug}`} className="hover:text-fg">
                        {s.name}
                      </Link>
                      {s.cities.map((city) => (
                        <span key={city.slug}>
                          {" "}
                          ·{" "}
                          <Link
                            href={`/locations/${c.slug}/${s.slug}/${city.slug}`}
                            className="hover:text-fg"
                          >
                            {city.name}
                          </Link>
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
