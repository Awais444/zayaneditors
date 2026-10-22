import type { ServiceCopy } from "../services";
import { sampleVideo } from "../media";

const trialFaq = {
  q: "Can I add this to an editing plan?",
  a: "Yes. Every add-on can be bought on its own or attached to any per-video or monthly editing plan at a discounted rate.",
};

export const addonServices: ServiceCopy[] = [
  {
    slug: "youtube-thumbnail-design",
    name: "YouTube Thumbnail Design",
    category: "Add-ons",
    keyword: "youtube thumbnail design service",
    metaTitle: "YouTube Thumbnail Design Service | Higher CTR",
    metaDescription:
      "YouTube thumbnail design built for click-through rate: bold concepts, readable text and A/B variations matched to your title. From $25.",
    h1: "YouTube Thumbnail Design That Earns the Click",
    short: "CTR-focused thumbnails with A/B variations matched to your title.",
    intro:
      "A brilliant edit can't help a video nobody clicks. The thumbnail and title together decide whether your upload gets a chance, and they're judged at the size of a postage stamp on a phone. Our YouTube thumbnail design service creates thumbnails engineered for click-through rate: one clear idea, strong contrast, readable at small sizes, and paired with your title so the two tell a story together instead of repeating each other.",
    sections: [
      {
        heading: "Concept before Photoshop",
        paragraphs: [
          "Every thumbnail starts with a question: what is the single most curiosity-inducing thing about this video? We sketch two or three concepts — a dramatic before-and-after, a strong emotion, a surprising object, a number — and pick the one that best complements your title. Only then do we open the design tools.",
        ],
      },
      {
        heading: "Designed for mobile first",
        paragraphs: [
          "Most YouTube views come from phones, where thumbnails are tiny. We limit text to a few words, use high-contrast colours that stand out against YouTube's interface in both light and dark mode, and check every design at actual size before delivery. Faces are cut out cleanly with expressions that read instantly.",
        ],
      },
      {
        heading: "Test, learn, iterate",
        paragraphs: [
          "YouTube's built-in thumbnail testing makes it easy to compare variations. Our standard package includes three variations per video so you can test them. Share your CTR results and we'll learn what your audience responds to and refine future designs.",
        ],
      },
    ],
    included: [
      "2–3 concept sketches",
      "3 A/B test variations",
      "Face cutout and expression enhancement",
      "Mobile-size legibility check",
      "Title pairing suggestions",
      "Source PSD on request",
    ],
    whoFor: [
      { title: "Creators with low CTR", text: "Your videos are good but impressions aren't turning into views." },
      { title: "New channels", text: "You want a recognisable visual identity from day one." },
      { title: "Agencies", text: "You need white-label thumbnails for client channels." },
    ],
    pricing: [
      { name: "Single", price: "$25", unit: "per thumbnail", features: ["1 design", "1 revision", "48h delivery"] },
      { name: "A/B pack", price: "$59", unit: "per video", features: ["3 variations", "Title suggestions", "2 revisions"] },
      { name: "Monthly", price: "$299", unit: "per month", features: ["8 videos × 3 variations", "CTR review", "Priority delivery"] },
    ],
    turnaround: "24–48 hours",
    faqs: [
      { q: "Do you need photos of me?", a: "Ideally a few high-resolution photos with clear expressions. We can also pull frames from your 4K footage." },
      { q: "Will you suggest titles too?", a: "Yes. Every A/B pack includes title suggestions designed to complement the thumbnail." },
      { q: "Can I get the source files?", a: "Yes, layered PSD files are available on request." },
      { q: "How do I test the variations?", a: "Use YouTube Studio's thumbnail test feature where available, or swap manually after 48 hours and compare CTR." },
      trialFaq,
    ],
    related: ["youtube-video-editing", "youtube-channel-management", "motion-graphics", "faceless-youtube-editing"],
    portfolioTags: ["long-form", "youtube"],
    blog: ["increase-youtube-audience-retention"],
    video: sampleVideo("Thumbnail process", 0),
  },
  {
    slug: "motion-graphics",
    name: "Motion Graphics",
    category: "Add-ons",
    keyword: "motion graphics services",
    metaTitle: "Motion Graphics Services | Titles, Explainers, Branding",
    metaDescription:
      "Motion graphics for YouTube and brands: animated titles, lower thirds, logo reveals, infographics and explainer animation. Custom After Effects work.",
    h1: "Motion Graphics Services That Explain and Elevate",
    short: "Animated titles, infographics, logo reveals and explainer sequences.",
    intro:
      "Motion graphics do two jobs: they make an idea easier to understand, and they make a channel or brand feel premium. Our motion graphics services cover everything from a clean lower-third package to full animated explainer sequences, built in After Effects to match your brand and handed over as reusable templates where it makes sense.",
    sections: [
      {
        heading: "Graphics that clarify",
        paragraphs: [
          "The best motion graphics replace a paragraph of explanation with a few seconds of animation. Statistics become animated charts, processes become step-by-step diagrams, locations become map moves. We work from your script to identify where a visual will help most and design for those moments.",
        ],
      },
      {
        heading: "A motion system for your brand",
        paragraphs: [
          "Consistency is what makes graphics look professional. We design a package — title cards, lower thirds, callouts, transitions, end screens — with shared timing and easing so everything moves the same way. Delivered as Premiere Pro or DaVinci templates, your team can reuse them without After Effects.",
        ],
      },
      {
        heading: "Logo reveals and channel intros",
        paragraphs: [
          "A short, confident logo animation gives every video a polished signature. We keep intros brief — usually under three seconds — so they add identity without costing retention.",
        ],
      },
    ],
    included: [
      "Animated titles and lower thirds",
      "Charts, maps and infographics",
      "Logo reveal and channel intro",
      "Transitions and callouts",
      "Reusable Premiere / Resolve templates",
      "Brand-matched timing and easing",
    ],
    whoFor: [
      { title: "Educational channels", text: "You explain complex ideas and need visuals that make them simple." },
      { title: "Brands", text: "You want a consistent motion identity across all video." },
      { title: "Editors and agencies", text: "You need motion design support on specific projects." },
    ],
    pricing: [
      { name: "Graphics pack", price: "$199", unit: "one-off", features: ["Titles, lower thirds, end screen", "Templates included", "2 revisions"] },
      { name: "Per video", price: "$99", unit: "per video", features: ["Up to 6 custom graphics", "Script-matched", "2 revisions"] },
      { name: "Explainer", price: "$600+", unit: "per minute", features: ["Full animated sequence", "Storyboard + voiceover sync", "3 revisions"] },
    ],
    turnaround: "3–5 days for packs · explainer timelines quoted per project",
    faqs: [
      { q: "Do I get editable templates?", a: "Yes. Graphics packs come as Premiere Pro MOGRTs or DaVinci templates so you can change text yourself." },
      { q: "Can you animate my existing logo?", a: "Yes. Send a vector file (SVG, AI or EPS) and we'll design a short reveal." },
      { q: "Do you do 3D?", a: "Light 3D elements are possible in After Effects; complex 3D is quoted separately." },
      { q: "Can you match another channel's style?", a: "We can take inspiration from references while designing something original for your brand." },
      trialFaq,
    ],
    related: ["youtube-video-editing", "corporate-video-editing", "faceless-youtube-editing", "color-grading"],
    portfolioTags: ["ads", "long-form"],
    blog: ["increase-youtube-audience-retention"],
    video: sampleVideo("Motion graphics reel", 1),
  },
  {
    slug: "color-grading",
    name: "Colour Grading",
    category: "Add-ons",
    keyword: "color grading services",
    metaTitle: "Color Grading Services | Cinematic Looks in DaVinci",
    metaDescription:
      "Professional color grading in DaVinci Resolve: correction, camera matching, skin tones and cinematic looks for YouTube, ads, weddings and films.",
    h1: "Colour Grading Services for a Cinematic, Consistent Look",
    short: "Correction, camera matching and signature looks in DaVinci Resolve.",
    intro:
      "Colour is the difference between footage that looks like a phone video and footage that looks like a film. Our colour grading services, done in DaVinci Resolve, start with technical correction — exposure, white balance, camera matching — and finish with a creative look that sets mood and makes your content instantly recognisable. Skin tones always come first; nobody trusts a presenter who looks orange.",
    sections: [
      {
        heading: "Correction: getting it right",
        paragraphs: [
          "Before any creative look, every shot is balanced: exposure normalised, white balance corrected, highlights and shadows recovered where the footage allows. In multi-camera shoots we match each angle so cuts are invisible. Log and RAW footage from Sony, Canon, Blackmagic, RED and iPhone ProRes are all handled with proper colour management.",
        ],
      },
      {
        heading: "Grading: building a look",
        paragraphs: [
          "We develop a look with you from references — warm and nostalgic, clean and modern, moody and contrasty — and save it as a reusable grade so every future video matches. Secondary corrections isolate skies, skin and products for refined control.",
        ],
      },
      {
        heading: "Delivering to every screen",
        paragraphs: [
          "We grade on calibrated displays and check output on phones and laptops, where most of your audience watches. Custom LUTs are available so your own team can apply a starting look on set or in their edits.",
        ],
      },
    ],
    included: [
      "Exposure and white balance correction",
      "Multi-camera matching",
      "Log / RAW colour management",
      "Skin-tone protection",
      "Creative look development",
      "Custom LUT on request",
    ],
    whoFor: [
      { title: "Creators", text: "You want a signature cinematic look for your channel." },
      { title: "Videographers", text: "You need professional grading on weddings, ads and short films." },
      { title: "Brands", text: "Product colour accuracy matters in your ads." },
    ],
    pricing: [
      { name: "Correction", price: "$39", unit: "per video", features: ["Balance + match", "Up to 15 min", "1 revision"] },
      { name: "Cinematic grade", price: "$99", unit: "per video", features: ["Correction + creative look", "Up to 15 min", "2 revisions"] },
      { name: "Custom LUT", price: "$149", unit: "one-off", features: ["Look development", "LUT for your cameras", "Usage guide"] },
    ],
    turnaround: "24–72 hours depending on runtime",
    faqs: [
      { q: "What footage do you need?", a: "Ideally the original camera files (log or RAW) or a flattened export from your edit. We'll advise on the best handoff for your workflow." },
      { q: "Do you use DaVinci Resolve?", a: "Yes. All grading is done in DaVinci Resolve Studio with proper colour management." },
      { q: "Can you fix badly exposed footage?", a: "We can recover a lot, particularly from log and RAW, but we'll be honest about limits." },
      { q: "Can I get a LUT for my channel?", a: "Yes. A custom LUT gives your team a consistent starting point on every shoot." },
      trialFaq,
    ],
    related: ["wedding-video-editing", "real-estate-video-editing", "documentary-video-editing", "motion-graphics"],
    portfolioTags: ["long-form", "ads"],
    blog: ["increase-youtube-audience-retention"],
    video: sampleVideo("Colour grading before/after", 2),
  },
  {
    slug: "captions-and-subtitles",
    name: "Captions & Subtitles",
    category: "Add-ons",
    keyword: "video captions and subtitles service",
    metaTitle: "Video Captions & Subtitles Service | Styled + SRT",
    metaDescription:
      "Accurate captions and subtitles for YouTube, Reels and corporate video: animated word-by-word styles, SRT files and translated subtitles.",
    h1: "Captions and Subtitles That Keep Silent Viewers Watching",
    short: "Animated social captions, accurate SRT files and translated subtitles.",
    intro:
      "A large share of social video is watched with the sound off, and captions make content accessible to deaf and hard-of-hearing viewers. Our captions and subtitles service delivers both: bold, animated word-by-word captions that hold attention on Shorts and Reels, and accurate, properly timed SRT files for YouTube, LinkedIn and corporate platforms.",
    sections: [
      {
        heading: "Styled captions for short-form",
        paragraphs: [
          "On vertical video, captions are part of the design. We animate them word by word, highlight key phrases in your brand colour, add emoji sparingly where it suits your tone, and keep text inside each platform's safe zone so nothing hides under the like button.",
        ],
      },
      {
        heading: "Accuracy you can rely on",
        paragraphs: [
          "Auto-generated captions are a starting point, never the finish. Every transcript is human-reviewed for names, jargon and punctuation, and line breaks are placed at natural pauses so captions are easy to read.",
        ],
      },
      {
        heading: "Subtitles in other languages",
        paragraphs: [
          "Reach international audiences with translated subtitle files in Spanish, Portuguese, French, German, Arabic, Hindi and more. YouTube lets you upload multiple languages per video, often unlocking views from new regions.",
        ],
      },
    ],
    included: [
      "Human-reviewed transcripts",
      "Animated word-by-word captions",
      "Brand colours and fonts",
      "Platform safe-zone placement",
      "SRT / VTT files",
      "Translated subtitles (add-on)",
    ],
    whoFor: [
      { title: "Short-form creators", text: "You need captions on every Short and Reel." },
      { title: "Businesses", text: "Accessibility matters for your audience and compliance." },
      { title: "Global channels", text: "You want to reach viewers in other languages." },
    ],
    pricing: [
      { name: "SRT file", price: "$1.50", unit: "per minute", features: ["Human-reviewed", "SRT / VTT", "24h delivery"] },
      { name: "Styled captions", price: "$15", unit: "per short", features: ["Animated captions", "Brand styling", "Burned-in"] },
      { name: "Translation", price: "$6", unit: "per minute", features: ["Per language", "Native reviewed", "SRT delivery"] },
    ],
    turnaround: "24 hours for most videos",
    faqs: [
      { q: "Are captions human-checked?", a: "Yes. We use speech recognition for speed, then a human reviews every line for accuracy." },
      { q: "Can you match my caption style?", a: "Yes. Send a reference and we'll recreate the font, colours and animation." },
      { q: "Which languages do you translate?", a: "Common options include Spanish, Portuguese, French, German, Arabic and Hindi. Ask about others." },
      { q: "Burned-in or separate file?", a: "Both. Social clips usually get burned-in captions; YouTube and corporate video use SRT files." },
      trialFaq,
    ],
    related: ["short-form-video-editing", "youtube-shorts-editing", "corporate-video-editing", "podcast-clips-editing"],
    portfolioTags: ["shorts"],
    blog: ["increase-youtube-audience-retention"],
    video: sampleVideo("Caption styles", 3),
  },
  {
    slug: "youtube-channel-management",
    name: "YouTube Channel Management",
    category: "Add-ons",
    keyword: "youtube channel management services",
    metaTitle: "YouTube Channel Management Services | Done-For-You",
    metaDescription:
      "YouTube channel management: uploads, titles, descriptions, SEO, scheduling, thumbnails and monthly analytics reviews so you can focus on filming.",
    h1: "YouTube Channel Management So You Can Just Film",
    short: "Uploads, SEO, scheduling and monthly analytics handled for you.",
    intro:
      "Editing is only part of running a channel. Titles, descriptions, tags, end screens, playlists, scheduling and reading analytics take hours every week. Our YouTube channel management services take all of it off your plate. You record; we edit, package, publish and report back each month on what's working and what to try next.",
    sections: [
      {
        heading: "Packaging every upload",
        paragraphs: [
          "For each video we write title options, an SEO-aware description with timestamps and links, choose relevant tags, set end screens and cards, add the video to playlists and schedule it for when your audience is most active. Thumbnails are designed alongside the title so they work together.",
        ],
      },
      {
        heading: "Monthly strategy reviews",
        paragraphs: [
          "Once a month we review your analytics with you: CTR, average view duration, traffic sources, returning viewers and which topics are pulling new subscribers. We'll suggest ideas, packaging tests and format tweaks grounded in your data rather than generic advice.",
        ],
      },
      {
        heading: "Community and Shorts",
        paragraphs: [
          "Optional extras include pinning and replying to comments, posting to the Community tab and scheduling Shorts cut from your long videos to feed new viewers into the channel.",
        ],
      },
    ],
    included: [
      "Title and description writing",
      "Tags, chapters, cards and end screens",
      "Playlist organisation",
      "Upload scheduling",
      "Monthly analytics review call",
      "Content idea suggestions",
    ],
    whoFor: [
      { title: "Busy creators", text: "You want to focus on ideas and filming, not admin." },
      { title: "Businesses", text: "You want a YouTube presence without managing it in-house." },
      { title: "Coaches & experts", text: "You want your channel to generate leads consistently." },
    ],
    pricing: [
      { name: "Publish", price: "$199", unit: "per month", features: ["Up to 4 uploads", "Titles, descriptions, SEO", "Scheduling"] },
      { name: "Grow", price: "$499", unit: "per month", features: ["Up to 8 uploads + Shorts", "Monthly analytics call", "Idea suggestions"] },
      { name: "Full service", price: "Custom", unit: "per month", features: ["Editing + thumbnails + management", "Community management", "Dedicated manager"] },
    ],
    turnaround: "Ongoing monthly service",
    faqs: [
      { q: "Do you need access to my channel?", a: "We request manager-level access through YouTube's permissions system — never your Google password." },
      { q: "Can you guarantee growth?", a: "No honest editor can guarantee views. We apply proven practices and use your data to improve steadily." },
      { q: "Is editing included?", a: "Management can be bought alone or combined with any editing plan for a full done-for-you service." },
      { q: "How often will we talk?", a: "A monthly review call plus async updates in your preferred channel (email, Slack or WhatsApp)." },
      trialFaq,
    ],
    related: ["youtube-video-editing", "youtube-thumbnail-design", "youtube-shorts-editing", "faceless-youtube-editing"],
    portfolioTags: ["long-form", "youtube"],
    blog: ["increase-youtube-audience-retention", "hire-youtube-video-editor"],
    video: sampleVideo("Channel growth overview", 0),
  },
];
