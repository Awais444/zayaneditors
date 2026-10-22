import type { ServiceCopy } from "../services";
import { sampleVideo } from "../media";

export const podcastServices: ServiceCopy[] = [
  {
    slug: "podcast-video-editing",
    name: "Podcast Video Editing",
    category: "Podcast",
    keyword: "podcast video editing services",
    metaTitle: "Podcast Video Editing Services | Multi-Cam Episodes",
    metaDescription:
      "Podcast video editing services for YouTube and Spotify: multi-cam switching, remote recordings, clean audio, chapters and clips. Weekly episodes on time.",
    h1: "Podcast Video Editing Services for YouTube and Spotify",
    short: "Multi-camera and remote podcast episodes edited into polished, watchable shows.",
    intro:
      "Video podcasts are now one of the biggest formats on YouTube, and Spotify has made video a first-class feature. But turning a two-hour, three-camera recording into an episode people actually watch takes time most hosts don't have. Our podcast video editing services handle it end to end: multi-cam switching, remote recording cleanup, audio mastering, branded intros, chapters and YouTube-ready exports — on the same day every week.",
    sections: [
      {
        heading: "Multi-cam editing that follows the conversation",
        paragraphs: [
          "We cut between host, guest and wide shots naturally, following who's speaking and catching reactions that add life to the conversation. Cameras are synced automatically from audio, so there's no need for clapperboards or timecode. For solo shows we use punch-ins to keep things moving.",
        ],
      },
      {
        heading: "Remote recordings made to look intentional",
        paragraphs: [
          "Riverside, Zoom, SquadCast and StreamYard recordings are edited into clean side-by-side or speaker-switching layouts with branded frames. We fix audio drift, mismatched levels and the occasional frozen frame.",
        ],
      },
      {
        heading: "Tightening without losing authenticity",
        paragraphs: [
          "Podcast listeners like natural conversation, so we edit with a light touch: removing false starts, crosstalk, long tangents and technical hiccups while keeping the rhythm of real dialogue. If you want a tighter cut, we'll remove whole sections that don't serve the episode.",
          "We add a cold open — a compelling 20–30 second teaser from later in the episode — to hook YouTube viewers who otherwise drift away during introductions.",
        ],
      },
      {
        heading: "Ready for every platform",
        paragraphs: [
          "Each episode is delivered as a YouTube video with chapters, an audio master for Apple Podcasts and Spotify, and optional vertical clips. Combine with podcast clips editing to promote every episode on Shorts, Reels and TikTok.",
        ],
      },
    ],
    included: [
      "Multi-camera sync and switching",
      "Remote recording layouts",
      "Cold open / teaser",
      "Branded intro, outro and lower thirds",
      "Audio cleanup and mastering",
      "Chapter markers",
      "Audio-only export for RSS",
      "2 rounds of revisions",
    ],
    whoFor: [
      { title: "Interview podcasts", text: "Weekly guest shows recorded in studio or remotely." },
      { title: "Business podcasts", text: "B2B shows that need a professional look." },
      { title: "Comedy & culture shows", text: "Conversations with energy and reactions." },
      { title: "Podcast studios", text: "Overflow editing for client shows." },
    ],
    pricing: [
      { name: "Up to 45 min", price: "$149", unit: "per episode", features: ["Up to 3 cameras", "Audio master", "1 revision"] },
      { name: "Up to 90 min", price: "$229", unit: "per episode", features: ["Cold open & chapters", "Branded graphics", "2 revisions"] },
      { name: "Weekly", price: "$799", unit: "4 episodes / month", features: ["Up to 90 min", "5 clips per episode", "Priority"] },
    ],
    turnaround: "Episode delivered in 48–72 hours",
    faqs: [
      { q: "How many cameras can you edit?", a: "We regularly edit up to four camera angles plus screen shares and remote feeds." },
      { q: "Do you edit Riverside recordings?", a: "Yes. Share the separate tracks and we'll build a clean multi-person layout." },
      { q: "Can you also deliver the audio podcast?", a: "Every episode includes a mastered audio file ready for your podcast host." },
      { q: "Do you add chapters?", a: "Yes, chapter timestamps are included in the YouTube description file." },
      { q: "Can you publish episodes for us?", a: "Publishing to YouTube and your podcast host is available with channel management." },
    ],
    related: ["podcast-audio-editing", "podcast-clips-editing", "long-form-video-editing", "youtube-channel-management"],
    portfolioTags: ["podcast", "long-form"],
    blog: ["youtube-video-editing-cost", "hire-youtube-video-editor"],
    video: sampleVideo("Podcast video editing sample", 3),
  },
  {
    slug: "podcast-audio-editing",
    name: "Podcast Audio Editing",
    category: "Podcast",
    keyword: "podcast audio editing services",
    metaTitle: "Podcast Audio Editing Services | Broadcast-Ready Sound",
    metaDescription:
      "Podcast audio editing and mastering: noise removal, levelling, filler-word cuts, music and loudness to -16 LUFS. Broadcast-ready episodes every week.",
    h1: "Podcast Audio Editing and Mastering",
    short: "Clean, consistent, broadcast-ready sound for audio podcasts.",
    intro:
      "Listeners will tolerate a lot, but not bad audio. Hum, echo, uneven volume and a guest who sounds like they're in a tunnel are the fastest ways to lose subscribers. Our podcast audio editing services make every episode sound professional: noise and echo removal, levelling between speakers, filler-word and mistake cuts, music beds and mastering to industry loudness standards so your show sounds right on every app and device.",
    sections: [
      {
        heading: "Repair and cleanup",
        paragraphs: [
          "Using tools like iZotope RX, we remove background noise, hum, clicks, mouth sounds and room reverb. We can rescue poor recordings surprisingly well — a guest on a laptop mic can sound close to a studio microphone after processing.",
        ],
      },
      {
        heading: "Editing the conversation",
        paragraphs: [
          "We remove ums, ahs, long pauses, false starts and crosstalk at the level you choose — light for natural conversational shows, heavier for tight interview formats. Content edits, such as cutting a tangent or re-ordering segments, are made to your notes.",
        ],
      },
      {
        heading: "Mixing and mastering",
        paragraphs: [
          "Each voice is EQ'd and compressed for clarity and warmth, then balanced so no one is too loud or too quiet. Intro music, transitions and ad reads are mixed in, and the episode is mastered to -16 LUFS (stereo) or -19 LUFS (mono) to match Apple and Spotify recommendations.",
          "You receive a high-quality MP3 with ID3 tags and artwork, plus a WAV master on request.",
        ],
      },
      {
        heading: "Show notes and transcripts",
        paragraphs: [
          "Add show notes, timestamps and full transcripts to make episodes searchable and accessible — great for SEO on your podcast website.",
        ],
      },
    ],
    included: [
      "Noise, hum and echo removal",
      "Filler word and pause editing",
      "Speaker levelling and EQ",
      "Intro, outro and ad insertion",
      "Mastering to -16 LUFS",
      "ID3 tags and artwork",
      "Show notes (optional)",
      "Transcript (optional)",
    ],
    whoFor: [
      { title: "Audio-first podcasts", text: "Shows that publish to Apple, Spotify and RSS." },
      { title: "Remote interview shows", text: "Guests with inconsistent setups." },
      { title: "Narrative podcasts", text: "Scripted shows with music and sound design." },
      { title: "Brands", text: "Company podcasts that must sound professional." },
    ],
    pricing: [
      { name: "Clean", price: "$59", unit: "per episode", features: ["Up to 60 min", "Cleanup & master", "1 revision"] },
      { name: "Full edit", price: "$99", unit: "per episode", features: ["Up to 60 min", "Content edits & music", "2 revisions"] },
      { name: "Complete", price: "$149", unit: "per episode", features: ["Show notes", "Transcript", "Priority"] },
    ],
    turnaround: "48 hours per episode",
    faqs: [
      { q: "What loudness do you master to?", a: "-16 LUFS integrated for stereo and -19 LUFS for mono, with true peak at -1 dBTP, matching major platform guidelines." },
      { q: "Can you fix a bad recording?", a: "Usually, yes. Send a sample and we'll show you what's possible before you commit." },
      { q: "Do you insert ads?", a: "We can insert host-read or pre-recorded ads at agreed timestamps." },
      { q: "Can you write show notes?", a: "Yes, with summaries, timestamps and links." },
      { q: "Do you publish the episode?", a: "We can upload to your podcast host as part of our managed service." },
    ],
    related: ["podcast-video-editing", "podcast-clips-editing", "captions-and-subtitles", "corporate-video-editing"],
    portfolioTags: ["podcast"],
    blog: ["hire-youtube-video-editor"],
    video: sampleVideo("Podcast audio sample", 0),
  },
];
