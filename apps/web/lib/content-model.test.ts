import { describe, expect, it } from "vitest";
import { createContentModel, type ProjectInput } from "./content-model";

function project(overrides: Partial<ProjectInput> & Pick<ProjectInput, "slug">): ProjectInput {
  return {
    title: overrides.slug,
    path: `projects/${overrides.slug}`,
    spotlight: false,
    oneLiner: `${overrides.slug} one-liner`,
    role: "Developer",
    status: "live",
    started: "2025-01",
    ended: "2025-06",
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

const alunsina = () => project({ slug: "alunsina", spotlight: true, status: "building", ended: undefined });

describe("content model: build span", () => {
  it("rejects a building project that has an end month, naming the file", () => {
    expect(() =>
      createContentModel({
        projects: [alunsina(), project({ slug: "handa", status: "building", ended: "2026-03" })],
      }),
    ).toThrow(/projects\/handa.*building.*end month/);
  });

  it.each(["live", "archived"] as const)("rejects a %s project without an end month, naming the file", (status) => {
    expect(() =>
      createContentModel({
        projects: [alunsina(), project({ slug: "kalinga", status, ended: undefined })],
      }),
    ).toThrow(new RegExp(`projects/kalinga.*${status}.*end month`));
  });

  it("does not apply build-span rules to drafts", () => {
    const model = createContentModel({
      projects: [alunsina(), project({ slug: "handa", draft: true, status: "live", ended: undefined })],
    });

    expect(model.spotlight.slug).toBe("alunsina");
  });
});

describe("content model: slugs", () => {
  it("rejects duplicate slugs, naming both files", () => {
    expect(() =>
      createContentModel({
        projects: [
          alunsina(),
          { ...project({ slug: "handa" }), path: "projects/handa-a" },
          { ...project({ slug: "handa" }), path: "projects/handa-b" },
        ],
      }),
    ).toThrow(/duplicate slug "handa".*projects\/handa-a.*projects\/handa-b/);
  });
});

describe("content model: spotlight visibility", () => {
  it("rejects an unlisted spotlight, naming the file", () => {
    expect(() =>
      createContentModel({
        projects: [project({ slug: "alunsina", spotlight: true, unlisted: true })],
      }),
    ).toThrow(/projects\/alunsina.*spotlight.*unlisted/);
  });

  it("rejects a draft spotlight even when another project is the spotlight", () => {
    expect(() =>
      createContentModel({
        projects: [alunsina(), project({ slug: "handa", spotlight: true, draft: true })],
      }),
    ).toThrow(/projects\/handa.*spotlight.*draft/);
  });
});

describe("content model: required facts", () => {
  it.each(["oneLiner", "role", "status", "started"] as const)(
    "rejects a non-draft project missing %s, naming the file and field",
    (field) => {
      expect(() =>
        createContentModel({
          projects: [alunsina(), project({ slug: "handa", [field]: undefined })],
        }),
      ).toThrow(new RegExp(`projects/handa.*missing.*${field}`));
    },
  );
});

describe("content model: listedProjects", () => {
  it("excludes drafts and unlisted projects and sorts newest started first", () => {
    const model = createContentModel({
      projects: [
        project({ slug: "restaurant", started: "2024-03" }),
        alunsina(),
        project({ slug: "secret", started: "2026-09", status: "building", ended: undefined, unlisted: true }),
        project({ slug: "kalinga", started: "2025-11" }),
        project({ slug: "half-done", draft: true, started: undefined, role: undefined }),
      ],
    });

    expect(model.listedProjects.map((p) => p.slug)).toEqual(["kalinga", "alunsina", "restaurant"]);
  });
});

describe("content model: recentProjects", () => {
  const projects = [
    alunsina(),
    project({ slug: "restaurant", started: "2024-03" }),
    project({ slug: "kalinga", started: "2025-11" }),
    project({ slug: "secret", started: "2026-09", status: "building", ended: undefined, unlisted: true }),
    project({ slug: "handa", started: "2026-02" }),
    project({ slug: "half-done", draft: true, started: "2026-10" }),
  ];

  it("returns the newest listed non-spotlight projects", () => {
    const model = createContentModel({ projects });

    expect(model.recentProjects(2).map((p) => p.slug)).toEqual(["handa", "kalinga"]);
  });

  it("returns fewer when fewer qualify", () => {
    const model = createContentModel({ projects: [alunsina(), project({ slug: "handa" })] });

    expect(model.recentProjects(5).map((p) => p.slug)).toEqual(["handa"]);
  });
});

describe("content model: projectCount", () => {
  it("counts listed projects, including the spotlight, excluding drafts and unlisted", () => {
    const model = createContentModel({
      projects: [
        alunsina(),
        project({ slug: "handa" }),
        project({ slug: "kalinga" }),
        project({ slug: "secret", status: "building", ended: undefined, unlisted: true }),
        project({ slug: "half-done", draft: true }),
      ],
    });

    expect(model.projectCount).toBe(3);
  });
});

describe("content model: missingFacts", () => {
  it("lists each draft's file and missing fields, and nothing for complete projects", () => {
    const model = createContentModel({
      projects: [
        alunsina(),
        project({ slug: "restaurant", draft: true, oneLiner: undefined, role: undefined, status: undefined, started: undefined, ended: undefined }),
        project({ slug: "handa", draft: true, status: "live", ended: undefined }),
        project({ slug: "agentic", draft: true, unlisted: true, status: "building", ended: undefined, role: undefined }),
        project({ slug: "kalinga" }),
      ],
    });

    expect(model.missingFacts).toEqual([
      { path: "projects/restaurant", missing: ["oneLiner", "role", "status", "started", "ended"] },
      { path: "projects/handa", missing: ["ended"] },
      { path: "projects/agentic", missing: ["role"] },
    ]);
  });
});
