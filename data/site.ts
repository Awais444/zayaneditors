// Single source of truth for business details. Every `TODO:` must be replaced by the owner.

export const site = {
  name: "Frameforge Studio", // TODO: brand name
  shortName: "Frameforge", // TODO: short brand name (logo text)
  // Set NEXT_PUBLIC_SITE_URL to the real domain; Vercel's production URL is the fallback.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  tagline: "Professional video editing for every kind of video",
  description:
    "A dedicated team of professional video editors for YouTube, social, ads, brand films, weddings, events, music videos and podcasts. First cut in 48 hours, free trial edit.",
  owner: {
    name: "Alex Carter", // TODO: owner / lead editor name
    role: "Founder & Lead Editor",
  },
  /** Public contact email (NEXT_PUBLIC_CONTACT_EMAIL). Empty = every email link is hidden. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  whatsapp: "920000000000", // TODO: WhatsApp number, international format, no +
  whatsappMessage: "Hi! I'd like to talk about editing my videos.",
  calendly: "https://calendly.com/your-handle/intro-call", // TODO: Calendly link
  /** Profile URLs; leave empty until the real profile exists (empty ones are never rendered). */
  socials: {
    youtube: "",
    instagram: "",
    linkedin: "",
    fiverr: "",
    upwork: "",
    behance: "",
  } as Record<"youtube" | "instagram" | "linkedin" | "fiverr" | "upwork" | "behance", string>,
  stats: [
    { value: 2500, suffix: "+", label: "Videos edited" }, // TODO: real numbers
    { value: 150, suffix: "M+", label: "Views generated" }, // TODO
    { value: 120, suffix: "+", label: "Happy clients" }, // TODO
    { value: 6, suffix: "+", label: "Years editing" }, // TODO
  ],
  trust: {
    rating: 4.9, // TODO: real average rating
    clients: "120+", // TODO: real client count
    videosDelivered: "500+", // TODO: real number
  },
  turnaround: "48 hours",
  replyTime: "Replies within 2 hours",
  markets: ["USA", "UK", "Canada", "Australia", "UAE"],
  foundedYear: 2019, // TODO
  logo: "/images/logo.svg", // TODO: replace with real logo
} as const;

export const whatsappUrl = (message: string = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const nav = [
  { label: "Services", href: "/services", mega: true },
  { label: "Work", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
] as const;
