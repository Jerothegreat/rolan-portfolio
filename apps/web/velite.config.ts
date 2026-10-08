import { defineCollection, defineConfig, s } from "velite";

const month = s.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "use YYYY-MM");

// Fields a file's fact schema shares with its collection schema (slug, path and
// body need Velite's build context, so they live only in the collection schema).
const projectFactsShape = {
  title: s.string().max(99),
  // Facts a draft may omit are optional here; the content model requires them for non-drafts.
  oneLiner: s.string().max(160).optional(),
  tags: s.array(s.enum(["ai", "full-stack", "hackathon"])).default([]),
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
};

const competitionFactsShape = {
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
};

const HACKATHON_ONLY = ["hours", "teamSize", "role", "built", "demoUrl", "recapPost"] as const;

/** A contest is an individual skills competition with no build. */
const contestRefinement = (competition: { kind: "hackathon" | "contest" } & { hours?: number; teamSize?: number; role?: string; built?: string; demoUrl?: string; recapPost?: string }) =>
  competition.kind !== "contest" || HACKATHON_ONLY.every((field) => competition[field] === undefined);

const CONTEST_REFINEMENT_MESSAGE = "a contest cannot have hackathon-only fields";

const milestoneFactsShape = {
  date: month,
  ended: month.optional(),
  type: s.enum(["internship", "competition", "certification", "event", "project", "post", "graduation"]),
  label: s.string().max(99),
  // Organisation behind an internship or job; the hero badge reads it.
  company: s.string().optional(),
  points: s.number().int().min(0),
  link: s.string().url().optional(),
};

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

// Fact schemas, exported for unit tests (their slug, path and body fields are
// excluded above; parsing those standalone needs Velite's build context).
export const projectSchema = s.object(projectFactsShape);
export const competitionSchema = s.object(competitionFactsShape).refine(contestRefinement, { message: CONTEST_REFINEMENT_MESSAGE });
export const milestoneSchema = s.object(milestoneFactsShape);

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s.object({
    slug: s.slug("projects"),
    ...projectFactsShape,
    path: s.path(),
    body: s.mdx(),
  }),
});

const competitions = defineCollection({
  name: "Competition",
  pattern: "competitions/**/*.mdx",
  schema: s.object({
    slug: s.slug("competitions"),
    ...competitionFactsShape,
    path: s.path(),
    body: s.mdx(),
  }).refine(contestRefinement, { message: CONTEST_REFINEMENT_MESSAGE }),
});

const milestones = defineCollection({
  name: "Milestone",
  pattern: "milestones/**/*.mdx",
  schema: s.object({
    ...milestoneFactsShape,
    path: s.path(),
  }),
});

// The single skills registry; project `skills[]` hold these ids.
const skillShape = {
  id: s.string().regex(/^[a-z][a-z0-9-]*$/, "use lowercase kebab-case ids"),
  name: s.string().max(99),
  kind: s.enum(["skill", "tool"]),
  group: s.enum(["ai", "frontend", "backend", "mobile", "tools"]),
  level: s.enum(["daily", "used in project", "experimenting"]),
  usedFor: s.string().optional(),
};

const skills = defineCollection({
  name: "Skill",
  pattern: "skills.yaml",
  schema: s.object({ skills: s.array(s.object(skillShape)) }),
});

export default defineConfig({
  root: "../../content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    clean: true,
  },
  collections: { projects, competitions, milestones, posts, skills },
});
