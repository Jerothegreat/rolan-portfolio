import { competitions, milestones, projects, skills } from "#site/content";
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
