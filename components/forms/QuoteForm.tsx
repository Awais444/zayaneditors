"use client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Field, Chips, Honeypot } from "./Fields";
import { videoTypes } from "@/lib/lead";
import { submitLead } from "@/app/actions/submit-lead";
import { track } from "@/lib/analytics";

/** Short quote form for home and service pages. */
export function QuoteForm({ service }: { service?: string }) {
  const [pending, start] = useTransition();
  const [types, setTypes] = useState<string[]>([]);
  const [hp, setHp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    start(async () => {
      const res = await submitLead({
        kind: "quote",
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        message: `${service ? `[${service}] ` : ""}${fd.get("message") || ""}`,
        videoTypes: types,
        company: hp,
      });
      if (res.ok) {
        track("generate_lead", { form: "quote", service });
        setDone(true);
        toast.success("Thanks! We'll reply within a few hours.");
      } else {
        setErrors(res.fields || {});
        toast.error(res.error);
      }
    });
  };

  if (done)
    return (
      <div className="card p-8 text-center">
        <p className="display text-3xl font-bold">Got it — talk soon.</p>
        <p className="mt-3 text-muted">Check your inbox for a confirmation. We usually reply within a few hours.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="card relative space-y-5 p-6 md:p-8" noValidate>
      <Honeypot value={hp} onChange={setHp} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required error={errors.name} />
        <Field label="Email" name="email" type="email" autoComplete="email" inputMode="email" required error={errors.email} />
      </div>
      <Chips legend="What do you need edited?" options={videoTypes} value={types} onChange={setTypes} multi />
      <Field label="Tell us about your project" name="message" textarea optional placeholder="Channel link, how many videos, deadlines…" />
      <button type="submit" disabled={pending} className="pressable h-13 w-full rounded-full bg-accent font-semibold text-accent-fg disabled:opacity-60">
        {pending ? "Sending…" : "Get my quote"}
      </button>
    </form>
  );
}
