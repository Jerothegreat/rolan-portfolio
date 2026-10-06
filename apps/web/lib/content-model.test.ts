import { describe, expect, it } from "vitest";
import { createContentModel, type ProjectInput } from "./content-model";

function project(overrides: Partial<ProjectInput> & Pick<ProjectInput, "slug">): ProjectInput {
  return {
    title: overrides.slug,
    path: `projects/${overrides.slug}`,
    spotlight: false,
    ...overrides,
  };
}

describe("content model: spotlight", () => {
  it("returns the single spotlight project", () => {
    const model = createContentModel({
      projects: [
        project({ slug: "handa" }),
        project({ slug: "alunsina", spotlight: true }),
      ],
    });

    expect(model.spotlight.slug).toBe("alunsina");
  });

  it("rejects content with no spotlight project, naming the project files", () => {
    expect(() =>
      createContentModel({
        projects: [project({ slug: "handa" }), project({ slug: "kalinga" })],
      }),
    ).toThrow(/exactly one spotlight project, found 0\. Check: projects\/handa, projects\/kalinga$/);
  });

  it("rejects two spotlight projects, naming only the competing files", () => {
    const attempt = () =>
      createContentModel({
        projects: [
          project({ slug: "alunsina", spotlight: true }),
          project({ slug: "kalinga" }),
          project({ slug: "handa", spotlight: true }),
        ],
      });

    expect(attempt).toThrow(/found 2\. Check: projects\/alunsina, projects\/handa$/);
  });
});
