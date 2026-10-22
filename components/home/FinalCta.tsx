"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { VideoText } from "@/components/ui/VideoText";
import { editors } from "@/data/team";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Giant "LET'S EDIT" that fills with the showreel when it scrolls into view (or on hover).
 * Uses the same clipped VideoText as the hero; the video attaches after load and plays only when filled.
 */
export function FinalCta() {
  const box = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);
  const [hover, setHover] = useState(false);
  const show = filled || hover;

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const io = new IntersectionObserver(([e]) => {
      setFilled(e.intersectionRatio > 0.6);
    }, { threshold: [0, 0.6] });
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);

  return (
    <section data-tl="Start" data-tl-color="rgba(198,244,50,0.5)" className="section relative overflow-hidden text-center">
      <div className="container-x">
        <div ref={box} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)} className="inline-block">
          <h2 className="text-[clamp(4rem,16vw,15rem)] leading-[0.85] font-bold tracking-[-0.05em] uppercase">
            <VideoText text="LET’S EDIT" filled={show} baseClass={show ? "text-transparent transition-colors duration-700" : "text-fg transition-colors duration-700"} />
          </h2>
        </div>
        <p className="mx-auto mt-8 max-w-xl text-lg text-muted">Send a few minutes of footage. Get a free sample edit back in {site.turnaround} — no card, no obligation.</p>
        <div className="mt-9 flex justify-center">
          <Magnetic strength={0.4}>
            <Button href="/free-trial-edit" size="lg" className="h-16 px-10 text-lg">Get a Free Trial Edit</Button>
          </Magnetic>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-muted">
          <span className="flex -space-x-2.5">
            {editors.map((m) => (
              <Image key={m.slug} src={m.avatar} alt={m.name} width={40} height={40} className="size-10 rounded-full border-2 border-bg object-cover" />
            ))}
          </span>
          Your editors are ready.
        </div>
      </div>
    </section>
  );
}
