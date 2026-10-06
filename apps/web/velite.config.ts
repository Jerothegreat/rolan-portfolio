import { defineCollection, defineConfig, s } from "velite";

const month = s.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "use YYYY-MM");

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s.object({
    slug: s.slug("projects"),
    title: s.string().max(99),
    // Facts a draft may omit are optional here; the content model requires them for non-drafts.
    oneLiner: s.string().max(160).optional(),
    tags: s.array(s.string()).default([]),
    skills: s.array(s.string()).default([]),
    status: s.enum(["live", "building", "archived"]).optional(),
    started: month.optional(),
    ended: month.optional(),
    spotlight: s.boolean().default(false),
    unlisted: s.boolean().default(false),
    draft: s.boolean().default(false),
    team: s.boolean().default(false),
    role: s.string().optional(),
    demoUrl: s.string().url().optional(),
    repoUrl: s.string().url().optional(),
    cover: s.string().optional(),
    video: s.string().optional(),
    architectureImg: s.string().optional(),
    evals: s.string().optional(),
    path: s.path(),
    body: s.mdx(),
  }),
});

const competitions = defineCollection({
  name: "Competition",
  pattern: "competitions/**/*.mdx",
  schema: s.object({
    slug: s.slug("competitions"),
    name: s.string().max(99),
    kind: s.enum(["hackathon", "contest"]),
    // Facts a draft may omit are optional here; the content model requires them for non-drafts.
    date: month.optional(),
    placement: s.string().optional(),
    prize: s.string().optional(),
    prizeSourceUrl: s.string().url().optional(),
    photo: s.string().optional(),
    draft: s.boolean().default(false),
    // Hackathon-only; the content model rejects them on a contest.
    hours: s.number().int().positive().optional(),
    teamSize: s.number().int().positive().optional(),
    role: s.string().optional(),
    built: s.string().optional(),
    demoUrl: s.string().url().optional(),
    recapPost: s.string().optional(),
    path: s.path(),
    body: s.mdx(),
  }),
});

const milestones = defineCollection({
  name: "Milestone",
  pattern: "milestones/**/*.mdx",
  schema: s.object({
    date: month,
    ended: month.optional(),
    type: s.enum(["internship", "competition", "certification", "event", "project", "post", "graduation"]),
    label: s.string().max(99),
    // Organisation behind an internship or job; the hero badge reads it.
    company: s.string().optional(),
    points: s.number().int().min(0),
    link: s.string().url().optional(),
    path: s.path(),
  }),
});

const posts = defineCollection({
  name: "Post",
  pattern: "posts/**/*.mdx",
  schema: s.object({
    slug: s.slug("posts"),
    title: s.string().max(99),
    tag: s.enum(["til", "thoughts"]),
    date: month,
    summary: s.string().max(200),
    related: s.array(s.string()).default([]),
    draft: s.boolean().default(false),
    path: s.path(),
    body: s.mdx(),
  }),
});

export default defineConfig({
  root: "../../content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    clean: true,
  },
  collections: { projects, competitions, milestones, posts },
});
