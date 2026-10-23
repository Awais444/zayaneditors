import type { ServiceCopy } from "../services";
import { sampleVideo } from "../media";

const standardFaq = {
  q: "Can I try you before committing?",
  a: "Yes. Send a few minutes of footage and we'll return a free 30–60 second sample edit so you can judge the style on your own material.",
};

export const businessServices: ServiceCopy[] = [
  {
    slug: "ugc-ad-editing",
    name: "UGC Ad Editing",
    category: "Business",
    keyword: "ugc ad editing services",
    metaTitle: "UGC Ad Editing Services | Scroll-Stopping Paid Social",
    metaDescription:
      "UGC ad editing for Meta, TikTok and YouTube ads. Hook variations, captions, b-roll and fast iterations built for testing. Free trial edit.",
    h1: "UGC Ad Editing Services Built for Testing and Scale",
    short: "Creator-style ads with multiple hooks, cut for Meta, TikTok and YouTube placements.",
    intro:
      "A UGC ad has roughly one and a half seconds to stop a thumb. After that it has to earn trust, show the product working and make the next step obvious — all while looking like something a real person posted, not a TV spot. Our UGC ad editing services turn raw creator footage into ad variations you can actually test: several hooks, several lengths, several aspect ratios, all from one shoot. We edit for media buyers, so every file is named, organised and ready to upload to Ads Manager.",
    sections: [
      {
        heading: "Hooks are the whole game",
        paragraphs: [
          "Most ad accounts find that the opening line explains more performance variance than anything else in the creative. So we don't deliver one ad; we deliver one body with three to five hook variations. Those hooks might be a different spoken line, a bold text overlay, a product close-up, a reaction shot or a problem statement. You test them, keep the winner, and we iterate on what the data shows.",
          "When creators record extra takes, we use them. When they don't, we build hooks from b-roll, captions and pacing alone.",
        ],
      },
      {
        heading: "Native-feeling, not over-produced",
        paragraphs: [
          "The fastest way to kill a UGC ad is to make it look like an ad. We keep the handheld energy, use platform-native caption styles, and resist the urge to add glossy transitions. Polish shows up where it matters: clean audio, accurate captions, clear product shots and a call to action that matches the offer on your landing page.",
          "For TikTok and Reels placements we keep key text inside safe zones so nothing hides under the interface buttons.",
        ],
      },
      {
        heading: "Built around your testing workflow",
        paragraphs: [
          "Tell us how your team names creatives and we'll follow it. Each batch arrives in 9:16, 4:5 and 1:1 where needed, at 15, 30 and 60 seconds, with captions burned in or as separate files. If you share performance data each week, we'll suggest new angles based on what's winning — a feedback loop most freelance editors never offer.",
        ],
      },
      {
        heading: "Compliance and claims",
        paragraphs: [
          "Paid platforms reject ads for unsupported claims, before-and-after imagery in some categories and music they can't license. We use commercially licensed tracks, flag risky claims in scripts before we cut, and keep a record of every asset used so your account stays healthy.",
        ],
      },
    ],
    included: [
      "3–5 hook variations per ad",
      "9:16, 4:5 and 1:1 exports",
      "15s, 30s and 60s cut-downs",
      "Native-style captions in safe zones",
      "Product b-roll and text callouts",
      "Commercially licensed music",
      "File naming to match your ad account",
      "Fast iteration rounds based on results",
    ],
    whoFor: [
      { title: "DTC brands", text: "You run paid social and need fresh creative every week to beat fatigue." },
      { title: "Performance agencies", text: "You manage several ad accounts and need white-label editing that keeps up." },
      { title: "UGC creators", text: "You shoot for brands and want edits that make your work look its best." },
      { title: "App marketers", text: "You test dozens of angles and need volume without a quality drop." },
    ],
    pricing: [
      { name: "Single ad", price: "$69", unit: "per ad", features: ["1 hook + 1 body", "2 aspect ratios", "1 revision"] },
      { name: "Test pack", price: "$249", unit: "per batch", features: ["1 body + 5 hooks", "3 aspect ratios, 3 lengths", "2 revisions"] },
      { name: "Creative partner", price: "$1,490", unit: "per month", features: ["8 test packs", "Weekly performance review", "Priority 24h turnaround"] },
    ],
    turnaround: "First batch in 48 hours · iterations in 24 hours",
    faqs: [
      { q: "Do you write the ad scripts too?", a: "We can suggest hooks and structure based on your offer, and refine scripts you or your creators write. Full scriptwriting is available as an add-on." },
      { q: "Which platforms do you edit for?", a: "Meta (Facebook and Instagram), TikTok, YouTube, Snapchat and Pinterest. We follow each platform's current safe zones and length guidance." },
      { q: "Can you work with footage from several creators?", a: "Yes. Mixing creators into one ad, or building a 'many voices' testimonial cut, is one of our most common requests." },
      { q: "Is the music safe for paid ads?", a: "We only use tracks licensed for commercial advertising, and we document each licence." },
      { q: "How many variations should I test?", a: "Most accounts start with 3–5 hooks per concept. Once a winner emerges we iterate the body and call to action around it." },
      standardFaq,
    ],
    related: ["short-form-video-editing", "tiktok-video-editing", "instagram-reels-editing", "motion-graphics"],
    portfolioTags: ["ads"],
    blog: ["hire-youtube-video-editor"],
    video: sampleVideo("UGC ad sample", 1),
  },
  {
    slug: "corporate-video-editing",
    name: "Corporate Video Editing",
    category: "Business",
    keyword: "corporate video editing services",
    metaTitle: "Corporate Video Editing | Brand & Internal Video",
    metaDescription:
      "Corporate video editing for brand films, testimonials, training, events and internal comms. On-brand, accessible and delivered on deadline.",
    h1: "Corporate Video Editing Services for Brands and Teams",
    short: "Brand films, testimonials, training and event recaps edited to your guidelines.",
    intro:
      "Corporate video lives or dies on clarity. A product explainer, a customer story or a town-hall recap has a job to do, and the audience is usually busy. Our corporate video editing services take footage from your crew, your agency or your team's own cameras and turn it into clear, on-brand video that respects your guidelines, your legal review and your deadlines. We work quietly in the background, the way a good post-production partner should.",
    sections: [
      {
        heading: "Your brand, applied consistently",
        paragraphs: [
          "Send your brand guidelines once and we'll build a template: fonts, colour palette, logo animations, lower-third style and end cards. Every video after that matches automatically, whether it's a 30-second social cut or a 20-minute training module. If your guidelines don't cover video yet, we'll propose a motion system and document it for future vendors.",
        ],
      },
      {
        heading: "Customer stories that sound human",
        paragraphs: [
          "Testimonial interviews are usually long and full of good material buried in polite answers. We find the specific moments — the problem before, the turning point, the measurable result — and build a short story around them. B-roll of the customer's real environment and a restrained music bed do the rest. The result feels like a conversation, not a brochure.",
        ],
      },
      {
        heading: "Training, internal comms and events",
        paragraphs: [
          "Internal video is often the most-watched content a company produces, and the least loved. We tighten long presentations, add chapter markers, insert slides and screen recordings cleanly, and caption everything for accessibility and silent viewing. Event footage becomes a two-minute recap for social plus full session recordings for your intranet.",
          "We're comfortable signing NDAs and working inside your security requirements, including restricted cloud folders.",
        ],
      },
      {
        heading: "Review rounds that fit your approvals",
        paragraphs: [
          "Corporate projects involve several stakeholders. We share time-coded review links so marketing, legal and leadership can comment in one place, then consolidate feedback into a single revision round. Final masters arrive in every format you need: web, social, presentation and broadcast-safe versions.",
        ],
      },
    ],
    included: [
      "Brand template: fonts, colours, lower thirds",
      "Logo animation and end cards",
      "Interview editing and story structure",
      "Slide, screen recording and graphic inserts",
      "Accessible captions (SRT + burned-in)",
      "Licensed music and sound mix",
      "Multi-format exports for web and social",
      "NDA and secure file handling",
    ],
    whoFor: [
      { title: "Marketing teams", text: "You need a steady flow of brand and social video without growing headcount." },
      { title: "HR & L&D", text: "You're turning training sessions and onboarding into reusable video." },
      { title: "Production companies", text: "You shoot well and want reliable overflow post-production." },
      { title: "Event organisers", text: "You need fast recaps and full session edits after every event." },
    ],
    pricing: [
      { name: "Social cut", price: "$149", unit: "per video", features: ["Up to 90 seconds", "Brand template applied", "2 revisions"] },
      { name: "Brand video", price: "$449", unit: "per video", features: ["Up to 5 minutes", "Interview + b-roll story", "Motion graphics, 3 revisions"] },
      { name: "Retainer", price: "Custom", unit: "per month", features: ["Dedicated editor", "Agreed monthly volume", "Priority turnaround"] },
    ],
    turnaround: "3–5 business days for brand videos · 48h for social cuts",
    faqs: [
      { q: "Will you sign an NDA?", a: "Yes. We routinely sign NDAs and can work inside your own cloud storage if your security policy requires it." },
      { q: "Can you work with footage from our in-house team?", a: "Absolutely. Phone, webcam or cinema camera — we adapt the edit to what you have and advise on simple improvements for next time." },
      { q: "Do you provide invoices suitable for procurement?", a: "Yes. We issue formal invoices, can complete vendor onboarding forms and support purchase orders." },
      { q: "How do multiple stakeholders give feedback?", a: "Through a single time-coded review link. Everyone comments in one place and we consolidate notes into one revision round." },
      { q: "Can you make videos accessible?", a: "Every corporate video includes accurate captions, and we can add audio description scripts and transcripts on request." },
      standardFaq,
    ],
    related: ["motion-graphics", "color-grading", "captions-and-subtitles", "course-video-editing"],
    portfolioTags: ["ads", "long-form"],
    blog: ["hire-youtube-video-editor"],
    video: sampleVideo("Corporate video sample", 2),
  },
  {
    slug: "real-estate-video-editing",
    name: "Real Estate Video Editing",
    category: "Business",
    keyword: "real estate video editing",
    metaTitle: "Real Estate Video Editing | Listing & Agent Videos",
    metaDescription:
      "Real estate video editing for listing tours, drone footage, agent branding and Reels. Colour-graded, music-matched and delivered in 24–48 hours.",
    h1: "Real Estate Video Editing That Sells the Listing",
    short: "Listing tours, drone and agent-brand videos, graded and delivered fast.",
    intro:
      "Buyers decide whether to book a viewing in the time it takes to scroll past a listing. Real estate video editing is about making a home feel bright, spacious and easy to imagine living in — honestly, without misrepresenting it. We edit listing tours, drone footage, agent introduction videos and social clips for agents, photographers and brokerages, and we deliver fast because listings don't wait.",
    sections: [
      {
        heading: "Listing tours with a natural flow",
        paragraphs: [
          "A good tour moves through a home the way a buyer would: arrival, entry, main living space, kitchen, bedrooms, outdoor areas, closing exterior. We order your clips accordingly, trim shaky starts and stops, smooth gimbal moves and match cuts to the music so the walkthrough feels effortless. Room labels and key features appear as clean on-screen text.",
        ],
      },
      {
        heading: "Colour that sells light and space",
        paragraphs: [
          "Interiors are tricky: mixed window light, warm bulbs and white walls. We balance exposure, recover blown windows where the footage allows, correct colour casts and keep whites clean so rooms look as bright as they feel in person. Drone footage gets a consistent grade so it sits naturally with the ground shots. We never alter permanent features of a property.",
        ],
      },
      {
        heading: "Every listing, every platform",
        paragraphs: [
          "From one shoot we deliver a full horizontal tour for the MLS and YouTube, a branded 60-second highlight, and vertical Reels and TikToks with captions. Unbranded versions for MLS compliance are included where your market requires them.",
          "Agent branding — logo intros, contact end cards, consistent fonts — is set up once and applied to every video.",
        ],
      },
      {
        heading: "Built for photographers and brokerages",
        paragraphs: [
          "Many of our real estate clients are media companies shooting several homes a day. We work white-label, follow your naming conventions, and offer a 24-hour turnaround tier so you can deliver to agents next day.",
        ],
      },
    ],
    included: [
      "Room-by-room tour sequencing",
      "Interior and drone colour correction",
      "Gimbal stabilisation and smoothing",
      "Room labels and feature callouts",
      "Branded and unbranded (MLS) versions",
      "Vertical Reels / TikTok cut-downs",
      "Licensed music matched to the property",
      "24-hour rush option",
    ],
    whoFor: [
      { title: "Real estate agents", text: "You want listings and personal brand content that stand out locally." },
      { title: "Property photographers", text: "You shoot volume and need reliable white-label video post." },
      { title: "Brokerages", text: "You need consistent branding across dozens of agents." },
      { title: "Short-term rental hosts", text: "You want a tour that books more nights." },
    ],
    pricing: [
      { name: "Listing reel", price: "$59", unit: "per listing", features: ["60s vertical highlight", "Colour + music", "1 revision"] },
      { name: "Full tour", price: "$119", unit: "per listing", features: ["2–4 min tour + 60s highlight", "Branded + MLS versions", "2 revisions"] },
      { name: "Volume", price: "$899", unit: "per month", features: ["10 full tours", "24h turnaround", "Dedicated editor"] },
    ],
    turnaround: "24–48 hours per listing",
    faqs: [
      { q: "Do you provide MLS-compliant unbranded versions?", a: "Yes. Every full tour includes an unbranded version without agent details, music licensed for MLS use where needed." },
      { q: "Can you edit drone footage?", a: "Yes. We stabilise, grade and integrate drone shots with ground footage so the whole video feels consistent." },
      { q: "Will you change how the property looks?", a: "We correct exposure and colour so the footage reflects how the home looks in person. We never remove or alter permanent features." },
      { q: "Can you work white-label for my media company?", a: "Yes. Your branding, your file names, no mention of us anywhere." },
      { q: "How fast can you deliver?", a: "Standard turnaround is 48 hours; our 24-hour tier is popular with photographers delivering next day." },
      standardFaq,
    ],
    related: ["color-grading", "instagram-reels-editing", "motion-graphics", "short-form-video-editing"],
    portfolioTags: ["ads"],
    blog: ["youtube-video-editing-cost"],
    video: sampleVideo("Real estate tour sample", 3),
  },
  {
    slug: "gaming-video-editing",
    name: "Gaming Video Editing",
    category: "Business",
    keyword: "gaming video editing",
    metaTitle: "Gaming Video Editing Services | YouTube & Stream Edits",
    metaDescription:
      "Gaming video editing for YouTube, Twitch highlights and Shorts. Meme timing, SFX, facecam layouts and stream-to-video edits. Free trial edit.",
    h1: "Gaming Video Editing With Timing That Lands",
    short: "Stream highlights, gameplay videos and Shorts with meme timing and punchy SFX.",
    intro:
      "Gaming audiences are the toughest crowd on YouTube. They've seen every meme, they skip anything slow, and they can tell instantly when an editor doesn't understand the game. Our gaming video editing services are run by editors who play. We turn hours of streams and gameplay into tight videos with the comedic timing, sound design and visual jokes your community expects, while keeping your personality at the centre.",
    sections: [
      {
        heading: "From eight-hour stream to fifteen-minute video",
        paragraphs: [
          "Send us a VOD and a few timestamps you remember, or just the VOD. We watch for the moments that matter: clutches, fails, chat interactions, rage and genuine laughs. Then we build a video around a through-line so it isn't just a highlight dump — a challenge, a goal or a storyline your viewers can follow.",
        ],
      },
      {
        heading: "Comedy is an editing skill",
        paragraphs: [
          "A well-placed zoom, freeze frame, record scratch or silence can turn an ordinary moment into the clip everyone shares. We use memes and SFX deliberately, not constantly, and we keep a library per channel so recurring jokes become part of your identity. Captions highlight the funniest lines for viewers watching muted.",
        ],
      },
      {
        heading: "Facecam, layouts and game knowledge",
        paragraphs: [
          "We build custom facecam layouts, swap between full-screen gameplay and reaction shots, and add game-specific overlays like maps, kill counters or build orders where they help. Because our editors know the titles — shooters, survival, sandbox, RPGs, competitive esports — we cut on the beats that matter instead of missing the play.",
        ],
      },
      {
        heading: "Shorts from every session",
        paragraphs: [
          "Every long gaming video contains several Shorts. Add our clipping package and we'll cut vertical highlights with stacked facecam and gameplay layouts, captions and loops engineered to rewatch.",
        ],
      },
    ],
    included: [
      "Stream VOD review and highlight selection",
      "Storyline structure for long videos",
      "Meme, zoom and SFX timing",
      "Custom facecam layouts",
      "Game overlays and on-screen counters",
      "Copyright-safe music",
      "Thumbnail-ready frame exports",
      "Vertical Shorts add-on",
    ],
    whoFor: [
      { title: "Streamers", text: "You stream on Twitch or Kick and want YouTube growth without editing your own VODs." },
      { title: "Gaming YouTubers", text: "You upload gameplay videos and want sharper comedic timing." },
      { title: "Esports orgs", text: "You need highlight reels and player content on tight timelines." },
      { title: "Game studios", text: "You want creator-style content for launches and updates." },
    ],
    pricing: [
      { name: "Highlights", price: "$69", unit: "per video", features: ["Up to 10 min final", "Memes + SFX", "1 revision"] },
      { name: "Story edit", price: "$149", unit: "per video", features: ["Up to 20 min final", "Storyline + layouts", "2 revisions"] },
      { name: "Streamer pack", price: "$799", unit: "per month", features: ["4 long videos + 12 Shorts", "Channel style guide", "Priority turnaround"] },
    ],
    turnaround: "First cut in 48–72 hours depending on VOD length",
    faqs: [
      { q: "Do your editors actually play games?", a: "Yes. We match editors to channels by genre so the person cutting your video understands the game and the community." },
      { q: "Can you handle very long VODs?", a: "Yes. Multi-hour streams are normal. Timestamps speed things up but aren't required." },
      { q: "Will my videos get copyright claims?", a: "We use copyright-safe music and follow fair-use-conscious practices for memes and clips. Game publisher policies vary, and we flag risky material." },
      { q: "Can you match my current editing style?", a: "Send two or three videos you like and we'll build a style guide for memes, captions, zoom frequency and music." },
      { q: "Do you make gaming Shorts?", a: "Yes, with stacked facecam layouts, captions and loop-friendly endings." },
      standardFaq,
    ],
    related: ["youtube-video-editing", "youtube-shorts-editing", "youtube-thumbnail-design", "motion-graphics"],
    portfolioTags: ["long-form", "shorts"],
    blog: ["increase-youtube-audience-retention"],
    video: sampleVideo("Gaming edit sample", 0),
  },
  {
    slug: "faceless-youtube-editing",
    name: "Faceless YouTube Editing",
    category: "Business",
    keyword: "faceless youtube video editing",
    metaTitle: "Faceless YouTube Video Editing | Voiceover Channels",
    metaDescription:
      "Faceless YouTube video editing for voiceover, documentary, list and explainer channels. Stock sourcing, motion graphics and retention pacing.",
    h1: "Faceless YouTube Video Editing for Voiceover Channels",
    short: "Voiceover-led videos built from stock, motion graphics and story pacing.",
    intro:
      "On a faceless channel, the edit is the presenter. There's no on-camera personality to hold attention, so every second of screen has to earn its place through visuals that match the script exactly. Our faceless YouTube video editing services build complete videos from your voiceover and script: sourcing licensed footage, creating motion graphics and maps, and pacing the visuals to keep viewers watching through to the end.",
    sections: [
      {
        heading: "Script-matched visuals, line by line",
        paragraphs: [
          "We break your script into beats and plan a visual for each: stock footage, archival images, kinetic text, a chart, a map animation or a simple illustration. The aim is that the screen always shows what the narrator is saying, which is the single biggest factor in keeping faceless videos watchable.",
        ],
      },
      {
        heading: "Licensing done properly",
        paragraphs: [
          "Faceless channels are frequently demonetised for reused content. We source from licensed libraries, keep a log of every asset, and transform footage with original graphics, framing and narration so your videos meet YouTube's guidelines for original content. If you have your own stock subscriptions, we'll use them.",
        ],
      },
      {
        heading: "Consistent channel identity",
        paragraphs: [
          "Without a face, viewers recognise your channel by style: colour grade, typography, transitions, music and recurring graphic elements. We build a channel style guide in the first week and apply it to every upload, so your back catalogue looks like one brand rather than a patchwork of editors.",
        ],
      },
      {
        heading: "Scaling a content operation",
        paragraphs: [
          "Many faceless creators run several channels. We can handle volume — multiple uploads a week across niches — with dedicated editors per channel and a project manager keeping deadlines. Voiceover cleanup, AI voice integration and thumbnail design are available in the same workflow.",
        ],
      },
    ],
    included: [
      "Script breakdown and visual planning",
      "Licensed stock and archival sourcing",
      "Kinetic typography and text animation",
      "Maps, charts and simple infographics",
      "Voiceover cleanup and levelling",
      "Music and sound design",
      "Channel style guide",
      "Asset licence log",
    ],
    whoFor: [
      { title: "Faceless creators", text: "You write and voice videos but don't want to spend days in an editor." },
      { title: "Channel operators", text: "You run multiple channels and need consistent, scalable output." },
      { title: "Documentary & history channels", text: "Your videos need archival research and maps." },
      { title: "Explainer & finance channels", text: "You rely on charts, numbers and clear visual metaphors." },
    ],
    pricing: [
      { name: "Starter", price: "$99", unit: "per video", features: ["Up to 8 min", "Stock + text animation", "1 revision"] },
      { name: "Story", price: "$199", unit: "per video", features: ["Up to 15 min", "Maps, charts, motion graphics", "2 revisions"] },
      { name: "Channel", price: "$1,190", unit: "per month", features: ["8 videos", "Style guide + thumbnails", "Dedicated editor"] },
    ],
    turnaround: "3–4 days for a 10-minute video",
    faqs: [
      { q: "Can faceless videos still be monetised?", a: "Yes, when they add original value. We combine licensed footage with original narration, graphics and structure so videos meet YouTube's original content guidelines." },
      { q: "Do I need to provide the stock footage?", a: "No. We source licensed footage as part of the edit. If you have your own subscriptions we can use those instead." },
      { q: "Can you work with AI voiceovers?", a: "Yes. We clean, pace and mix AI or human voiceovers so they sound natural with the music." },
      { q: "Do you write scripts?", a: "Scriptwriting isn't included by default, but we can recommend writers or review scripts for visual pacing." },
      { q: "How many videos per week can you handle?", a: "Our channel plans support anything from one to several uploads per week, with editors dedicated to each channel." },
      standardFaq,
    ],
    related: ["documentary-video-editing", "motion-graphics", "youtube-thumbnail-design", "youtube-channel-management"],
    portfolioTags: ["long-form", "youtube"],
    blog: ["increase-youtube-audience-retention", "youtube-video-editing-cost"],
    video: sampleVideo("Faceless video sample", 1),
  },
  {
    slug: "video-editing-for-coaches",
    name: "Video Editing for Coaches",
    category: "Business",
    keyword: "video editing for coaches",
    metaTitle: "Video Editing for Coaches & Consultants | Grow Authority",
    metaDescription:
      "Video editing for coaches, consultants and course creators: YouTube, Reels, webinars and sales videos edited to build authority and book calls.",
    h1: "Video Editing for Coaches Who Want More Booked Calls",
    short: "Content that builds authority and turns viewers into discovery calls.",
    intro:
      "For a coach, video isn't entertainment — it's the first session. Prospects watch your content to decide whether you understand their problem and whether they'd enjoy working with you. Our video editing for coaches turns your talks, webinars and talking-head recordings into a consistent stream of YouTube videos, Reels and sales assets that build trust and lead naturally to a booked call.",
    sections: [
      {
        heading: "One recording, a week of content",
        paragraphs: [
          "Busy coaches rarely have time to film daily. We recommend recording one or two longer sessions a week — a teaching video, a Q&A or a client case discussion — and we turn each into a polished YouTube video plus several vertical clips with captions. Your audience sees you everywhere; you film once.",
        ],
      },
      {
        heading: "Editing that builds authority",
        paragraphs: [
          "Authority comes from clarity. We tighten rambling explanations, add on-screen frameworks and key takeaways, and highlight memorable lines with captions. Client results and testimonials are woven in where they support the point, never as bragging. The tone stays warm and personal because that's why clients choose a coach.",
        ],
      },
      {
        heading: "Funnel assets that convert",
        paragraphs: [
          "Beyond organic content we edit VSLs, webinar replays, onboarding videos and course modules. Each has a different job: the VSL earns the click, the webinar earns trust, onboarding reduces refunds. We edit each accordingly and add clear calls to action that point to your calendar or offer.",
        ],
      },
      {
        heading: "Simple for non-technical coaches",
        paragraphs: [
          "You don't need to understand frame rates or export settings. Record on your phone or webcam, drop files in a shared folder and we'll handle the rest. We'll also give gentle feedback on lighting and audio so your recordings improve over time.",
        ],
      },
    ],
    included: [
      "Long-form YouTube edits",
      "3–6 vertical clips per recording",
      "On-screen frameworks and takeaways",
      "Captions styled to your brand",
      "Testimonial and case-study inserts",
      "Calls to action to your calendar or offer",
      "Webinar, VSL and course editing",
      "Recording setup feedback",
    ],
    whoFor: [
      { title: "Business & life coaches", text: "You want consistent content without becoming a full-time creator." },
      { title: "Consultants", text: "You sell high-ticket services and need authority-building video." },
      { title: "Course creators", text: "You need course modules and launch content edited professionally." },
      { title: "Fitness & wellness coaches", text: "You need short-form clips that show your method and personality." },
    ],
    pricing: [
      { name: "Clips", price: "$199", unit: "per recording", features: ["5 vertical clips", "Branded captions", "1 revision"] },
      { name: "Content engine", price: "$990", unit: "per month", features: ["4 YouTube videos + 20 clips", "Frameworks + CTAs", "2 revisions"] },
      { name: "Launch", price: "Custom", unit: "per project", features: ["VSL, webinar, course modules", "Funnel planning", "Dedicated editor"] },
    ],
    turnaround: "48 hours for clips · 3 days for long-form",
    faqs: [
      { q: "I'm not comfortable on camera. Can editing help?", a: "Yes. Tight cuts, b-roll and captions hide pauses and make you look confident. Many of our coaching clients say they finally like watching themselves." },
      { q: "Can you edit my webinars and sales videos?", a: "Yes — VSLs, webinar replays, onboarding and course modules are a core part of this service." },
      { q: "Do I need professional equipment?", a: "No. A modern phone or webcam, a clip-on microphone and a window for light are enough. We'll advise on simple upgrades." },
      { q: "Can you post the content for me?", a: "Our channel management add-on covers uploads, titles, descriptions and scheduling." },
      { q: "Will the content sound like me?", a: "Yes. We keep your voice and teaching style and never add claims you didn't make." },
      standardFaq,
    ],
    related: ["talking-head-video-editing", "course-video-editing", "short-form-video-editing", "captions-and-subtitles"],
    portfolioTags: ["long-form", "shorts"],
    blog: ["hire-youtube-video-editor"],
    video: sampleVideo("Coach content sample", 2),
  },
  {
    slug: "wedding-video-editing",
    name: "Wedding Video Editing",
    category: "Business",
    keyword: "wedding video editing services",
    metaTitle: "Wedding Video Editing Services | For Videographers",
    metaDescription:
      "Wedding video editing for videographers: highlight films, full ceremony edits, teasers and Reels. Cinematic grading, audio sync and white-label delivery.",
    h1: "Wedding Video Editing Services for Busy Videographers",
    short: "Highlight films, ceremonies and teasers edited white-label in your style.",
    intro:
      "Wedding season means shooting every weekend and editing every weekday — until the backlog takes over. Our wedding video editing services give videographers a reliable post-production team that learns your style and delivers films your couples will rewatch for decades. We edit highlight films, full ceremony and speech edits, teasers and social Reels, all white-label under your brand.",
    sections: [
      {
        heading: "Your style, learned once",
        paragraphs: [
          "Every videographer has a signature: documentary or cinematic, romantic or energetic, vow-led or music-led. Send two or three past films and your colour preset or LUT, and we'll build a style guide covering music choices, pacing, grade and how you like to open and close. Every edit after that should feel like you made it.",
        ],
      },
      {
        heading: "Story first: vows, letters and speeches",
        paragraphs: [
          "The best highlight films are built around the couple's own words. We listen through vows, letters and speeches to find the lines that carry emotion, then structure the film around them so the music supports the story rather than replacing it. Audio from lav mics, recorders and camera tracks is synced and cleaned so every word is clear.",
        ],
      },
      {
        heading: "Cinematic colour and sound",
        paragraphs: [
          "We match multiple cameras shot in changing light — bright ceremonies, golden-hour portraits, dim receptions — into a cohesive grade. Music is licensed through your account on platforms like Musicbed or Artlist, and we design sound so the film breathes: ambience, laughter, a glass clink at the right moment.",
        ],
      },
      {
        heading: "Deliverables couples love",
        paragraphs: [
          "Beyond the main film we cut a 60-second teaser for Instagram, vertical Reels for your marketing, and full-length ceremony and speech edits. Exports are delivered in the formats you send to clients, with your logo and credits.",
        ],
      },
    ],
    included: [
      "Style guide from your past films",
      "Highlight film (3–8 minutes)",
      "Full ceremony and speech edits",
      "Multi-camera and audio sync",
      "Colour grading to your preset",
      "Sound design and music editing",
      "Teaser and vertical Reels",
      "White-label delivery",
    ],
    whoFor: [
      { title: "Solo videographers", text: "You shoot every weekend and editing is limiting how many weddings you can book." },
      { title: "Wedding studios", text: "You have multiple shooters and need consistent post-production." },
      { title: "Photo + video teams", text: "You want to add video without hiring an editor in-house." },
      { title: "Destination filmmakers", text: "You travel and need edits progressing while you're shooting." },
    ],
    pricing: [
      { name: "Teaser", price: "$149", unit: "per wedding", features: ["60–90s teaser", "Vertical Reel", "1 revision"] },
      { name: "Highlight", price: "$449", unit: "per wedding", features: ["3–8 min highlight + teaser", "Grade + sound design", "2 revisions"] },
      { name: "Full package", price: "$799", unit: "per wedding", features: ["Highlight, teaser, ceremony, speeches", "Multi-cam sync", "3 revisions"] },
    ],
    turnaround: "7–10 days for full packages · peak-season slots booked ahead",
    faqs: [
      { q: "Do you work white-label?", a: "Yes. Your couples will never know we exist. Files carry your branding only." },
      { q: "How do I send footage?", a: "Most videographers upload via Google Drive, Dropbox or a shipped drive for very large weddings. We confirm receipt and check every card." },
      { q: "Can you use my LUTs and music account?", a: "Yes. We'll apply your LUTs and license music through your Musicbed, Artlist or other account so licences stay in your name." },
      { q: "What about peak season?", a: "We reserve capacity for returning clients. Book slots for your busiest months early and we'll hold them." },
      { q: "Can you edit only the ceremony or speeches?", a: "Yes. Documentary edits of ceremonies and speeches are available on their own." },
      standardFaq,
    ],
    related: ["color-grading", "instagram-reels-editing", "documentary-video-editing", "motion-graphics"],
    portfolioTags: ["wedding", "events"],
    blog: ["hire-youtube-video-editor"],
    video: sampleVideo("Wedding film sample", 3),
  },
];
