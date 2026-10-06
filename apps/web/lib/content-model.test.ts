import { describe, expect, it } from "vitest";
import { createContentModel, type CompetitionInput, type MilestoneInput, type ProjectInput } from "./content-model";

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

const withSpotlight = () => [alunsina()];

function competition(overrides: Partial<CompetitionInput> & Pick<CompetitionInput, "slug">): CompetitionInput {
  return {
    name: overrides.slug,
    path: `competitions/${overrides.slug}`,
    kind: "hackathon",
    date: "2026-01",
    placement: "Participant",
    ...overrides,
  };
}

describe("content model: competition kinds", () => {
  it.each(["hours", "teamSize", "role", "built", "demoUrl", "recapPost"] as const)(
    "rejects a contest carrying hackathon-only field %s, naming the file and field",
    (field) => {
      expect(() =>
        createContentModel({
          projects: withSpotlight(),
          competitions: [competition({ slug: "java-cup", kind: "contest", [field]: field === "hours" || field === "teamSize" ? 24 : "x" })],
        }),
      ).toThrow(new RegExp(`competitions/java-cup.*contest.*${field}`));
    },
  );
});

describe("content model: competition required facts", () => {
  it.each(["date", "placement"] as const)("rejects a non-draft competition missing %s, naming the file", (field) => {
    expect(() =>
      createContentModel({
        projects: withSpotlight(),
        competitions: [competition({ slug: "agora", [field]: undefined })],
      }),
    ).toThrow(new RegExp(`competitions/agora.*missing.*${field}`));
  });

  it("allows a draft competition to omit them", () => {
    const model = createContentModel({
      projects: withSpotlight(),
      competitions: [competition({ slug: "agora", draft: true, date: undefined, placement: undefined })],
    });

    expect(model.spotlight.slug).toBe("alunsina");
  });
});

describe("content model: competitions", () => {
  it("excludes drafts and sorts newest date first", () => {
    const model = createContentModel({
      projects: withSpotlight(),
      competitions: [
        competition({ slug: "infotech", kind: "contest", date: "2025-03" }),
        competition({ slug: "egov", date: "2026-05" }),
        competition({ slug: "agora", draft: true, date: undefined, placement: undefined }),
        competition({ slug: "devcamp", date: "2026-02" }),
      ],
    });

    expect(model.competitions.map((c) => c.slug)).toEqual(["egov", "devcamp", "infotech"]);
  });

  it("is empty when there are no competitions", () => {
    expect(createContentModel({ projects: withSpotlight() }).competitions).toEqual([]);
  });
});

function milestone(overrides: Partial<MilestoneInput> & Pick<MilestoneInput, "label">): MilestoneInput {
  return {
    path: `milestones/${overrides.label}`,
    date: "2026-01",
    type: "event",
    points: 0,
    ...overrides,
  };
}

describe("content model: milestone points", () => {
  it("rejects negative points, naming the file", () => {
    expect(() =>
      createContentModel({
        projects: withSpotlight(),
        milestones: [milestone({ label: "oops", points: -1 })],
      }),
    ).toThrow(/milestones\/oops.*points.*-1/);
  });

  it("accepts zero-point milestones", () => {
    const model = createContentModel({
      projects: withSpotlight(),
      milestones: [milestone({ label: "cert", type: "certification", points: 0 })],
    });

    expect(model.milestones.map((m) => m.label)).toEqual(["cert"]);
  });
});

describe("content model: milestones", () => {
  it("sorts newest date first", () => {
    const model = createContentModel({
      projects: withSpotlight(),
      milestones: [
        milestone({ label: "a", date: "2025-03" }),
        milestone({ label: "c", date: "2026-07" }),
        milestone({ label: "b", date: "2026-05" }),
      ],
    });

    expect(model.milestones.map((m) => m.label)).toEqual(["c", "b", "a"]);
  });
});

describe("content model: latestInternship", () => {
  it("returns the most recent internship milestone by date", () => {
    const model = createContentModel({
      projects: withSpotlight(),
      milestones: [
        milestone({ label: "Intern @ Sofi AI", type: "internship", date: "2026-05", points: 150000 }),
        milestone({ label: "Intern @ Globe Telecom", type: "internship", date: "2026-07", points: 150000 }),
        milestone({ label: "Won a contest", type: "competition", date: "2026-09", points: 100000 }),
      ],
    });

    expect(model.latestInternship?.label).toBe("Intern @ Globe Telecom");
  });

  it("is undefined when there is no internship", () => {
    const model = createContentModel({
      projects: withSpotlight(),
      milestones: [milestone({ label: "cert", type: "certification" })],
    });

    expect(model.latestInternship).toBeUndefined();
  });
});

describe("content model: missingFacts for competitions", () => {
  it("lists draft competitions with their missing facts, after the project entries", () => {
    const model = createContentModel({
      projects: [alunsina(), project({ slug: "handa", draft: true, role: undefined })],
      competitions: [
        competition({ slug: "agora", draft: true, date: undefined, placement: undefined }),
        competition({ slug: "devkada", draft: true, placement: undefined }),
        competition({ slug: "egov" }),
      ],
    });

    expect(model.missingFacts).toEqual([
      { path: "projects/handa", missing: ["role"] },
      { path: "competitions/agora", missing: ["date", "placement"] },
      { path: "competitions/devkada", missing: ["placement"] },
    ]);
  });
});
