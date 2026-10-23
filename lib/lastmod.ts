import { execSync } from "node:child_process";

const cache = new Map<string, Date>();
const buildTime = new Date();

/**
 * Last real change date for the files behind a page: the newest git commit touching any of them.
 * Falls back to build time when git history isn't available (e.g. a shallow deploy clone).
 */
export function lastModified(...files: string[]): Date {
  const key = files.join("|");
  const hit = cache.get(key);
  if (hit) return hit;
  let date = buildTime;
  try {
    const out = execSync(`git log -1 --format=%cI -- ${files.map((f) => `"${f}"`).join(" ")}`, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    if (out) date = new Date(out);
  } catch {}
  cache.set(key, date);
  return date;
}

/** Date a file first appeared in git history (when content was first published), build time if unknown. */
export function firstPublished(file: string): Date {
  try {
    const out = execSync(`git log --diff-filter=A --format=%cI -- "${file}"`, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim()
      .split("\n")
      .pop();
    if (out) return new Date(out);
  } catch {}
  return buildTime;
}
