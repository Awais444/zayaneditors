import type { ServiceCopy } from "../services";
import { sampleVideo } from "../media";

export const socialServices: ServiceCopy[] = [
  {
    slug: "social-media-video-editing",
    name: "Social Media Video Editing",
    keyword: "social media video editing services",
    metaTitle: "Social Media Video Editing Services | Every Platform",
    metaDescription:
      "Social media video editing for Instagram, TikTok, LinkedIn, Facebook, X and YouTube. A month of platform-native posts from your footage.",
    h1: "Social Media Video Editing Services for Every Platform",
    short: "A full month of platform-native video for Instagram, TikTok, LinkedIn, Facebook and more.",
    intro:
      "Posting the same video everywhere rarely works. A clip that thrives on TikTok can feel out of place on LinkedIn, and a polished brand piece can look stiff in an Instagram Story. Our social media video editing services take your footage — interviews, events, product shots, behind-the-scenes, long videos — and turn it into a calendar of posts designed for each platform's audience, format and pace. You approve a plan once a month; we deliver posts ready to schedule.",
    sections: [
      {
        heading: "One shoot, a month of content",
        paragraphs: [
          "Most brands and creators already have more footage than they use. A single afternoon of filming, a webinar, a conference talk or a long YouTube video can feed weeks of social posts when it's edited deliberately. We start by reviewing everything you send, tagging the strongest moments — quotable lines, demonstrations, reactions, before-and-afters — and mapping them to a posting calendar.",
          "The result is a mix of formats rather than twenty versions of the same clip: short punchy hooks, longer educational pieces, carousel-style cover frames, Stories with polls and stickers, and the occasional trend-led edit when it suits your brand.",
        ],
      },
      {
        heading: "Edited natively for each platform",
        paragraphs: [
          "Each network rewards something slightly different. TikTok favours raw energy and fast hooks. Instagram Reels leans a little more polished and music-driven. LinkedIn audiences want substance, captions and a clear professional takeaway, usually in a square or vertical frame. Facebook still rewards slightly longer storytelling, and X needs a strong first frame because many viewers never unmute.",
          "We adjust aspect ratio, length, pacing, caption style, text placement and cover frames per platform, and keep important text inside each app's safe zones so nothing hides behind buttons or captions.",
        ],
      },
      {
        heading: "Consistent brand, flexible style",
        paragraphs: [
          "Social feeds move fast, but your brand still needs to be recognisable in a split second. We build a simple social style guide — caption fonts, colours, intro and outro treatments, logo placement, music mood — so every post looks related without becoming repetitive. When a format performs well, we turn it into a repeatable series; when something flops, we change it next month.",
        ],
      },
      {
        heading: "A workflow that respects your time",
        paragraphs: [
          "At the start of each month we share a short plan: which clips, which platforms, which hooks. You approve or tweak it in minutes. Edited posts arrive in batches with suggested captions and hashtags, organised by platform and date, ready to drop into your scheduler. If you'd like us to handle posting as well, our channel management add-on covers it.",
          "Share your analytics and we'll review what worked — reach, watch time, saves, shares and comments — and adjust next month's plan accordingly. That feedback loop is where social video gets better over time.",
        ],
      },
    ],
    included: [
      "Monthly content plan from your footage",
      "Platform-specific aspect ratios and lengths",
      "Animated captions in safe zones",
      "Cover frames and thumbnails",
      "Music, SFX and on-brand text",
      "Suggested captions and hashtags",
      "Organised delivery by platform and date",
      "Monthly performance review",
    ],
    whoFor: [
      { title: "Small businesses", text: "You know video works on social but don't have time to edit every week." },
      { title: "Marketing teams", text: "You need a steady stream of posts across several platforms without hiring." },
      { title: "Personal brands", text: "You want to show up everywhere without becoming a full-time editor." },
      { title: "Agencies", text: "You manage several client accounts and need reliable white-label editing." },
    ],
    pricing: [
      { name: "Starter", price: "$349", unit: "per month", features: ["12 posts across 2 platforms", "Captions + covers", "1 revision round"] },
      { name: "Growth", price: "$749", unit: "per month", features: ["30 posts across 4 platforms", "Content plan + captions copy", "2 revision rounds"] },
      { name: "Always-on", price: "$1,390", unit: "per month", features: ["60 posts, all platforms", "Stories + trend edits", "Monthly analytics review"] },
    ],
    turnaround: "First batch within 3 business days · then weekly batches",
    faqs: [
      { q: "Do I need to film specifically for social?", a: "Not necessarily. We can work with existing footage, long videos, webinars and events. If you do film new content, we'll send a short shot list to get the most out of it." },
      { q: "Which platforms do you edit for?", a: "Instagram (Reels, Stories, feed), TikTok, YouTube Shorts, LinkedIn, Facebook, X and Pinterest. We adapt each edit to the platform's format and audience." },
      { q: "Will you write captions and hashtags?", a: "Yes, Growth and Always-on plans include suggested post captions and hashtags in your brand voice. You can edit or approve them before posting." },
      { q: "Can you post for us?", a: "Yes. Add channel management and we'll schedule and publish posts, and handle basic community replies if you'd like." },
      { q: "How do you keep posts on-brand?", a: "We build a social style guide in the first week covering fonts, colours, caption style, music mood and logo use, and apply it to every post." },
      { q: "Can I see more samples before I order?", a: "Yes — browse our portfolio or ask us on WhatsApp for samples in your niche." },
    ],
    related: ["instagram-reels-editing", "tiktok-video-editing", "video-repurposing", "captions-and-subtitles"],
    portfolioTags: ["shorts", "social"],
    blog: ["hire-youtube-video-editor"],
    video: sampleVideo("Social media edits", 2),
  },
];
