import { Star } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { VideoCard } from "@/components/ui/VideoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { MotionToggle } from "@/components/ui/MotionToggle";

function Quote({ t }: { t: Testimonial }) {
  return (
    <figure className="card p-6">
      <div role="img" className="flex gap-0.5 text-accent" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }, (_, i) => <Star key={i} className="size-4 fill-current" aria-hidden />)}
      </div>
      <blockquote className="mt-3 leading-relaxed">“{t.quote}”</blockquote>
      <figcaption className="mt-4 text-sm"><span className="font-semibold">{t.name}</span><span className="text-muted"> · {t.role}</span></figcaption>
    </figure>
  );
}

function Item({ t }: { t: Testimonial }) {
  return t.video ? <VideoCard video={t.video} title={t.name} meta={t.role} aspect="aspect-[4/5]" /> : <Quote t={t} />;
}

/**
 * Three auto-scrolling columns (alternating direction, paused on hover). Each column's content
 * is duplicated once so the loop is seamless; the copy is aria-hidden. Mobile shows one column;
 * reduced motion stops the scroll (see globals.css).
 */
export function TestimonialsMasonry({ title = "Creators who stopped editing" }: { title?: string }) {
  const cols = [0, 1, 2].map((c) => testimonials.filter((_, i) => i % 3 === c).concat(testimonials.filter((_, i) => i % 3 !== c).slice(0, 2)));
  return (
    <section data-tl="Reviews" data-tl-color="rgba(244,114,182,0.4)" className="section cv-auto overflow-hidden">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Testimonials" title={title} />
          <div className="mb-10 md:mb-14"><MotionToggle target="testimonial-masonry" label="reviews" /></div>
        </div>
        <div id="testimonial-masonry" className="masonry relative grid h-[44rem] gap-4 overflow-hidden [mask-image:linear-gradient(transparent,#000_12%,#000_88%,transparent)] md:grid-cols-2 lg:grid-cols-3">
          {cols.map((list, c) => (
            <div key={c} className={cn("masonry-col flex flex-col gap-4", c % 2 === 1 && "down", c === 1 && "hidden md:flex", c === 2 && "hidden lg:flex")} style={{ "--dur": `${38 + c * 6}s` } as React.CSSProperties}>
              {list.map((t) => <Item key={t.name} t={t} />)}
              <div aria-hidden className="flex flex-col gap-4" inert>
                {list.map((t) => <Item key={`dup-${t.name}`} t={t} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
