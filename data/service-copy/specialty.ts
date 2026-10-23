import type { ServiceCopy } from "../services";
import { sampleVideo } from "../media";

/**
 * Specialty services backed by real portfolio work (VSL, 3D, logo animation, AI video).
 * No price exists for these in data/pricing.ts yet, so plans show "Custom quote" rather than a number.
 */
const quote = (name: string, unit: string, features: string[]) => ({ name, price: "Quote", unit, features });

export const specialtyServices: ServiceCopy[] = [
  {
    slug: "vsl-video-editing",
    name: "VSL Video Editing",
    keyword: "vsl video editing",
    metaTitle: "VSL Video Editing Services | Sales Letter Videos",
    metaDescription:
      "VSL video editing for coaches, agencies and offers: tight pacing, text slides, data cutaways and clear calls to action. Send your recording, get a first cut fast.",
    h1: "VSL Video Editing That Keeps Buyers Watching to the Offer",
    short: "Video sales letters cut for clarity and momentum, from hook to call to action.",
    intro:
      "A video sales letter has one job: keep the right viewer watching until they understand the offer and act on it. Our VSL video editing service turns a long, single-take recording into a tight sales video — dead air and false starts removed, key claims reinforced with on-screen text, proof shown with data cutaways and screenshots, and a clear call to action at the end. We edit VSLs for coaches, consultants, agencies and e-commerce offers, from 90-second ad-style VSLs to six-minute long-form sales letters.",
    sections: [
      {
        heading: "How we structure a VSL edit",
        paragraphs: [
          "We work from your script or outline and follow the classic sales-letter arc: a hook that names the problem, a story or mechanism that explains why the usual fixes fail, proof, the offer and the call to action. In the edit that means the first 15 seconds are the tightest part of the video, transitions between sections are signposted with text slides, and nothing in the middle repeats a point the viewer has already accepted.",
          "Most VSLs are recorded in one or two long takes. We cut breaths, stumbles and repetition, keep natural rhythm so the presenter still sounds human, and use punch-ins and B-roll to hide jump cuts.",
        ],
      },
      {
        heading: "Text, data and proof on screen",
        paragraphs: [
          "Buyers skim with their eyes even while listening. We add editorial text slides for section headings, bullet lists for features and deliverables, number callouts for prices and statistics, and screenshot or dashboard cutaways when you reference results. Every on-screen claim is taken from your script — we never add numbers you haven't given us, and we'll flag claims that may need substantiation on ad platforms.",
        ],
      },
      {
        heading: "Formats we deliver",
        paragraphs: [
          "The main deliverable is a 16:9 VSL for your sales page or webinar funnel. On request we also cut shorter ad versions, a vertical version for social, and captioned exports for silent autoplay. Audio is cleaned and levelled so the presenter is clear on phone speakers.",
        ],
      },
    ],
    included: [
      "Script-led structure and pacing",
      "Dead air, stumbles and repeats removed",
      "Editorial text slides and bullet lists",
      "Data, chart and screenshot cutaways",
      "Number and price callouts",
      "Captions and audio cleanup",
      "Clear end-screen call to action",
      "Optional short ad and vertical cut-downs",
    ],
    whoFor: [
      { title: "Coaches & consultants", text: "You sell a high-ticket programme through a sales page or webinar." },
      { title: "Agencies", text: "You need a VSL that explains your service and books calls." },
      { title: "E-commerce & info offers", text: "You run paid traffic to a video sales page." },
      { title: "Course creators", text: "You launch with a sales video and need it tight and credible." },
    ],
    pricing: [
      quote("Short VSL", "up to 3 min", ["Script-led edit", "Text + data slides", "2 revisions"]),
      quote("Long-form VSL", "3–10 min", ["Full sales-letter structure", "Screenshot cutaways", "Captions"]),
      quote("VSL + ad cut-downs", "per campaign", ["Main VSL", "Short ad versions", "Vertical cut"]),
    ],
    turnaround: "First cut in 48–96 hours depending on length",
    faqs: [
      { q: "What is VSL video editing?", a: "It's editing a video sales letter — a presenter-led sales video — so it is tight, easy to follow and ends with a clear call to action, using text slides, cutaways and captions." },
      { q: "How long should a VSL be?", a: "As long as the offer needs. Low-ticket offers often work at 2–4 minutes; high-ticket coaching VSLs commonly run 5–15 minutes. We cut to keep every minute earning its place." },
      { q: "Do you write the script?", a: "We edit from your script or recording. We'll suggest structural changes in the edit, but the claims and offer come from you." },
      { q: "Can you add results and testimonials on screen?", a: "Yes, from material you provide — screenshots, numbers, client clips. We never invent figures." },
      { q: "What do I need to send?", a: "Your raw recording, script or outline, logo and brand fonts, and any screenshots or proof you want shown." },
      { q: "Can you make ad versions too?", a: "Yes, we can cut 30–90 second ad versions and a vertical version from the same footage." },
    ],
    related: ["video-ad-editing", "video-editing-for-coaches", "explainer-video-editing", "talking-head-video-editing"],
    portfolioTags: ["vsl"],
    blog: ["youtube-video-editing-cost", "hire-youtube-video-editor"],
    video: sampleVideo("VSL sample", 1),
  },
  {
    slug: "3d-animation",
    name: "3D Animation",
    keyword: "3d animation services",
    metaTitle: "3D Animation Services for Brands & Channels",
    metaDescription:
      "3D animation for channel intros, product showcases and rendered spaces: modelling, lighting, camera moves and logo lockups, delivered in any aspect ratio.",
    h1: "3D Animation Services for Intros, Products and Spaces",
    short: "Broadcast-style intros, product showcases and rendered interiors in 3D.",
    intro:
      "3D animation makes a brand feel bigger than its budget: a channel opener with real depth and light, a product that turns in space, an interior rendered before it's built. Our 3D animation services cover short-form 3D pieces for channels and brands — news and broadcast-style intros, product and packaging showcases, rendered room and material visualisations, and animated cover or title designs — finished with sound and delivered in every aspect ratio you need.",
    sections: [
      {
        heading: "What we animate",
        paragraphs: [
          "Our 3D work focuses on pieces under a minute that need to look premium: channel and show openers that resolve into your logo, product reveals for launches and ads, material and interior visualisations (for example tiles, finishes or furniture placed into rendered rooms), and stylised 3D titles or covers. For longer character animation or full architectural walkthroughs we'll tell you honestly whether it's a fit.",
        ],
      },
      {
        heading: "How a 3D project runs",
        paragraphs: [
          "We start with references and a short storyboard so motion and camera moves are agreed before rendering. Then we model or prepare assets, set up lighting and materials, animate the camera and objects, and render. Previews are shared at each stage, so changes happen while they're cheap — before final renders.",
          "Finished renders are composited with light effects, text and sound design, then exported for YouTube, social and broadcast.",
        ],
      },
      {
        heading: "What you need to provide",
        paragraphs: [
          "Logo files (vector if possible), brand colours, any product CAD files or photos, references you like, and where the animation will be used. For interior or material visualisations, product codes, dimensions and finishes.",
        ],
      },
    ],
    included: [
      "Storyboard and motion references",
      "Modelling or asset preparation",
      "Lighting, materials and rendering",
      "Camera animation",
      "Logo or title lockup",
      "Compositing and light effects",
      "Sound design",
      "16:9, 9:16 and 1:1 exports",
    ],
    whoFor: [
      { title: "Channels & shows", text: "You want a polished opener that sets the tone every episode." },
      { title: "Product brands", text: "You're launching a product and need a premium reveal." },
      { title: "Materials & interiors", text: "You sell tiles, finishes or furniture and want them shown in rendered rooms." },
      { title: "Agencies", text: "You need a 3D partner for client campaigns." },
    ],
    pricing: [
      quote("3D intro / opener", "up to 20 s", ["Storyboard", "Logo lockup", "Sound design"]),
      quote("Product showcase", "up to 30 s", ["Modelling or CAD prep", "Lighting + materials", "All aspect ratios"]),
      quote("Visualisation set", "per collection", ["Rendered rooms", "Product codes on screen", "Vertical + square"]),
    ],
    turnaround: "Storyboard in 2–3 days; final renders typically 1–2 weeks",
    faqs: [
      { q: "What kind of 3D animation do you do?", a: "Short 3D pieces: channel and broadcast intros, product reveals, rendered interior or material showcases and 3D titles. We'll advise if a project needs a dedicated 3D studio." },
      { q: "Do I need 3D models of my product?", a: "CAD files help, but we can build simpler models from photos and dimensions." },
      { q: "How long does 3D animation take?", a: "Most short pieces take one to two weeks including storyboard and revisions; complex scenes take longer." },
      { q: "Can you match my brand colours and fonts?", a: "Yes — send your brand guide and we'll match materials, lighting tones and typography." },
      { q: "Do you add music and sound?", a: "Yes, finished animations include sound design and licensed music if needed." },
      { q: "What formats will I get?", a: "High-quality masters plus platform exports in 16:9, 9:16 and 1:1." },
    ],
    related: ["logo-animation", "motion-graphics", "product-video-editing", "brand-film-editing"],
    portfolioTags: ["3d"],
    blog: ["youtube-video-editing-cost"],
    video: sampleVideo("3D sample", 0),
  },
  {
    slug: "logo-animation",
    name: "Logo Animation",
    keyword: "logo animation services",
    metaTitle: "Logo Animation Services | Animated Logo Intros",
    metaDescription:
      "Logo animation for intros, outros and brand videos: smoke, particles, light, glass and clean minimal reveals with sound, delivered with transparent versions.",
    h1: "Logo Animation Services That Open Every Video With Your Brand",
    short: "Animated logo reveals for intros, outros, ads and presentations.",
    intro:
      "An animated logo is the cheapest way to make every video feel branded. Our logo animation service turns your static logo into a short reveal — from clean, minimal motion to smoke, particles, fire, glass and light effects — with a matching sound sting. We've animated logos for production companies, clinics, law firms, salons, academies and gaming brands, and deliver versions for video intros, outros, social posts and presentations.",
    sections: [
      {
        heading: "Styles we create",
        paragraphs: [
          "Minimal and corporate reveals that suit professional services; cinematic reveals with smoke, light rays or particles for production companies and channels; organic styles such as leaves or ink; and bold 3D or glass treatments for gaming and tech brands. You'll see style options before we animate, so the motion fits your brand rather than a template trend.",
        ],
      },
      {
        heading: "What you receive",
        paragraphs: [
          "A 4–10 second animation in 16:9 for video intros, a vertical or square version for social, a version with a transparent background where the style allows (for overlaying on footage), and the sound sting on its own. We also provide a short outro version with your website or handle if needed.",
        ],
      },
      {
        heading: "What we need from you",
        paragraphs: [
          "Your logo as a vector file (SVG, AI or PDF) or a high-resolution PNG, brand colours, and a few examples of animation styles you like. If your logo has separate parts — an icon and wordmark — layered files let us animate them independently.",
        ],
      },
    ],
    included: [
      "2–3 style directions",
      "4–10 second logo reveal",
      "Matching sound sting",
      "16:9 intro version",
      "Vertical / square social version",
      "Transparent-background version (where possible)",
      "Outro with website or handle",
      "Source render on request",
    ],
    whoFor: [
      { title: "YouTube channels", text: "You want a consistent branded intro and outro." },
      { title: "Local businesses", text: "Clinics, law firms, salons and academies that want a professional brand moment." },
      { title: "Production companies", text: "You need a cinematic logo before client films." },
      { title: "Gaming & tech brands", text: "You want something bold that matches your community." },
    ],
    pricing: [
      quote("Minimal reveal", "4–6 s", ["1 style direction", "Sound sting", "16:9 + square"]),
      quote("Cinematic reveal", "6–10 s", ["2–3 directions", "Particles / smoke / light", "Transparent version"]),
      quote("Intro + outro pack", "per brand", ["Reveal + outro", "All aspect ratios", "Sound stings"]),
    ],
    turnaround: "First preview in 2–4 days",
    faqs: [
      { q: "What file do you need for my logo?", a: "A vector file (SVG, AI, EPS or PDF) is best. A large transparent PNG works for many styles." },
      { q: "How long is a logo animation?", a: "Usually 4–10 seconds. Intros under 5 seconds work best on YouTube." },
      { q: "Can I use it on social media?", a: "Yes, we deliver vertical and square versions as well as 16:9." },
      { q: "Do you include sound?", a: "Yes, each reveal comes with a matching sound sting, also supplied separately." },
      { q: "Can I get a transparent background?", a: "For most styles, yes — useful for overlaying the logo on your footage." },
      { q: "How many revisions are included?", a: "Two revision rounds, plus a style check before animation begins." },
    ],
    related: ["3d-animation", "motion-graphics", "brand-film-editing", "youtube-video-editing"],
    portfolioTags: ["logo animation"],
    blog: ["youtube-video-editing-cost"],
    video: sampleVideo("Logo animation sample", 3),
  },
  {
    slug: "ai-video-editing",
    name: "AI Video Editing",
    keyword: "ai video editing services",
    metaTitle: "AI Video Editing & AI-Generated Video Ads",
    metaDescription:
      "AI video editing by real editors: AI-generated scenes, product visuals and story ads, finished with human pacing, captions, sound and brand checks.",
    h1: "AI Video Editing With a Human Editor in Charge",
    short: "AI-generated scenes and product visuals, finished by editors into ads and films.",
    intro:
      "AI video tools can generate striking scenes, but raw generations rarely make a finished video: characters drift between shots, pacing is off and nothing ties back to the brand. Our AI video editing service uses AI generation where it helps — scenes, product visuals, lifestyle shots — and keeps a human editor responsible for the story, consistency, captions, sound and brand accuracy. We've made AI story ads, product explainers, fashion films and cinematic narrated shorts this way.",
    sections: [
      {
        heading: "What AI is good for — and where editors matter",
        paragraphs: [
          "AI generation is fast for concepts that would be expensive to shoot: lifestyle scenes, imagined locations, product-in-use shots and stylised visuals. Editors make it usable: choosing the takes where faces and products stay consistent, cutting around artefacts, matching colour between generations, and building a real narrative arc with a hook, problem, solution and call to action.",
        ],
      },
      {
        heading: "How we keep AI video on-brand",
        paragraphs: [
          "We check every frame for distorted hands, text or logos, keep product shapes and colours true to your real product, and add your actual logo, typography and end cards in the edit rather than relying on generated text. Voiceover, captions and sound design are added and mixed so the result feels like a produced ad, not a demo reel.",
        ],
      },
      {
        heading: "Disclosure and platform rules",
        paragraphs: [
          "Some platforms require AI-generated content to be labelled, and ad claims still need to be true. We'll tell you where disclosure is expected and won't create content that impersonates real people or makes claims you can't support.",
        ],
      },
    ],
    included: [
      "Concept and shot list",
      "AI scene and product generation",
      "Consistency and artefact checks",
      "Human edit, pacing and story",
      "Real logo, fonts and end cards",
      "Voiceover, captions and sound design",
      "Colour matching across generations",
      "Vertical, square and 16:9 exports",
    ],
    whoFor: [
      { title: "DTC & e-commerce brands", text: "You need fresh ad concepts faster than you can shoot them." },
      { title: "Product launches", text: "You want lifestyle visuals before production footage exists." },
      { title: "Creators & storytellers", text: "You want cinematic narrated pieces on a creator budget." },
      { title: "Agencies", text: "You want to test AI creative without losing brand control." },
    ],
    pricing: [
      quote("AI ad", "15–30 s", ["Concept + generation", "Human edit + captions", "2 revisions"]),
      quote("AI product explainer", "30–60 s", ["Feature callouts", "Lifestyle scenes", "End card"]),
      quote("AI cinematic short", "1–3 min", ["Narrated story", "Consistent characters", "Sound design"]),
    ],
    turnaround: "First cut in 3–5 days",
    faqs: [
      { q: "What is AI video editing?", a: "Using AI generation for some or all visuals, then editing them into a finished video with human pacing, consistency checks, captions, sound and your real branding." },
      { q: "Will AI video look fake?", a: "Raw generations often do. We select consistent takes, cut around artefacts and colour-match shots so the result reads as a produced piece." },
      { q: "Can you use my real product?", a: "Yes. Send product photos and we keep shapes, colours and logos accurate — real logos are added in the edit, not generated." },
      { q: "Do I own the result?", a: "You own the final edit. Rights to AI-generated elements depend on the tool's terms; we'll tell you which tools were used." },
      { q: "Do I need to label AI content?", a: "Some platforms require it for realistic AI content. We'll advise per platform." },
      { q: "Can you mix AI with my real footage?", a: "Yes, hybrid edits combining your footage with AI scenes are often the most effective." },
    ],
    related: ["ugc-ad-editing", "video-ad-editing", "product-video-editing", "3d-animation"],
    portfolioTags: ["ai video"],
    blog: ["youtube-video-editing-cost"],
    video: sampleVideo("AI video sample", 2),
  },
];
