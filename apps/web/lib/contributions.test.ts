import { describe, expect, it } from "vitest";
import { parseContributions } from "./contributions";

// Trimmed from github.com/users/<user>/contributions: rows are weekdays, columns are weeks.
const HTML = `
<h2 id="js-contribution-activity-description" class="f4 text-normal mb-2">
      832
      contributions
        in the last year
</h2>
<td tabindex="0" data-ix="0" aria-selected="false" aria-describedby="contribution-graph-legend-level-0" style="width: 10px" data-date="2025-10-05" id="contribution-day-component-0-0" data-level="0" role="gridcell" data-view-component="true" class="ContributionCalendar-day"></td>
<td tabindex="0" data-ix="1" data-date="2025-10-12" id="contribution-day-component-0-1" data-level="2" role="gridcell" class="ContributionCalendar-day"></td>
<td tabindex="0" data-ix="0" data-date="2025-10-06" id="contribution-day-component-1-0" data-level="4" role="gridcell" class="ContributionCalendar-day"></td>
<td tabindex="0" data-ix="1" data-date="2025-10-13" id="contribution-day-component-1-1" data-level="1" role="gridcell" class="ContributionCalendar-day"></td>
`;

describe("github contributions", () => {
  it("reads the yearly total", () => {
    expect(parseContributions(HTML)?.total).toBe(832);
  });

  it("groups days into weeks (columns), each ordered Sunday first", () => {
    expect(parseContributions(HTML)?.weeks).toEqual([
      [
        { date: "2025-10-05", level: 0 },
        { date: "2025-10-06", level: 4 },
      ],
      [
        { date: "2025-10-12", level: 2 },
        { date: "2025-10-13", level: 1 },
      ],
    ]);
  });

  it("returns null when the page has no calendar", () => {
    expect(parseContributions("<html>rate limited</html>")).toBeNull();
  });
});
