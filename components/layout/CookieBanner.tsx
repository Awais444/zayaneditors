"use client";
import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AI_REF_KEY, captureAiReferral, captureUtm } from "@/lib/analytics";

const KEY = "cookie-consent";
type Consent = "all" | "essential" | null;

const GA = process.env.NEXT_PUBLIC_GA_ID;
const TAWK = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const TAWK_WIDGET = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "default";

/** Essential-only by default. GA4 and Tawk.to load only after "Accept all". */
export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    captureUtm();
    captureAiReferral();
    try {
      setConsent(localStorage.getItem(KEY) as Consent);
    } catch {}
    setReady(true);
  }, []);

  const choose = (c: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    setConsent(c);
  };

  return (
    <>
      {consent === "all" && GA && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="lazyOnload" />
          <Script id="ga4" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}',{anonymize_ip:true});try{var r=sessionStorage.getItem('${AI_REF_KEY}');if(r){gtag('event','ai_referral',JSON.parse(r));sessionStorage.removeItem('${AI_REF_KEY}')}}catch(e){}`}
          </Script>
        </>
      )}
      {consent === "all" && TAWK && (
        <Script id="tawk" strategy="lazyOnload">
          {`var Tawk_API=Tawk_API||{};(function(){var s=document.createElement('script');s.async=true;s.src='https://embed.tawk.to/${TAWK}/${TAWK_WIDGET}';s.charset='UTF-8';s.setAttribute('crossorigin','*');document.body.appendChild(s);})();`}
        </Script>
      )}
      <AnimatePresence>
        {ready && !consent && (
          <motion.div
            role="dialog"
            aria-label="Cookie consent"
            className="chrome fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[75] mx-auto max-w-xl rounded-2xl border border-line p-5 shadow-2xl sm:left-6 sm:right-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            <p className="text-sm text-muted">
              We use essential cookies to run this site. With your permission we&apos;d also like to use analytics and live chat.{" "}
              <Link href="/privacy-policy" className="text-fg underline underline-offset-2">Privacy policy</Link>
            </p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => choose("essential")} className="pressable h-10 flex-1 rounded-full border border-line text-sm font-medium hover:bg-white/5">
                Essential only
              </button>
              <button onClick={() => choose("all")} className="pressable h-10 flex-1 rounded-full bg-accent text-sm font-semibold text-accent-fg">
                Accept all
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
