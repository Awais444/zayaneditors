import { SectionHeading } from "@/components/ui/SectionHeading";

/** Shared section header: eyebrow + title + optional intro. Same scale and spacing on every page. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  center,
  as = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return <SectionHeading eyebrow={eyebrow} title={title} sub={intro} center={center} as={as} />;
}
