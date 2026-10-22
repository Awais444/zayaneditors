export type Faq = { q: string; a: string };

export const agencyFaq: Faq = {
  q: "Are you a video editing agency?",
  a: "We do everything a video editing agency does — but you work with a dedicated team of editors, not a rotating queue. You get a named editor who learns your style, direct communication, and specialists for colour, sound and motion when a project needs them.",
};

export const homeFaqs: Faq[] = [
  { q: "How fast will I get my first cut?", a: "Within 48 hours of receiving your footage and brief for most videos. Long or graphics-heavy edits may take 3–4 days, and we confirm the timeline before starting." },
  { q: "How do I send my footage?", a: "Share a Google Drive, Dropbox, Frame.io or WeTransfer link. We never need you to install anything." },
  { q: "How many revisions do I get?", a: "Most plans include two rounds of revisions per video, delivered within 24 hours each. Pro plans include unlimited minor revisions." },
  { q: "Is the free trial edit really free?", a: "Yes. Send a few minutes of footage and we'll return a 30–60 second sample edit. No card, no obligation." },
  agencyFaq,
  { q: "What kinds of videos do you edit?", a: "Almost everything: YouTube videos, Shorts and Reels, ads, product and explainer videos, brand films, corporate content, weddings, events, music videos, travel films, sports highlights, short films and podcasts." },
  { q: "Do you work with clients outside the US?", a: "We work with creators and brands across the USA, UK, Canada, Australia and UAE, with overlapping working hours for each time zone." },
  { q: "Who owns the final video?", a: "You do. Full rights transfer on payment, and project files are available on request." },
  { q: "Can you match my existing style?", a: "Yes. Share videos you love and we'll build a style guide for fonts, captions, pacing, music and colour before the first edit." },
  { q: "What if I don't like the edit?", a: "We re-edit for free until it matches your brief. If you're still unhappy after revisions, you don't pay for that video." },
];

export const faqCategories: { name: string; faqs: Faq[] }[] = [
  { name: "Getting started", faqs: homeFaqs.slice(0, 6) },
  {
    name: "Working together",
    faqs: [
      homeFaqs[8],
      homeFaqs[6],
      { q: "How do I give feedback?", a: "Leave time-coded comments on a Frame.io review link, or send notes in a doc, email or WhatsApp — whatever is easiest." },
      { q: "Will I have the same editor each time?", a: "On Growth and Pro plans you get a dedicated editor who learns your style. We also keep a written style guide so quality stays consistent." },
      { q: "What time zone are you in?", a: "Our team works in shifts that overlap with US, UK, Australian and Gulf business hours. Replies usually arrive within two hours." },
    ],
  },
  {
    name: "Pricing & payment",
    faqs: [
      homeFaqs[9],
      { q: "How do I pay?", a: "Card, PayPal, Wise or bank transfer. Monthly plans are billed in advance; per-video work is paid on delivery." },
      { q: "Can I cancel a monthly plan?", a: "Yes, plans are month-to-month with no lock-in." },
    ],
  },
  {
    name: "Rights & security",
    faqs: [
      homeFaqs[7],
      { q: "Will you sign an NDA?", a: "Yes, we're happy to sign your NDA before receiving footage." },
      { q: "Is the music copyright-safe?", a: "We use licensed music libraries and document every licence. Commercially licensed tracks are used for ads." },
    ],
  },
];
