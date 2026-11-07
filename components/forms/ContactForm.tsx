"use client";
import { useState, useTransition } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Field, Chips, Honeypot } from "./Fields";
import { budgets, lengths, videoTypes, volumes, type Lead } from "@/lib/lead";
import { submitLead } from "@/app/actions/submit-lead";
import { track } from "@/lib/analytics";
import { site } from "@/data/site";

const steps = ["Video type", "Volume", "Budget", "Footage", "Your details"];

type State = Omit<Lead, "kind">;
const empty: State = { name: "", email: "", whatsapp: "", country: "", message: "", videoTypes: [], volume: "", length: "", budget: "", footage: "", references: "", company: "" };

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<State>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, start] = useTransition();
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();
  const set = <K extends keyof State>(k: K, v: State[K]) => setData((d) => ({ ...d, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0 && !data.videoTypes?.length) e.videoTypes = "Pick at least one";
    if (step === 1 && !data.volume) e.volume = "Choose a volume";
    if (step === 2 && !data.budget) e.budget = "Choose a range";
    if (step === 3 && data.footage && !/^https?:\/\//.test(data.footage)) e.footage = "Enter a full link starting with https://";
    if (step === 4) {
      if ((data.name || "").trim().length < 2) e.name = "Please enter your name";
      if (!/^\S+@\S+\.\S+$/.test(data.email || "")) e.email = "Enter a valid email";
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const go = (d: 1 | -1) => {
    if (d === 1 && !validate()) return;
    setDir(d);
    setStep((s) => s + d);
  };

  const submit = () => {
    if (!validate()) return;
    track("project_start");
    start(async () => {
      const res = await submitLead({ kind: "contact", ...data });
      if (res.ok) {
        track("generate_lead", { form: "contact", budget: data.budget });
        setDone(true);
      } else {
        setErrors(res.fields || {});
        toast.error(res.error);
      }
    });
  };

  if (done)
    return (
      <div className="card p-6 md:p-10">
        <CheckCircle2 className="size-10 text-accent" aria-hidden />
        <h2 className="display mt-4 text-3xl font-bold">Thanks, {data.name?.split(" ")[0]}! We&apos;re on it.</h2>
        <p className="mt-3 text-muted">You&apos;ll get a confirmation email now and a reply from us within a few hours. Want to skip the wait? Pick a time below.</p>
        <iframe
          src={`${site.calendly}?hide_gdpr_banner=1&background_color=15171b&text_color=f4f4f5&primary_color=c6f432&name=${encodeURIComponent(data.name || "")}&email=${encodeURIComponent(data.email || "")}`}
          title="Book an intro call"
          className="mt-8 h-[680px] w-full rounded-xl border border-line"
          loading="lazy"
          onLoad={() => track("calendly_open", { from: "contact_success" })}
        />
      </div>
    );

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -40 }),
  };

  return (
    <div className="card relative overflow-hidden p-6 md:p-8">
      <Honeypot value={data.company || ""} onChange={(v) => set("company", v)} />
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-medium">{steps[step]}</span>
          <span className="text-muted">Step {step + 1} of {steps.length}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1} aria-label="Form progress">
          <motion.div className="h-full origin-left rounded-full bg-accent" animate={{ scaleX: (step + 1) / steps.length }} transition={{ type: "spring", bounce: 0, duration: 0.4 }} />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", bounce: 0, duration: 0.3 }} className="min-h-[18rem] space-y-6">
          {step === 0 && <Chips legend="What kind of videos? (choose all that apply)" options={videoTypes} value={data.videoTypes || []} onChange={(v) => set("videoTypes", v)} multi error={errors.videoTypes} />}
          {step === 1 && (
            <>
              <Chips legend="Videos per month" options={volumes} value={data.volume ? [data.volume] : []} onChange={(v) => set("volume", v[0])} error={errors.volume} />
              <Chips legend="Typical final length" options={lengths} value={data.length ? [data.length] : []} onChange={(v) => set("length", v[0])} />
            </>
          )}
          {step === 2 && <Chips legend="Monthly budget range" options={budgets} value={data.budget ? [data.budget] : []} onChange={(v) => set("budget", v[0])} error={errors.budget} />}
          {step === 3 && (
            <>
              <Field label="Footage link (Google Drive / Dropbox)" name="footage" type="url" inputMode="url" optional placeholder="https://drive.google.com/…" value={data.footage} onChange={(e) => set("footage", e.target.value)} error={errors.footage} />
              <Field label="Reference videos you love" name="references" textarea optional placeholder="Paste YouTube links, one per line" value={data.references} onChange={(e) => set("references", e.target.value)} />
            </>
          )}
          {step === 4 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} error={errors.name} />
              <Field label="Email" name="email" type="email" inputMode="email" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} error={errors.email} />
              <Field label="WhatsApp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" optional value={data.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} />
              <Field label="Country" name="country" autoComplete="country-name" optional value={data.country} onChange={(e) => set("country", e.target.value)} />
              <Field className="sm:col-span-2" label="Anything else?" name="message" textarea optional value={data.message} onChange={(e) => set("message", e.target.value)} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <button type="button" onClick={() => go(-1)} className="pressable h-12 rounded-full border border-line px-6 font-medium hover:bg-white/5">Back</button>
        )}
        {step < steps.length - 1 ? (
          <button type="button" onClick={() => go(1)} className="pressable ml-auto h-12 rounded-full bg-accent px-8 font-semibold text-accent-fg">Continue</button>
        ) : (
          <button type="button" onClick={submit} disabled={pending} className="pressable ml-auto h-12 rounded-full bg-accent px-8 font-semibold text-accent-fg disabled:opacity-60">{pending ? "Sending…" : "Send project details"}</button>
        )}
      </div>
    </div>
  );
}
