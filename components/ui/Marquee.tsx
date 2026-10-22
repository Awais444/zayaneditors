export function Marquee({ items, label }: { items: string[]; label: string }) {
  const row = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <ul className="marquee-track flex w-max gap-14 py-2" aria-label={label}>
        {row.map((t, i) => (
          <li key={i} aria-hidden={i >= items.length} className="display text-2xl font-semibold whitespace-nowrap text-muted opacity-60 grayscale transition-opacity duration-300 hover:opacity-100 md:text-3xl">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
