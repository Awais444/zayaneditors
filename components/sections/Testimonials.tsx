"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { VideoCard } from "@/components/ui/VideoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Video testimonials + a native scroll-snap text carousel (momentum + snap come from the platform). */
export function Testimonials() {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 20), behavior: "smooth" });
  };
  const withVideo = testimonials.filter((t) => t.video);

  return (
    <section className="section overflow-hidden">
      <div className="container-x">
        <SectionHeading eyebrow="Testimonials" title="Creators who stopped editing" />
        <div className="mb-10 grid gap-6 md:grid-cols-2">
          {withVideo.map((t) => (
            <VideoCard key={t.name} video={t.video!} title={t.name} meta={t.role} />
          ))}
        </div>
        <div className="mb-5 flex justify-end gap-2">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous testimonials" className="pressable grid size-11 place-items-center rounded-full border border-line hover:bg-white/5"><ChevronLeft className="size-5" /></button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next testimonials" className="pressable grid size-11 place-items-center rounded-full border border-line hover:bg-white/5"><ChevronRight className="size-5" /></button>
        </div>
        <ul ref={track} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-2" aria-label="Client testimonials" data-cursor="drag">
          {testimonials.map((t) => (
            <li key={t.name} className="card flex w-[85%] shrink-0 snap-start flex-col p-7 sm:w-[24rem]">
              <div role="img" className="flex gap-0.5 text-accent" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }, (_, i) => <Star key={i} className="size-4 fill-current" aria-hidden />)}
              </div>
              <blockquote className="mt-4 text-lg leading-relaxed">“{t.quote}”</blockquote>
              <p className="mt-auto pt-6 text-sm"><span className="font-semibold">{t.name}</span><span className="text-muted"> · {t.role}</span></p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
