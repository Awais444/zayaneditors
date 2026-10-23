# Keyword → page map

One primary keyword per page. No two pages target the same primary keyword. Secondary keywords support the page but are never another page's primary. Titles are ≤ 60 characters, enforced by `npm run seo:check`.

| Primary keyword | Page | Secondary / supporting |
| --- | --- | --- |
| video editing services | `/` | professional video editors, dedicated video editor |
| video editing agency | `/video-editing-agency` | video editing company, video editing team |
| hire a video editor | `/blog/hire-youtube-video-editor` | freelancer vs agency, how to hire an editor |
| (all services list) | `/services` | service index — navigational, no money keyword |
| talking head video editing | `/talking-head-video-editing` | reels editing for coaches, captions |
| youtube video editing services | `/youtube-video-editing` | youtube editor, long-form editing |
| short form video editing | `/short-form-video-editing` | vertical video editing |
| tiktok video editing | `/tiktok-video-editing` | tiktok editor |
| youtube shorts editing | `/youtube-shorts-editing` | shorts editor |
| reels editing services | `/instagram-reels-editing` | instagram reels editor |
| podcast video editing | `/podcast-video-editing` | video podcast editing, podcast clips |
| ugc ad editing | `/ugc-ad-editing` | ugc video editing, creator ads |
| vsl video editing | `/vsl-video-editing` | video sales letter editing |
| 3d animation services | `/3d-animation` | 3d intro, product animation |
| logo animation services | `/logo-animation` | animated logo intro |
| ai video editing services | `/ai-video-editing` | ai generated video ads |
| wedding video editing | `/wedding-video-editing` | wedding film editing |
| corporate video editing | `/corporate-video-editing` | brand & internal video |
| real estate video editing | `/real-estate-video-editing` | property video, listing video |
| video editing pricing | `/pricing` | per-video price, monthly plans |
| video editing cost 2026 | `/blog/youtube-video-editing-cost` | youtube editing price |
| talking head editing guide (informational) | `/blog/talking-head-video-editing` | how to edit talking head videos |
| short form vs long form video | `/blog/short-form-vs-long-form-video` | repurposing |
| send raw footage to editor | `/blog/how-to-send-raw-footage-to-video-editor` | file transfer for editors |
| youtube audience retention | `/blog/increase-youtube-audience-retention` | retention editing |
| video editing services in [city] | `/locations/[country]` and `/locations/[country]/[service]` | one primary per location page |

## Cannibalization rules

- The commercial service page owns "X video editing"; the blog post on the same topic targets the *informational* query ("how to…", "guide") and links to the service page.
- `/` owns "video editing services"; `/services` is a navigational index and must not use that phrase first in its title.
- `/video-editing-agency` owns "agency"; Home does not use "agency" in its title.
- Location pages each own one city; copy must differ substantively (see `seo-todo.md` if any are thin).

## Gaps

- Location pages share a template. Before adding more, make sure each has location-specific facts (see `seo-todo.md`).
