import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PostCard({ p }: { p: PostMeta }) {
  return (
    <Link href={`/blog/${p.slug}`} className="pressable group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
        <Image src={p.cover} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
      <p className="mt-4 text-xs tracking-wider text-accent uppercase">{p.category} · {p.readingTime}</p>
      <h3 className="mt-2 text-xl font-semibold group-hover:text-accent">{p.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-muted">{p.description}</p>
    </Link>
  );
}

export function BlogPreview({ posts, title = "From the blog" }: { posts: PostMeta[]; title?: string }) {
  if (!posts.length) return null;
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Blog" title={title} />
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((p) => <PostCard key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  );
}
