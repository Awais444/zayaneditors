import { getAllPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PostCard } from "@/components/sections/BlogPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = pageMeta({
  title: "Video Editing Blog | YouTube Growth & Editing Tips",
  description: "Practical guides on YouTube editing, audience retention, pricing and hiring editors — written by working video editors.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];
  return (
    <>
      <section className="section pt-10">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
          <SectionHeading as="h1" eyebrow="Blog" title="Editing advice for creators who want to grow" />
          <ul className="mb-12 flex flex-wrap gap-2 text-sm" aria-label="Categories">
            {categories.map((c) => (
              <li key={c} className="rounded-full border border-line px-4 py-1.5 text-muted">{c}</li>
            ))}
          </ul>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => <PostCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
