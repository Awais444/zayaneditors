export type Testimonial = {
  /** Exactly as the client wrote it (only obvious typos fixed). */
  quote: string;
  name: string;
  role: string;
  /** Where the review was left; shown as "via Fiverr" under the name. */
  platform: "Fiverr" | "Upwork" | "Google" | "Direct";
  rating: number;
  /** true only for real, verifiable reviews; only these feed Review / AggregateRating schema. */
  verified: boolean;
  /** Client photo (never stock). Without one the card shows initials. */
  avatar?: string;
  video?: { src: string; poster: string; title: string };
};

// Real client reviews only. The Home section stays hidden until there are at least three.
export const testimonials: Testimonial[] = [];

export const verifiedTestimonials = testimonials.filter((t) => t.verified);

/** Only testimonials with a real client name are ever shown. */
export const publicTestimonials = testimonials.filter((t) => t.name.trim());
