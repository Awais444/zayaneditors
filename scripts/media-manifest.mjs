// Lists the real media files in /public/videos and /public/posters into data/media-manifest.json,
// so client and server code can tell which real assets exist. Runs before dev/build.
import fs from "node:fs";
import path from "node:path";

const files = ["videos", "posters"]
  .flatMap((d) => {
    const dir = path.join(process.cwd(), "public", d);
    return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => /\.(mp4|webm|webp|jpg|png)$/i.test(f)).map((f) => `${d}/${f}`) : [];
  })
  .sort();
fs.writeFileSync(path.join(process.cwd(), "data/media-manifest.json"), JSON.stringify(files, null, 2) + "\n");
console.log(`media-manifest: ${files.length} file(s) in public/videos + public/posters`);
