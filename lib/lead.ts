import { z } from "zod";

export const videoTypes = ["Long-form YouTube", "Shorts / Reels / TikTok", "Podcast", "Ads / UGC", "Corporate", "Other"] as const;
export const budgets = ["Under $500/mo", "$500–1,000/mo", "$1,000–2,500/mo", "$2,500+/mo", "Per-video / not sure"] as const;
export const volumes = ["1–3", "4–8", "9–15", "16+"] as const;
export const lengths = ["Under 1 min", "1–10 min", "10–30 min", "30+ min"] as const;

const url = z.string().trim().max(500).url("Enter a full link starting with https://").or(z.literal(""));

export const leadSchema = z.object({
  kind: z.enum(["contact", "quote"]),
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  whatsapp: z.string().trim().max(30).optional().default(""),
  country: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().max(3000).optional().default(""),
  videoTypes: z.array(z.string().max(40)).max(10).optional().default([]),
  volume: z.string().max(20).optional().default(""),
  length: z.string().max(20).optional().default(""),
  budget: z.string().max(40).optional().default(""),
  footage: url.optional().default(""),
  references: z.string().trim().max(1000).optional().default(""),
  /** Honeypot — must stay empty */
  company: z.string().max(0).optional().default(""),
});

export type Lead = z.input<typeof leadSchema>;
export type LeadResult = { ok: true } | { ok: false; error: string; fields?: Record<string, string> };
