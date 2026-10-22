import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost, getPostSlugs, slugify } from "@/lib/blog";
import { pageMeta } from "@/lib/metadata";
import { blogPosting } from "@/lib/schema";
import { team } from "@/data/team";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { TocNav } from "@/components/sections/TocNav";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => getPostSlugs().map((slug) => ({ slug }));

export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) return {};
  const m = pageMeta({ title: post.meta.title, description: post.meta.description, path: `/blog/${post.meta.slug}` });
  return { ...m, openGraph: { ...m.openGraph, type: "article", publishedTime: post.meta.date } };
}

const text = (c: React.ReactNode): string =>
  typeof c === "string" ? c : Array.isArray(c) ? c.map(text).join("") : c && typeof c === "object" && "props" in c ? text((c as { props: { children?: React.ReactNode } }).props.children) : "";

function InlineCTA() {
  return (
    <aside className="not-prose relative my-12 flex flex-col gap-5 overflow-hidden rounded-3xl border border-accent/30 bg-surface/70 p-7 shadow-[0_30px_80px_-40px_rgba(198,244,50,0.4)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      <div aria-hidden className="pointer-events-none absolute -top-20 -left-16 size-56 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative">
        <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">Free trial edit</p>
        <p className="mt-2 text-xl font-semibold text-fg">Want a pro to edit your next video?</p>
        <p className="mt-1 text-sm text-muted">Get a free 30–60s sample edit from your own footage in 48 hours.</p>
      </div>
      <Button href="/free-trial-edit" className="relative shrink-0">Free Trial Edit</Button>
    </aside>
  );
}

const components = {
  h2: ({ children }: { children?: React.ReactNode }) => <h2 id={slugify(text(children))}>{children}</h2>,
  a: ({ href = "", children }: { href?: string; children?: React.ReactNode }) =>
    href.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
  InlineCTA,
};

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { meta, content, toc } = post;
  const author = team.find((t) => t.name === meta.author) ?? team[0];
  const related = getAllPosts().filter((p) => p.slug !== meta.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={blogPosting(meta)} />
      <div aria-hidden className="read-progress fixed inset-x-0 top-0 z-[60] h-[3px] bg-accent shadow-[0_0_12px_rgba(198,244,50,0.6)]" />
      <article data-tl="Article" data-tl-color="rgba(198,244,50,0.3)" className="section pt-10">
        <div className="container-x">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: meta.title, href: `/blog/${meta.slug}` }]} />
          <header className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold tracking-[0.14em] text-accent uppercase">{meta.category} · {meta.readingTime}</p>
            <h1 className="text-[clamp(2.2rem,5vw,3.75rem)] leading-[0.98] font-bold tracking-[-0.035em]">
              {meta.title.split(" ").map((w, i) => (
                <span key={`${w}-${i}`} className="kinetic-word mr-[0.22em]" style={{ "--i": i } as React.CSSProperties}>{w}</span>
              ))}
            </h1>
            <p className="mt-5 text-lg text-muted">{meta.description}</p>
            <p className="mt-5 text-sm text-muted">
              By {meta.author} · <time dateTime={meta.date}>{new Date(meta.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
            </p>
          </header>
          <div className="relative mt-10 aspect-[2/1] overflow-hidden rounded-3xl border border-line">
            <Image src={meta.cover} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_17rem]">
            <div className="prose-site max-w-3xl">
              <MDXRemote source={content} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
              <div className="card mt-14 flex gap-5 p-6">
                <Image src={author.avatar} alt={author.name} width={64} height={64} className="size-16 shrink-0 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-fg">{author.name}</p>
                  <p className="text-sm text-muted">{author.role}</p>
                  <p className="mt-2 text-sm">{author.bio}</p>
                </div>
              </div>
            </div>
            <aside className="hidden lg:block">
              <nav aria-label="Table of contents" className="sticky top-28">
                <p className="eyebrow mb-4">On this page</p>
                <TocNav toc={toc} />
                <Button href="/contact" className="mt-8 w-full">Start a Project</Button>
              </nav>
            </aside>
          </div>
        </div>
      </article>
      <BlogPreview posts={related} title="Keep reading" />
      <FinalCTA />
    </>
  );
}
