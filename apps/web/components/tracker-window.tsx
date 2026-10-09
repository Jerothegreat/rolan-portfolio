import { Window } from "@/components/window";
import type { buildRoad } from "@/lib/road";

const CELLS = 25;
const fmt = (n: number) => n.toLocaleString("en-US");

// 1mil.exe: the hero tracker (SF-02) drawn as an installer progress dialog.
export function TrackerWindow({
  road,
  tilt,
  className,
}: {
  road: ReturnType<typeof buildRoad>;
  tilt?: number;
  className?: string;
}) {
  const on = road.total > 0 ? Math.max(1, Math.round((road.total / road.goal) * CELLS)) : 0;
  const percent = road.percent.toFixed(1);

  return (
    <Window title="1mil.exe" color="gold" tilt={tilt} className={className} bodyClassName="grid gap-3 p-5">
      <p>Installing 1,000,000 …</p>
      <div
        role="progressbar"
        aria-label="Progress to 1,000,000 points"
        aria-valuemin={0}
        aria-valuemax={road.goal}
        aria-valuenow={road.total}
        aria-valuetext={`${fmt(road.total)} of ${fmt(road.goal)} points, ${percent}%`}
        className="grid h-6 grid-cols-[repeat(25,1fr)] gap-0.5 border-[3px] border-ink bg-surface p-0.5"
      >
        {Array.from({ length: CELLS }, (_, i) => (
          <span key={i} className={i < on ? "meter-on bg-ink" : ""} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
      <p className="flex flex-wrap justify-between gap-2 font-mono text-mono tabular-nums">
        <span>
          <b className="text-body">{fmt(road.total)}</b> / {fmt(road.goal)} pts
        </span>
        <span>{percent}%</span>
      </p>
      <p className="text-mono text-ink-muted">
        {road.stops.length} milestones ·{" "}
        <a href="#road" className="underline underline-offset-4 decoration-2 hover:decoration-coral">
          see the road ↓
        </a>
      </p>
    </Window>
  );
}
