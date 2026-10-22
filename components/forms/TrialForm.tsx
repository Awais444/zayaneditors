"use client";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Field, Chips, Honeypot } from "./Fields";
import { videoTypes } from "@/lib/lead";
import { submitLead } from "@/app/actions/submit-lead";
import { track } from "@/lib/analytics";

export function TrialForm() {
  const [pending, start] = useTransition();
  const [types, setTypes] = useState<string[]>([]);
  const [hp, setHp] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const started = useRef(false);

  const onFocus = () => {
    if (started.current) return;
    started.current = true;
    track("free_trial_start");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    start(async () => {
      const res = await submitLead({
        kind: "trial",
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        footage: String(fd.get("footage") || ""),
        message: String(fd.get("message") || ""),
        videoTypes: types,
        company: hp,
      });
      if (res.ok) {
        track("generate_lead", { form: "trial" });
        setDone(true);
      } else {
        setErrors(res.fields || {});
        toast.error(res.error);
      }
    });
  };

  if (done)
    return (
      <div className="card p-8">
        <CheckCircle2 className="size-10 text-accent" aria-hidden />
        <p className="display mt-4 text-3xl font-bold">Footage received!</p>
        <p className="mt-3 text-muted">Your free sample edit will land in your inbox within 48 hours. We&apos;ll email if we have any questions.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} onFocus={onFocus} className="card relative space-y-5 p-6 md:p-8" noValidate>
      <Honeypot value={hp} onChange={setHp} />
      <Field label="Name" name="name" autoComplete="name" required error={errors.name} />
      <Field label="Email" name="email" type="email" inputMode="email" autoComplete="email" required error={errors.email} />
      <Field label="Footage link (Drive / Dropbox / WeTransfer)" name="footage" type="url" inputMode="url" required placeholder="https://" error={errors.footage} />
      <Chips legend="Type of edit" options={videoTypes} value={types} onChange={setTypes} multi />
      <Field label="Notes or a reference video" name="message" textarea optional />
      <button type="submit" disabled={pending} className="pressable h-13 w-full rounded-full bg-accent font-semibold text-accent-fg disabled:opacity-60">
        {pending ? "Sending…" : "Send footage for my free edit"}
      </button>
      <p className="text-center text-xs text-muted">No card. No obligation. 30–60 second sample in 48 hours.</p>
    </form>
  );
}
