"use client";

import { useRef } from "react";
import { Briefcase } from "pixelarticons/react/Briefcase";
import { Window, type WindowColor } from "@/components/window";
import { WindowDialog, ctl, maxButton, useWindowDialog } from "@/components/window-dialog";
import { monthLabel } from "@/lib/month";

export type Job = {
  path: string;
  date: string;
  ended?: string;
  label: string;
  company?: string;
  summary?: string;
  details: string[];
};

const COLORS: WindowColor[] = ["sky", "pink", "mint"];
const TILTS = [-1, 1, -0.5];

const period = (job: Job) => `${monthLabel(job.date)} – ${job.ended ? monthLabel(job.ended) : "now"}`;

// experience.log: the short list on Home; □ maximizes into everything each role involved.
export function ExperienceWindow({ jobs }: { jobs: Job[] }) {
  const win = useRef<HTMLDivElement>(null);
  const max = useWindowDialog();
  const maximize = (event: React.MouseEvent<HTMLButtonElement>) => max.open(event, win.current);

  return (
    <div ref={win}>
      <Window
        title="experience.log"
        icon={<Briefcase className="size-4" />}
        color="lilac"
        tilt={-1}
        bodyClassName=""
        controls={
          <span className="flex gap-1">
            <span aria-hidden="true" className={`${ctl} cursor-default hover:bg-surface hover:text-ink`}>
              _
            </span>
            <button type="button" className={ctl} onClick={maximize} aria-label="Maximize: show everything I did in each role">
              □
            </button>
          </span>
        }
      >
        <div className="grid gap-4 p-6">
          <h2 id="experience-heading" className="text-h2">
            Experience
          </h2>
          <ol className="grid gap-4">
            {jobs.map((job) => (
              <li key={job.path} className="grid gap-1 border-l-[3px] border-ink pl-4">
                <p className="font-pixel text-[12px] text-ink-muted">{period(job)}</p>
                <h3 className="text-h3">{job.label}</h3>
                {job.company ? <p className="font-mono text-mono">{job.company}</p> : null}
                {job.summary ? <p className="text-ink-muted">{job.summary}</p> : null}
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t-[3px] border-ink px-4 py-2 text-mono">
          <span>{jobs.length} roles</span>
          <button type="button" onClick={maximize} className={maxButton}>
            <span aria-hidden="true">□</span> What I did there
          </button>
        </div>
      </Window>

      <WindowDialog state={max} label="Experience: what I did in each role" title="experience.log · maximized" icon={<Briefcase className="size-4" />} color="lilac" width="860px">
        <ol className="mx-auto grid max-w-[760px] gap-8">
          {jobs.map((job, i) => (
            <li key={job.path}>
              <Window title={`${job.company ?? job.label}.txt`} color={COLORS[i % COLORS.length]} tilt={TILTS[i % TILTS.length]} bodyClassName="grid gap-3 p-6">
                <p className="font-pixel text-[12px] text-ink-muted">{period(job)}</p>
                <h3 className="text-h3">{job.label}</h3>
                {job.company ? <p className="font-mono text-mono">{job.company}</p> : null}
                {job.summary ? <p>{job.summary}</p> : null}
                {job.details.length > 0 ? (
                  <ul className="grid gap-2">
                    {job.details.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 size-2 shrink-0 bg-ink" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-pixel text-[12px] text-ink-muted">details soon</p>
                )}
              </Window>
            </li>
          ))}
        </ol>
      </WindowDialog>
    </div>
  );
}
