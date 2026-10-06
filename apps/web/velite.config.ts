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

export default defineConfig({
  root: "../../content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    clean: true,
  },
  collections: { projects },
});
