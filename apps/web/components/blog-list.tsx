"use client";

import Link from "next/link";
import { useState } from "react";
import { Pill } from "@/components/pill";
import { monthLabel } from "@/lib/month";

export type PostRow = { slug: string; title: string; tag: "til" | "thoughts"; date: string; summary: string };

const FILTERS = [
  { id: "all", label: "All" },
  { id: "til", label: "TIL" },
  { id: "thoughts", label: "Thoughts" },
] as const;

type Filter = (typeof FILTERS)[number]["id"];

// C:\blog file list with tag filters. Every row links to its post page.
export function BlogList({ posts }: { posts: PostRow[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? posts : posts.filter((p) => p.tag === filter);

  return (
    <div className="grid gap-5">
      <div role="group" aria-label="Filter posts" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className="cursor-pointer border-2 border-ink bg-surface px-3 py-0.5 font-pixel text-[12px] shadow-[2px_2px_0_var(--ink)] hover:bg-gold hover:text-on-accent aria-pressed:bg-ink aria-pressed:text-surface"
          >
            {f.label}
          </button>
        ))}
      </div>
      {shown.length > 0 ? (
        <ul className="grid border-2 border-ink bg-surface" aria-live="polite">
          {shown.map((post) => (
            <li key={post.slug} className="border-b-2 border-ink last:border-b-0">
              <Link href={`/blog/${post.slug}`} className="group grid gap-2 p-4 hover:bg-gold hover:text-on-accent sm:grid-cols-[7rem_1fr] sm:gap-4">
                <span className="flex items-start gap-2 font-mono text-mono sm:flex-col">
                  <span className="tabular-nums">{monthLabel(post.date)}</span>
                  <Pill variant={post.tag === "til" ? "tag" : "neutral"}>{post.tag}</Pill>
                </span>
                <span className="grid gap-1">
                  <span className="text-h3 underline decoration-2 underline-offset-4">{post.title}</span>
                  <span className="text-ink-muted group-hover:text-on-accent">{post.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="grid justify-items-start gap-2 border-2 border-dashed border-ink p-4 text-ink-muted">
          <span className="border-2 border-ink bg-surface px-1.5 font-pixel text-[11px] text-ink">0 posts</span>
          {posts.length === 0
            ? "No posts yet. The first ones are being written: what broke, what I learned, and why 1mil."
            : "No posts with this tag yet."}
        </p>
      )}
    </div>
  );
}
