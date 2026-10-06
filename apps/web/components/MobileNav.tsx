"use client";

import { useState, useRef, useEffect } from "react";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { profile } from "@/lib/data/profile";

const NAV_GROUPS = [
  {
    label: "Profile",
    items: [
      { command: "$ whoami", id: "whoami" },
      { command: "$ skills", id: "skills" },
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

/**
 * Mobile navigation — renders only on < lg screens.
 * Consists of a toggle button (placed in the title bar by page.tsx)
 * plus a full-width dropdown that appears below the title bar.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const activeId = useScrollSpy([...ALL_IDS]);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    /*
     * Wrapper is relative so the absolute dropdown positions correctly.
     * Hidden on lg+ (desktop has the sidebar).
     */
    <div className="lg:hidden relative" ref={menuRef}>
      {/* Menu toggle button — sits in the title bar */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        className="font-mono text-xs text-text-secondary hover:text-accent px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
      >
        {open ? "✕" : "$ menu"}
      </button>

      {/* Dropdown — absolutely positioned below title bar, full window width */}
      {open && (
        <nav
          id="mobile-menu"
          className="absolute right-0 top-full w-screen max-w-xs border border-border rounded-b-lg bg-bg shadow-xl px-4 py-3 space-y-4"
          aria-label="Sections"
        >
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-text-dim">
                {group.label}
              </p>
              <ul role="list" className="space-y-0.5">
                {group.items.map(({ command, id }) => {
                  const isActive = activeId === id;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        onClick={() => setOpen(false)}
                        className={[
                          "block px-2 py-2.5 font-mono text-xs min-h-[44px] flex items-center",
                          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm",
                          isActive
                            ? "text-accent bg-accent-soft"
                            : "text-text-dim",
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

          {/* Footer in mobile menu */}
          {profile.availability === "open" && (
            <div className="pt-2 border-t border-border flex items-center gap-2 font-mono text-xs">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-status-open"
                aria-hidden="true"
              />
              <span className="text-status-open">open to work</span>
              <span className="text-text-dim">· {profile.location}</span>
            </div>
          )}
        </nav>
      )}
    </div>
  );
}
