import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  author: string;
  cover: string;
  readingTime: string;
};

const dir = path.join(process.cwd(), "content/blog");

export const getPostSlugs = () =>
  fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));

export const getPost = (slug: string) => {
  const file = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const meta = { ...(data as Omit<PostMeta, "slug" | "readingTime">), slug, readingTime: readingTime(content).text };
  const toc = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => ({ text: m[1].trim(), id: slugify(m[1]) }));
  return { meta, content, toc };
};

export const getAllPosts = (): PostMeta[] =>
  getPostSlugs()
    .map((s) => getPost(s)!.meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
