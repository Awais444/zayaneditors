/** Key facts as a definition list: easy for people to scan and for crawlers to extract. */
export function KeyFacts({ title, facts }: { title: string; facts: { label: string; value: string }[] }) {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
        {facts.map((f) => (
          <div key={f.label} className="border-t border-line pt-3">
            <dt className="text-muted">{f.label}</dt>
            <dd className="mt-0.5 font-medium text-fg">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
