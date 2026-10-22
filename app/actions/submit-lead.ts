"use server";
import { cookies, headers } from "next/headers";
import { Resend } from "resend";
import { leadSchema, type Lead, type LeadResult } from "@/lib/lead";
import { site } from "@/data/site";

// Simple in-memory rate limit (per server instance). For multi-region scale, swap for Upstash/Vercel KV.
const hits = new Map<string, number[]>();
const LIMIT = 5;
const WINDOW = 10 * 60 * 1000;

const rateLimited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
};

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function submitLead(input: Lead): Promise<LeadResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    parsed.error.issues.forEach((i) => (fields[String(i.path[0])] = i.message));
    // Honeypot filled → pretend success so bots learn nothing
    if (fields.company) return { ok: true };
    return { ok: false, error: "Please check the highlighted fields.", fields };
  }
  const lead = parsed.data;

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { ok: false, error: "Too many submissions. Please try again in a few minutes or message us on WhatsApp." };

  let utm: Record<string, string> = {};
  try {
    const raw = (await cookies()).get("utm_params")?.value;
    if (raw) utm = JSON.parse(decodeURIComponent(raw));
  } catch {}

  const rows: [string, string][] = [
    ["Form", lead.kind],
    ["Name", lead.name],
    ["Email", lead.email],
    ["WhatsApp", lead.whatsapp],
    ["Country", lead.country],
    ["Video types", lead.videoTypes.join(", ")],
    ["Videos / month", lead.volume],
    ["Typical length", lead.length],
    ["Budget", lead.budget],
    ["Footage", lead.footage],
    ["References", lead.references],
    ["Message", lead.message],
    ...Object.entries(utm).map(([k, v]) => [k, v] as [string, string]),
  ];
  const html = `<h2>New ${esc(lead.kind)} lead</h2><table cellpadding="6">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
    .join("")}</table>`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[lead] RESEND_API_KEY missing — lead not emailed:", rows);
    return { ok: true };
  }

  try {
    const resend = new Resend(key);
    const from = process.env.LEAD_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`;
    const to = process.env.LEAD_TO_EMAIL || site.email;
    await resend.emails.send({ from, to, replyTo: lead.email, subject: `New ${lead.kind} lead: ${lead.name}`, html });
    await resend.emails.send({
      from,
      to: lead.email,
      subject: `We got your request — ${site.name}`,
      html: `<p>Hi ${esc(lead.name.split(" ")[0])},</p><p>Thanks for reaching out! We've received your ${lead.kind === "trial" ? "free trial edit request" : "project details"} and will reply within a few hours.</p><p>Want to talk sooner? <a href="${site.calendly}">Book a call</a> or <a href="https://wa.me/${site.whatsapp}">message us on WhatsApp</a>.</p><p>— ${site.owner.name}, ${site.name}</p>`,
    });
    return { ok: true };
  } catch (e) {
    console.error("[lead] send failed", e);
    return { ok: false, error: "Something went wrong sending your message. Please email or WhatsApp us instead." };
  }
}
