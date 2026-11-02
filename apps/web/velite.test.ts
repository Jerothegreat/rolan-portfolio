import { describe, expect, it } from "vitest";
import { competitionSchema, milestoneSchema, projectSchema, skillSchema } from "./velite.config";

const contest = () => ({
  name: "eGovPH Hackathon 2026",
  kind: "contest" as const,
  date: "2026-08",
  placement: "Top 10 Finalist",
  draft: false,
});

const hackathonOnlyValues = {
  hours: 24,
  teamSize: 3,
  role: "Full Stack Developer",
  built: "eHanda, incident reporting for the eGovPH Super App",
  demoUrl: "https://e-handa.vercel.app/",
  repoUrl: "https://github.com/Jerothegreat/Agora-Mayari",
  skills: ["next-js"],
  recapPost: "2026-08-competition-egovph-hackathon",
} as const;

describe("velite competition schema", () => {
  it.each(["hours", "teamSize", "role", "built", "demoUrl", "repoUrl", "skills", "recapPost"] as const)(
    "rejects a contest carrying hackathon-only field %s",
    (field) => {
      expect(() => competitionSchema.parse({ ...contest(), [field]: hackathonOnlyValues[field] })).toThrow(
        /a contest cannot have hackathon-only fields/,
      );
    },
  );

  it("accepts a contest with no hackathon-only fields", () => {
    expect(competitionSchema.parse(contest()).kind).toBe("contest");
  });
});

describe("velite milestone schema", () => {
  it("rejects a milestone with negative points", () => {
    expect(() =>
      milestoneSchema.parse({
        date: "2026-01",
        type: "competition",
        label: "Won a contest",
        points: -1,
      }),
    ).toThrow();
  });
});

describe("velite project schema", () => {
  it("rejects a project with an invalid month (2026-13)", () => {
    expect(() =>
      projectSchema.parse({
        title: "Handa",
        spotlight: false,
        started: "2026-13",
      }),
    ).toThrow();
  });
});

describe("velite project schema: tags", () => {
  it("rejects a tag outside the enum", () => {
    expect(() =>
      projectSchema.parse({
        title: "Handa",
        spotlight: false,
        tags: ["fullstack"],
      }),
    ).toThrow();
  });

  it("accepts the tag enum values", () => {
    const parsed = projectSchema.parse({
      title: "Handa",
      spotlight: false,
      tags: ["ai", "full-stack", "hackathon"],
    });

    expect(parsed.tags).toEqual(["ai", "full-stack", "hackathon"]);
  });
});

describe("velite skill schema: icon", () => {
  const skill = { id: "react", name: "React", kind: "skill", group: "frontend", level: "used in project" } as const;

  it("resolves a simple-icons slug to its 24x24 SVG path", () => {
    expect(skillSchema.parse({ ...skill, icon: "react" }).icon).toMatch(/^M/);
  });

  it("rejects an unknown slug, pointing at simpleicons.org", () => {
    expect(() => skillSchema.parse({ ...skill, icon: "not-a-brand" })).toThrow(/simpleicons\.org/);
  });

  it("leaves icon empty when the skill has no logo", () => {
    expect(skillSchema.parse(skill).icon).toBeUndefined();
  });
});
