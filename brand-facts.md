# Brand facts

The single, consistent description of the business that every page, profile and directory listing should repeat word for word. AI assistants build their picture of a brand from repeated, consistent facts across the web.

Source of truth: `data/site.ts`, `data/services.ts`, `data/pricing.ts`. If a fact changes, change it there and update this file. **Items marked ⚠️ are placeholders — see `seo-todo.md`. Do not publish them on external profiles until they are real.**

## One-line description

> Frameforge Studio is a dedicated team of professional video editors for YouTube, social, ads, brand films, weddings, events, music videos and podcasts. First cut in 48 hours, free trial edit.

## Short description (≈50 words)

> Frameforge Studio is a remote team of professional video editors, colourists, motion designers and sound engineers. Clients upload raw footage, give a short brief and receive a first cut within 48 hours, edited by a dedicated editor who learns their style. Services cover YouTube, short-form, podcasts, ads, animation, weddings and corporate video.

## Facts

| Fact | Value | Status |
| --- | --- | --- |
| Name | Frameforge Studio (short: Frameforge) | ⚠️ placeholder |
| Founder / lead editor | Alex Carter, Founder & Lead Editor | ⚠️ placeholder |
| Founded | 2019 | ⚠️ placeholder |
| What it does | Professional video editing as a remote team | ✅ |
| Services | 42 editing services across 6 groups (see `/services`) | ✅ from data |
| Clients in | USA, UK, Canada, Australia, UAE | ✅ |
| First cut | Within 48 hours | ✅ |
| Replies | Within 2 hours | ✅ |
| Prices from | $25 per short-form clip; $79 per long-form video; $99 per podcast episode (USD) | ✅ confirm before launch |
| Free trial | Free trial edit on the client's own footage | ✅ |
| Guarantee | Free re-edit if the first cut misses the brief; no charge for a video still unsatisfactory after revisions | ✅ |
| Website | `NEXT_PUBLIC_SITE_URL` | ⚠️ set domain |
| Email | `NEXT_PUBLIC_CONTACT_EMAIL` | ⚠️ not set |
| Logo | `/icon.svg` (temporary) | ⚠️ |
| Profiles (`sameAs`) | YouTube, Instagram, LinkedIn, Fiverr, Upwork, Behance | ⚠️ all empty |

## Not to be claimed anywhere

The Home-page stats (videos edited, views, clients, years, rating) in `data/site.ts → stats / trust` are **placeholders**. Do not repeat them in profiles, schema, `llms.txt` or press until they're real and verifiable.

## Where these facts appear on the site

- "What is Frameforge Studio?" section on Home and About (`components/sections/AboutBrand.tsx`)
- `Organization` / `ProfessionalService` schema (`lib/schema.ts`)
- `/llms.txt` and `/llms-full.txt` (`lib/llms.ts`)
- Footer
