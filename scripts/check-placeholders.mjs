// Fails the build if placeholder text reaches any rendered page.
// Runs after `next build` (see "postbuild" in package.json) over the prerendered HTML.
import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), ".next/server/app");
const banned = [/TODO/, /example\.com/, /\bClient [A-E]\b/];

const files = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) files.push(p);
  }
};
if (!fs.existsSync(root)) {
  console.error("check-placeholders: no build output found at .next/server/app");
  process.exit(1);
}
walk(root);

const hits = [];
for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  for (const re of banned) {
    const m = html.match(re);
    if (m) {
      const i = m.index ?? 0;
      hits.push(`${path.relative(root, f)}: "${html.slice(Math.max(0, i - 40), i + 40).replace(/\s+/g, " ")}"`);
    }
  }
}

if (hits.length) {
  console.error(`check-placeholders: ${hits.length} placeholder hit(s) in rendered pages:\n` + hits.slice(0, 40).join("\n"));
  process.exit(1);
}
console.log(`check-placeholders: ${files.length} pages clean`);
