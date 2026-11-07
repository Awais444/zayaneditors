import fs from "node:fs";
import path from "node:path";
import { HowItWorksRow, type HowStep } from "./HowItWorksRow";
import { realBeforeAfter } from "@/data/real-media";

/** Real file in /public, or undefined so the step renders without a visual (never a placeholder). */
const img = (p: string) => (fs.existsSync(path.join(process.cwd(), "public", p)) ? `/${p}` : undefined);

/** Home "How it works": 4 real steps in one row. Visuals only when the real file exists. */
export function HowItWorks() {
  const final = realBeforeAfter(); // the finished edit of the doctor reel (same project as the Before/After)
  const steps: HowStep[] = [
    { title: "You send footage", text: "Upload raw clips to Drive or WeTransfer.", duration: "Day 0", ratio: "9:16", image: img("process/1-raw.jpg"), alt: "Raw footage as received from the client" },
    { title: "We edit", text: "Cuts, captions, B-roll, color and sound.", duration: "48 hrs", ratio: "16:9", image: img("process/2-timeline.jpg"), alt: "The real editing timeline for this project" },
    { title: "You review", text: "Leave notes; two revision rounds included.", duration: "24 hrs", ratio: "9:16", image: img("process/3-review.jpg"), alt: "Revision comments on the review link, names blurred" },
    { title: "Delivered", text: "Ready for Reels, YouTube or ads, any format.", duration: "On time", ratio: "9:16", video: final ? { src: final.edited, poster: final.editedPoster } : undefined, alt: "The finished video" },
  ];
  return <HowItWorksRow steps={steps} />;
}
