import { sampleVideo } from "./media";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
  /** Set to true ONLY for real, verifiable testimonials. Only real ones feed Review/AggregateRating schema. */
  verified: boolean;
  video?: { src: string; poster: string; title: string };
};

// TODO: replace with real testimonials and set `verified: true` on each real one.
export const testimonials: Testimonial[] = [
  { quote: "Our retention jumped within three uploads. They understand hooks better than any editor we've hired.", name: "TODO: Client A", role: "Education YouTuber, 400K subs", rating: 5, verified: false, video: sampleVideo("Client video testimonial", 2) },
  { quote: "Turnaround is ridiculously fast and the communication on WhatsApp makes it feel like an in-house team.", name: "TODO: Client B", role: "Podcast host", rating: 5, verified: false, video: sampleVideo("Podcast host testimonial", 3) },
  { quote: "We test 20 ad variations a month now. Our creative pipeline finally keeps up with our media budget.", name: "TODO: Client C", role: "Growth lead, DTC brand", rating: 5, verified: false },
  { quote: "I just film. Editing, thumbnails and uploads are handled, and the channel has grown every month since.", name: "TODO: Client D", role: "Business coach", rating: 5, verified: false },
  { quote: "They matched my style from the first edit. My audience didn't notice I'd switched editors — except that videos got better.", name: "TODO: Client E", role: "Travel vlogger", rating: 5, verified: false },
];

export const verifiedTestimonials = testimonials.filter((t) => t.verified);
