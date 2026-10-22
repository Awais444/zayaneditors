import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="relative grid min-h-dvh place-items-center overflow-hidden px-4 text-center">
      <div aria-hidden className="glow top-1/2 left-1/2 size-[36rem] -translate-1/2" />
      {/* Scanlines + slate bar for the "cut" feel */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.025)_0_1px,transparent_1px_4px)]" />
      <div className="relative">
        <p className="text-xs font-semibold tracking-[0.3em] text-muted uppercase">Error 404 · Take 1</p>
        <h1 className="glitch mt-4 text-[clamp(6rem,24vw,15rem)] leading-[0.85] font-bold tracking-[-0.05em] text-accent" data-text="CUT!">
          CUT!
        </h1>
        <p className="mt-6 text-2xl font-semibold tracking-tight">This scene didn&apos;t make the final edit.</p>
        <p className="mx-auto mt-3 max-w-md text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back to the good part.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Magnetic><Button href="/" size="lg">Back home</Button></Magnetic>
          <Button href="/portfolio" size="lg" variant="outline">See our work</Button>
        </div>
        <p className="mt-6 text-sm text-muted"><Link href="/contact" className="underline underline-offset-2">Contact us</Link> if you think this is a mistake.</p>
      </div>
    </main>
  );
}
