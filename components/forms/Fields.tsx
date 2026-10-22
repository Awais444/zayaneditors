import { cn } from "@/lib/utils";

const input =
  "h-12 w-full rounded-xl border border-line bg-bg px-4 text-base outline-none transition-colors placeholder:text-muted/70 focus:border-white/40 aria-[invalid=true]:border-danger";

export function Field({
  label,
  name,
  error,
  textarea,
  optional,
  className,
  ...rest
}: {
  label: string;
  name: string;
  error?: string;
  textarea?: boolean;
  optional?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {textarea ? (
        <textarea id={id} name={name} rows={4} aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined} className={cn(input, "h-auto py-3")} {...rest} />
      ) : (
        <input id={id} name={name} aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined} className={input} {...rest} />
      )}
      {error && <p id={`${id}-e`} className="mt-1.5 text-sm text-danger">{error}</p>}
    </div>
  );
}

export function Chips({
  legend,
  options,
  value,
  onChange,
  multi,
  error,
}: {
  legend: string;
  options: readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
  multi?: boolean;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(multi ? (on ? value.filter((x) => x !== o) : [...value, o]) : [o])}
              className={cn("pressable min-h-11 rounded-full border px-4 text-sm font-medium", on ? "border-accent bg-accent-soft text-fg" : "border-line text-muted hover:border-white/30")}
            >
              {o}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-2 text-sm text-danger">{error}</p>}
    </fieldset>
  );
}

/** Off-screen honeypot. Real users never see or fill it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Company
        <input tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}
