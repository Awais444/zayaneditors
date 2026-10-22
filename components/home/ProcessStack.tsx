import { StickySteps } from "@/components/sections/StickySteps";
import { processSteps } from "@/data/process";
import { processVisuals } from "./ProcessVisuals";



/** Home process: the shared StickySteps with a bespoke animated visual per step. */
export function ProcessStack() {
  return <StickySteps steps={processSteps} visuals={processVisuals} title="From raw footage to upload in 7 steps" />;
}
