import { describe, expect, it } from "vitest";
import type { MilestoneInput } from "./content-model";
import { buildRoad, GOAL } from "./road";

function milestone(overrides: Partial<MilestoneInput> & Pick<MilestoneInput, "path" | "date" | "points">): MilestoneInput {
  return { type: "event", label: overrides.path, ...overrides };
}

describe("road to 1mil", () => {
  it("sums milestone points into the tracker total and percent of the goal", () => {
    const road = buildRoad([
      milestone({ path: "m/a", date: "2023-08", points: 10000 }),
      milestone({ path: "m/b", date: "2025-10", points: 20000 }),
    ]);

    expect(road.total).toBe(30000);
    expect(road.goal).toBe(GOAL);
    expect(road.percent).toBeCloseTo(3);
  });

  it("orders stops oldest first, breaking same-month ties by file path", () => {
    const road = buildRoad([
      milestone({ path: "2026-07-internship-globe", date: "2026-07", points: 30000 }),
      milestone({ path: "2023-08-education-umak", date: "2023-08", points: 10000 }),
      milestone({ path: "2026-07-competition-egovph", date: "2026-07", points: 70000 }),
    ]);

    expect(road.stops.map((s) => s.path)).toEqual([
      "2023-08-education-umak",
      "2026-07-competition-egovph",
      "2026-07-internship-globe",
    ]);
  });

  it("gives each stop the running total up to and including it", () => {
    const road = buildRoad([
      milestone({ path: "m/b", date: "2025-10", points: 20000 }),
      milestone({ path: "m/a", date: "2023-08", points: 10000 }),
      milestone({ path: "m/c", date: "2026-07", points: 70000 }),
    ]);

    expect(road.stops.map((s) => s.running)).toEqual([10000, 30000, 100000]);
  });

  it("lists highlighted stops for the Home road, keeping their running totals", () => {
    const road = buildRoad([
      milestone({ path: "m/a", date: "2023-08", points: 10000, highlight: true }),
      milestone({ path: "m/b", date: "2025-11", points: 15000 }),
      milestone({ path: "m/c", date: "2026-07", points: 70000, highlight: true }),
    ]);

    expect(road.highlights.map((s) => [s.path, s.running])).toEqual([
      ["m/a", 10000],
      ["m/c", 95000],
    ]);
  });

  it("is an empty road at zero when there are no milestones", () => {
    const road = buildRoad([]);

    expect(road).toMatchObject({ total: 0, percent: 0, stops: [], highlights: [] });
  });
});
