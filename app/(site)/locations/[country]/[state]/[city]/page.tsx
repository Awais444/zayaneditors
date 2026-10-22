import { notFound } from "next/navigation";
import { countries, getCity, getCountry, getState } from "@/data/locations";
import { pageMeta } from "@/lib/metadata";
import { LocationTemplate } from "@/components/sections/LocationTemplate";

type Props = { params: Promise<{ country: string; state: string; city: string }> };

export const dynamicParams = false;
export const generateStaticParams = () =>
  countries.flatMap((c) => c.states.flatMap((s) => s.cities.map((city) => ({ country: c.slug, state: s.slug, city: city.slug }))));

export async function generateMetadata({ params }: Props) {
  const { country, state, city } = await params;
  const x = getCity(country, state, city);
  if (!x) return {};
  return pageMeta({ title: x.metaTitle, description: x.metaDescription, path: `/locations/${country}/${state}/${x.slug}` });
}

export default async function CityPage({ params }: Props) {
  const { country, state, city } = await params;
  const c = getCountry(country);
  const s = getState(country, state);
  const x = getCity(country, state, city);
  if (!c || !s || !x) notFound();
  return (
    <LocationTemplate
      place={x}
      country={c}
      areaServed={[x.name, s.name, c.name]}
      crumbs={[
        { name: "Locations", href: "/locations" },
        { name: c.name, href: `/locations/${c.slug}` },
        { name: s.name, href: `/locations/${c.slug}/${s.slug}` },
        { name: x.name, href: `/locations/${c.slug}/${s.slug}/${x.slug}` },
      ]}
    />
  );
}
