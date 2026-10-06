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

const REQUIRED_FACTS = ["oneLiner", "role", "status", "started"] as const;

type Fact = (typeof REQUIRED_FACTS)[number];
/** A project that passed the rules: every required fact is present. */
export type CompleteProject<P extends ProjectInput> = P & Required<Pick<ProjectInput, Fact>>;

export class ContentRuleError extends Error {
  name = "ContentRuleError";
}

export function createContentModel<P extends ProjectInput>(input: { projects: P[] }) {
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
    .filter((d) => d.missing.length > 0);
  const spotlight = spotlights[0] as unknown as CompleteProject<P>;
  return {
    spotlight,
    listedProjects,
    /** Listed projects, spotlight included (it is listed). */
    projectCount: listedProjects.length,
    missingFacts,
    recentProjects: (n: number) => listedProjects.filter((p) => p.slug !== spotlight.slug).slice(0, n),
  };
}
