import type { Metadata } from "next";
import { Notes } from "pixelarticons/react/Notes";
import { BlogList } from "@/components/blog-list";
import { Window } from "@/components/window";
import { publishedPosts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "What broke, what I learned, and the road to 1,000,000.",
};

export default function BlogIndex() {
  return (
    <main className="desk">
      <div className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 lg:py-16">
        <Window
          title="C:\blog"
          icon={<Notes className="size-4" />}
          color="sky"
          tilt={-0.5}
          bodyClassName="grid gap-5 p-6"
          menu={
            <>
              <span>File</span>
              <span>View</span>
              <span className="ml-auto text-ink-muted">
                {publishedPosts.length} {publishedPosts.length === 1 ? "post" : "posts"}
              </span>
            </>
          }
        >
          <h1 className="text-h1">Blog</h1>
          <p className="max-w-[60ch] text-ink-muted">
            What broke, what I learned, and the road to 1,000,000. TIL posts are short notes; thoughts are longer.
          </p>
          <BlogList posts={publishedPosts.map(({ slug, title, tag, date, summary }) => ({ slug, title, tag, date, summary }))} />
        </Window>
      </div>
    </main>
  );
}
