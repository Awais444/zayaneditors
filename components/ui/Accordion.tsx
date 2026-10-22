import { Plus } from "lucide-react";

/** Native <details> accordion: accessible, works without JS, indexable answers. */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-medium [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" aria-hidden />
          </summary>
          <p className="pr-10 pb-6 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
