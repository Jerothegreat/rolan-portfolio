import { projects } from "#site/content";
import { createContentModel } from "./content-model";

export const site = createContentModel({ projects });

// Build-time report: drafts stay hidden, and this tells Rolan what each one still needs.
if (site.missingFacts.length > 0) {
  console.warn(
    ["Draft projects missing facts:", ...site.missingFacts.map((d) => `  ${d.path}: ${d.missing.join(", ")}`)].join("\n"),
  );
}
