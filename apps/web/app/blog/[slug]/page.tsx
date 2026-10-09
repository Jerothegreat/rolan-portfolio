import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Notes } from "pixelarticons/react/Notes";
import { MdxContent } from "@/components/mdx-content";
import { Pill } from "@/components/pill";
import { Window } from "@/components/window";
import { monthLabel } from "@/lib/month";
import { publishedPosts } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Only published posts get a page; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = publishedPosts.find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.summary } : {};
}

// A post as a maximized notepad window.
export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = publishedPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="desk">
      <div className="mx-auto max-w-[860px] px-4 py-12 sm:px-6 lg:py-16">
        <p className="mb-6">
          <Link
            href="/blog"
            className="border-2 border-ink bg-surface px-3 py-1 font-pixel text-[12px] shadow-[2px_2px_0_var(--ink)] hover:bg-gold hover:text-on-accent"
          >
            ← C:\blog
          </Link>
        </p>
        <Window
          title={`${post.slug}.txt · Notepad`}
          icon={<Notes className="size-4" />}
          color="sky"
          bodyClassName="px-5 py-8 sm:px-10"
          menu={
            <>
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
            </>
          }
        >
          <article className="mx-auto grid max-w-[68ch] gap-6">
            <header className="grid gap-3">
              <p className="flex flex-wrap items-center gap-2 font-mono text-mono text-ink-muted">
                <Pill variant={post.tag === "til" ? "tag" : "neutral"}>{post.tag}</Pill>
                <time dateTime={post.date}>{monthLabel(post.date)}</time>
              </p>
              <h1 className="text-h1 [text-wrap:balance]">{post.title}</h1>
              <p className="text-[18px] text-ink-muted">{post.summary}</p>
            </header>
            <div className="post">
              <MdxContent code={post.body} />
            </div>
          </article>
        </Window>
      </div>
    </main>
  );
}
