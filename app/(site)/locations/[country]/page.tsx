import { notFound } from "next/navigation";
import { countries, getCountry } from "@/data/locations";
import { pageMeta } from "@/lib/metadata";
import { ChildList, LocationTemplate } from "@/components/sections/LocationTemplate";

type Props = { params: Promise<{ country: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => countries.map((c) => ({ country: c.slug }));

export async function generateMetadata({ params }: Props) {
  const c = getCountry((await params).country);
  if (!c) return {};
  return pageMeta({ title: c.metaTitle, description: c.metaDescription, path: `/locations/${c.slug}` });
}

export default async function CountryPage({ params }: Props) {
  const c = getCountry((await params).country);
  if (!c) notFound();
  return (
    <LocationTemplate
      place={c}
      country={c}
      areaServed={[c.name]}
      crumbs={[{ name: "Locations", href: "/locations" }, { name: c.name, href: `/locations/${c.slug}` }]}
    >
      <ChildList title={`Regions we serve in ${c.name}`} items={c.states.map((s) => ({ name: s.name, href: `/locations/${c.slug}/${s.slug}`, text: s.intro }))} />
    </LocationTemplate>
  );
}
