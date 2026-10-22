// Single source of truth for business details. Every `TODO:` must be replaced by the owner.

export const site = {
  name: "Frameforge Studio", // TODO: brand name
  shortName: "Frameforge", // TODO: short brand name (logo text)
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, ""), // TODO: domain
  tagline: "Professional video editing for every kind of video",
  description:
    "A dedicated team of professional video editors for YouTube, social, ads, brand films, weddings, events, music videos and podcasts. First cut in 48 hours, free trial edit.",
  owner: {
    name: "Alex Carter", // TODO: owner / lead editor name
    role: "Founder & Lead Editor",
  },
  email: "hello@example.com", // TODO: email
  whatsapp: "920000000000", // TODO: WhatsApp number, international format, no +
  whatsappMessage: "Hi! I'd like to talk about editing my videos.",
  calendly: "https://calendly.com/your-handle/intro-call", // TODO: Calendly link
  socials: {
    youtube: "https://youtube.com/@TODO", // TODO
    instagram: "https://instagram.com/TODO", // TODO
    linkedin: "https://linkedin.com/company/TODO", // TODO
    fiverr: "https://fiverr.com/TODO", // TODO
    upwork: "https://upwork.com/freelancers/TODO", // TODO
    behance: "https://behance.net/TODO", // TODO
  },
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
  priceFrom: 49, // TODO: starting price per video (USD)
  offerLine: "Edits from $49/video · First cut in 48 hours · Free trial edit", // TODO: keep in sync with priceFrom
  turnaround: "48 hours",
  replyTime: "Replies within 2 hours",
  markets: ["USA", "UK", "Canada", "Australia", "UAE"],
  foundedYear: 2019, // TODO
  logo: "/images/logo.svg", // TODO: replace with real logo
  showreel: {
    // TODO: replace with real showreel (Bunny/Vimeo id or MP4 URL)
    src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=70",
    title: "Showreel",
    duration: "PT1M30S",
    uploadDate: "2026-01-15",
  },
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
