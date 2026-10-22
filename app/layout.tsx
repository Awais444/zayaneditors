import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { site } from "@/data/site";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Toaster } from "@/components/layout/Toaster";
import { CursorLoader } from "@/components/ui/CursorLoader";
import { RouteTransitions } from "@/components/motion/RouteTransitions";
import { JsonLd } from "@/components/seo/JsonLd";
import { organization, website } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap", weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Video Editing Services`, template: `%s | ${site.shortName}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="grain min-h-dvh">
        <a href="#main" className="sr-only z-[100] rounded-full bg-accent px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        <JsonLd data={[organization(), website()]} />
        {children}
        <WhatsAppButton />
        <CookieBanner />
        <Toaster />
        <CursorLoader />
        <RouteTransitions />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
