import { defineCollection, defineConfig, s } from "velite";

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s.object({
    slug: s.slug("projects"),
    title: s.string().max(99),
    oneLiner: s.string().max(160),
    status: s.enum(["live", "building", "archived"]),
    spotlight: s.boolean().default(false),
    team: s.boolean().default(false),
    role: s.string(),
    demoUrl: s.string().url().optional(),
    repoUrl: s.string().url().optional(),
    cover: s.string().optional(),
    video: s.string().optional(),
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
