import { competitions, milestones, posts, projects, skills } from "#site/content";
import { createContentModel } from "./content-model";

export const site = createContentModel({
  projects,
  competitions,
  milestones,
  skills: skills[0]?.skills ?? [],
  // Vercel previews (the test branch) and local dev show drafts as WIP; production never does.
  showDrafts: process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development",
});

/** Published posts, newest first (ties by title), for /blog. */
export const publishedPosts = posts
  .filter((p) => !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

/** The 3 newest published posts for the Home blog window. */
export const latestPosts = publishedPosts.slice(0, 3);
