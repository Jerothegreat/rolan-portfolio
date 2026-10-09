import type { CSSProperties } from "react";
import type { ContributionDay } from "@/lib/contributions";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Level 0 is a faint ink tint; levels 1-4 step up through mint, like GitHub's greens.
const LEVEL: Record<ContributionDay["level"], string> = {
  0: "color-mix(in srgb, var(--ink) 9%, var(--surface))",
  1: "color-mix(in srgb, var(--mint) 50%, var(--surface))",
  2: "var(--mint)",
  3: "color-mix(in srgb, var(--mint) 70%, var(--ink))",
  4: "color-mix(in srgb, var(--mint) 45%, var(--ink))",
};

const cell = (level: ContributionDay["level"]) => ({ background: LEVEL[level] }) as CSSProperties;

// GitHub-style contribution calendar in pixel squares. On narrow screens it scrolls and opens
// at the newest weeks (the rtl wrapper starts the scroll at the right edge).
export function ContributionGraph({ total, weeks }: { total: number; weeks: ContributionDay[][] }) {
  const labels = weeks.map((week, i) => {
    const month = Number(week[0]?.date.slice(5, 7)) - 1;
    const prev = i > 0 ? Number(weeks[i - 1][0]?.date.slice(5, 7)) - 1 : -1;
    return month !== prev && i < weeks.length - 2 ? MONTHS[month] : "";
  });

  return (
    <figure className="grid gap-2">
      <figcaption className="font-medium">
        {total.toLocaleString("en-US")} contributions in the last year
      </figcaption>
      <div className="overflow-x-auto pb-2 [direction:rtl]">
        <div className="w-max [direction:ltr]" role="img" aria-label={`GitHub contribution calendar: ${total} contributions in the last year`}>
          <div className="flex gap-[3px] pb-1 font-pixel text-[10px] text-ink-muted" aria-hidden="true">
            {labels.map((label, i) => (
              <span key={i} className="w-[11px] overflow-visible whitespace-nowrap">
                {label}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]" aria-hidden="true">
            {weeks.map((week, i) => (
              <div key={i} className={`flex flex-col gap-[3px] ${i === 0 ? "justify-end" : ""}`}>
                {week.map((day) => (
                  <span key={day.date} title={day.date} className="size-[11px] border border-ink/25" style={cell(day.level)} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="flex items-center justify-end gap-1 font-pixel text-[10px] text-ink-muted" aria-hidden="true">
        less
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <span key={level} className="size-[11px] border border-ink/25" style={cell(level)} />
        ))}
        more
      </p>
    </figure>
  );
}
