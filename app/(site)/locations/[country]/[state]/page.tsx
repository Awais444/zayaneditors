import { notFound } from "next/navigation";
import { countries, getCountry, getState } from "@/data/locations";
import { pageMeta } from "@/lib/metadata";
import { ChildList, LocationTemplate } from "@/components/sections/LocationTemplate";

type Props = { params: Promise<{ country: string; state: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => countries.flatMap((c) => c.states.map((s) => ({ country: c.slug, state: s.slug })));

export async function generateMetadata({ params }: Props) {
  const { country, state } = await params;
  const s = getState(country, state);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/locations/${country}/${s.slug}` });
}

export default async function StatePage({ params }: Props) {
  const { country, state } = await params;
  const c = getCountry(country);
  const s = getState(country, state);
  if (!c || !s) notFound();
  const base = `/locations/${c.slug}/${s.slug}`;
  return (
    <LocationTemplate
      place={s}
      country={c}
      areaServed={[s.name, c.name]}
      crumbs={[{ name: "Locations", href: "/locations" }, { name: c.name, href: `/locations/${c.slug}` }, { name: s.name, href: base }]}
    >
      <ChildList title={`Cities we serve in ${s.name}`} items={s.cities.map((city) => ({ name: city.name, href: `${base}/${city.slug}`, text: city.intro }))} />
    </LocationTemplate>
  );
}
