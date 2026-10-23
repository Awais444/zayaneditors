# SEO / AEO / GEO — things only you can fill in

Nothing here was invented. Each item is a fact the site needs but doesn't have yet. Fix the data file named and the site updates everywhere (pages, schema, `llms.txt`).

## Must fix before launch

- [ ] **Domain** — set `NEXT_PUBLIC_SITE_URL` (e.g. `https://yourdomain.com`) in Vercel. Canonicals, sitemaps, schema, `llms.txt` and IndexNow all read it.
- [ ] **Contact email** — set `NEXT_PUBLIC_CONTACT_EMAIL`. Until then email links and `Organization.email` are omitted.
- [ ] **WhatsApp number / Calendly link** — `data/site.ts` (`whatsapp`, `calendly`) are still placeholders.
- [ ] **Social / profile URLs** — `data/site.ts → socials` (YouTube, Instagram, LinkedIn, Fiverr, Upwork, Behance). They feed `Organization.sameAs`, which is how AI search links your brand to your profiles.
- [ ] **Trust numbers shown on the site** — `data/site.ts → stats` (2,500+ videos, 150M+ views, 120+ clients, 6+ years) and `trust` (4.9 rating, 120+ clients, 500+ videos) are placeholders but **visible on the Home page**. Replace with real numbers or remove them. They are deliberately NOT in any schema.
- [ ] **Brand name / founder / founded year** — `data/site.ts` (`name`, `owner`, `foundedYear`) are placeholders and appear in `Organization` schema (`foundingDate`) and `brand-facts.md`.
- [ ] **Logo** — `public/images/logo.svg` doesn't exist; schema uses `/icon.svg` for now. Add the real logo and point `Organization.logo` at it (`lib/schema.ts`).

## Team (E-E-A-T)

- [ ] `data/team.ts` people, photos and bios are placeholders (stock photos). For each real member: real name, role, years of experience, photo, then set `verified: true` and add `profiles: [LinkedIn, Behance…]`. Only verified members get `Person` schema.
- [ ] Blog author: posts are attributed to the placeholder owner name; update `author` in `content/blog/*.mdx` frontmatter to a real person.

## Reviews

- [ ] `data/testimonials.ts` — add real client names to publish testimonials (section stays hidden under 3). Set `verified: true` only for verifiable ones; only those produce `Review` / `AggregateRating` schema.

## Portfolio

- [ ] `data/portfolio-items.ts` — `client` and `results` fields are empty `TODO`s. Add real, verifiable results only.
- [ ] Upload dates: `VideoObject.uploadDate` uses the date the portfolio was first published on this site. If you know the real publish dates per video, add them.
- [ ] Full-length videos: only 12s previews are hosted. Upload the full edits to YouTube/Vimeo and add the embed URL so `VideoObject.embedUrl` points at the full video.

## Analytics

- [ ] GA4: create the "AI Search" custom channel group (see `ai-visibility-checklist.md` → Setup). The site already sends an `ai_referral` event with the source.
- [ ] Google Search Console + Bing Webmaster Tools: verify, submit `/sitemap.xml` and `/video-sitemap.xml`; set `NEXT_PUBLIC_GSC_VERIFICATION`.
- [ ] After each deploy: `NEXT_PUBLIC_SITE_URL=https://yourdomain.com npm run indexnow`.
