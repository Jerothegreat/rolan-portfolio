"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Map as MapIcon } from "pixelarticons/react/Map";
import { Stamp } from "@/components/stamp";
import { Window, type WindowColor } from "@/components/window";
import { WindowDialog, ctl, maxButton, useWindowDialog } from "@/components/window-dialog";
import type { RoadStop } from "@/lib/road";
import { monthLabel } from "@/lib/month";
import { prefersReducedMotion } from "@/lib/use-reduced-motion";

type Stop = Pick<RoadStop, "path" | "date" | "type" | "label" | "points" | "running" | "summary" | "stamp" | "link">;

type RoadProps = { highlights: Stop[]; stops: Stop[]; total: number; goal: number };

const fmt = (n: number) => n.toLocaleString("en-US");

// Bar color by milestone type; a stop never shares its neighbor's color.
const COLORS: Record<string, WindowColor[]> = {
  education: ["sky", "mint"],
  internship: ["lilac", "sky"],
  competition: ["coral", "pink", "mint"],
};
function colorsFor(stops: Stop[]) {
  const out: WindowColor[] = [];
  for (const s of stops) {
    const options = COLORS[s.type] ?? ["mint", "pink"];
    out.push(options.find((c) => c !== out.at(-1)) ?? options[0]);
  }
  return out;
}

// Zig-zag slots: stops alternate between the left and right edge, inset by a % of the road
// width, so the road spans the whole window whatever the stop width.
const SLOTS = [
  { side: "left", inset: 4 },
  { side: "right", inset: 4 },
  { side: "left", inset: 14 },
  { side: "right", inset: 14 },
] as const;
const slot = (i: number) => SLOTS[i % SLOTS.length];
const TILTS = [-2, 1.5, -1, 2, -1.5, 1, 2, -2, 1.5];

function RoadMap({ stops, total, goal, full }: { stops: Stop[]; total: number; goal: number; full: boolean }) {
  // Rows are in units of --road-step (taller on phones, where stop text wraps more), so the SVG,
  // drawn in row units with preserveAspectRatio="none", stretches with the stops.
  const count = stops.length + 2; // + next? + the dream
  const rows = Array.from({ length: count }, (_, i) => i + (i % 2 ? 0.25 : 0));
  const height = rows[count - 1] + 1;
  // The road meets each stop 9% in from its outer edge, which is always under the stop.
  const centers = rows.map((r, i) => {
    const { side, inset } = slot(i);
    return [side === "left" ? inset + 9 : 100 - inset - 9, r + 0.45];
  });
  const colors = colorsFor(stops);

  // One S-curve per segment, leaving and entering each stop sideways like a board-game path:
  // solid for the road travelled, dashed for the road ahead.
  const f = (n: number) => n.toFixed(3);
  const segments = centers.slice(0, -1).map(([x1, y1], i) => {
    const [x2, y2] = centers[i + 1];
    const mid = (x1 + x2) / 2;
    const pull = (x2 - x1) * 0.2;
    return { d: `M${f(x1)} ${f(y1)} C${f(mid + pull)} ${f(y1)}, ${f(mid - pull)} ${f(y2)}, ${f(x2)} ${f(y2)}`, ahead: i >= stops.length - 1 };
  });

  const place = (i: number) =>
    ({ [slot(i).side]: `${slot(i).inset}%`, top: `calc(${rows[i]} * var(--road-step))`, "--d": `${((rows[i] / height) * 1.6).toFixed(2)}s` }) as CSSProperties;
  const width = full ? "w-[min(260px,44%)]" : "w-[min(240px,44%)]";
  const step = full ? "[--road-step:230px] sm:[--road-step:150px]" : "[--road-step:205px] sm:[--road-step:128px]";

  return (
    <div className={`relative ${step}`} style={{ height: `calc(${height} * var(--road-step))` }} data-road>
      <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
        {segments.map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill="none"
            stroke="var(--ink)"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            strokeWidth={s.ahead ? 4 : 7}
            strokeDasharray={s.ahead ? "10 8" : undefined}
          />
        ))}
      </svg>
      <ol className="contents">
        {stops.map((s, i) => (
          <li key={s.path} className={`road-node absolute ${width}`} style={place(i)}>
            <Window title={monthLabel(s.date)} controls={<span />} color={colors[i]} tilt={TILTS[i % TILTS.length]} bodyClassName="grid gap-1 px-3 py-2 text-[14px] leading-snug">
              <span className="font-medium">
                {s.link ? (
                  <a href={s.link} className="underline underline-offset-4 decoration-2 hover:decoration-coral">
                    {s.label}
                  </a>
                ) : (
                  s.label
                )}
              </span>
              {full && s.summary ? <span className="text-ink-muted">{s.summary}</span> : null}
              <span className="font-mono text-[12px] tabular-nums text-ink-muted">
                +{fmt(s.points)} · {fmt(s.running)} total
              </span>
              {s.stamp ? (
                <Stamp tilt={i % 2 ? -9 : 9} className="-right-5 -top-4">
                  {s.stamp}
                </Stamp>
              ) : null}
            </Window>
          </li>
        ))}
        <li className={`road-node absolute ${width}`} style={place(stops.length)}>
          <div className="tilt border-[3px] border-dashed border-ink bg-surface" style={{ "--tilt": "2deg" } as CSSProperties}>
            <p className="border-b-[3px] border-dashed border-ink px-2 py-1 font-pixel text-[13px]">next?</p>
            <p className="px-3 py-2 text-[14px] leading-snug">A live demo, graduation, a first job…</p>
          </div>
        </li>
        <li className="road-node absolute" style={place(stops.length + 1)}>
          <div className="-rotate-2 border-4 border-double border-ink bg-gold px-4 py-2 text-on-accent shadow-window">
            <p className="font-pixel text-[11px]">★ the dream</p>
            <p className="font-display text-h3 font-extrabold leading-none">{fmt(goal)}</p>
            <p className="font-pixel text-[11px]">{fmt(goal - total)} to go</p>
          </div>
        </li>
      </ol>
    </div>
  );
}

