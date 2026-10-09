import { describe, expect, it } from "vitest";
import { summarizeActivity, type GithubEvent } from "./github";

const NOW = new Date("2026-10-09T00:00:00Z");

function event(type: string, repo: string, at: string, payload: GithubEvent["payload"] = {}): GithubEvent {
  return { type, repo: { name: repo }, created_at: at, payload };
}

describe("github activity", () => {
  it("is active when the newest public event is within 14 days", () => {
    const summary = summarizeActivity([event("PushEvent", "me/a", "2026-10-06T21:32:07Z", { ref: "refs/heads/main" })], NOW);

    expect(summary.active).toBe(true);
    expect(summary.lastPush).toEqual({ repo: "me/a", branch: "main", at: "2026-10-06T21:32:07Z" });
  });

  it("is inactive when the newest event is older than 14 days", () => {
    const summary = summarizeActivity([event("PushEvent", "me/a", "2026-09-01T00:00:00Z")], NOW);

    expect(summary.active).toBe(false);
  });

  it("lists up to three recent actions newest first, folding repeats on the same repo", () => {
    const summary = summarizeActivity(
      [
        event("PushEvent", "me/a", "2026-10-06T21:32:07Z"),
        event("PushEvent", "me/a", "2026-10-05T23:29:06Z"),
        event("PullRequestEvent", "team/a", "2026-10-06T21:32:24Z", { action: "opened" }),
        event("CreateEvent", "me/a", "2026-10-05T23:31:05Z", { ref_type: "branch" }),
        event("PushEvent", "me/b", "2026-10-01T10:00:00Z"),
        event("WatchEvent", "other/c", "2026-10-07T10:00:00Z"),
      ],
      NOW,
    );

    expect(summary.recent).toEqual([
      { text: "Opened a pull request in team/a", at: "2026-10-06T21:32:24Z" },
      { text: "Pushed 2 times to me/a", at: "2026-10-06T21:32:07Z" },
      { text: "Created a branch in me/a", at: "2026-10-05T23:31:05Z" },
    ]);
  });

  it("is empty and inactive with no events", () => {
    expect(summarizeActivity([], NOW)).toEqual({ active: false, lastPush: undefined, recent: [] });
  });
});
