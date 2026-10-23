// Fails the build when a published portfolio item is missing its poster or preview file
// (a missing poster renders as an empty black card). Runs before `next build`.
import fs from "node:fs";

const src = fs.readFileSync("data/portfolio-items.ts", "utf8");
const blocks = src.split(/\n  \{\n/).slice(1);
const errors = [];
let checked = 0;
for (const b of blocks) {
  const slug = b.match(/slug: "([^"]+)"/)?.[1];
  if (!slug || !/published: true/.test(b)) continue;
  checked++;
  const files = [b.match(/poster: "([^"]*)"/)?.[1], b.match(/mp4: "([^"]*)"/)?.[1], b.match(/verticalPoster: "([^"]*)"/)?.[1], b.match(/verticalPreview: "([^"]*)"/)?.[1]];
  files.forEach((f, i) => {
    if (i < 2 && !f) return errors.push(`${slug}: ${i === 0 ? "poster" : "preview"} not set`);
    if (f && (!fs.existsSync(`public${f}`) || fs.statSync(`public${f}`).size < 2000)) errors.push(`${slug}: missing or empty ${f}`);
  });
}
console.log(`check-portfolio-media: ${checked} published items, ${errors.length} problem(s)`);
if (errors.length) {
  console.error("  " + errors.join("\n  "));
  process.exit(1);
}
