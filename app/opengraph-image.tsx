import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/data/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = site.name;

export default function Image() {
  return ogImage("Professional Video Editing for Every Kind of Video");
}
