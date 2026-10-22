export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
  /** Set to true ONLY for real, verifiable testimonials. Only real ones feed Review/AggregateRating schema. */
  verified: boolean;
  /** Client photo or a thumbnail from their video (never stock). */
  avatar?: string;
  video?: { src: string; poster: string; title: string };
};

// Add the real client name to publish a testimonial; entries with an empty name are never rendered.
// Set `verified: true` only for real, verifiable ones (they feed Review schema).
export const testimonials: Testimonial[] = [
  { quote: "Our retention jumped within three uploads. They understand hooks better than any editor we've hired.", name: "", role: "Education YouTuber, 400K subs", rating: 5, verified: false },
  { quote: "Turnaround is ridiculously fast and the communication on WhatsApp makes it feel like an in-house team.", name: "", role: "Podcast host", rating: 5, verified: false },
  { quote: "We test 20 ad variations a month now. Our creative pipeline finally keeps up with our media budget.", name: "", role: "Growth lead, DTC brand", rating: 5, verified: false },
  { quote: "I just film. Editing, thumbnails and uploads are handled, and the channel has grown every month since.", name: "", role: "Business coach", rating: 5, verified: false },
  { quote: "They matched my style from the first edit. My audience didn't notice I'd switched editors — except that videos got better.", name: "", role: "Travel vlogger", rating: 5, verified: false },
];

export const verifiedTestimonials = testimonials.filter((t) => t.verified);

/** Only testimonials with a real client name are ever shown. */
export const publicTestimonials = testimonials.filter((t) => t.name.trim());
