export interface ProjectInput {
  slug: string;
  title: string;
  /** Content file path, used to name files in rule errors. */
  path: string;
  spotlight: boolean;
  unlisted?: boolean;
  draft?: boolean;
  /** Facts a draft may omit; non-draft projects must carry all of them. */
  oneLiner?: string;
  role?: string;
  status?: "live" | "building" | "archived";
  /** Build span, "YYYY-MM". */
  started?: string;
  ended?: string;
}

export interface CompetitionInput {
  slug: string;
  name: string;
  /** Content file path, used to name files in rule errors. */
  path: string;
  kind: "hackathon" | "contest";
  draft?: boolean;
  /** Facts a draft may omit; non-draft competitions must carry date and placement. */
  date?: string;
  placement?: string;
  /** Hackathon-only fields; a contest must not carry them. */
  hours?: number;
  teamSize?: number;
  role?: string;
  built?: string;
  demoUrl?: string;
  recapPost?: string;
}

export interface MilestoneInput {
  /** Content file path, used to name files in rule errors. */
  path: string;
  /** "YYYY-MM"; for an internship, its start month. */
  date: string;
  type: string;
  label: string;
  /** Organisation behind an internship or job. */
  company?: string;
  points: number;
  /** "YYYY-MM" end month, for milestones that span time (internships). */
  ended?: string;
  link?: string;
}

const HACKATHON_ONLY = ["hours", "teamSize", "role", "built", "demoUrl", "recapPost"] as const;

const COMPETITION_FACTS = ["date", "placement"] as const;

const REQUIRED_FACTS = ["oneLiner", "role", "status", "started"] as const;

type Fact = (typeof REQUIRED_FACTS)[number];
/** A project that passed the rules: every required fact is present. */
export type CompleteProject<P extends ProjectInput> = P & Required<Pick<ProjectInput, Fact>>;

export class ContentRuleError extends Error {
  name = "ContentRuleError";
}

export function createContentModel<P extends ProjectInput>(input: { projects: P[]; competitions?: CompetitionInput[]; milestones?: MilestoneInput[] }) {
  const milestones = input.milestones ?? [];
  for (const m of milestones) {
    if (m.points < 0) {
      throw new ContentRuleError(`${m.path}: points cannot be negative (points: ${m.points})`);
    }
  }
  const competitions = input.competitions ?? [];
  for (const c of competitions) {
    if (!c.draft) {
      const missing = COMPETITION_FACTS.filter((field) => !c[field]);
      if (missing.length > 0) {
        throw new ContentRuleError(`${c.path}: missing ${missing.join(", ")} (add them or set draft: true)`);
      }
    }
    const extra = c.kind === "contest" ? HACKATHON_ONLY.filter((field) => c[field] !== undefined) : [];
    if (extra.length > 0) {
      throw new ContentRuleError(`${c.path}: a contest cannot have hackathon-only fields (${extra.join(", ")})`);
    }
  }
  const seen = new Map<string, string>();
  for (const p of input.projects) {
    const first = seen.get(p.slug);
    if (first) {
      throw new ContentRuleError(`duplicate slug "${p.slug}" in ${first} and ${p.path}`);
    }
    seen.set(p.slug, p.path);
  }
  for (const p of input.projects) {
    if (p.draft) continue;
    const missing = REQUIRED_FACTS.filter((field) => !p[field]);
    if (missing.length > 0) {
      throw new ContentRuleError(`${p.path}: missing ${missing.join(", ")} (add them or set draft: true)`);
    }
    if (p.status === "building" && p.ended) {
      throw new ContentRuleError(`${p.path}: a building project cannot have an end month (ended: ${p.ended})`);
    }
    if ((p.status === "live" || p.status === "archived") && !p.ended) {
      throw new ContentRuleError(`${p.path}: a ${p.status} project needs an end month (ended)`);
    }
  }
  for (const p of input.projects) {
    if (p.spotlight && (p.unlisted || p.draft)) {
      throw new ContentRuleError(`${p.path}: the spotlight project cannot be ${p.draft ? "a draft" : "unlisted"}`);
    }
  }
  const spotlights = input.projects.filter((p) => p.spotlight);
  if (spotlights.length !== 1) {
    const files = (spotlights.length === 0 ? input.projects : spotlights).map((p) => p.path);
    throw new ContentRuleError(
      `Content needs exactly one spotlight project, found ${spotlights.length}. Check: ${files.join(", ")}`,
    );
  }
  const listedProjects = (input.projects.filter((p) => !p.draft && !p.unlisted) as unknown as CompleteProject<P>[]).sort(
    (a, b) => b.started.localeCompare(a.started),
  );
  const missingFacts = input.projects
    .filter((p) => p.draft)
    .map((p) => {
      const missing: string[] = REQUIRED_FACTS.filter((field) => !p[field]);
      if (p.status !== "building" && !p.ended) missing.push("ended");
      return { path: p.path, missing };
    })
    .concat(
      competitions
        .filter((c) => c.draft)
        .map((c) => ({ path: c.path, missing: COMPETITION_FACTS.filter((field) => !c[field]) as string[] })),
    )
    .filter((d) => d.missing.length > 0);
  const listedCompetitions = (competitions.filter((c) => !c.draft) as Array<
    CompetitionInput & Required<Pick<CompetitionInput, (typeof COMPETITION_FACTS)[number]>>
  >).sort((a, b) => b.date.localeCompare(a.date));
  const sortedMilestones = [...milestones].sort((a, b) => b.date.localeCompare(a.date));
  const spotlight = spotlights[0] as unknown as CompleteProject<P>;
  return {
    spotlight,
    listedProjects,
    /** Listed projects, spotlight included (it is listed). */
    projectCount: listedProjects.length,
    missingFacts,
    /** Listed competitions (non-drafts), newest first. */
    competitions: listedCompetitions,
    /** Milestones, newest first. */
    milestones: sortedMilestones,
    /** The most recent internship milestone, for the hero badge. */
    latestInternship: sortedMilestones.find((m) => m.type === "internship"),
    recentProjects: (n: number) => listedProjects.filter((p) => p.slug !== spotlight.slug).slice(0, n),
  };
}
