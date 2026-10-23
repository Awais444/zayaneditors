/** Video editing terms used across the site. Definitions are general industry meanings, not claims about results. */
export type Term = { term: string; slug: string; definition: string; link?: string };

const t = (term: string, definition: string, link?: string): Term => ({
  term,
  slug: term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  definition,
  link,
});

export const glossary: Term[] = [
  t("A-roll", "The main footage of a video, usually the person speaking to camera or the core action, that the story is built around."),
  t("Aspect ratio", "The shape of the frame, written as width to height. 16:9 is standard horizontal video, 9:16 is vertical for Shorts, Reels and TikTok, and 1:1 is square."),
  t("B-roll", "Supporting footage cut over the main shot, such as screen recordings, product shots or stock clips, used to illustrate a point and keep the picture changing.", "/talking-head-video-editing"),
  t("Bitrate", "How much data a video file uses per second. Higher bitrate keeps more detail; messaging apps lower it, which is why raw footage should be sent as original files."),
  t("Color correction", "Fixing exposure, white balance and contrast so footage looks natural and consistent between shots.", "/color-grading"),
  t("Color grading", "Creative colour work applied after correction to give a video a particular mood or look.", "/color-grading"),
  t("Cut-down", "A shorter version of a longer video, such as a 30-second ad made from a two-minute film."),
  t("First cut", "The first complete edit sent to the client for feedback, also called a rough cut or first draft."),
  t("Frame rate", "How many still images make up each second of video, measured in frames per second (fps). Common rates are 24, 25, 30 and 60 fps."),
  t("Hook", "The opening seconds of a video, designed to make the viewer keep watching.", "/blog/increase-youtube-audience-retention"),
  t("J-cut and L-cut", "Edits where the audio of the next shot starts before its picture (J-cut), or the audio of the previous shot continues over the next picture (L-cut), making cuts feel smoother."),
  t("Jump cut", "A cut between two moments of the same shot that makes the subject appear to jump. Often hidden with punch-ins or left in for pace."),
  t("Kinetic typography", "Animated text that moves in time with speech or music, often used for captions and titles.", "/motion-graphics"),
  t("Lower third", "A text graphic in the lower part of the frame, typically showing a speaker's name and title."),
  t("Motion graphics", "Animated graphic elements such as titles, icons, charts and transitions added to a video.", "/motion-graphics"),
  t("Multi-cam editing", "Editing footage from several cameras recorded at the same time, switching between angles, common in podcasts and events.", "/podcast-video-editing"),
  t("Punch-in", "A digital zoom into the frame during editing, used to add emphasis or hide a jump cut."),
  t("Raw footage", "The original, unedited video and audio files straight from the camera or recorder.", "/blog/how-to-send-raw-footage-to-video-editor"),
  t("Audience retention", "The share of a video that viewers watch, shown on YouTube as a graph over the video's length.", "/blog/increase-youtube-audience-retention"),
  t("Repurposing", "Turning one piece of content, such as a long video or podcast, into several others, such as short vertical clips.", "/video-repurposing"),
  t("Revision round", "One set of consolidated feedback on a draft, after which the editor returns an updated version."),
  t("Safe zone", "The area of the frame that is not covered by platform buttons or captions, where important text and faces should stay."),
  t("Sound design", "Adding and mixing sound effects, ambience and music to support the picture.", "/sound-design-and-mixing"),
  t("SRT file", "A plain-text subtitle file with timecodes that video platforms can display as closed captions.", "/captions-and-subtitles"),
  t("Talking head video", "A video where one person speaks directly to the camera, common for coaching, education and business content.", "/talking-head-video-editing"),
  t("Turnaround", "The time between sending footage and receiving the edit."),
  t("UGC ad", "An advertisement made from user-generated-style content, typically a creator talking about a product on a phone camera.", "/ugc-ad-editing"),
  t("VSL", "Video sales letter: a presenter-led sales video that walks through a problem, an offer and a call to action.", "/vsl-video-editing"),
];
