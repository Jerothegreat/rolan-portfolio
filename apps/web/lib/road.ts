import type { MilestoneInput } from "./content-model";

/** The dream number the whole site counts toward. */
export const GOAL = 1_000_000;

export type RoadStop<M extends MilestoneInput = MilestoneInput> = M & { running: number };

/**
 * The road to 1mil (SF-02): milestones oldest first with running totals. Same-month
 * milestones keep their file-name order, so a file's name decides a tie.
 */
export function buildRoad<M extends MilestoneInput>(milestones: M[]) {
  let running = 0;
  const stops: RoadStop<M>[] = [...milestones]
    .sort((a, b) => a.date.localeCompare(b.date) || a.path.localeCompare(b.path))
    .map((m) => ({ ...m, running: (running += m.points) }));
  return {
    total: running,
    goal: GOAL,
    percent: (running / GOAL) * 100,
    stops,
    /** The stops marked `highlight`, shown on the Home road. */
    highlights: stops.filter((s) => s.highlight),
  };
}
