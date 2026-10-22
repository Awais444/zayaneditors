import Link from "next/link";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMeta({ title: "Privacy Policy", description: `How ${site.name} collects, uses and protects your personal data.`, path: "/privacy-policy" });

// TODO: have this reviewed by a lawyer for your jurisdiction (GDPR/UK GDPR/CCPA as applicable).
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="October 2026">
      <p>This policy explains how {site.name} (&quot;we&quot;, &quot;us&quot;) handles personal data when you visit this website or use our services.</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Information you give us</strong> — name, email, WhatsApp number, country, project details and links you submit through our forms.</li>
        <li><strong>Footage and files</strong> — content you share with us for editing, accessed via the links you provide.</li>
        <li><strong>Usage data</strong> — only if you accept analytics cookies, we use Google Analytics 4 to understand how the site is used. Anonymous, cookieless performance metrics may be collected by our host (Vercel).</li>
        <li><strong>Campaign data</strong> — UTM parameters from the link you arrived on, stored in a first-party cookie for 30 days and attached to enquiries.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To reply to enquiries, deliver and invoice our services, improve the website, and — with consent — run live chat (Tawk.to) and analytics. We do not sell personal data.</p>
      <h2>Cookies</h2>
      <p>Essential cookies keep the site working and remember your consent choice. Analytics and chat cookies load only after you click &quot;Accept all&quot;. You can change your choice by clearing site data in your browser.</p>
      <h2>Sharing</h2>
      <p>We use trusted processors: Resend (email delivery), Vercel (hosting), Google (analytics, with consent), Tawk.to (chat, with consent) and cloud storage providers you choose for footage.</p>
      <h2>Retention</h2>
      <p>Enquiry data is kept for up to 24 months. Project footage is deleted within 90 days of final delivery unless you ask us to keep it.</p>
      <h2>Your rights</h2>
      <p>You can request access, correction or deletion of your data at any time via {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <Link href="/contact">our contact page</Link>}.</p>
    </LegalPage>
  );
}
