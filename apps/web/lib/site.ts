import { competitions, milestones, posts, projects, skills } from "#site/content";
import { createContentModel } from "./content-model";

export const site = createContentModel({
  projects,
  competitions,
  milestones,
  skills: skills[0]?.skills ?? [],
});

// Build-time report: drafts stay hidden, and this tells Rolan what each one still needs.
if (site.missingFacts.length > 0) {
  console.warn(
    ["Drafts missing facts:", ...site.missingFacts.map((d) => `  ${d.path}: ${d.missing.join(", ")}`)].join("\n"),
  );
}

/** Published posts, newest first (ties by title), for /blog. */
export const publishedPosts = posts
  .filter((p) => !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

/** The 3 newest published posts for the Home blog window. */
export const latestPosts = publishedPosts.slice(0, 3);
