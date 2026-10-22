import Link from "next/link";
import { site } from "@/data/site";

// TODO: replace the text mark with the real logo (site.logo) once available
export function Logo() {
  return (
    <Link href="/" className="display flex items-center gap-2 text-lg font-bold tracking-tight" aria-label={`${site.name} home`}>
      <span className="grid size-8 place-items-center rounded-lg bg-accent text-accent-fg" aria-hidden>
        <svg viewBox="0 0 24 24" className="size-4 fill-current">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      {site.shortName}
    </Link>
  );
}