// Arms the draw-in for a road below the fold; plays it straight away otherwise.
function useDrawIn(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>("[data-road]");
    if (!el || prefersReducedMotion()) return;
    el.classList.add("road-armed");
    if (el.getBoundingClientRect().top < innerHeight) {
      el.classList.add("road-play");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("road-play");
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

// road_to_1M.map: highlights on Home; □ maximizes into the full timeline.
export function RoadWindow({ highlights, stops, total, goal }: RoadProps) {
  const win = useRef<HTMLDivElement>(null);
  const max = useWindowDialog();
  useDrawIn(win);

  function maximize(event: React.MouseEvent<HTMLButtonElement>) {
    const opened = max.open(event, win.current);
    const map = max.dialog.current?.querySelector<HTMLElement>("[data-road]");
    if (!map || prefersReducedMotion()) return;
    map.classList.remove("road-play");
    map.classList.add("road-armed");
    opened.then(() => map.classList.add("road-play"));
  }

  return (
    <div ref={win} id="road">
      <Window
        title="road_to_1M.map"
        icon={<MapIcon className="size-4" aria-hidden="true" />}
        bodyClassName=""
        controls={
          <span className="flex gap-1">
            <span aria-hidden="true" className={`${ctl} cursor-default hover:bg-surface hover:text-ink`}>
              _
            </span>
            <button type="button" className={ctl} onClick={maximize} aria-label={`Maximize: show the full road, all ${stops.length} stops`}>
              □
            </button>
          </span>
        }
      >
        <h2 className="sr-only">Road to 1,000,000</h2>
        <div className="px-4 pt-4">
          <RoadMap stops={highlights} total={total} goal={goal} full={false} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t-[3px] border-ink px-4 py-2 text-mono">
          <span>
            Highlights · the full road has {stops.length} stops
          </span>
          <button
            type="button"
            onClick={maximize}
            className={maxButton}
          >
            <span aria-hidden="true">□</span> Show the full road
          </button>
        </div>
      </Window>

      <WindowDialog state={max} label="Road to 1,000,000: every milestone" title="road_to_1M.map · maximized" icon={<MapIcon className="size-4" aria-hidden="true" />}>
        <p className="mb-4 max-w-[68ch] text-ink-muted">
          Every milestone so far, oldest first: {fmt(total)} of {fmt(goal)} points.
        </p>
        <RoadMap stops={stops} total={total} goal={goal} full />
      </WindowDialog>
    </div>
  );
}
