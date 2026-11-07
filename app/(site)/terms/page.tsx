import Link from "next/link";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMeta({ title: "Terms of Service", description: `The terms that apply when you work with ${site.name}.`, path: "/terms" });

// TODO: have this reviewed by a lawyer for your jurisdiction.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" path="/terms" updated="October 2026">
      <h2>Services</h2>
      <p>{site.name} provides video editing and related creative services as described in your quote or plan. Turnaround times are estimates that begin once we receive all footage and a brief.</p>
      <h2>Payment</h2>
      <p>Monthly plans are billed in advance and renew monthly until cancelled. Per-video work is invoiced on delivery unless agreed otherwise. Late invoices may pause work in progress.</p>
      <h2>Revisions</h2>
      <p>Each plan includes the number of revision rounds stated in your quote. Additional rounds or changes outside the original brief may be billed separately.</p>
      <h2>Ownership</h2>
      <p>On full payment, you own all rights to the final deliverables. You confirm you own or have licensed all footage and materials you supply. We may show work in our portfolio only with your permission.</p>
      <h2>Cancellation</h2>
      <p>You can cancel a monthly plan at any time before the next billing date. Work already started in the current period will be completed.</p>
      <h2>Liability</h2>
      <p>Our total liability is limited to the fees paid for the specific video concerned. We are not liable for platform decisions such as demonetisation or copyright claims arising from materials you supply.</p>
      <h2>Contact</h2>
      <p>Questions? Reach us via {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <Link href="/contact">our contact page</Link>}.</p>
    </LegalPage>
  );
}
