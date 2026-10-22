import type { ServiceCopy } from "../services";
import { sampleVideo } from "../media";

export const longFormServices: ServiceCopy[] = [
  {
    slug: "youtube-video-editing",
    name: "YouTube Video Editing",
    category: "Long-Form",
    keyword: "youtube video editing services",
    metaTitle: "YouTube Video Editing Services | Retention-First Edits",
    metaDescription:
      "Professional YouTube video editing services built for retention: sharp hooks, tight pacing, sound design and thumbnails. First cut in 48h. Free trial edit.",
    h1: "YouTube Video Editing Services That Hold Attention",
    short: "Retention-first edits for creators who want watch time, not just a tidy timeline.",
    intro:
      "Most YouTube videos don't fail because the idea is bad. They fail in the first thirty seconds, when the viewer decides whether this is worth the next ten minutes. Our YouTube video editing services are built around that decision. We cut for retention: a hook that earns the click, pacing that never lets the energy sag, and visual changes timed to the moments where your audience retention graph usually drops. You film; we turn raw footage into an upload you're proud to publish — every week, on schedule.",
    sections: [
      {
        heading: "Editing for the algorithm and the human watching",
        paragraphs: [
          "YouTube rewards videos people keep watching. That sounds obvious, but it changes how an editor works. Instead of simply removing mistakes, we look for dead air, repeated points and slow setups that quietly push viewers toward the back button. We tighten them, then add pattern interrupts — B-roll, zooms, on-screen text, sound effects — at a rhythm that matches your style rather than a generic template.",
          "We also respect what makes your channel yours. A calm educational channel shouldn't be cut like a hyperactive challenge video. Before the first edit we study your best-performing uploads and your audience retention data (if you share it) so the edit feels like a better version of you.",
        ],
      },
      {
        heading: "The hook: your first 30 seconds",
        paragraphs: [
          "Every edit starts with the opening. We restructure your intro so the payoff is promised immediately, cut the throat-clearing, and often pull a strong moment from later in the video to open with. If the footage doesn't contain a strong hook, we'll tell you and suggest a quick pickup line you can record on your phone.",
        ],
      },
      {
        heading: "Sound, colour and the finishing pass",
        paragraphs: [
          "Viewers forgive average visuals far faster than bad audio. Every YouTube edit includes noise reduction, levelling, de-essing and licensed music beds mixed under your voice. On the visual side we correct exposure and white balance, match cameras in multi-cam shoots and apply a consistent look so your channel is recognisable at a glance.",
          "Finally we export to YouTube's recommended specs, add chapters if you want them, and deliver captions-ready files. Thumbnails and Shorts cut-downs can be added to any plan.",
        ],
      },
      {
        heading: "A workflow that survives a weekly schedule",
        paragraphs: [
          "Consistency grows channels. Upload your footage to a shared Drive or Dropbox folder, fill in a two-minute brief, and you'll have a first cut within 48 hours. Leave time-coded comments on Frame.io or a simple doc, and revisions come back within 24 hours. Most clients settle into a rhythm where they never think about editing again — they just film.",
        ],
      },
    ],
    included: [
      "Hook restructure and intro tightening",
      "Jump cuts, pacing and dead-air removal",
      "B-roll, stock footage and screen recordings",
      "Zooms, motion text and lower thirds",
      "Sound design, music and audio cleanup",
      "Colour correction and camera matching",
      "Chapters and end-screen space",
      "2 rounds of revisions",
    ],
    whoFor: [
      { title: "Growing creators", text: "You're uploading weekly and editing is eating the time you need for ideas and filming." },
      { title: "Educators & explainers", text: "Your content is valuable but viewers drop off before the good part." },
      { title: "Personal brands", text: "You want a polished channel that supports your business without hiring in-house." },
      { title: "Agencies", text: "You need a reliable white-label team for client channels." },
    ],
    pricing: [
      { name: "Essential", price: "$79", unit: "per video", features: ["Up to 10 min final", "Cuts, music, captions", "1 revision"] },
      { name: "Retention", price: "$149", unit: "per video", features: ["Up to 15 min final", "B-roll, motion text, SFX", "2 revisions"] },
      { name: "Premium", price: "$299", unit: "per video", features: ["Up to 25 min final", "Custom graphics & grade", "Unlimited minor revisions"] },
    ],
    turnaround: "First cut in 48 hours · revisions in 24 hours",
    faqs: [
      { q: "How long does a YouTube edit take?", a: "A standard 10–15 minute video is delivered as a first cut within 48 hours of receiving footage and a brief. Longer or graphics-heavy videos may take 3–4 days; we confirm before starting." },
      { q: "Do you follow my existing style?", a: "Yes. Send two or three videos you love (yours or other creators') and we'll build a style guide covering fonts, colours, music mood, zoom frequency and caption style." },
      { q: "Who owns the edited video?", a: "You do. Full rights to the final video and project files transfer to you on payment. We only show work in our portfolio with your permission." },
      { q: "Can you work from a script or outline?", a: "Absolutely. A script helps us place B-roll and graphics precisely, but we're equally comfortable with unscripted, talk-to-camera footage." },
      { q: "What software do you use?", a: "Premiere Pro and DaVinci Resolve for editing and colour, After Effects for motion graphics, and iZotope RX for audio repair." },
      { q: "Can I try you before committing?", a: "Yes — we offer a free 30–60 second trial edit so you can judge our style on your own footage." },
    ],
    related: ["long-form-video-editing", "youtube-thumbnail-design", "youtube-shorts-editing", "youtube-channel-management"],
    portfolioTags: ["long-form", "youtube"],
    blog: ["youtube-video-editing-cost", "increase-youtube-audience-retention"],
    video: sampleVideo("YouTube video editing sample", 0),
  },
  {
    slug: "long-form-video-editing",
    name: "Long-Form Video Editing",
    category: "Long-Form",
    keyword: "long form video editing services",
    metaTitle: "Long-Form Video Editing Services | 20–90 Min Videos",
    metaDescription:
      "Long-form video editing services for 20–90 minute videos: interviews, deep dives, essays and livestream recaps. Structured, paced and polished in days.",
    h1: "Long-Form Video Editing Services for Deep-Dive Content",
    short: "Structured edits for 20–90 minute videos that stay gripping from start to finish.",
    intro:
      "Long videos are a different craft. Keeping someone engaged for forty minutes isn't about more effects — it's about structure. Our long-form video editing services treat your footage like a story with acts, chapters and payoffs. We shape hours of recording into a narrative that flows, signpost what's coming so viewers stay oriented, and pace the edit so energy rises and falls on purpose rather than by accident.",
    sections: [
      {
        heading: "Structure before style",
        paragraphs: [
          "When we receive two hours of footage for a 35-minute video, the first job is a paper edit: a written outline of the strongest segments in the best order. Sometimes that means moving your conclusion to the opening, merging two tangents, or cutting a section you love because it slows the middle. We share the outline with you before cutting so big structural decisions are yours.",
          "Chapters, recurring section titles and short recaps help viewers navigate long content and give YouTube clean timestamps to surface in search.",
        ],
      },
      {
        heading: "Managing energy across the runtime",
        paragraphs: [
          "Retention graphs for long videos tend to sag around the 30–40% mark. We plan for it: a mid-video re-hook, a visual change of scene, a story beat or a teased reveal placed exactly where interest would otherwise dip. Music shifts mark new sections; B-roll density rises in explanatory stretches and pulls back when your delivery is strong enough to carry the frame on its own.",
        ],
      },
      {
        heading: "Built for large projects",
        paragraphs: [
          "Long-form projects mean big files, multiple cameras and sometimes screen recordings or archival footage. We work with proxies so turnaround stays fast, sync multi-cam angles automatically, and keep an organised project you can hand to anyone later. Footage can arrive via Google Drive, Dropbox, Frame.io or a WeTransfer link.",
          "For documentary-style essays we can source licensed stock, archival clips and music, and we keep a log of every licence for your records.",
        ],
      },
      {
        heading: "Repurposing a long video into many",
        paragraphs: [
          "One long video contains a week of short-form content. Add our clipping add-on and we'll pull five to ten vertical clips with captions from every long-form edit, ready for Shorts, Reels and TikTok.",
        ],
      },
    ],
    included: [
      "Paper edit / story outline before cutting",
      "Multi-camera sync and switching",
      "Chapter titles and timestamps",
      "Mid-video re-hooks and pacing passes",
      "B-roll, archival and stock sourcing",
      "Full audio mix and loudness normalisation",
      "Colour correction and look",
      "2 rounds of revisions",
    ],
    whoFor: [
      { title: "Video essayists", text: "Script-driven deep dives that need rhythm and visual variety." },
      { title: "Interview channels", text: "Long conversations that need trimming into a tight, watchable story." },
      { title: "Livestreamers", text: "Turn a three-hour stream into a 30-minute highlight video." },
      { title: "Course & webinar hosts", text: "Long recordings that should feel produced, not recorded." },
    ],
    pricing: [
      { name: "20–30 min", price: "$199", unit: "per video", features: ["Up to 2h raw", "Chapters & B-roll", "2 revisions"] },
      { name: "30–60 min", price: "$349", unit: "per video", features: ["Up to 4h raw", "Multi-cam, graphics", "2 revisions"] },
      { name: "60–90 min", price: "$549", unit: "per video", features: ["Up to 6h raw", "Full story edit", "3 revisions"] },
    ],
    turnaround: "3–5 business days for first cut",
    faqs: [
      { q: "How do you price long-form editing?", a: "By finished minutes and complexity. Use the per-minute calculator on our pricing page for an estimate; we confirm a fixed quote before starting." },
      { q: "Can you cut a 3-hour stream into a highlight video?", a: "Yes. Tell us the target length and any moments you remember, and we'll review the full recording and build the strongest highlight edit." },
      { q: "Do I get to approve the structure first?", a: "Yes. For videos over 30 minutes we share a paper edit outline so you can approve the structure before we invest time in detailed cutting." },
      { q: "Can you handle multiple cameras?", a: "We routinely edit two- to four-camera shoots and sync them via audio waveform, so you don't need a clapper or timecode." },
      { q: "Do you source stock footage?", a: "Yes, from licensed libraries. If you have your own Storyblocks, Envato or Artlist account we can use it, otherwise stock is included in Premium tiers." },
    ],
    related: ["youtube-video-editing", "documentary-video-editing", "podcast-video-editing", "short-form-video-editing"],
    portfolioTags: ["long-form", "documentary"],
    blog: ["increase-youtube-audience-retention"],
    video: sampleVideo("Long-form video editing sample", 1),
  },
  {
    slug: "talking-head-video-editing",
    name: "Talking Head Video Editing",
    category: "Long-Form",
    keyword: "talking head video editing",
    metaTitle: "Talking Head Video Editing | Engaging Face-to-Camera",
    metaDescription:
      "Talking head video editing that makes face-to-camera content engaging: punch-ins, captions, B-roll and clean audio. For coaches, experts and creators.",
    h1: "Talking Head Video Editing That Never Feels Static",
    short: "Turn one camera and one voice into a video that feels dynamic and confident.",
    intro:
      "A single person talking to a camera is the most efficient content format there is — and the easiest to make boring. Our talking head video editing gives face-to-camera footage the movement and polish it needs: punch-in zooms that emphasise key lines, kinetic captions, relevant B-roll, and audio that sounds like a studio even if you recorded in a spare bedroom. You stay the focus; the edit just makes sure nobody looks away.",
    sections: [
      {
        heading: "Making one angle feel like three",
        paragraphs: [
          "Most talking head videos are filmed with one camera. By shooting in 4K and reframing in the edit, we create wide, medium and close-up shots from the same clip and switch between them on the beat of your sentences. Combined with subtle push-ins on important points, it gives the feel of a multi-camera production without extra gear.",
        ],
      },
      {
        heading: "Cutting for confidence",
        paragraphs: [
          "We remove ums, false starts, long pauses and repeated takes, but we're careful not to over-cut. A natural breath or a moment of thought can make you more relatable. The goal is that you sound sharp and certain, not robotically chopped.",
          "If you record multiple takes of a line, we pick the strongest delivery and keep a consistent eyeline and energy across the video.",
        ],
      },
      {
        heading: "Visual support for what you say",
        paragraphs: [
          "When you mention a statistic, a tool or a step, we put it on screen. Lists become animated bullet points, product names get logos, and abstract ideas get illustrative B-roll. This reinforces your message for viewers watching with sound off and keeps the eye moving.",
          "Background noise, room echo and uneven levels are cleaned up on every video. We can also add a subtle background blur or colour grade to make a plain room look intentional.",
        ],
      },
      {
        heading: "Repeatable formats",
        paragraphs: [
          "Talking head content works best as a series. We build reusable title cards, lower thirds and caption styles for your brand so each new episode is recognisably yours and faster to produce.",
        ],
      },
    ],
    included: [
      "Filler word and pause removal",
      "Digital multi-angle reframing",
      "Punch-in zooms on key lines",
      "Kinetic or burned-in captions",
      "Contextual B-roll and icons",
      "Room echo and noise cleanup",
      "Brand title cards and lower thirds",
      "2 rounds of revisions",
    ],
    whoFor: [
      { title: "Coaches & consultants", text: "Share expertise on camera without looking like a webinar recording." },
      { title: "Founders", text: "Build a personal brand with weekly thought-leadership videos." },
      { title: "Educators", text: "Turn lessons into engaging explainers." },
      { title: "LinkedIn creators", text: "Native video that stops the scroll in a professional feed." },
    ],
    pricing: [
      { name: "Short", price: "$69", unit: "per video", features: ["Up to 5 min", "Cuts, captions, zooms", "1 revision"] },
      { name: "Standard", price: "$119", unit: "per video", features: ["Up to 12 min", "B-roll & motion text", "2 revisions"] },
      { name: "Series", price: "$399", unit: "4 videos / month", features: ["Up to 12 min each", "Brand templates", "Priority queue"] },
    ],
    turnaround: "First cut in 48 hours",
    faqs: [
      { q: "I only have a phone — will that work?", a: "Yes. Modern phones shoot excellent footage. We'll send a one-page setup guide covering light, framing and audio to get the best results." },
      { q: "Can you make me look less nervous?", a: "Cutting out hesitations, choosing your strongest takes and adding movement makes a huge difference to how confident you come across." },
      { q: "Do you add captions?", a: "Yes. Styled burned-in captions are included, and we can deliver an SRT file for YouTube or LinkedIn uploads." },
      { q: "Will you edit to a script I read from a teleprompter?", a: "Yes. Teleprompter footage often needs eye-line and pacing fixes, which we handle as part of the edit." },
      { q: "Can you add my logo and brand colours?", a: "We create a small brand kit with your fonts, colours and logo animations and use it across every video." },
    ],
    related: ["video-editing-for-coaches", "captions-and-subtitles", "youtube-video-editing", "course-video-editing"],
    portfolioTags: ["long-form", "talking-head"],
    blog: ["increase-youtube-audience-retention"],
    video: sampleVideo("Talking head editing sample", 2),
  },
  {
    slug: "documentary-video-editing",
    name: "Documentary Video Editing",
    category: "Long-Form",
    keyword: "documentary video editing services",
    metaTitle: "Documentary Video Editing Services | Story-Led Edits",
    metaDescription:
      "Documentary video editing for YouTube docs, brand films and mini-series. Story structure, archival research, sound design and cinematic colour grading.",
    h1: "Documentary Video Editing With Real Story Craft",
    short: "Story-led editing for YouTube documentaries, brand films and mini-series.",
    intro:
      "Documentaries live or die by story. Interviews, B-roll and archival footage are just raw material until an editor finds the thread that ties them together. Our documentary video editing service is built for creators and brands making story-driven content — YouTube documentaries, founder stories, investigative explainers and short brand films. We find the narrative, build tension and release, and finish with sound and colour that feel cinematic.",
    sections: [
      {
        heading: "Finding the story in the footage",
        paragraphs: [
          "We start by logging and transcribing everything. From the transcripts we pull the strongest soundbites, map them to a three-act structure and identify gaps where narration or extra footage is needed. You get a story outline and an assembly cut before we polish anything, so the narrative is right before the details.",
        ],
      },
      {
        heading: "Archival, stock and research",
        paragraphs: [
          "YouTube documentaries often rely on news clips, maps, photos and historical footage. We research and source visuals that support your script, track licences and fair-use considerations, and animate still images with parallax and camera moves so they feel alive.",
          "Data and timelines are visualised with clean motion graphics that match the tone of the film — restrained for serious subjects, punchier for entertainment.",
        ],
      },
      {
        heading: "Sound is half the film",
        paragraphs: [
          "A documentary's mood comes from its soundscape. We build layered ambience, carefully chosen score, risers and silence where it matters. Interview audio is cleaned and matched so different locations sound consistent.",
        ],
      },
      {
        heading: "Cinematic finishing",
        paragraphs: [
          "Colour grading ties together footage from different cameras and sources into one visual world. We deliver masters for YouTube, social cut-downs, trailers and, if needed, festival-spec exports.",
        ],
      },
    ],
    included: [
      "Footage logging and transcription",
      "Story outline and assembly cut",
      "Archival and stock research",
      "Photo animation and map graphics",
      "Layered sound design and score",
      "Cinematic colour grade",
      "Trailer and social cut-downs",
      "3 rounds of revisions",
    ],
    whoFor: [
      { title: "YouTube documentary channels", text: "Investigative, history, true-crime and business story channels." },
      { title: "Brands", text: "Founder stories and customer films that build trust." },
      { title: "Non-profits", text: "Impact films for campaigns and donors." },
      { title: "Independent filmmakers", text: "An extra pair of hands for the edit suite." },
    ],
    pricing: [
      { name: "Mini doc", price: "$499", unit: "per film", features: ["Up to 10 min", "Story edit & grade", "2 revisions"] },
      { name: "Feature YouTube doc", price: "$1,199", unit: "per film", features: ["Up to 30 min", "Archival research", "3 revisions"] },
      { name: "Series", price: "Custom", unit: "quote", features: ["Multi-episode", "Dedicated editor", "Showrunner support"] },
    ],
    turnaround: "Assembly cut in 5–7 business days",
    faqs: [
      { q: "Can you write narration or scripts?", a: "We can help shape a script from your research and interviews and recommend voiceover artists if you don't narrate yourself." },
      { q: "How do you handle copyrighted footage?", a: "We prioritise licensed and public-domain sources and flag anything that relies on fair use so you can make an informed decision." },
      { q: "How much footage can you work with?", a: "We've edited projects with 40+ hours of rushes. Larger projects simply need more logging time, which we include in the quote." },
      { q: "Do you colour grade log footage?", a: "Yes. We grade S-Log, V-Log, BRAW and other log formats in DaVinci Resolve." },
      { q: "Can you deliver a trailer?", a: "Yes. A 60–90 second trailer and vertical teasers are available for every documentary project." },
    ],
    related: ["long-form-video-editing", "color-grading", "motion-graphics", "corporate-video-editing"],
    portfolioTags: ["long-form", "documentary"],
    blog: ["hire-youtube-video-editor"],
    video: sampleVideo("Documentary editing sample", 3),
  },
  {
    slug: "vlog-editing",
    name: "Vlog Editing",
    category: "Long-Form",
    keyword: "vlog editing services",
    metaTitle: "Vlog Editing Services | Travel, Lifestyle & Daily Vlogs",
    metaDescription:
      "Vlog editing services for travel, lifestyle and daily vloggers. We turn hours of clips into a fun, story-driven vlog with music, sound design and colour.",
    h1: "Vlog Editing Services That Turn Clips Into Stories",
    short: "Travel, lifestyle and daily vlogs edited into stories your audience binges.",
    intro:
      "Vlogging means filming everything and sorting it out later — and \"later\" is where most vloggers burn out. Our vlog editing services take your folder of phone clips, drone shots and talk-to-camera moments and turn them into a story with a beginning, middle and end. We pick the best moments, set them to music that fits the mood, and add the little details — sound effects, speed ramps, text pop-ups — that make vlogs fun to watch.",
    sections: [
      {
        heading: "From 400 clips to one story",
        paragraphs: [
          "A single travel day can produce hundreds of clips. We review everything, tag the highlights and look for a narrative: a goal, a problem, a payoff. Even everyday vlogs work better with a light story arc, and finding it is our job, not yours.",
          "Tell us anything you want included — a funny moment, a sponsor segment, a reveal — and we'll make sure it lands.",
        ],
      },
      {
        heading: "Music and rhythm",
        paragraphs: [
          "Vlogs are driven by music. We cut montages on the beat, use licensed tracks from libraries like Epidemic Sound or Artlist (your account or ours), and blend natural sound so locations feel real. Transitions are motivated by movement rather than stacked presets.",
        ],
      },
      {
        heading: "Cinematic but personal",
        paragraphs: [
          "We stabilise shaky handheld shots, colour-match phone, action-cam and drone footage, and apply a grade that suits your channel's vibe. At the same time we keep your personality front and centre — the honest, unscripted moments are what your audience subscribes for.",
        ],
      },
      {
        heading: "Sponsor-ready",
        paragraphs: [
          "Brand deals need clean integration. We edit sponsor segments to the brand's brief, add required disclosures, and deliver extra cut-downs for the sponsor's own channels on request.",
        ],
      },
    ],
    included: [
      "Full footage review and highlight selection",
      "Story arc and pacing",
      "Beat-synced montages",
      "Stabilisation and speed ramps",
      "Colour matching across devices",
      "Licensed music and SFX",
      "Sponsor segment integration",
      "2 rounds of revisions",
    ],
    whoFor: [
      { title: "Travel vloggers", text: "Multi-device footage from trips around the world." },
      { title: "Family & lifestyle channels", text: "Weekly vlogs that need a consistent schedule." },
      { title: "Fitness & food creators", text: "Day-in-the-life content with personality." },
      { title: "Event vlogs", text: "Conferences, launches and behind-the-scenes days." },
    ],
    pricing: [
      { name: "Daily vlog", price: "$99", unit: "per video", features: ["Up to 12 min", "Up to 1h raw", "1 revision"] },
      { name: "Travel vlog", price: "$179", unit: "per video", features: ["Up to 20 min", "Up to 3h raw", "2 revisions"] },
      { name: "Cinematic", price: "$299", unit: "per video", features: ["Up to 20 min", "Full grade & SFX", "2 revisions"] },
    ],
    turnaround: "First cut in 48–72 hours",
    faqs: [
      { q: "How should I send hundreds of clips?", a: "Upload a single folder to Google Drive or Dropbox. No need to rename or sort — we handle organisation." },
      { q: "Can you match the style of a vlogger I like?", a: "Yes. Share links and we'll analyse their pacing, music and transitions, then adapt that feel to your footage." },
      { q: "Do you use copyrighted music?", a: "No. We only use music licensed for YouTube to keep your videos safe from claims." },
      { q: "Can you edit drone footage?", a: "Yes, including D-Log grading and stabilisation." },
      { q: "Can I get a thumbnail too?", a: "Add our thumbnail design add-on and we'll design a thumbnail from your footage or a quick photo shoot." },
    ],
    related: ["youtube-video-editing", "color-grading", "youtube-thumbnail-design", "instagram-reels-editing"],
    portfolioTags: ["long-form", "vlog"],
    blog: ["increase-youtube-audience-retention"],
    video: sampleVideo("Vlog editing sample", 0),
  },
  {
    slug: "course-video-editing",
    name: "Course Video Editing",
    category: "Long-Form",
    keyword: "online course video editing",
    metaTitle: "Online Course Video Editing | Lessons Students Finish",
    metaDescription:
      "Online course video editing for creators and educators: clean lessons, screen recordings, slides, captions and consistent branding across every module.",
    h1: "Online Course Video Editing for Lessons Students Finish",
    short: "Clear, consistent course lessons that boost completion and reduce refunds.",
    intro:
      "Course completion rates are notoriously low, and poor production is a big part of why. Students who struggle to hear, follow or stay focused don't finish — and they ask for refunds. Our online course video editing makes every lesson clear and consistent: clean audio, readable screen recordings, on-screen summaries and branding that makes your course feel premium. Whether you sell on Kajabi, Teachable, Thinkific or Udemy, we'll deliver lessons that meet each platform's specs.",
    sections: [
      {
        heading: "Clarity first",
        paragraphs: [
          "Learning requires focus, so we remove distractions: mistakes, long pauses and tangents are cut, and audio is cleaned and levelled so students never strain to hear you. Key terms and steps appear on screen as you mention them, which helps visual learners and anyone watching on mute.",
        ],
      },
      {
        heading: "Screen recordings that are easy to follow",
        paragraphs: [
          "Software tutorials often show a tiny cursor on a huge screen. We zoom into the area you're working in, highlight clicks and blur sensitive information like emails or API keys. If you combine webcam and screen, we create clean picture-in-picture layouts.",
        ],
      },
      {
        heading: "Consistency across modules",
        paragraphs: [
          "A course recorded over months can look like it was made by different people. We create a branded template — intro sting, module title cards, lower thirds, summary slides — and apply it across every lesson so the course feels cohesive.",
          "We also organise deliverables by module and lesson, named exactly as your course platform needs.",
        ],
      },
      {
        heading: "Ready for every platform",
        paragraphs: [
          "Udemy has its own audio and resolution requirements; Kajabi and Teachable prefer different file sizes. We export accordingly and supply SRT captions for accessibility, and promotional trailers and social clips to help you launch.",
        ],
      },
    ],
    included: [
      "Mistake and pause removal",
      "Screen recording zooms and highlights",
      "Picture-in-picture layouts",
      "Branded module and lesson templates",
      "On-screen key points and summaries",
      "Audio cleanup and levelling",
      "SRT captions per lesson",
      "Platform-ready file naming",
    ],
    whoFor: [
      { title: "Course creators", text: "Launching or refreshing a paid online course." },
      { title: "Coaches", text: "Turning programmes into self-paced products." },
      { title: "SaaS companies", text: "Academy and onboarding video libraries." },
      { title: "Training teams", text: "Internal L&D content that people actually watch." },
    ],
    pricing: [
      { name: "Per lesson", price: "$39", unit: "per lesson", features: ["Up to 10 min", "Cuts, audio, titles", "1 revision"] },
      { name: "Module", price: "$249", unit: "up to 8 lessons", features: ["Template & graphics", "Captions", "2 revisions"] },
      { name: "Full course", price: "Custom", unit: "quote", features: ["Any length", "Trailer included", "Dedicated editor"] },
    ],
    turnaround: "5–10 lessons per week, per editor",
    faqs: [
      { q: "How quickly can you edit an entire course?", a: "A typical 40-lesson course takes 2–3 weeks. We can add editors to meet a launch date." },
      { q: "Can you blur private information in screen recordings?", a: "Yes. We blur or mask emails, keys and personal data on every frame they appear." },
      { q: "Do you add quizzes or slides?", a: "We can design slide animations and summary screens. Quizzes are built inside your course platform, but we can design visual assets for them." },
      { q: "Will you follow my outline?", a: "Yes. Share your curriculum and we'll name and order files to match it." },
      { q: "Can you create a course trailer?", a: "Yes — a 60–90 second sales trailer and vertical teasers for social launch campaigns." },
    ],
    related: ["talking-head-video-editing", "video-editing-for-coaches", "captions-and-subtitles", "motion-graphics"],
    portfolioTags: ["long-form", "education"],
    blog: ["hire-youtube-video-editor"],
    video: sampleVideo("Course video editing sample", 1),
  },
];
