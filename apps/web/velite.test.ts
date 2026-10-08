import { describe, expect, it } from "vitest";
import { competitionSchema, milestoneSchema, projectSchema } from "./velite.config";

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
  recapPost: "2026-08-competition-egovph-hackathon",
} as const;

describe("velite competition schema", () => {
  it.each(["hours", "teamSize", "role", "built", "demoUrl", "recapPost"] as const)(
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
