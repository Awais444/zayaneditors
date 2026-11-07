# Video Editing Agency Website

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion. It's statically generated (104 pages) and built to generate leads and rank on Google.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
npm run lint
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your domain, with no trailing slash. Used for canonicals, sitemap and schema |
| `NEXT_PUBLIC_VIDEO_PROVIDER` | `mp4` (direct URLs), `vimeo` (video ids) or `bunny` (Bunny Stream ids) |
| `NEXT_PUBLIC_BUNNY_LIBRARY_ID` | Bunny Stream library id (bunny only) |
| `RESEND_API_KEY` | Sends lead emails. If it's missing, leads are only logged on the server |
| `LEAD_TO_EMAIL` | Where new leads go |
| `LEAD_FROM_EMAIL` | Verified sender, e.g. `Studio <leads@yourdomain.com>` |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement id. Loads only after cookie consent |
| `NEXT_PUBLIC_TAWK_PROPERTY_ID` / `NEXT_PUBLIC_TAWK_WIDGET_ID` | Tawk.to live chat. Loads only after consent |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console verification token |

## Where things live

- `data/site.ts`: **all** business details (brand, contact, socials, stats, offer line, showreel).
- `data/services.ts` (`serviceGroups`) + `data/service-copy/*.ts`: the 38 service pages, grouped into six menu categories.
- `data/portfolio.ts`: case studies. `data/pricing.ts`: every price. `data/faqs.ts`, `data/team.ts`, `data/testimonials.ts`.
- `data/locations.ts`: country → state → city pages (read the **no mass generation** rule at the top).
- `content/blog/*.mdx`: blog posts.
- `app/actions/submit-lead.ts`: the server action behind every form (zod validation, honeypot, rate limit, Resend, UTM capture).
- `lib/analytics.ts`: GA4 events (`generate_lead`, `whatsapp_click`, `calendly_open`, `pricing_toggle`, `video_play`, `project_start`) and UTM cookie capture.
- `app/globals.css`: design tokens. Change `--color-accent` to re-brand.

## How to…

**Add a service:** add a copy object to a file in `data/service-copy/` (unique slug, unique 800+ word copy; long extra sections can go in `extra-sections.ts`), then add the slug to the right group in `serviceGroups` in `data/services.ts`. The group decides its category, menu column and footer position; the page, hub, sitemap and Service schema follow automatically. Link it from 3+ related services.

**Add a portfolio item:** add an entry to `caseStudies` in `data/portfolio.ts`. Use `tags` that match the services' `portfolioTags` so it appears on the relevant service pages.

**Add a blog post:** create `content/blog/my-slug.mdx` with this frontmatter: `title`, `description`, `date`, `category`, `author` (matching a name in `data/team.ts`) and `cover`. `##` headings become the table of contents. Drop `<InlineCTA />` anywhere for a call-to-action block. To link the post from a service page, add its slug to that service's `blog` array.

**Add a location:** add it **only** when Search Console shows impressions or you have a real client there. Add a country, state or city object in `data/locations.ts` with unique copy (600–900 words including FAQs), local niches and FAQs, and set `nearby` links.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com, choose **Add New → Project** and import the repo. The framework is auto-detected and no `vercel.json` is needed.
3. Add the environment variables above under **Settings → Environment Variables**.
4. Deploy. Then go to **Settings → Domains** to add your custom domain, and update `NEXT_PUBLIC_SITE_URL` to match.
5. In Resend, verify your sending domain. In Search Console, verify the site, then submit `/sitemap.xml`.
6. Optional: turn on Vercel Analytics and Speed Insights in the project dashboard. The components are already included.

## Owner TODO checklist

Search the codebase for `TODO` to find every placeholder.

- [ ] **Brand:** name, short name and domain (`data/site.ts`). Logo: replace the text mark in `components/layout/Logo.tsx` and add `/public/images/logo.svg`.
- [ ] **Contact:** email, WhatsApp number, Calendly link, owner name (`data/site.ts`).
- [ ] **Socials:** YouTube, Instagram, LinkedIn, Fiverr, Upwork, Behance URLs.
- [ ] **Stats:** videos edited, views, clients, years. **Offer line** and `priceFrom` (keep them in sync).
- [ ] **Showreel:** real video and poster (`site.showreel`).
- [ ] **Service hero videos:** `video` on each service (they currently use `sampleVideo`).
- [ ] **Before/after pair:** `components/sections/BeforeAfter.tsx`. **Timeline demo video and markers:** `components/sections/EditTimeline.tsx`.
- [ ] **Portfolio:** 6 sample case studies in `data/portfolio.ts`. Replace them with real clients, real metrics and permission.
- [ ] **Testimonials:** `data/testimonials.ts`. Set `verified: true` only on real ones, because only verified testimonials feed Review/AggregateRating schema.
- [ ] **Team:** names, specialties, software, bios, photos and reels (`data/team.ts`); the `editor` credited on each case study. **About page:** the founder's story.
- [ ] **Prices:** everything in `data/pricing.ts` and each service's `pricing`. Also review the currency `rate` values in `data/locations.ts` every quarter.
- [ ] **Platform/client logo marquee:** `components/sections/Stats.tsx`.
- [ ] **Local case studies:** set `localProof` on location entries once real clients exist.
- [ ] **Legal:** have the privacy policy and terms reviewed.
- [ ] **Captions:** add `.vtt` caption files and pass `captions` to videos.
- [ ] **Video upload dates and durations** used in VideoObject schema.
- [ ] **Env vars:** Resend, GA4, Tawk.to, Search Console.
