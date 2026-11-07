/**
 * Location pages: country → state/region → city.
 *
 * RULE — NO MASS GENERATION:
 * Never auto-create pages for every state or city. Thin, near-duplicate location pages hurt rankings
 * and can trigger doorway-page penalties. Add a new location ONLY when:
 *   1. Google Search Console shows real impressions for "[service] + [location]" queries, or
 *   2. You have a real client in that location (add their case study/testimonial to the page).
 * Every new entry must have genuinely unique copy (600–900 words incl. FAQs), local niches and FAQs.
 */

export type Faq = { q: string; a: string };

type Currency = { code: string; symbol: string; /** approx. USD → local rate, TODO: review quarterly */ rate: number };

type Place = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  paragraphs: { heading: string; text: string }[];
  niches: string[];
  timeOverlap: string;
  faqs: Faq[];
  /** slugs of sibling locations at the same level for sideways links (path relative to /locations) */
  nearby: string[];
  /** TODO: real local case study / testimonial if one exists */
  localProof?: { quote: string; name: string };
};

export type City = Place;
export type State = Place & { cities: City[] };
export type Country = Place & { currency: Currency; timezone: string; states: State[] };

const editTeamHours = "Our editors work in rotating shifts so someone is always online during your business day.";

export const countries: Country[] = [
  {
    slug: "usa",
    name: "United States",
    h1: "YouTube Video Editor for US Creators and Brands",
    metaTitle: "YouTube Video Editor USA | Video Editing Services",
    metaDescription: "Video editing services for US YouTubers, podcasters and brands. Overnight turnaround across ET, CT, MT and PT and USD pricing.",
    currency: { code: "USD", symbol: "$", rate: 1 },
    timezone: "ET / CT / MT / PT",
    timeOverlap: "Our editing shifts cover US mornings and evenings, so footage uploaded at the end of your day is often edited by the time you wake up.",
    intro:
      "The US is home to the largest creator economy in the world, and also the most competitive. American audiences have endless choice, so videos have to earn attention from the first second. We work with US creators, podcasters, coaches and brands who want a reliable editing partner without the cost of an in-house team, priced in dollars and scheduled around American time zones.",
    paragraphs: [
      { heading: "Working across four US time zones", text: "Whether you're in New York or Los Angeles, the overnight workflow is the same: upload footage before you log off, and a first cut is usually waiting the next working day. Revision rounds come back within 24 hours, and we schedule live calls in your local time — never at 6am because it suits us." },
      { heading: "What US creators ask us for", text: "Long-form YouTube remains the core, but demand for podcast video and short-form repurposing has grown fastest. Many US clients run a weekly video podcast and want every episode turned into eight to twelve vertical clips. Coaches and consultants use video to fill calendars. DTC brands need a constant stream of UGC ad variations for Meta and TikTok." },
      { heading: "Transparent USD pricing", text: "All our prices are quoted in US dollars. Agencies in major American cities often charge several hundred dollars per long-form video; our plans start much lower without compromising on hooks, pacing, sound or colour. You can pay by card, PayPal or ACH-friendly services like Wise, and we issue proper invoices for your accounting." },
      { heading: "Remote, but not distant", text: "Most of our US clients have never met us in person and never needed to. Communication happens in Slack, email or WhatsApp, feedback happens on time-coded review links, and a dedicated editor learns your style so you're not re-explaining preferences every week." },
    ],
    niches: ["Podcasts & interviews", "Finance & investing", "Tech & startups", "Entertainment & vlogs", "Real estate", "Fitness & coaching"],
    faqs: [
      { q: "Do you work with US clients remotely?", a: "Yes — all our work is remote. Footage arrives via cloud links, feedback via review links, and calls are scheduled in your time zone." },
      { q: "Can you invoice a US company?", a: "Yes. We issue invoices in USD and support card, PayPal and bank transfer via Wise." },
      { q: "Will turnaround be slower because you're not in the US?", a: "Usually faster. Time-zone offset means we edit while you sleep, so a first cut is often ready the next morning." },
    ],
    nearby: ["canada", "uk"],
    states: [
      {
        slug: "california",
        name: "California",
        h1: "Video Editing Services for California Creators",
        metaTitle: "Video Editing Services California | YouTube & Shorts",
        metaDescription: "Video editing for California YouTubers, podcasters and brands — LA, SF, San Diego. Pacific-time friendly and 48h first cuts.",
        intro: "California shaped what online video looks like today. From Los Angeles entertainment channels to Bay Area tech explainers, the state's creators set a high bar, and their audiences expect it. We edit for California creators who need studio-level quality on a creator schedule.",
        paragraphs: [
          { heading: "Pacific time, overnight edits", text: "Pacific time sits furthest from our core shifts, which works in your favour: upload footage in the afternoon and a first cut is often ready when you start the next day. Live calls are booked between 8am and 6pm PT." },
          { heading: "From Hollywood polish to startup demos", text: "Southern California clients tend to want cinematic vlogs, entertainment and lifestyle content with strong personality. Northern California clients are often founders and tech educators who need clean product demos, conference talks and explainer videos with motion graphics. We staff editors who specialise in each." },
          { heading: "Expensive city, reasonable editing", text: "Hiring an in-house editor in California can cost a fortune in salary and benefits. Our monthly plans give you a dedicated editor and a backup team for a fraction of that, with no long-term contract." },
        ],
        niches: ["Entertainment", "Lifestyle vlogs", "Tech & SaaS", "Wellness", "Beauty"],
        timeOverlap: "8am–6pm PT for calls; overnight editing on most uploads.",
        faqs: [
          { q: "Do you work with Los Angeles creators?", a: "Yes, LA is one of our largest client bases. See our Los Angeles page for local details." },
          { q: "Can you edit SaaS product demos?", a: "Yes. We edit demos, launch videos and webinar replays with clean UI zooms and motion callouts." },
        ],
        nearby: ["usa/texas", "usa/new-york"],
        cities: [
          {
            slug: "los-angeles",
            name: "Los Angeles",
            h1: "Video Editor in Los Angeles for YouTubers and Brands",
            metaTitle: "Video Editor Los Angeles | YouTube & Vlog Editing",
            metaDescription: "Remote video editor for Los Angeles creators: vlogs, entertainment, podcasts and Reels. PT-friendly overnight edits.",
            intro: "Los Angeles is the entertainment capital of the internet. Creators here compete with studios, celebrities and every aspiring vlogger in the city, and the edit is often what separates a channel that breaks out from one that stalls. We give LA creators an editing team that understands entertainment pacing, personality-led content and the polish audiences expect from Hollywood.",
            paragraphs: [
              { heading: "Built for entertainment and personality", text: "LA clients bring us vlogs, challenge videos, comedy sketches, behind-the-scenes series and celebrity-guest podcasts. What they have in common is personality. We cut to amplify it — reaction shots on the beat, sound design that lands jokes, and colour that makes Southern California light look as good on screen as it does in person." },
              { heading: "A remote team that fits LA schedules", text: "Shoots in LA run late and start early. Upload your cards before you sleep and our overnight shift starts on your edit straight away. Revisions return within 24 hours, so a Monday shoot can be live by Wednesday." },
              { heading: "Studio-level quality without LA studio rates", text: "Post-production houses in Los Angeles charge premium rates for good reason, but most creators don't need a colour suite and a producer on every video. Our plans give you a dedicated editor, thumbnails and Shorts cut-downs for a predictable monthly price." },
            ],
            niches: ["Entertainment & comedy", "Lifestyle vlogs", "Celebrity podcasts", "Beauty & fashion", "Music"],
            timeOverlap: "Overnight editing for PT uploads; calls 9am–6pm PT.",
            faqs: [
              { q: "Can you meet in person in LA?", a: "We're a remote team, but we're on video calls whenever you need and reply on WhatsApp within hours." },
              { q: "Do you edit music videos?", a: "Yes, for creators and independent artists — performance cuts, lyric captions and vertical teasers." },
              { q: "Can you handle large camera files from LA productions?", a: "Yes. We work with proxies and accept RED, ARRI, Sony and Blackmagic footage via Frame.io, Drive or shipped drives." },
            ],
            nearby: ["usa/new-york/new-york-city", "usa/texas/austin"],
          },
        ],
      },
      {
        slug: "new-york",
        name: "New York",
        h1: "Video Editing Services for New York Creators",
        metaTitle: "Video Editing Services New York | Podcasts & YouTube",
        metaDescription: "Video editing for New York podcasters, finance creators and brands. Eastern-time workflow, 48h first cuts, transparent USD pricing.",
        intro: "New York creators move fast. Media, finance, fashion and podcasting all cluster here, and the content reflects it: sharp, opinionated and produced to a high standard. We edit for New York state clients who want that standard without building an in-house post team.",
        paragraphs: [
          { heading: "Eastern time overlap", text: "Eastern time overlaps our day shift in the morning and our evening shift in the afternoon, so New York clients get same-day replies and often same-day revisions on short-form content." },
          { heading: "Podcasts, finance and media", text: "A large share of our New York work is video podcasts recorded in Manhattan and Brooklyn studios, plus finance and business channels that need clean charts and confident pacing. We also edit for media brands and fashion labels producing social-first video." },
          { heading: "Upstate and beyond", text: "Not every New York client is in the city. We work with coaches, educators and small businesses across the state who need professional video without travelling to a production house." },
        ],
        niches: ["Podcasts", "Finance", "Media & news", "Fashion", "Business coaching"],
        timeOverlap: "Same-day replies across ET business hours.",
        faqs: [
          { q: "Do you edit studio podcasts recorded in NYC?", a: "Yes. Multi-camera studio podcasts are one of our most common New York projects." },
          { q: "Can you add financial charts?", a: "Yes — animated charts, tickers and data callouts are standard for finance clients." },
        ],
        nearby: ["usa/florida", "usa/illinois"],
        cities: [
          {
            slug: "new-york-city",
            name: "New York City",
            h1: "Video Editor in New York City for Podcasts and YouTube",
            metaTitle: "Video Editor New York City | Podcast & YouTube Editing",
            metaDescription: "Remote video editor for NYC podcasters, finance and business creators. Multi-cam podcast edits, clips and long-form, ET-friendly turnaround.",
            intro: "New York City runs on conversation. It's arguably the podcast capital of the US, home to finance, media and business creators who talk for a living. Our NYC clients need editors who can turn a ninety-minute conversation into a tight episode and a week of clips — and who understand that in this city, credibility is everything.",
            paragraphs: [
              { heading: "Podcast editing for NYC studios", text: "We edit multi-camera podcasts recorded in studios across Manhattan and Brooklyn, switching angles on the conversation, cleaning audio from shared rooms and adding branded lower thirds for guests. Every episode can include eight to twelve vertical clips with captions for Shorts, Reels and TikTok." },
              { heading: "Finance and business content", text: "Finance creators need precision. We animate charts accurately, keep disclaimers visible where needed, and pace explanations so complex ideas stay clear. Business and startup content gets clean B-roll and a confident, uncluttered look." },
              { heading: "Fast, like the city", text: "NYC clients are on Eastern time, which overlaps with our working hours most of the day. Short-form clips often come back the same day; full episodes within 48 hours." },
            ],
            niches: ["Podcasts", "Finance & investing", "Media", "Startups", "Fashion"],
            timeOverlap: "Strong ET overlap: same-day short-form, 48h episodes.",
            faqs: [
              { q: "Can you edit a weekly podcast with clips?", a: "Yes. Our podcast plans include the full episode plus vertical clips every week." },
              { q: "Do you sign NDAs for financial content?", a: "Yes, routinely." },
              { q: "Can you work with our in-house producer?", a: "Yes. We regularly slot into existing teams, following your producer's notes and templates." },
            ],
            nearby: ["usa/illinois/chicago", "usa/florida/miami"],
          },
        ],
      },
      {
        slug: "texas",
        name: "Texas",
        h1: "Video Editing Services for Texas Creators",
        metaTitle: "Video Editing Services Texas | Austin, Houston, Dallas",
        metaDescription: "Video editing for Texas YouTubers, startups and businesses in Austin, Houston and Dallas. Central-time workflow, 48h first cuts.",
        intro: "Texas has become one of the fastest-growing creator and startup hubs in the US. Austin draws tech founders and creators, Dallas and Houston host big business and real estate markets. We edit for Texas clients who want to grow on YouTube and social without hiring locally.",
        paragraphs: [
          { heading: "Central time workflow", text: "Central time gives a good overlap with our team — upload by mid-afternoon and short-form edits are often ready the same evening, with long-form first cuts the next day." },
          { heading: "Tech, real estate and outdoors", text: "Texas clients bring a broad mix: SaaS founders in Austin, real estate agents in Dallas and Houston, outdoors and hunting channels, and a growing number of business podcasts. We match editors to each niche." },
        ],
        niches: ["Tech & startups", "Real estate", "Outdoors", "Business podcasts", "Fitness"],
        timeOverlap: "CT business hours, overnight long-form edits.",
        faqs: [
          { q: "Do you edit real estate videos in Texas?", a: "Yes, listing tours and agent branding for Dallas, Houston, Austin and San Antonio markets." },
          { q: "Can you help a startup launch video?", a: "Yes, from product demos to founder-led social content." },
        ],
        nearby: ["usa/california", "usa/florida"],
        cities: [
          {
            slug: "austin",
            name: "Austin",
            h1: "Video Editor in Austin for Tech Founders and Creators",
            metaTitle: "Video Editor Austin | Startup & YouTube Video Editing",
            metaDescription: "Remote video editor for Austin startups, tech creators and podcasters. Product demos, founder content and YouTube edits with fast turnaround.",
            intro: "Austin's mix of tech companies, founders and creators has made it one of the most interesting video markets in the country. Founders want to build in public, startups want launch videos, and creators want content that feels smart rather than flashy. We edit for all three.",
            paragraphs: [
              { heading: "Founder-led content", text: "Building in public on YouTube, LinkedIn and X has become a growth channel for Austin startups. We turn founder recordings into clean talking-head videos, short clips with captions and LinkedIn-native formats, without making a technical founder look like a TikTok star." },
              { heading: "Product demos and launches", text: "Screen recordings, UI zooms, motion callouts and clean voiceover make a product demo work. We edit launch videos, feature walkthroughs and webinar replays so prospects understand your product in minutes." },
              { heading: "Tech creators and podcasts", text: "Austin is also home to many tech and business podcasters and YouTubers. We handle multi-cam podcast edits, explainers with motion graphics and weekly clip packages." },
            ],
            niches: ["Tech & SaaS", "Founders", "Business podcasts", "Productivity", "Music"],
            timeOverlap: "CT overlap: same-day clips, next-day long-form.",
            faqs: [
              { q: "Can you edit SaaS demos with UI zooms?", a: "Yes. Smooth zooms, cursor highlights and motion callouts are standard." },
              { q: "Do you work with early-stage startups?", a: "Yes. Per-video pricing suits startups that need a launch video now and more content later." },
              { q: "Can you make LinkedIn video?", a: "Yes — square and vertical formats with captions designed for LinkedIn's feed." },
            ],
            nearby: ["usa/california/los-angeles", "usa/illinois/chicago"],
          },
        ],
      },
      {
        slug: "florida",
        name: "Florida",
        h1: "Video Editing Services for Florida Creators and Agents",
        metaTitle: "Video Editing Services Florida | Real Estate & YouTube",
        metaDescription: "Video editing for Florida real estate agents, lifestyle creators and businesses in Miami, Orlando and Tampa. ET workflow, 24–48h delivery.",
        intro: "Florida's video market is driven by lifestyle, travel and one of the most active real estate markets in the country. We edit for Florida agents, creators and businesses who need content that looks as bright as the state itself.",
        paragraphs: [
          { heading: "Real estate first", text: "Luxury condos, waterfront homes and vacation rentals all sell better with video. We edit listing tours, drone footage and agent branding videos with colour that captures Florida light." },
          { heading: "Lifestyle and travel", text: "Florida creators produce travel vlogs, boating and fishing content, theme-park channels and fitness content. We edit with energy and keep colour vibrant without looking fake." },
        ],
        niches: ["Real estate", "Travel & lifestyle", "Fishing & boating", "Theme parks", "Fitness"],
        timeOverlap: "ET overlap with same-day replies.",
        faqs: [
          { q: "Can you deliver real estate videos in 24 hours?", a: "Yes, our 24-hour tier is popular with Florida photographers and agents." },
          { q: "Do you edit drone footage?", a: "Yes, graded and stabilised to match ground footage." },
        ],
        nearby: ["usa/new-york", "usa/texas"],
        cities: [
          {
            slug: "miami",
            name: "Miami",
            h1: "Video Editor in Miami for Real Estate and Lifestyle",
            metaTitle: "Video Editor Miami | Real Estate & Lifestyle Video",
            metaDescription: "Remote video editor for Miami real estate agents, luxury brands and lifestyle creators. Listing tours, Reels and YouTube edits in 24–48h.",
            intro: "Miami is a city that sells itself visually: waterfront penthouses, nightlife, fashion and endless sunshine. Real estate agents, luxury brands and lifestyle creators here know that video is their storefront. We edit Miami content to look premium, move fast and convert viewers into buyers and followers.",
            paragraphs: [
              { heading: "Luxury real estate video", text: "Miami's high-end listings deserve more than a slideshow. We edit cinematic tours that flow from arrival to skyline view, grade interiors so they feel bright and airy, and cut vertical teasers for Instagram where many Miami buyers first discover properties. Agent branding is applied consistently across every listing." },
              { heading: "Lifestyle, hospitality and nightlife", text: "Restaurants, hotels, clubs and lifestyle creators need energetic, beat-matched edits that capture atmosphere. We cut Reels and TikToks designed to stop the scroll." },
              { heading: "Bilingual audiences", text: "Many Miami businesses speak to English and Spanish audiences. We add Spanish subtitles or create bilingual caption versions so every post reaches both." },
            ],
            niches: ["Luxury real estate", "Hospitality", "Nightlife", "Fashion", "Bilingual brands"],
            timeOverlap: "ET overlap: 24h real estate tier available.",
            faqs: [
              { q: "Can you add Spanish subtitles?", a: "Yes, Spanish subtitles and bilingual caption versions are available on any video." },
              { q: "Do you edit luxury listing videos?", a: "Yes — cinematic tours, drone and twilight footage, plus vertical teasers." },
              { q: "How fast can a listing video be delivered?", a: "Within 24 hours on our rush tier, 48 hours as standard." },
            ],
            nearby: ["usa/new-york/new-york-city", "usa/texas/austin"],
          },
        ],
      },
      {
        slug: "illinois",
        name: "Illinois",
        h1: "Video Editing Services for Illinois Creators",
        metaTitle: "Video Editing Services Illinois | Chicago & Beyond",
        metaDescription: "Video editing for Illinois creators, coaches and businesses. Central-time workflow, YouTube, podcast and corporate video editing.",
        intro: "Illinois, anchored by Chicago, has a strong base of business, education and food creators, plus a deep corporate sector that increasingly relies on video. We edit for clients across the state.",
        paragraphs: [
          { heading: "Business and corporate video", text: "Illinois companies use video for recruitment, training and brand storytelling. We edit corporate content to brand guidelines, with captions for accessibility." },
          { heading: "Education and food creators", text: "Educators, food channels and coaches across Illinois rely on us for clean long-form edits and short-form clips." },
        ],
        niches: ["Corporate", "Education", "Food", "Sports", "Coaching"],
        timeOverlap: "CT business hours, overnight long-form edits.",
        faqs: [
          { q: "Do you edit corporate training videos?", a: "Yes, with chapters, slides and accessible captions." },
          { q: "Do you work with universities?", a: "Yes — lecture edits, course modules and promotional content." },
        ],
        nearby: ["usa/new-york", "usa/texas"],
        cities: [
          {
            slug: "chicago",
            name: "Chicago",
            h1: "Video Editor in Chicago for Brands and Creators",
            metaTitle: "Video Editor Chicago | Corporate, Food & YouTube",
            metaDescription: "Remote video editor for Chicago brands, food creators, coaches and podcasters. Corporate video, YouTube and short-form with CT-friendly turnaround.",
            intro: "Chicago blends big-company polish with a down-to-earth creator scene. Corporate HQs, agencies, food creators, sports channels and coaches all produce video here. We edit for Chicago clients who want reliable, professional results without big-agency overhead.",
            paragraphs: [
              { heading: "Corporate and agency overflow", text: "Chicago agencies and in-house teams use us for overflow editing during busy seasons. We follow your brand templates, deliver review links your stakeholders can comment on, and stay invisible to your clients." },
              { heading: "Food, sports and local creators", text: "Food creators need appetising colour and rhythmic edits; sports channels need fast highlight cuts. We have editors who specialise in both." },
              { heading: "Central time collaboration", text: "Chicago's time zone overlaps well with our team, so feedback cycles are quick — often the same day for short videos." },
            ],
            niches: ["Corporate", "Agencies", "Food", "Sports", "Coaching"],
            timeOverlap: "CT overlap: same-day short-form revisions.",
            faqs: [
              { q: "Can you work white-label for a Chicago agency?", a: "Yes. Your branding only, and we follow your file conventions." },
              { q: "Do you edit food content?", a: "Yes, with colour grading that makes food look as good as it tastes." },
              { q: "Can you deliver sports highlights quickly?", a: "Yes, short highlight cuts are often delivered within 24 hours." },
            ],
            nearby: ["usa/new-york/new-york-city", "usa/texas/austin"],
          },
        ],
      },
    ],
  },
  {
    slug: "uk",
    name: "United Kingdom",
    h1: "Video Editing Services for UK YouTubers and Brands",
    metaTitle: "YouTube Video Editor UK | Video Editing Services",
    metaDescription: "Video editing services for UK creators, podcasters and businesses. GMT/BST working hours, GBP price guide and 48h first cuts.",
    currency: { code: "GBP", symbol: "£", rate: 0.79 },
    timezone: "GMT / BST",
    timeOverlap: "Our day shift overlaps most of the UK working day, so you get live replies, same-day revisions on short-form and next-day long-form cuts.",
    intro:
      "British creators have built some of YouTube's most distinctive channels — dry humour, deep-dive documentaries, football, finance and a booming podcast scene. We edit for UK creators and businesses who want polished, retention-focused video with working hours that line up with theirs.",
    paragraphs: [
      { heading: "Real overlap with UK hours", text: editTeamHours + " For UK clients that means most of your working day is shared with ours: feedback in the morning, revisions by the afternoon." },
      { heading: "What UK clients edit with us", text: "Podcasts are the biggest growth area, followed by documentary-style YouTube, personal finance and property content. UK businesses also use us for LinkedIn video, recruitment films and event recaps." },
      { heading: "Pricing in pounds", text: "We bill in USD or GBP. The prices on this page show approximate pound equivalents so you can budget easily; your quote confirms the exact figure. Agencies in London often charge significantly more for comparable work." },
      { heading: "British style, understood", text: "UK audiences can spot over-the-top American-style editing instantly. We adapt pacing and tone to your audience — understated where it should be, punchy where it helps." },
    ],
    niches: ["Podcasts", "Documentary YouTube", "Personal finance", "Property", "Football"],
    faqs: [
      { q: "Can you invoice in GBP?", a: "Yes. We can invoice in pounds and accept card, PayPal and UK bank transfer via Wise." },
      { q: "Do you understand UK spelling for captions?", a: "Yes, captions and on-screen text follow British spelling unless you prefer US English." },
      { q: "Can we have calls during UK hours?", a: "Yes, calls are scheduled within UK business hours." },
    ],
    nearby: ["usa", "uae"],
    states: [
      {
        slug: "england",
        name: "England",
        h1: "Video Editing Services for Creators in England",
        metaTitle: "Video Editing Services England | YouTube & Podcasts",
        metaDescription: "Video editing for creators and businesses across England — London, Manchester, Birmingham. GMT-friendly, 48h first cuts, GBP price guide.",
        intro: "England's creator scene stretches well beyond London. Manchester's football and music channels, Birmingham's business community and countless educators and coaches across the country all rely on video. We edit for clients throughout England.",
        paragraphs: [
          { heading: "London and beyond", text: "London clients bring media, finance and fashion work; Northern clients bring football, gaming and music. We staff editors with the right genre experience for each." },
          { heading: "Businesses going video-first", text: "English SMEs increasingly use video for recruitment, product explainers and LinkedIn. We make it easy with simple per-video pricing." },
        ],
        niches: ["Football", "Media", "Finance", "Gaming", "SMEs"],
        timeOverlap: "Full overlap with UK office hours.",
        faqs: [
          { q: "Do you work with businesses outside London?", a: "Yes, across all of England and the rest of the UK." },
          { q: "Can you edit football content?", a: "Yes — reaction videos, analysis and match highlight-style edits within platform rules." },
        ],
        nearby: [],
        cities: [
          {
            slug: "london",
            name: "London",
            h1: "Video Editor in London for Creators and Businesses",
            metaTitle: "Video Editor London | YouTube, Podcast & Brand Video",
            metaDescription: "Remote video editor for London creators, podcasters, startups and brands. UK-hours collaboration, GBP pricing guide, 48h first cuts.",
            intro: "London is Europe's media capital and home to a thriving creator economy — podcasters in east London studios, finance YouTubers in the City, fashion brands in the West End and startups everywhere in between. We give London clients studio-level editing from a dedicated editor, with genuine UK-hours collaboration and pricing well below central London post houses.",
            paragraphs: [
              { heading: "Podcasts and talk content", text: "London's podcast boom shows no sign of slowing. We edit multi-camera studio shows, remote interviews and live recordings, then cut them into short clips with British-spelled captions." },
              { heading: "Finance, property and business", text: "From personal finance explainers to property investment channels and startup founders building in public, London's business creators need clear, credible editing with accurate graphics." },
              { heading: "Fashion and lifestyle brands", text: "Fashion labels and lifestyle brands need stylish, beat-driven edits for Reels and TikTok. We match your brand's visual language and colour palette." },
            ],
            niches: ["Podcasts", "Finance & property", "Fashion", "Startups", "Comedy"],
            timeOverlap: "Full UK office-hours overlap; same-day short-form revisions.",
            faqs: [
              { q: "Can I get pricing in pounds?", a: "Yes, quotes and invoices can be in GBP." },
              { q: "Do you use British spelling?", a: "Yes, by default for UK clients." },
              { q: "Can you edit for London agencies white-label?", a: "Yes, regularly." },
            ],
            nearby: ["canada/ontario/toronto", "uae/dubai-emirate/dubai"],
          },
        ],
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    h1: "Video Editing Services for Canadian Creators",
    metaTitle: "YouTube Video Editor Canada | Video Editing Services",
    metaDescription: "Video editing services for Canadian YouTubers, podcasters and businesses. ET and PT friendly, CAD price guide and 48h first cuts.",
    currency: { code: "CAD", symbol: "CA$", rate: 1.37 },
    timezone: "ET / CT / MT / PT",
    timeOverlap: "Canadian clients get the same overnight workflow as the US: upload at the end of your day, review a first cut the next morning.",
    intro:
      "Canada punches far above its weight in online video, with creators in gaming, education, outdoors and comedy reaching global audiences. We edit for Canadian creators and businesses from Vancouver to Halifax, with pricing guidance in Canadian dollars and schedules built around your time zone.",
    paragraphs: [
      { heading: "Coast-to-coast scheduling", text: "Whether you're on Eastern or Pacific time, our shifts cover your working day and edit while you sleep. Live calls are booked in your local time." },
      { heading: "Canadian creator niches", text: "Gaming and esports, outdoors and adventure, personal finance (TFSA and RRSP explainers are a staple), real estate and education are the most common niches among our Canadian clients." },
      { heading: "CAD price guide", text: "Prices on this page show approximate Canadian dollar equivalents. Invoices can be in CAD or USD." },
      { heading: "Bilingual content", text: "For Quebec and national audiences we can provide French subtitles and bilingual caption versions." },
    ],
    niches: ["Gaming", "Outdoors", "Personal finance", "Real estate", "Education"],
    faqs: [
      { q: "Can you invoice in CAD?", a: "Yes, invoices can be issued in Canadian dollars." },
      { q: "Do you offer French subtitles?", a: "Yes, French subtitles and bilingual captions are available." },
      { q: "Will time zones slow things down?", a: "No — the overnight workflow usually speeds turnaround up." },
    ],
    nearby: ["usa", "uk"],
    states: [
      {
        slug: "ontario",
        name: "Ontario",
        h1: "Video Editing Services for Ontario Creators",
        metaTitle: "Video Editing Services Ontario | Toronto & Ottawa",
        metaDescription: "Video editing for Ontario creators and businesses in Toronto, Ottawa and Hamilton. ET workflow, CAD price guide, 48h first cuts.",
        intro: "Ontario is Canada's creator and business heartland. Toronto's media scene, Ottawa's government and education sector and a large base of small businesses all rely on video. We edit for clients across the province.",
        paragraphs: [
          { heading: "Eastern time collaboration", text: "Ontario shares Eastern time with New York, which gives strong overlap with our team for same-day replies." },
          { heading: "Business and education", text: "Ontario clients often need corporate, training and education video alongside YouTube content. We handle both with brand consistency." },
        ],
        niches: ["Media", "Education", "Tech", "Real estate", "Coaching"],
        timeOverlap: "ET overlap; same-day replies.",
        faqs: [
          { q: "Do you edit for Ottawa organisations?", a: "Yes — education, nonprofit and public-sector-adjacent content with accessible captions." },
          { q: "Can you deliver French captions?", a: "Yes." },
        ],
        nearby: [],
        cities: [
          {
            slug: "toronto",
            name: "Toronto",
            h1: "Video Editor in Toronto for YouTube and Brands",
            metaTitle: "Video Editor Toronto | YouTube & Business Video Editing",
            metaDescription: "Remote video editor for Toronto creators, startups and brands. YouTube, podcasts, real estate and Reels with ET-friendly turnaround and CAD pricing guide.",
            intro: "Toronto is Canada's largest media and tech hub and one of North America's most diverse creator scenes. From finance YouTubers on Bay Street to food creators, real estate agents and multilingual channels, Toronto creators need editing that's sharp and adaptable. We deliver it remotely with ET-aligned schedules.",
            paragraphs: [
              { heading: "Finance and real estate", text: "Personal finance and real estate are two of Toronto's biggest YouTube niches. We animate charts, explain mortgages and markets visually, and edit property tours that make listings stand out." },
              { heading: "Multicultural, multilingual content", text: "Toronto creators often reach audiences in several languages. We add subtitles in French, Hindi, Punjabi, Mandarin and more so content travels further." },
              { heading: "Startups and tech", text: "The Toronto–Waterloo corridor produces a steady stream of startups needing launch videos, demos and founder content. We edit them with clean motion graphics and clear messaging." },
            ],
            niches: ["Finance", "Real estate", "Multilingual channels", "Tech startups", "Food"],
            timeOverlap: "ET overlap; next-morning long-form cuts.",
            faqs: [
              { q: "Do you add subtitles in other languages?", a: "Yes, including French, Hindi, Punjabi and Mandarin." },
              { q: "Can you edit real estate listing videos?", a: "Yes, with 24–48h delivery." },
              { q: "Do you invoice in CAD?", a: "Yes." },
            ],
            nearby: ["usa/new-york/new-york-city", "uk/england/london"],
          },
        ],
      },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    h1: "Video Editing Services for Australian Creators",
    metaTitle: "YouTube Video Editor Australia | Video Editing Services",
    metaDescription: "Video editing services for Australian YouTubers, podcasters and businesses. AEST-friendly hours, AUD price guide and 48h first cuts.",
    currency: { code: "AUD", symbol: "A$", rate: 1.52 },
    timezone: "AEST / AEDT / AWST",
    timeOverlap: "Our early shift overlaps Australian afternoons, so feedback you send after lunch is often actioned the same day.",
    intro:
      "Australian creators have a global reach out of proportion to the country's size — travel, surf, fitness, comedy and business content made here is watched worldwide. Being far from the US often means awkward agency hours. We fix that with shifts that overlap Australian business days and pricing guidance in Australian dollars.",
    paragraphs: [
      { heading: "Hours that work for Australia", text: "Many overseas editors are asleep during the Australian working day. Our early shift overlaps your afternoon, so you can give feedback and see changes before you log off." },
      { heading: "Niches we edit for Australians", text: "Travel and adventure, fitness and wellness, property investing, small business and podcasts make up most of our Australian work." },
      { heading: "AUD price guide", text: "We show approximate Australian dollar prices on this page; invoices can be in AUD or USD." },
      { heading: "Australian voice", text: "We keep your tone authentic — no Americanising your captions or humour." },
    ],
    niches: ["Travel & surf", "Fitness", "Property investing", "Small business", "Podcasts"],
    faqs: [
      { q: "Can you invoice in AUD?", a: "Yes, invoices can be in Australian dollars." },
      { q: "Do your hours overlap with Sydney and Melbourne?", a: "Yes, our early shift overlaps the Australian afternoon." },
      { q: "Do you use Australian spelling?", a: "Yes, on request — captions follow Australian/British spelling." },
    ],
    nearby: ["uae", "uk"],
    states: [
      {
        slug: "new-south-wales",
        name: "New South Wales",
        h1: "Video Editing Services for New South Wales Creators",
        metaTitle: "Video Editing Services NSW | Sydney & Newcastle",
        metaDescription: "Video editing for New South Wales creators and businesses in Sydney, Newcastle and Wollongong. AEST overlap, AUD price guide.",
        intro: "New South Wales is home to Australia's largest city and a thriving mix of media, property and lifestyle creators. We edit for NSW clients from Sydney's CBD to the coast.",
        paragraphs: [
          { heading: "Property and business", text: "NSW has one of the most watched property markets in the world. Agents, investors and mortgage brokers use video to explain and sell; we edit it clearly and quickly." },
          { heading: "Coastal lifestyle", text: "Surf, travel and fitness creators along the NSW coast need vibrant, energetic edits. We grade colour to keep that coastal light true." },
        ],
        niches: ["Property", "Surf & lifestyle", "Business", "Fitness", "Media"],
        timeOverlap: "AEST afternoon overlap.",
        faqs: [
          { q: "Do you edit property investment content?", a: "Yes, with charts and clear explanations." },
          { q: "Can you edit surf and travel content?", a: "Yes, with energetic pacing and vibrant colour." },
        ],
        nearby: [],
        cities: [
          {
            slug: "sydney",
            name: "Sydney",
            h1: "Video Editor in Sydney for Creators and Businesses",
            metaTitle: "Video Editor Sydney | YouTube, Property & Lifestyle",
            metaDescription: "Remote video editor for Sydney creators, property agents and brands. AEST overlap, AUD price guide and 48h first cuts.",
            intro: "Sydney's creators work against a backdrop most of the world envies, and their audiences expect content to look the part. Property agents, fitness brands, travel creators and business podcasters here all compete for global attention. We help them do it with editing that's polished, energetic and delivered during Australian hours.",
            paragraphs: [
              { heading: "Property video for Sydney's market", text: "Sydney property moves fast and buyers browse on their phones. We edit listing tours, auction-day teasers and agent profile videos with colour that shows off harbour light and interiors honestly." },
              { heading: "Fitness, wellness and lifestyle", text: "Sydney's fitness and wellness brands need short-form content daily. We cut Reels and TikToks with captions, beat-matched edits and clear calls to action." },
              { heading: "Business podcasts", text: "A growing number of Sydney founders and investors run podcasts. We edit full episodes and clips so every recording works across platforms." },
            ],
            niches: ["Property", "Fitness & wellness", "Travel", "Business podcasts", "Hospitality"],
            timeOverlap: "AEST afternoon overlap; same-day revision rounds on short-form.",
            faqs: [
              { q: "Can I get prices in AUD?", a: "Yes, quotes and invoices can be in Australian dollars." },
              { q: "Do you edit auction teasers?", a: "Yes, short vertical teasers for listings and auction campaigns." },
              { q: "Are your hours compatible with Sydney?", a: "Yes, our early shift overlaps Sydney afternoons." },
            ],
            nearby: ["uae/dubai-emirate/dubai", "uk/england/london"],
          },
        ],
      },
    ],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    h1: "Video Editing Services for UAE Brands and Creators",
    metaTitle: "Video Editing Services UAE | Dubai & Abu Dhabi",
    metaDescription: "Video editing for UAE brands, real estate developers and creators in Dubai and Abu Dhabi. GST-friendly hours, AED price guide, Arabic subtitles.",
    currency: { code: "AED", symbol: "AED ", rate: 3.67 },
    timezone: "GST (UTC+4)",
    timeOverlap: "Gulf Standard Time overlaps almost the entire working day of our team, giving UAE clients live collaboration and fast turnarounds.",
    intro:
      "The UAE has become a global hub for luxury, real estate, hospitality and creators relocating from around the world. Content here is expected to look premium. We edit for UAE businesses and creators who need high-end video with close time-zone alignment and support for Arabic and English audiences.",
    paragraphs: [
      { heading: "Near-perfect time-zone overlap", text: editTeamHours + " For the UAE that means nearly full-day overlap — live feedback sessions and same-day revisions are normal." },
      { heading: "Luxury, real estate and hospitality", text: "Developers, brokers, hotels and restaurants drive much of the UAE's video demand. We edit cinematic property launches, hospitality reels and brand films to a luxury standard." },
      { heading: "Arabic and English", text: "We provide Arabic subtitles, right-to-left caption layouts and bilingual versions so content reaches the whole market." },
      { heading: "AED price guide", text: "Prices are shown in approximate dirhams; invoices can be in AED or USD." },
    ],
    niches: ["Luxury real estate", "Hospitality", "Business & finance", "Lifestyle", "Automotive"],
    faqs: [
      { q: "Can you add Arabic subtitles?", a: "Yes, including proper right-to-left caption layouts." },
      { q: "Can you invoice in AED?", a: "Yes." },
      { q: "Do you edit property launch videos?", a: "Yes — cinematic launches, CGI walkthrough integration and social cut-downs." },
    ],
    nearby: ["uk", "australia"],
    states: [
      {
        slug: "dubai-emirate",
        name: "Dubai Emirate",
        h1: "Video Editing Services in the Emirate of Dubai",
        metaTitle: "Video Editing Services Dubai Emirate | Brands & Creators",
        metaDescription: "Video editing for businesses and creators across the Emirate of Dubai. Luxury real estate, hospitality and social content, Arabic + English.",
        intro: "The Emirate of Dubai combines one of the world's busiest real estate markets with a fast-growing creator community. We edit for developers, brokers, hospitality groups and creators across the emirate.",
        paragraphs: [
          { heading: "Developers and brokers", text: "Off-plan launches, CGI walkthroughs and broker personal brands all rely on video. We edit to luxury standards and deliver social cut-downs for every platform." },
          { heading: "Creators relocating to Dubai", text: "Many international creators now base themselves in Dubai. We keep editing seamless during the move and beyond." },
        ],
        niches: ["Real estate", "Hospitality", "Creators", "Automotive", "Finance"],
        timeOverlap: "Near full-day GST overlap.",
        faqs: [
          { q: "Do you work with off-plan developers?", a: "Yes, including launch films and CGI integration." },
          { q: "Can you deliver bilingual edits?", a: "Yes, Arabic and English." },
        ],
        nearby: [],
        cities: [
          {
            slug: "dubai",
            name: "Dubai",
            h1: "Video Editor in Dubai for Luxury and Real Estate Brands",
            metaTitle: "Video Editor Dubai | Real Estate & Luxury Video Editing",
            metaDescription: "Remote video editor for Dubai real estate brokers, developers, luxury brands and creators. Arabic + English, GST-aligned hours, fast delivery.",
            intro: "Dubai sells aspiration, and video is how it does it. Brokers post daily property tours, developers launch towers with cinematic films, and luxury brands and creators compete for attention in one of the world's most visual markets. We edit Dubai content to match the city: polished, confident and premium.",
            paragraphs: [
              { heading: "Real estate brokers and developers", text: "Dubai brokers build personal brands on Instagram and YouTube with property walkthroughs, market updates and lifestyle content. We edit daily content with consistent branding, plus cinematic launch films for developers integrating CGI renders and drone footage." },
              { heading: "Luxury, automotive and hospitality", text: "Supercars, hotels, restaurants and luxury retail need edits that feel expensive: smooth motion, rich colour, restrained typography and music that matches the brand. We keep it tasteful, never tacky." },
              { heading: "Arabic and English audiences", text: "We deliver bilingual captions and Arabic subtitles with correct right-to-left layouts, so every video reaches both local and expat audiences." },
            ],
            niches: ["Luxury real estate", "Developers", "Automotive", "Hospitality", "Lifestyle creators"],
            timeOverlap: "Near full-day GST overlap; same-day revisions.",
            faqs: [
              { q: "Can you edit daily broker content?", a: "Yes, our monthly plans suit brokers posting daily." },
              { q: "Do you integrate CGI renders?", a: "Yes, we blend CGI walkthroughs with live footage and drone shots." },
              { q: "Is Arabic subtitling included?", a: "Available as an add-on on any video." },
            ],
            nearby: ["uk/england/london", "australia/new-south-wales/sydney"],
          },
        ],
      },
    ],
  },
];

export const getCountry = (c: string) => countries.find((x) => x.slug === c);
export const getState = (c: string, s: string) => getCountry(c)?.states.find((x) => x.slug === s);
export const getCity = (c: string, s: string, city: string) => getState(c, s)?.cities.find((x) => x.slug === city);

/** Resolve a "country/state/city" path into a display name for sideways links */
export const locationName = (path: string) => {
  const [c, s, city] = path.split("/");
  if (city) return getCity(c, s, city)?.name ?? path;
  if (s) return getState(c, s)?.name ?? path;
  return getCountry(c)?.name ?? path;
};
