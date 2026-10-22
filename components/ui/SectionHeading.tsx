import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center,
  as: H = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cn("mb-10 max-w-3xl md:mb-14", center && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <H className={H === "h1" ? "h-display" : "h-section"}>{title}</H>
      {sub && <p className="mt-5 text-lg text-muted">{sub}</p>}
    </Reveal>
  );
}
