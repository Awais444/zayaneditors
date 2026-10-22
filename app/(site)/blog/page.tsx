import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = pageMeta({
  title: "Video Editing Blog | YouTube Growth & Editing Tips",
  description: "Practical guides on YouTube editing, audience retention, pricing and hiring editors — written by working video editors.",
  path: "/blog",
});

export default function BlogPage() {
  const [featured, ...rest] = getAllPosts();
  return (
    <>
      <PageHero breadcrumbs={[{ name: "Blog", href: "/blog" }]} eyebrow="Blog" title="Editing advice for creators who want to grow" />

      {featured && (
        <section data-tl="Featured" data-tl-color="rgba(198,244,50,0.3)" className="pb-16 md:pb-24">
          <div className="container-x">
            <Link href={`/blog/${featured.slug}`} className="group pressable grid overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-[1.4fr_1fr]">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[26rem]">
                <Image src={featured.cover} alt="" fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-transform duration-1000 ease-[var(--ease-out-quint)] group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-col justify-center p-7 md:p-10">
                <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Featured · {featured.category} · {featured.readingTime}</p>
                <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold tracking-[-0.03em] group-hover:text-accent">{featured.title}</h2>
                <p className="mt-4 text-muted">{featured.description}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-semibold">Read the guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section data-tl="Articles" data-tl-color="rgba(56,189,248,0.4)" className="section pt-0">
          <div className="container-x">
            <h2 className="sr-only">More articles</h2>
            <BlogGrid posts={rest} />
          </div>
        </section>
      )}
      <FinalCTA />
    </>
  );
}
