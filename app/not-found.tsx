import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="relative grid min-h-dvh place-items-center overflow-hidden px-4 text-center">
      <div className="glow top-1/2 left-1/2 size-[36rem] -translate-1/2" />
      <div>
        <p className="display text-[clamp(6rem,20vw,12rem)] leading-none font-bold text-accent">404</p>
        <h1 className="h-section mt-4">This scene was cut.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back to the good part.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back home</Button>
          <Button href="/services" variant="outline">Browse services</Button>
        </div>
        <p className="mt-6 text-sm text-muted"><Link href="/contact" className="underline underline-offset-2">Contact us</Link> if you think this is a mistake.</p>
      </div>
    </main>
  );
}
