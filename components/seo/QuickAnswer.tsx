/** A 40–60 word direct answer near the top of the page, written to be quoted by answer engines. */
export function QuickAnswer({ question, answer, className = "container-x" }: { question: string; answer: string; className?: string }) {
  return (
    <section aria-label="Quick answer" className={className}>
      <div className="card mx-auto max-w-3xl border-l-2 border-l-accent p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Quick answer</p>
        <h2 className="mt-2 text-base font-semibold text-fg">{question}</h2>
        <p className="mt-2 text-muted" data-quick-answer>{answer}</p>
      </div>
    </section>
  );
}
