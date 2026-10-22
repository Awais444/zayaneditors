import type { PortfolioCategory } from "./services";
import { sampleVideo } from "./media";

export type CaseStudy = {
  slug: string;
  title: string;
  /** slug of the editor in data/team.ts who cut this project */
  editor: string;
  client: string;
  niche: string;
  platform: string;
  category: PortfolioCategory;
  tags: string[];
  goal: string;
  whatWeDid: string[];
  results: { views: string; retention: string; ctr: string; subscribers: string };
  /** headline metric shown on cards */
  highlight: string;
  testimonial?: { quote: string; name: string; role: string };
  video: { src: string; poster: string; title: string };
  before: string;
  after: string;
  uploadDate: string;
  duration: string;
};

// TODO: every case study below is SAMPLE data. Replace with real client work (with permission).
export const caseStudies: CaseStudy[] = [
  {
    slug: "finance-explainer-channel",
    editor: "alex-carter",
    title: "Finance explainer channel: 3.1× watch time",
    client: "TODO: Client name",
    niche: "Personal finance",
    platform: "YouTube",
    category: "youtube",
    tags: ["long-form", "youtube", "faceless"],
    goal: "Lift average view duration on 12–15 minute explainers that were losing half their audience in the first minute.",
    whatWeDid: ["Rebuilt hooks to promise the payoff in the first 10 seconds", "Animated charts for every statistic", "Mid-video re-hooks at the 40% mark", "Consistent grade and caption style"],
    results: { views: "4.2M", retention: "+58%", ctr: "8.9%", subscribers: "+61K" },
    highlight: "+58% retention",
    testimonial: { quote: "TODO: Real testimonial quote from this client.", name: "TODO: Name", role: "Finance creator" },
    video: sampleVideo("Finance explainer", 0),
    before: "Slow intro, static slides, flat audio.",
    after: "Cold-open hook, animated data, punchy pacing.",
    uploadDate: "2026-03-10",
    duration: "PT12M40S",
  },
  {
    slug: "podcast-to-shorts-engine",
    editor: "daniel-okafor",
    title: "Podcast to Shorts engine: 40 clips a month",
    client: "TODO: Client name",
    niche: "Business podcast",
    platform: "YouTube · TikTok · Reels",
    category: "podcast",
    tags: ["podcast", "shorts"],
    goal: "Grow a weekly interview podcast by repurposing every episode into vertical clips.",
    whatWeDid: ["Multi-cam podcast edits with dynamic switching", "10 vertical clips per episode with animated captions", "Hook-first clip structure", "Weekly performance review"],
    results: { views: "11.8M", retention: "71% avg", ctr: "6.4%", subscribers: "+92K" },
    highlight: "11.8M clip views",
    video: sampleVideo("Podcast clips", 1),
    before: "Single wide shot, no short-form presence.",
    after: "Three-camera edit plus daily Shorts.",
    uploadDate: "2026-02-02",
    duration: "PT58S",
  },
  {
    slug: "dtc-skincare-ugc-ads",
    editor: "sofia-reyes",
    title: "DTC skincare UGC ads: 2.4× ROAS",
    client: "TODO: Client name",
    niche: "Beauty / DTC",
    platform: "Meta · TikTok ads",
    category: "ads",
    tags: ["ads", "ugc", "shorts"],
    goal: "Beat creative fatigue with a steady supply of testable UGC ad variations.",
    whatWeDid: ["5 hook variations per concept", "9:16, 4:5 and 1:1 exports", "Native captions in safe zones", "Weekly iteration from ad data"],
    results: { views: "6.5M", retention: "34% thumb-stop", ctr: "2.8%", subscribers: "—" },
    highlight: "2.4× ROAS",
    video: sampleVideo("UGC ad", 2),
    before: "One polished ad, fatiguing after a week.",
    after: "20 variations a month, winners scaled.",
    uploadDate: "2026-04-18",
    duration: "PT30S",
  },
  {
    slug: "travel-vlog-rebrand",
    editor: "maya-lin",
    title: "Travel vlog rebrand: 250K subscribers",
    client: "TODO: Client name",
    niche: "Travel",
    platform: "YouTube",
    category: "youtube",
    tags: ["long-form", "youtube", "vlog"],
    goal: "Give a travel vlog a cinematic identity and a story structure that keeps viewers to the end.",
    whatWeDid: ["Story-led structure for every episode", "Signature colour grade and LUT", "Sound design with location ambience", "Thumbnail system"],
    results: { views: "9.3M", retention: "+41%", ctr: "10.2%", subscribers: "+250K" },
    highlight: "+250K subscribers",
    video: sampleVideo("Travel vlog", 3),
    before: "Chronological clips with music on top.",
    after: "Narrative episodes with a recognisable look.",
    uploadDate: "2026-01-21",
    duration: "PT18M05S",
  },
  {
    slug: "fitness-coach-reels",
    editor: "omar-haddad",
    title: "Fitness coach Reels: 300 booked calls",
    client: "TODO: Client name",
    niche: "Fitness coaching",
    platform: "Instagram · TikTok",
    category: "social",
    tags: ["shorts", "coaches"],
    goal: "Turn weekly filming sessions into short-form content that books discovery calls.",
    whatWeDid: ["20 Reels a month from 2 recordings", "Branded captions and on-screen frameworks", "Clear CTA to calendar", "Monthly content review"],
    results: { views: "3.7M", retention: "64% avg", ctr: "—", subscribers: "+38K" },
    highlight: "300 booked calls",
    video: sampleVideo("Fitness reel", 0),
    before: "Inconsistent posting, raw phone clips.",
    after: "Daily Reels with a consistent brand.",
    uploadDate: "2026-05-06",
    duration: "PT45S",
  },
  {
    slug: "gaming-stream-highlights",
    editor: "alex-carter",
    title: "Gaming stream highlights: 5M views in 90 days",
    client: "TODO: Client name",
    niche: "Gaming",
    platform: "YouTube",
    category: "youtube",
    tags: ["long-form", "gaming", "shorts"],
    goal: "Grow a Twitch streamer's YouTube channel from VODs without extra filming.",
    whatWeDid: ["Story-driven highlight videos from 6-hour VODs", "Meme and SFX timing", "Stacked facecam Shorts", "Thumbnail A/B tests"],
    results: { views: "5.1M", retention: "52% avg", ctr: "9.6%", subscribers: "+74K" },
    highlight: "5M views / 90 days",
    video: sampleVideo("Gaming highlights", 1),
    before: "Unedited VOD uploads.",
    after: "Weekly highlight video plus daily Shorts.",
    uploadDate: "2026-06-12",
    duration: "PT14M20S",
  },

  {
    slug: "destination-wedding-film",
    editor: "maya-lin",
    title: "Destination wedding film: 3 deliverables in 9 days",
    client: "TODO: Client name",
    niche: "Wedding videography",
    platform: "Client delivery · Instagram",
    category: "events",
    tags: ["events", "wedding"],
    goal: "Help a two-person videography studio deliver peak-season weddings faster without losing their signature style.",
    whatWeDid: ["Style guide built from three past films", "Vow-led 6-minute highlight film", "Full ceremony and speeches edit", "60-second Instagram teaser"],
    results: { views: "48K", retention: "—", ctr: "—", subscribers: "+2.1K" },
    highlight: "9-day delivery",
    testimonial: { quote: "TODO: Real testimonial quote from this client.", name: "TODO: Name", role: "Wedding videographer" },
    video: sampleVideo("Wedding highlight film", 3),
    before: "Six-week backlog in peak season.",
    after: "Every wedding delivered within two weeks.",
    uploadDate: "2026-07-02",
    duration: "PT6M10S",
  },
  {
    slug: "indie-artist-music-video",
    editor: "omar-haddad",
    title: "Indie artist music video: 1.2M views on release",
    client: "TODO: Client name",
    niche: "Independent music",
    platform: "YouTube · TikTok · Spotify",
    category: "music",
    tags: ["music", "shorts"],
    goal: "Turn a one-day performance and narrative shoot into a release-ready video with vertical teasers for launch week.",
    whatWeDid: ["Beat-mapped performance and narrative cut", "Grainy film-emulation grade", "Speed ramps and light-leak transitions", "5 vertical teasers + Spotify canvas loop"],
    results: { views: "1.2M", retention: "62% avg", ctr: "7.8%", subscribers: "+18K" },
    highlight: "1.2M release views",
    video: sampleVideo("Music video", 2),
    before: "Raw takes and a treatment.",
    after: "A release package that travelled on TikTok.",
    uploadDate: "2026-08-15",
    duration: "PT3M32S",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

export const portfolioFilters: { label: string; value: "all" | PortfolioCategory }[] = [
  { label: "All", value: "all" },
  { label: "YouTube", value: "youtube" },
  { label: "Social", value: "social" },
  { label: "Ads & Brand", value: "ads" },
  { label: "Weddings & Events", value: "events" },
  { label: "Music", value: "music" },
  { label: "Podcast", value: "podcast" },
];

export const caseStudiesByTags = (tags: string[], limit = 6) => {
  const hits = caseStudies.filter((c) => c.tags.some((t) => tags.includes(t)));
  // Pad with other work so every page shows at least 3 items
  const rest = caseStudies.filter((c) => !hits.includes(c));
  return [...hits, ...rest].slice(0, Math.max(3, Math.min(limit, hits.length)));
};
