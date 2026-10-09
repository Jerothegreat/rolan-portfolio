"use client";

import { useRef, useState } from "react";
import { ChevronLeft } from "pixelarticons/react/ChevronLeft";
import { ChevronRight } from "pixelarticons/react/ChevronRight";
import { Folder } from "pixelarticons/react/Folder";
import { MediaSlot } from "@/components/media-slot";
import { Pill } from "@/components/pill";
import { Window, type WindowColor } from "@/components/window";
import { WindowDialog, useWindowDialog } from "@/components/window-dialog";
import { monthLabel } from "@/lib/month";
import { prefersReducedMotion } from "@/lib/use-reduced-motion";

/** The hackathon a project was built at, merged into the project's card. */
export type BuiltAt = { name: string; date: string; placement: string; prize?: string; prizeSourceUrl?: string };

export type CarouselProject = {
  slug: string;
  title: string;
  oneLiner: string;
  status: "live" | "building" | "archived";
  tags: ("ai" | "full-stack" | "hackathon")[];
  role: string;
  started: string;
  ended?: string;
  team: boolean;
  skills: string[];
  /** The project body as HTML, shown in the popup. */
  html: string;
  demoUrl?: string;
  repoUrl?: string;
  cover?: string;
  video?: string;
  builtAt?: BuiltAt;
};

export type CarouselHackathon = {
  slug: string;
  name: string;
  date: string;
  placement: string;
  prize?: string;
  prizeSourceUrl?: string;
  role?: string;
  teamSize?: number;
  built?: string;
  html: string;
  demoUrl?: string;
  photo?: string;
};

type Item = ({ kind: "project" } & CarouselProject) | ({ kind: "hackathon" } & CarouselHackathon);

const FILTERS = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "full-stack", label: "Full-stack" },
  { id: "hackathon", label: "Hackathon" },
] as const;

type Filter = (typeof FILTERS)[number]["id"];

const COLORS: WindowColor[] = ["sky", "pink", "lilac", "mint"];
const TILTS = [-1.5, 1, -1, 1.5];
const link = "underline underline-offset-4 decoration-2 hover:decoration-coral";
const won = (placement: string) => /top|champion|winner|finalist|place/i.test(placement);
const name = (item: Item) => (item.kind === "project" ? item.title : item.name);
const color = (item: Item, i: number): WindowColor =>
  item.kind === "hackathon" ? (won(item.placement) ? "gold" : "coral") : COLORS[i % COLORS.length];
const period = (item: Item) =>
  item.kind === "hackathon"
    ? `hackathon · ${monthLabel(item.date)}`
    : item.ended && item.ended !== item.started
      ? `${monthLabel(item.started)} – ${monthLabel(item.ended)}`
      : item.status === "building"
        ? `${monthLabel(item.started)} – now`
        : monthLabel(item.started);

const btn =
  "grid size-9 cursor-pointer place-items-center border-2 border-ink bg-surface shadow-[2px_2px_0_var(--ink)] hover:bg-gold hover:text-on-accent active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

function Links({ item }: { item: Item }) {
  const repoUrl = item.kind === "project" ? item.repoUrl : undefined;
  if (!item.demoUrl && !repoUrl) return null;
  return (
    <p className="flex flex-wrap gap-4 text-[15px]">
      {item.demoUrl ? (
        <a href={item.demoUrl} className={link}>
          Try the demo ↗
        </a>
      ) : null}
      {repoUrl ? (
        <a href={repoUrl} className={link}>
          View the code ↗
        </a>
      ) : null}
    </p>
  );
}

function Media({ item }: { item: Item }) {
  return item.kind === "project" ? (
    <MediaSlot video={item.video} image={item.cover} alt={item.title} kind={item.video ? "video" : "image"} />
  ) : (
    <MediaSlot image={item.photo} alt={item.name} kind="image" label="photo soon" />
  );
}

