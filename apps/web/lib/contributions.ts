export type ContributionDay = { date: string; level: 0 | 1 | 2 | 3 | 4 };

const CELL = /data-date="(\d{4}-\d{2}-\d{2})" id="contribution-day-component-(\d+)-(\d+)" data-level="([0-4])"/g;
const TOTAL = /id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s+contributions?/;

/**
 * Reads GitHub's public contribution calendar HTML (github.com/users/<user>/contributions):
 * the yearly total and the day grid as weeks (columns), each ordered Sunday first.
 */
export function parseContributions(html: string) {
  const weeks: ContributionDay[][] = [];
  for (const [, date, row, col, level] of html.matchAll(CELL)) {
    (weeks[Number(col)] ??= [])[Number(row)] = { date, level: Number(level) as ContributionDay["level"] };
  }
  const total = html.match(TOTAL);
  if (weeks.length === 0 || !total) return null;
  return { total: Number(total[1].replace(/,/g, "")), weeks: weeks.map((w) => w.filter(Boolean)) };
}

/** The public calendar, refreshed at most hourly. Null when GitHub cannot be reached. */
export async function githubContributions(user: string) {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, { next: { revalidate: 3600 } });
    return res.ok ? parseContributions(await res.text()) : null;
  } catch {
    return null;
  }
}
