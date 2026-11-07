"use client";

type GtagFn = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export type LeadEvent =
  | "generate_lead"
  | "whatsapp_click"
  | "calendly_open"
  | "pricing_toggle"
  | "video_play"
  | "project_start"
  | "ai_referral";

/** Fires a GA4 event. No-op until consent has loaded gtag. */
export const track = (event: LeadEvent, params: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
export const UTM_COOKIE = "utm_params";

/** Stores UTM params from the URL in a 30-day first-party cookie (first touch wins). */
export const captureUtm = () => {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) utm[k] = v.slice(0, 100);
  });
  if (!Object.keys(utm).length || document.cookie.includes(`${UTM_COOKIE}=`)) return;
  document.cookie = `${UTM_COOKIE}=${encodeURIComponent(JSON.stringify(utm))}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
};

/** AI assistants and answer engines whose referrals we report as "AI Search". */
export const AI_REFERRERS: Record<string, string> = {
  "chatgpt.com": "chatgpt",
  "chat.openai.com": "chatgpt",
  "perplexity.ai": "perplexity",
  "gemini.google.com": "gemini",
  "copilot.microsoft.com": "copilot",
  "claude.ai": "claude",
};
export const AI_REF_KEY = "ai_ref";

/**
 * Remembers an AI-assistant referral (from document.referrer or utm_source) for this session.
 * The GA4 snippet sends it as an `ai_referral` event once analytics consent has loaded gtag.
 */
export const captureAiReferral = () => {
  if (typeof window === "undefined") return;
  let host = "";
  try {
    host = document.referrer ? new URL(document.referrer).hostname.replace(/^www./, "") : "";
  } catch {}
  const utm = new URLSearchParams(window.location.search).get("utm_source")?.toLowerCase() ?? "";
  const match = Object.entries(AI_REFERRERS).find(([d]) => host === d || host.endsWith(`.${d}`) || utm.includes(d.split(".")[0]));
  if (!match) return;
  try {
    sessionStorage.setItem(AI_REF_KEY, JSON.stringify({ ai_source: match[1], referrer: host || utm, landing_page: window.location.pathname }));
  } catch {}
};
