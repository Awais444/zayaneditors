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
  | "free_trial_start";

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
