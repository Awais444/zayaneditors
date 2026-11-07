# AI visibility checklist

How to check, once a month, whether AI assistants (ChatGPT, Perplexity, Gemini, Copilot, Claude, Google AI Overviews) mention and link to the site — and to measure the traffic they send.

## Setup (once)

1. **GA4 custom channel group "AI Search".** Admin → Data display → Channel groups → Create. Add a channel *AI Search* with the condition *Source matches regex*:
   `chatgpt\.com|chat\.openai\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai`
   Move it **above** "Referral" so these visits aren't counted as ordinary referrals.
2. **`ai_referral` event.** The site already sends it (`lib/analytics.ts` → `captureAiReferral`, fired from the GA4 snippet after consent) with `ai_source`, `referrer` and `landing_page`. In GA4, register `ai_source` and `landing_page` as event-scoped custom dimensions, and mark `ai_referral` as a key event if you want it in conversion reports.
3. **Search Console + Bing Webmaster Tools** verified, sitemaps submitted (Bing data also feeds Copilot and ChatGPT search).
4. Check that `/robots.txt` still allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and Google-Extended, and that `/llms.txt` loads.

## Monthly test prompts (20)

Run each in ChatGPT (search on), Perplexity, Gemini, Copilot and Claude in a logged-out or fresh session. Replace the brand name once it's final.

1. What are the best video editing services for YouTubers?
2. Recommend a video editing agency for a small business.
3. How much does it cost to hire a video editor in 2026?
4. Where can I hire a talking head video editor?
5. Best short-form video editing services for Reels and TikTok.
6. Who edits video podcasts and cuts clips from them?
7. Recommend a UGC ad editing service.
8. Who can edit a VSL (video sales letter)?
9. Logo animation services for a YouTube intro.
10. 3D animation studio for a product reveal, small budget.
11. AI video editing service with human editors.
12. Freelancer vs agency for YouTube editing — which is better?
13. How should I send raw footage to a video editor?
14. Short-form vs long-form video: which should my business make?
15. Video editing services in the UK / USA / Canada / Australia / Dubai.
16. What is Frameforge Studio?
17. Is Frameforge Studio a good video editing company?
18. Frameforge Studio pricing.
19. Video editing companies with a public portfolio by niche.
20. Wedding / corporate / real estate video editing service recommendations.

## Log

Record one row per prompt per assistant. "Cited" = the site is linked as a source; "Mentioned" = brand named without a link.

| Date | Assistant | Prompt # | Mentioned? | Cited? | URL cited | Competitors named | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | |

## What to do with the results

- **Not mentioned anywhere:** work on off-site signals — real profiles in `sameAs`, directory listings, reviews, guest posts and mentions using the exact wording in `brand-facts.md`.
- **Mentioned but with wrong facts:** fix the source the assistant cites, and make sure `brand-facts.md` wording is consistent across every profile.
- **A competitor is cited for a question we cover:** check our page has a clear Quick answer, a question-style heading that matches the prompt and an FAQ entry; then add the missing facts.
- **Cited:** note which page; keep it updated (visible "Last updated" date) and link to it internally.
