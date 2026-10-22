// Lists the real media files in /public/videos into data/media-manifest.json, so client and
// server code can tell which real assets exist (nothing falls back to stock). Runs before dev/build.
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "public/videos");
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => /\.(mp4|webm|webp|jpg|png)$/i.test(f)).sort() : [];
fs.writeFileSync(path.join(process.cwd(), "data/media-manifest.json"), JSON.stringify(files, null, 2) + "\n");
console.log(`media-manifest: ${files.length} file(s) in public/videos`);
