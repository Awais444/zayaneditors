import Image from "next/image";
import { Star } from "lucide-react";
import { publicTestimonials, type Testimonial } from "@/data/testimonials";
import { VideoCard } from "@/components/ui/VideoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Quote({ t }: { t: Testimonial }) {
  return (
    <figure className="card break-inside-avoid p-6">
      <div role="img" className="flex gap-0.5 text-accent" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }, (_, i) => <Star key={i} className="size-4 fill-current" aria-hidden />)}
      </div>
      <blockquote className="mt-3 leading-relaxed">“{t.quote}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3 text-sm">
        {t.avatar && <Image src={t.avatar} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />}
        <span><span className="font-semibold">{t.name}</span><span className="text-muted"> · {t.role}</span></span>
      </figcaption>
    </figure>
  );
}

/**
 * Masonry of real client testimonials (each shown once). Only entries with a real name are
 * rendered, and the whole section is hidden until at least three exist.
 */
export function TestimonialsMasonry({ title = "Creators who stopped editing" }: { title?: string }) {
  const items = publicTestimonials;
  if (items.length < 3) return null;
  return (
    <section data-tl="Reviews" data-tl-color="rgba(244,114,182,0.4)" className="section cv-auto">
      <div className="container-x">
        <SectionHeading eyebrow="Testimonials" title={title} />
        <div className="gap-4 space-y-4 md:columns-2 lg:columns-3">
          {items.map((t) =>
            t.video ? (
              <div key={t.name} className="break-inside-avoid"><VideoCard video={t.video} title={t.name} meta={t.role} aspect="aspect-[4/5]" /></div>
            ) : (
              <Quote key={t.name} t={t} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
