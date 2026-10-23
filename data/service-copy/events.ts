import type { ServiceCopy } from "../services";
import { sampleVideo } from "../media";

const trialFaq = {
  q: "Can I see a sample before booking?",
  a: "Yes. Send a few minutes of footage and we'll return a free 30–60 second sample edit, no card required.",
};

export const eventServices: ServiceCopy[] = [
  {
    slug: "event-video-editing",
    name: "Event Video Editing",
    keyword: "event video editing services",
    metaTitle: "Event Video Editing | Recaps, Talks & Highlights",
    metaDescription:
      "Event video editing for conferences, launches, festivals and parties: same-week recaps, full session edits and social highlights from multi-camera footage.",
    h1: "Event Video Editing for Recaps People Actually Watch",
    short: "Highlight recaps, full session edits and social clips from conferences, launches and parties.",
    intro:
      "Events are expensive, intense and over in a day — and the video is what keeps them alive afterwards. It sells next year's tickets, thanks sponsors, extends the reach of every talk and gives attendees something to share. Our event video editing turns footage from conferences, product launches, festivals, galas, workshops and private celebrations into energetic recaps, polished session recordings and a stream of social clips, delivered fast while the buzz is still fresh.",
    sections: [
      {
        heading: "Recaps that capture the atmosphere",
        paragraphs: [
          "A great event recap feels like being there. We build it around energy: arrival shots, crowds, applause, key moments on stage, candid reactions and the details that made your event distinctive. Music drives the pace, and short soundbites from speakers or attendees add meaning between the visual beats. We typically deliver a 60–120 second hero recap plus a 30-second teaser for social and next year's promotion.",
          "Sponsors matter, so we make sure logos, booths and branded moments appear naturally — something your partnerships team will thank you for.",
        ],
      },
      {
        heading: "Full sessions and keynotes",
        paragraphs: [
          "Talks and panels are valuable content long after the event. We sync multi-camera footage with the venue audio feed, switch between wide, close and audience angles, insert slides cleanly, and add speaker lower thirds and branded intros. Audio is cleaned and levelled so questions from the floor and quiet speakers are still clear. Each session becomes a standalone video for YouTube, your website, a members' area or on-demand ticket sales.",
        ],
      },
      {
        heading: "Fast turnaround when it matters",
        paragraphs: [
          "Event content loses value every day it isn't published. For many events we offer next-day social clips and a same-week recap, with full sessions following on an agreed schedule. Footage can be uploaded from the venue at the end of each day so editing starts while the event is still running.",
        ],
      },
      {
        heading: "Private events and celebrations",
        paragraphs: [
          "Not every event is corporate. We also edit birthdays, anniversaries, graduations, bar and bat mitzvahs, reunions and parties — warm, personal films that families rewatch for years. These get the same care: thoughtful music, clean audio on speeches and a story that captures the people as well as the moments.",
        ],
      },
    ],
    included: [
      "Hero recap and social teaser",
      "Multi-camera sync with venue audio",
      "Full session and keynote edits",
      "Slides, lower thirds and branded intros",
      "Sponsor visibility in recaps",
      "Vertical clips for social",
      "Audio cleanup for speeches and Q&A",
      "Next-day clip option",
    ],
    whoFor: [
      { title: "Conference organisers", text: "You need recaps, session videos and sponsor content quickly after every event." },
      { title: "Brands & agencies", text: "You run launches and activations that need fast social content." },
      { title: "Event videographers", text: "You shoot the event and need reliable overflow editing." },
      { title: "Families", text: "You want a beautiful film of a milestone celebration." },
    ],
    pricing: [
      { name: "Recap", price: "$290", unit: "per event", features: ["90-sec recap + teaser", "Music + colour", "2 revisions"] },
      { name: "Recap + sessions", price: "$690", unit: "per event", features: ["Recap + up to 5 sessions", "Multi-cam + slides", "Speaker lower thirds"] },
      { name: "Full coverage", price: "Custom", unit: "per event", features: ["Recap, all sessions, daily clips", "Next-day turnaround", "Dedicated editor on-call"] },
    ],
    turnaround: "Next-day clips · recap in 3–5 days · sessions as agreed",
    faqs: [
      { q: "Can you edit while the event is still happening?", a: "Yes. Upload footage at the end of each day and we'll deliver social clips the next morning." },
      { q: "Do you handle multi-camera footage?", a: "Yes. We sync multiple cameras with the venue audio feed and switch angles for a professional result." },
      { q: "Can you add presentation slides?", a: "Yes, we insert slides full-screen or picture-in-picture so viewers can read them." },
      { q: "Do you edit private events like birthdays?", a: "Yes — birthdays, anniversaries, graduations and family celebrations are welcome." },
      { q: "How do you make sure sponsors are featured?", a: "Send a sponsor list and we'll include logos, booths and branded moments in the recap and highlight clips." },
      trialFaq,
    ],
    related: ["wedding-video-editing", "corporate-video-editing", "sports-highlight-editing", "social-media-video-editing"],
    portfolioTags: ["events"],
    blog: ["hire-youtube-video-editor"],
    video: sampleVideo("Event recap sample", 3),
  },
  {
    slug: "music-video-editing",
    name: "Music Video Editing",
    keyword: "music video editing services",
    metaTitle: "Music Video Editing Services | Artists & Labels",
    metaDescription:
      "Music video editing for artists, labels and directors: performance and narrative cuts, beat-perfect timing, colour grading, effects and vertical teasers.",
    h1: "Music Video Editing That Moves With the Track",
    short: "Performance and narrative music videos cut on the beat, graded and ready for release.",
    intro:
      "A music video is the song made visible. The edit decides whether the visuals feel inevitable — every cut landing where the music wants it — or whether they fight the track. Our music video editing services work with independent artists, labels and directors to turn performance takes, narrative footage and B-roll into finished videos with beat-perfect rhythm, a distinctive grade and the effects your concept calls for, plus the vertical teasers that help a release travel.",
    sections: [
      {
        heading: "Rhythm is everything",
        paragraphs: [
          "Music video editing starts with listening. We map the song's structure — intro, verses, pre-chorus, drops, bridge, outro — and plan how the edit's energy should rise and fall with it. Cuts land on beats, accents and lyrical moments; some sections hold on a single shot to let a lyric breathe, while others explode into rapid cutting when the track demands it. The goal is a video that feels like it couldn't be edited any other way.",
        ],
      },
      {
        heading: "Performance, narrative and everything between",
        paragraphs: [
          "Performance videos need perfect lip sync across multiple takes and angles, and the best performance chosen moment by moment. Narrative videos need story clarity without losing musical flow. Many videos mix both, cutting between a storyline and performance to build emotion. We work from your director's treatment or help shape the concept from the footage you have.",
          "Lyric videos, visualisers and live-session edits are also part of our music work, ideal for releases between full productions.",
        ],
      },
      {
        heading: "Look, colour and effects",
        paragraphs: [
          "Music videos are where bold looks belong. We grade in DaVinci Resolve to match the song's mood — grainy film emulation, neon-saturated night scenes, washed-out nostalgia, crisp high-contrast — and add effects where they serve the concept: speed ramps, glitches, light leaks, kaleidoscopes, text animation and VFX clean-up. We also handle the practical side: removing stray crew from frame, stabilising shaky shots and fixing sync drift.",
        ],
      },
      {
        heading: "Release-ready assets",
        paragraphs: [
          "Release day needs more than a single file. We deliver the master video in platform-ready formats, vertical teasers and hook clips for TikTok, Reels and Shorts, a canvas-style loop for Spotify, clean versions without text, and captioned lyric snippets for social. Everything arrives organised so your release plan runs smoothly.",
        ],
      },
    ],
    included: [
      "Song structure mapping and edit plan",
      "Multi-take performance sync",
      "Narrative and performance intercutting",
      "Creative colour grade",
      "Speed ramps, transitions and effects",
      "Clean-up: stabilisation, object removal",
      "Vertical teasers and canvas loops",
      "Clean and lyric versions",
    ],
    whoFor: [
      { title: "Independent artists", text: "You've shot your video and need it edited to a professional standard." },
      { title: "Labels & managers", text: "You need reliable editing across several artists' releases." },
      { title: "Directors", text: "You want an editor who understands treatments and musical timing." },
      { title: "Bands & live acts", text: "You need live-session edits and tour content." },
    ],
    pricing: [
      { name: "Lyric / visualiser", price: "$249", unit: "per song", features: ["Animated lyrics or loop", "Grade + effects", "2 revisions"] },
      { name: "Music video", price: "$690", unit: "per song", features: ["Performance or narrative", "Creative grade + effects", "3 revisions"] },
      { name: "Release package", price: "$1,090", unit: "per song", features: ["Music video + 5 vertical teasers", "Canvas loop + clean version", "Priority turnaround"] },
    ],
    turnaround: "5–10 business days depending on effects",
    faqs: [
      { q: "Can you edit from a director's treatment?", a: "Yes. Send the treatment, references and footage notes and we'll edit to the director's vision, with check-ins at key stages." },
      { q: "How do you handle lip sync across takes?", a: "We sync every take to the master audio and choose the best performance moment by moment, checking sync frame by frame." },
      { q: "Do you do VFX?", a: "We handle common effects and clean-up — speed ramps, glitches, stabilisation, object removal. Complex VFX shots are quoted separately." },
      { q: "Can you make vertical versions for TikTok?", a: "Yes. Release packages include vertical teasers and hook clips designed for TikTok, Reels and Shorts." },
      { q: "Who owns the final video?", a: "You do. Rights to the edit transfer on payment; the music rights remain with the artist or label." },
      trialFaq,
    ],
    related: ["color-grading", "motion-graphics", "short-form-video-editing", "short-film-editing"],
    portfolioTags: ["music"],
    blog: ["hire-youtube-video-editor"],
    video: sampleVideo("Music video sample", 2),
  },
  {
    slug: "travel-video-editing",
    name: "Travel Video Editing",
    keyword: "travel video editing",
    metaTitle: "Travel Video Editing | Cinematic Trip & Tourism Films",
    metaDescription:
      "Travel video editing for creators, tourism brands and hotels: cinematic trip films, destination promos and vertical clips with grade, music and sound design.",
    h1: "Travel Video Editing That Makes Viewers Want to Go",
    short: "Cinematic trip films, destination promos and travel content for creators and tourism brands.",
    intro:
      "Travel footage is full of beautiful moments that rarely add up to a story on their own. Hundreds of clips of beaches, streets and sunsets can feel interchangeable unless an editor finds the thread that makes this trip, this place, worth watching. Our travel video editing turns your footage into cinematic trip films, travel vlogs, destination promos and short-form clips — for creators, tourism boards, hotels, tour operators and anyone who wants to relive a journey properly.",
    sections: [
      {
        heading: "From clips to a story",
        paragraphs: [
          "We start by watching everything and finding the arc: anticipation, arrival, discovery, a moment of challenge or surprise, and the feeling you left with. That structure turns a montage into a film. Voiceover, on-screen locations and natural sound — a market vendor, waves, a train announcement — anchor viewers in place and give the edit texture beyond music.",
        ],
      },
      {
        heading: "Cinematic grade and sound",
        paragraphs: [
          "Travel footage comes from many cameras and lighting conditions: drone, phone, action camera, mirrorless. We match them into a consistent look, protect skin tones, bring out skies and colour without turning everything orange-and-teal, and stabilise shaky handheld shots. Sound design adds immersion: ambience layered under music, subtle whooshes on transitions and silence when a view deserves it.",
        ],
      },
      {
        heading: "For creators and tourism brands",
        paragraphs: [
          "Travel creators need retention-focused YouTube edits and a steady stream of Reels and TikToks from every trip. Tourism boards, hotels and tour operators need polished destination films that sell an experience, plus social cut-downs and ad versions. We edit both styles and adapt tone to your audience — adventurous, luxurious, family-friendly or budget backpacker.",
        ],
      },
      {
        heading: "Personal trip films",
        paragraphs: [
          "Honeymoons, gap years, family holidays and once-in-a-lifetime adventures deserve better than a folder of forgotten clips. Send us your footage and we'll craft a short film you'll actually rewatch and share, with music chosen to match the trip's mood.",
        ],
      },
    ],
    included: [
      "Story structure from raw trip footage",
      "Drone, phone and camera matching",
      "Cinematic colour grade",
      "Stabilisation and clean-up",
      "Location titles and maps",
      "Music editing and ambient sound design",
      "Vertical clips for social",
      "Long-form and short-film versions",
    ],
    whoFor: [
      { title: "Travel creators", text: "You film constantly and need edits that keep up with your trips." },
      { title: "Tourism boards & hotels", text: "You need destination films and social content that drive bookings." },
      { title: "Tour operators", text: "You want promo videos for each itinerary." },
      { title: "Travellers", text: "You want a beautiful film of a special trip." },
    ],
    pricing: [
      { name: "Trip film", price: "$199", unit: "per film", features: ["Up to 4 min", "Grade + music", "2 revisions"] },
      { name: "Travel vlog", price: "$249", unit: "per video", features: ["Up to 20 min YouTube edit", "Maps + locations", "2 revisions"] },
      { name: "Destination promo", price: "$690", unit: "per project", features: ["Hero film + 5 social clips", "Ad versions", "3 revisions"] },
    ],
    turnaround: "4–6 business days",
    faqs: [
      { q: "Can you work with footage from different cameras?", a: "Yes. Mixing drone, phone, action camera and mirrorless footage is normal. We match them into a consistent look." },
      { q: "Can you add animated maps?", a: "Yes, simple animated route maps and location titles are included in vlog and promo edits." },
      { q: "I have hours of footage — is that a problem?", a: "Not at all. We review everything and select the strongest moments. Pointing out favourites speeds things up." },
      { q: "Do you edit for tourism brands?", a: "Yes — destination films, hotel promos and tour itineraries with social and ad cut-downs." },
      { q: "Can I choose the music?", a: "You can suggest songs or moods. For public posting we use licensed tracks to avoid copyright claims." },
      trialFaq,
    ],
    related: ["vlog-editing", "color-grading", "sound-design-and-mixing", "instagram-reels-editing"],
    portfolioTags: ["vlog", "events"],
    blog: ["increase-youtube-audience-retention"],
    video: sampleVideo("Travel film sample", 3),
  },
  {
    slug: "sports-highlight-editing",
    name: "Sports Highlight Editing",
    keyword: "sports highlight video editing",
    metaTitle: "Sports Highlight Editing | Recruiting & Team Highlights",
    metaDescription:
      "Sports highlight video editing for athletes, teams and clubs: recruiting reels, game highlights, player spotlights and social clips with fast turnaround.",
    h1: "Sports Highlight Editing for Athletes, Teams and Clubs",
    short: "Recruiting reels, game highlights and social clips cut fast and with real sports sense.",
    intro:
      "In sports, the right highlight can change everything — a scholarship offer, a sponsorship, a surge of new fans. Our sports highlight editing turns game film, training footage and phone recordings into recruiting reels, match highlights, player spotlights and social clips. Our editors understand the games they cut, so the plays coaches and fans care about are the ones that make the edit.",
    sections: [
      {
        heading: "Recruiting reels that coaches finish watching",
        paragraphs: [
          "College and academy coaches watch hundreds of reels and often decide in the first thirty seconds. We put your best plays first, identify you clearly with a spotlight or arrow before each clip, and keep the reel tight — usually three to five minutes. Key information goes up front: name, position, graduation year, school or club, stats and contact details. No flashy intros that waste a coach's time.",
          "We follow sport-specific expectations: position-relevant plays for football, full possessions for basketball, both offence and defence where it matters.",
        ],
      },
      {
        heading: "Game and season highlights",
        paragraphs: [
          "For teams and clubs we cut match highlights, season recaps, goal-of-the-month compilations and hype videos. Pace and music match the sport's energy, slow motion lands on the decisive moments, and score bugs or simple graphics keep viewers oriented. Quick turnaround means highlights can go out while fans are still talking about the game.",
        ],
      },
      {
        heading: "Social content for athletes and clubs",
        paragraphs: [
          "Athletes building a personal brand need consistent social content: training clips, behind-the-scenes, game-day moments and sponsor integrations. Clubs need vertical highlights, player introductions and matchday promos. We deliver platform-ready clips with captions, branded graphics and safe-zone text placement.",
        ],
      },
      {
        heading: "Working with real-world footage",
        paragraphs: [
          "Game film is rarely perfect. We work with Hudl exports, broadcast recordings, sideline phone footage and wide tactical cameras, stabilising and cropping where possible and using spotlight effects so the right player is obvious even in wide shots. Tell us your jersey number and we'll find you.",
        ],
      },
    ],
    included: [
      "Play selection with sports knowledge",
      "Player spotlight and identification",
      "Title card with stats and contact info",
      "Slow motion and replays on key plays",
      "Score bugs and simple graphics",
      "Music matched to the sport",
      "Vertical social clips",
      "Hudl, broadcast and phone footage support",
    ],
    whoFor: [
      { title: "Student athletes", text: "You need a recruiting reel that gets coaches' attention." },
      { title: "Teams & clubs", text: "You want weekly highlights and season recaps for fans and sponsors." },
      { title: "Pro & semi-pro athletes", text: "You're building a personal brand on social." },
      { title: "Parents", text: "You've filmed every game and want a highlight reel for your child." },
    ],
    pricing: [
      { name: "Game highlights", price: "$79", unit: "per game", features: ["2–4 min highlight", "Spotlights + music", "1 revision"] },
      { name: "Recruiting reel", price: "$199", unit: "per reel", features: ["3–5 min reel", "Title card + stats", "2 revisions"] },
      { name: "Club package", price: "$690", unit: "per month", features: ["Weekly highlights + 12 social clips", "Branded graphics", "48h turnaround"] },
    ],
    turnaround: "24–72 hours depending on footage length",
    faqs: [
      { q: "Which sports do you edit?", a: "Football (soccer and American), basketball, baseball, rugby, cricket, hockey, volleyball, lacrosse and more. Tell us the sport and position." },
      { q: "Can you work with Hudl footage?", a: "Yes. Share Hudl exports or links along with timestamps of your best plays, and we'll handle the rest." },
      { q: "How long should a recruiting reel be?", a: "Usually three to five minutes, with the strongest plays in the first thirty seconds." },
      { q: "How will coaches know which player is me?", a: "We add a spotlight, arrow or freeze-frame highlight before each play so you're easy to identify." },
      { q: "Can you deliver highlights the day after a game?", a: "Yes, club packages include 24–48 hour turnaround on game highlights." },
      trialFaq,
    ],
    related: ["event-video-editing", "short-form-video-editing", "motion-graphics", "gaming-video-editing"],
    portfolioTags: ["events", "shorts"],
    blog: ["hire-youtube-video-editor"],
    video: sampleVideo("Sports highlights sample", 0),
  },
  {
    slug: "short-film-editing",
    name: "Short Film Editing",
    keyword: "short film editing services",
    metaTitle: "Short Film Editing Services | Narrative & Festival Cuts",
    metaDescription:
      "Short film editing for independent filmmakers: narrative structure, performance selection, pacing, sound and colour, delivered festival-ready.",
    h1: "Short Film Editing for Independent Filmmakers",
    short: "Narrative editing, performance selection and festival-ready finishing for short films.",
    intro:
      "Editing is often called the final rewrite of a film, and in a short film every second counts. Our short film editing services work with independent writers, directors and producers to shape narrative footage into a film that plays — performances chosen with care, scenes paced for tension and emotion, and a finished picture and sound mix ready for festivals, streaming and online premieres.",
    sections: [
      {
        heading: "An editor who serves the story",
        paragraphs: [
          "We begin by reading the script and talking through your intentions: tone, themes, the moments you care about most. Then we watch every take. The assembly follows the script; the rough cut finds the film. Often that means dropping a scene you loved, rearranging the order, or letting a silence run longer than written. We explain our choices and collaborate closely, because it's your film.",
        ],
      },
      {
        heading: "Performance and pacing",
        paragraphs: [
          "Great editing protects actors. We select the takes and moments where performances feel truthful, build scenes from the best fragments of several takes, and cut on reactions as much as lines. Pacing is shaped deliberately across the whole film — building tension, giving emotional beats room, and keeping the runtime tight, which matters a great deal to festival programmers.",
        ],
      },
      {
        heading: "Sound, colour and finishing",
        paragraphs: [
          "Picture lock is only part of the job. We clean dialogue, build ambience and effects, edit music or temp tracks for your composer, and produce a balanced mix. Colour grading in DaVinci Resolve gives the film a cohesive look that supports its tone. If you have dedicated sound designers or colourists, we prepare organised turnovers (AAF, XML, EDL) so handoffs are smooth.",
        ],
      },
      {
        heading: "Festival and release deliverables",
        paragraphs: [
          "Festivals have specific requirements. We deliver screening masters, online screener links, subtitled versions, trailers, teasers and stills for submission platforms. If you're aiming for particular festivals, tell us early and we'll make sure runtime and format requirements are met.",
        ],
      },
    ],
    included: [
      "Script read and director consultation",
      "Assembly, rough cut and fine cut",
      "Performance and take selection",
      "Dialogue cleanup and sound mix",
      "Colour grade",
      "Turnovers for sound and colour teams",
      "Trailer and teaser",
      "Festival masters and subtitles",
    ],
    whoFor: [
      { title: "Independent directors", text: "You've shot your short and need an editor who'll collaborate." },
      { title: "Film students & graduates", text: "You want a professional cut for your portfolio and festivals." },
      { title: "Producers", text: "You need reliable post-production on a tight budget." },
      { title: "Brands making films", text: "You're producing narrative content for campaigns." },
    ],
    pricing: [
      { name: "Picture edit", price: "$690", unit: "up to 10 min", features: ["Assembly to picture lock", "2 rounds of notes", "Turnovers included"] },
      { name: "Full post", price: "$1,390", unit: "up to 15 min", features: ["Edit + sound mix + grade", "Trailer", "3 rounds of notes"] },
      { name: "Festival package", price: "Custom", unit: "per film", features: ["Full post + subtitles", "Festival masters + screeners", "Dedicated editor"] },
    ],
    turnaround: "Typically 2–4 weeks from footage to picture lock",
    faqs: [
      { q: "Do you work with first-time filmmakers?", a: "Yes. We'll guide you through each stage — assembly, rough cut, fine cut and picture lock — and explain decisions as we go." },
      { q: "Can you prepare files for a separate colourist or sound designer?", a: "Yes. We deliver organised AAF, XML or EDL turnovers with media so handoffs are clean." },
      { q: "Do you edit feature films?", a: "Our focus is short films, but we can discuss features and series on a case-by-case basis." },
      { q: "Can you add subtitles for festivals?", a: "Yes, accurate subtitle files and burned-in versions in English and other languages." },
      { q: "How do notes work?", a: "We share time-coded review links after each stage and incorporate consolidated notes from you and your team." },
      trialFaq,
    ],
    related: ["color-grading", "sound-design-and-mixing", "music-video-editing", "documentary-video-editing"],
    portfolioTags: ["documentary", "brand"],
    blog: ["hire-youtube-video-editor"],
    video: sampleVideo("Short film sample", 1),
  },
];
