import { siteConfig } from "./site-config";

/** The fields used from GitHub's public events API. */
export interface GithubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { ref?: string | null; ref_type?: string; action?: string };
}

const ACTIVE_DAYS = 14;

// Only Rolan's own actions; stars and forks of other repos are not activity.
const DESCRIBE: Record<string, (e: GithubEvent, count: number) => string> = {
  PushEvent: (e, n) => `Pushed ${n === 1 ? "once" : `${n} times`} to ${e.repo.name}`,
  PullRequestEvent: (e) => `${e.payload.action === "closed" ? "Closed" : "Opened"} a pull request in ${e.repo.name}`,
  CreateEvent: (e) => `Created a ${e.payload.ref_type ?? "repository"} in ${e.repo.name}`,
  ReleaseEvent: (e) => `Published a release of ${e.repo.name}`,
};

/** Active status, last push, and up to three recent actions (same action on the same repo folded). */
export function summarizeActivity(events: GithubEvent[], now: Date) {
  const own = events
    .filter((e) => DESCRIBE[e.type])
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
  const groups = new Map<string, { first: GithubEvent; count: number }>();
  for (const e of own) {
    const key = `${e.type} ${e.repo.name}`;
    const group = groups.get(key);
    if (group) group.count += 1;
    else groups.set(key, { first: e, count: 1 });
  }
  const push = own.find((e) => e.type === "PushEvent");
  const newest = own[0];
  return {
    active: !!newest && now.getTime() - Date.parse(newest.created_at) <= ACTIVE_DAYS * 86_400_000,
    lastPush: push
      ? { repo: push.repo.name, branch: push.payload.ref?.replace("refs/heads/", ""), at: push.created_at }
      : undefined,
    recent: [...groups.values()].slice(0, 3).map(({ first, count }) => ({ text: DESCRIBE[first.type](first, count), at: first.created_at })),
  };
}

/** Public activity, refreshed at most hourly. Returns null when GitHub cannot be reached. */
export async function githubActivity() {
  const user = new URL(siteConfig.github).pathname.split("/")[1];
  try {
    const res = await fetch(`https://api.github.com/users/${user}/events/public?per_page=50`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return { user, ...summarizeActivity((await res.json()) as GithubEvent[], new Date()) };
  } catch {
    return null;
  }
}
