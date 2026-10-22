import { StickySteps, type Step } from "@/components/sections/StickySteps";
import { processVisuals } from "./ProcessVisuals";

const steps: Step[] = [
  { title: "Upload footage", text: "Drop raw files into a shared folder — no software to install, no size limits worth worrying about.", bullets: ["Drive, Dropbox, Frame.io or WeTransfer", "We check every file on arrival", "Missing angles flagged right away"], duration: "Same day", deliverable: "Upload confirmation" },
  { title: "Brief & hook review", text: "A two-minute brief, then your editor reviews the hook and structure before a single cut.", bullets: ["Goal, audience and references", "Hook rewritten for the first 3s", "Pickups suggested if needed"], duration: "24 hrs", deliverable: "Brief summary" },
  { title: "First cut", text: "A structured, paced edit with B-roll, text and music, built for retention from frame one.", bullets: ["Story structure and pacing", "B-roll, motion text, music", "Your style guide applied"], duration: "48 hrs", deliverable: "First cut link" },
  { title: "Revisions", text: "Leave time-coded notes on a review link; changes come back fast and are tracked to done.", bullets: ["Frame.io or doc comments", "Every note resolved and ticked", "Two rounds included"], duration: "24 hrs", deliverable: "Revised cut" },
  { title: "Color & sound", text: "A consistent grade and a clean, balanced mix so the video looks and sounds premium.", bullets: ["Grade and camera matching", "Noise cleanup and levelling", "Music and SFX mix"], duration: "Included", deliverable: "Graded master" },
  { title: "Thumbnail & captions", text: "CTR-focused thumbnail options and accurate, styled captions for silent viewers.", bullets: ["3 thumbnail concepts", "Animated or SRT captions", "Title pairing ideas"], duration: "24 hrs", deliverable: "Thumbnails + captions" },
  { title: "Deliver", text: "Upload-ready masters in every format you need, plus Shorts cut-downs if you want them.", bullets: ["4K masters, any aspect ratio", "Platform-ready exports", "Project files on request"], duration: "On time", deliverable: "Final masters" },
];

/** Home process: the shared StickySteps with a bespoke animated visual per step. */
export function ProcessStack() {
  return <StickySteps steps={steps} visuals={processVisuals} title="From raw footage to upload in 7 steps" />;
}
