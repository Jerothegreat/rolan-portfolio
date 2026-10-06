export interface ProjectInput {
  slug: string;
  title: string;
  /** Content file path, used to name files in rule errors. */
  path: string;
  spotlight: boolean;
}

export class ContentRuleError extends Error {
  name = "ContentRuleError";
}

export function createContentModel<P extends ProjectInput>(input: { projects: P[] }) {
  const spotlights = input.projects.filter((p) => p.spotlight);
  if (spotlights.length !== 1) {
    const files = (spotlights.length === 0 ? input.projects : spotlights).map((p) => p.path);
    throw new ContentRuleError(
      `Content needs exactly one spotlight project, found ${spotlights.length}. Check: ${files.join(", ")}`,
    );
  }
  return { spotlight: spotlights[0] };
}