// The full write-up of one item, shown in the popup.
function Detail({ item }: { item: Item }) {
  const builtAt = item.kind === "project" ? item.builtAt : undefined;
  const award = item.kind === "hackathon" ? item : builtAt;
  return (
    <article className="grid gap-4">
      <Media item={item} />
      <p className="font-pixel text-[12px] text-ink-muted">{period(item)}</p>
      <h3 className="text-h2">{name(item)}</h3>
      {item.kind === "project" ? <p className="text-[17px] leading-snug">{item.oneLiner}</p> : null}
      <p className="flex flex-wrap gap-2">
        {item.kind === "project" ? (
          <>
            <Pill variant="status" status={item.status}>
              {item.status}
            </Pill>
            {item.tags.map((tag) => (
              <Pill key={tag} variant={tag === "ai" ? "tag" : "neutral"}>
                {tag}
              </Pill>
            ))}
          </>
        ) : null}
        {award ? <Pill variant={won(award.placement) ? "placement" : "neutral"}>{award.placement}</Pill> : null}
      </p>
      {award ? (
        <div className="grid gap-1 border-[3px] border-ink bg-gold p-3 text-on-accent">
          <p className="font-pixel text-[12px]">{builtAt ? "built at" : "hackathon"}</p>
          <p className="font-medium">
            {award.name} · {monthLabel(award.date)} · {award.placement}
          </p>
          {award.prize ? (
            <p>
              {award.prize}
              {award.prizeSourceUrl ? (
                <>
                  {" "}
                  <a href={award.prizeSourceUrl} className={link}>
                    (announcement ↗)
                  </a>
                </>
              ) : null}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="grid max-w-[68ch] gap-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.html }} />
      <dl className="grid gap-x-4 gap-y-1 font-mono text-mono sm:grid-cols-[7rem_1fr]">
        {item.role ? (
          <>
            <dt className="text-ink-muted">role</dt>
            <dd>{item.role}</dd>
          </>
        ) : null}
        {item.kind === "project" && item.team ? (
          <>
            <dt className="text-ink-muted">team</dt>
            <dd>team project</dd>
          </>
        ) : null}
        {item.kind === "hackathon" && item.teamSize ? (
          <>
            <dt className="text-ink-muted">team</dt>
            <dd>{item.teamSize} people</dd>
          </>
        ) : null}
        {item.kind === "hackathon" && item.built ? (
          <>
            <dt className="text-ink-muted">built</dt>
            <dd>{item.built}</dd>
          </>
        ) : null}
      </dl>
      {item.kind === "project" && item.skills.length > 0 ? (
        <ul className="flex flex-wrap gap-2" aria-label="Built with">
          {item.skills.map((skill) => (
            <li key={skill} className="border-2 border-ink bg-surface px-2 font-mono text-mono">
              {skill}
            </li>
          ))}
        </ul>
      ) : null}
      <Links item={item} />
    </article>
  );
}

// C:\projects: every listed project as a scroll-snap carousel with tag filters.
// Hackathons from the road show under All and Hackathon, after the projects; a hackathon
// that built a listed project is merged into that project's card. Details opens a popup
// that steps through the shown items.
export function ProjectsCarousel({ projects, hackathons }: { projects: CarouselProject[]; hackathons: CarouselHackathon[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState(0);
  const track = useRef<HTMLUListElement>(null);
  const max = useWindowDialog();
  const items: Item[] = [
    ...(filter === "all" ? projects : projects.filter((p) => p.tags.includes(filter))).map((p) => ({ kind: "project" as const, ...p })),
    ...(filter === "all" || filter === "hackathon" ? hackathons : []).map((h) => ({ kind: "hackathon" as const, ...h })),
  ];
  const current = items[Math.min(active, items.length - 1)];

  function scroll(direction: 1 | -1) {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  function choose(id: Filter) {
    setFilter(id);
    track.current?.scrollTo({ left: 0 });
  }

  // Switching items inside the popup starts the next write-up at its top.
  function show(i: number) {
    setActive(i);
    max.dialog.current?.querySelector(".desk")?.scrollTo({ top: 0 });
  }

  function step(direction: 1 | -1) {
    show((active + direction + items.length) % items.length);
  }

  return (
    <>
      <Window
        title="C:\projects"
        icon={<Folder className="size-4" />}
        color="mint"
        tilt={0.5}
        bodyClassName="grid gap-5 p-6"
        menu={
          <>
            <span>File</span>
            <span>View</span>
            <span className="ml-auto text-ink-muted">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </>
        }
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="projects-heading" className="text-h2">
            Projects
          </h2>
          <div className="flex gap-2">
            <button type="button" className={btn} onClick={() => scroll(-1)} aria-label="Previous projects" aria-controls="projects-track">
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button type="button" className={btn} onClick={() => scroll(1)} aria-label="Next projects" aria-controls="projects-track">
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => choose(f.id)}
              className="cursor-pointer border-2 border-ink bg-surface px-3 py-0.5 font-pixel text-[12px] shadow-[2px_2px_0_var(--ink)] hover:bg-gold hover:text-on-accent aria-pressed:bg-ink aria-pressed:text-surface"
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul id="projects-track" ref={track} aria-live="polite" className="-mx-2 flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 pb-4 pt-3">
          {items.map((item, i) => (
            <li key={`${item.kind}-${item.slug}`} className="w-[min(320px,85%)] shrink-0 snap-start">
              <Window
                title={`${item.slug}.${item.kind === "project" ? "app" : "hack"}`}
                color={color(item, i)}
                tilt={TILTS[i % TILTS.length]}
                className="flex h-full flex-col"
                bodyClassName="flex flex-1 flex-col gap-3 p-4"
              >
                <Media item={item} />
                <p className="font-pixel text-[12px] text-ink-muted">{period(item)}</p>
                <h3 className="text-h3">{name(item)}</h3>
                {item.kind === "project" ? (
                  <>
                    <p className="text-[15px] leading-snug">{item.oneLiner}</p>
                    <p className="flex flex-wrap gap-2">
                      <Pill variant="status" status={item.status}>
                        {item.status}
                      </Pill>
                      {item.builtAt ? <Pill variant="placement">{`${item.builtAt.placement} · ${item.builtAt.name}`}</Pill> : null}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <Pill variant={won(item.placement) ? "placement" : "neutral"}>{item.placement}</Pill>
                    </p>
                    {item.built ? <p className="text-[15px] leading-snug">Built: {item.built}</p> : null}
                  </>
                )}
                <p className="mt-auto flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="button"
                    aria-label={`Details: ${name(item)}`}
                    onClick={(event) => {
                      setActive(i);
                      max.open(event, event.currentTarget.closest("li"));
                    }}
                    className="cursor-pointer border-2 border-ink bg-surface px-3 py-0.5 font-pixel text-[12px] shadow-[2px_2px_0_var(--ink)] hover:bg-gold hover:text-on-accent active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <span aria-hidden="true">□ </span>Details
                  </button>
                  {item.demoUrl ? (
                    <a href={item.demoUrl} className={`${link} text-[15px]`}>
                      Demo ↗
                    </a>
                  ) : null}
                </p>
              </Window>
            </li>
          ))}
        </ul>
      </Window>

      <WindowDialog
        state={max}
        label="Project details"
        title={current ? `${current.slug}.${current.kind === "project" ? "app" : "hack"} · maximized` : "C:\\projects"}
        icon={<Folder className="size-4" />}
        color={current ? color(current, active) : "mint"}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
      >
        {current ? (
          <div className="mx-auto grid max-w-[1000px] gap-6 lg:grid-cols-[14rem_1fr]">
            <nav aria-label="Switch project" className="min-w-0">
              <p className="mb-2 font-pixel text-[12px] text-ink-muted">C:\projects</p>
              <ul className="flex gap-2 overflow-x-auto pb-2 lg:grid lg:overflow-visible">
                {items.map((item, i) => (
                  <li key={`${item.kind}-${item.slug}`} className="shrink-0">
                    <button
                      type="button"
                      aria-current={i === active ? "true" : undefined}
                      onClick={() => show(i)}
                      className="w-full cursor-pointer truncate border-2 border-ink bg-surface px-2 py-1 text-left font-mono text-mono hover:bg-gold hover:text-on-accent aria-[current]:bg-ink aria-[current]:text-surface"
                    >
                      {name(item)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="grid min-w-0 content-start gap-4">
              <div className="flex items-center justify-between gap-3">
                <button type="button" className={btn} onClick={() => step(-1)} aria-label="Previous project">
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <p className="font-pixel text-[12px]" aria-live="polite">
                  {active + 1} / {items.length}
                </p>
                <button type="button" className={btn} onClick={() => step(1)} aria-label="Next project">
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </div>
              <Window title={`${current.slug}.${current.kind === "project" ? "app" : "hack"}`} color={color(current, active)} bodyClassName="p-6">
                <Detail item={current} />
              </Window>
            </div>
          </div>
        ) : null}
      </WindowDialog>
    </>
  );
}
