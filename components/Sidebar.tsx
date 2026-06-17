"use client";

import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { profile } from "@/lib/data/profile";

const NAV_GROUPS = [
  {
    label: "Profile",
    items: [
      { command: "$ whoami", id: "whoami" },
      { command: "$ skills --group ai,fullstack,infra", id: "skills" },
      { command: "$ experience", id: "experience" },
    ],
  },
  {
    label: "Work",
    items: [
      { command: "$ projects --pinned", id: "projects" },
      { command: "$ open-source", id: "open-source" },
    ],
  },
  {
    label: "Community",
    items: [
      { command: "$ competitions --awards", id: "competitions" },
      { command: "$ events", id: "events" },
    ],
  },
  {
    label: "More",
    items: [
      { command: "$ certifications", id: "certifications" },
      { command: "$ contact", id: "contact" },
    ],
  },
] as const;

const ALL_IDS = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));

export function Sidebar() {
  const activeId = useScrollSpy([...ALL_IDS]);

  return (
    /*
     * In-flow column, hidden on mobile.
     * Sticky below the 44px title bar (h-11 = 2.75rem).
     * self-start so it doesn't stretch to fill the whole column.
     * max-h so it can scroll internally if content is taller than viewport.
     */
    <aside
      className="hidden lg:flex flex-col w-64 shrink-0 sticky top-11 self-start max-h-[calc(100vh-2.75rem)] overflow-y-auto border-r border-border bg-bg"
      aria-label="Site navigation"
    >
      {/* Top: site identity */}
      <div className="px-5 pt-7 pb-5 border-b border-border">
        <p className="font-mono text-xs text-text-dim uppercase tracking-widest mb-1">
          terminal
        </p>
        <p className="font-mono text-sm text-text leading-snug">
          {profile.name.split(" ")[0].toLowerCase()}.portfolio
        </p>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 px-3 py-4 space-y-5" aria-label="Sections">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-2 mb-1.5 font-mono text-[10px] uppercase tracking-widest text-text-dim">
              {group.label}
            </p>
            <ul role="list" className="space-y-0.5">
              {group.items.map(({ command, id }) => {
                const isActive = activeId === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={[
                        "block px-2 py-1.5 font-mono text-xs rounded-sm transition-colors duration-100",
                        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                        isActive
                          ? "text-accent bg-accent-soft"
                          : "text-text-dim hover:text-text-secondary hover:bg-surface",
                      ].join(" ")}
                      aria-current={isActive ? "location" : undefined}
                    >
                      {command}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer: availability + location */}
      <div className="px-5 py-4 border-t border-border space-y-1">
        {profile.availability === "open" && (
          <div className="flex items-center gap-2 font-mono text-xs">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-status-open"
              aria-hidden="true"
            />
            <span className="text-status-open">open to work</span>
          </div>
        )}
        <p className="font-mono text-xs text-text-dim">{profile.location}</p>
      </div>
    </aside>
  );
}
