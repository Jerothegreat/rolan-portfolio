"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/MobileNav";
import { ProfileStatus } from "@/components/ProfileStatus";
import { TerminalChat } from "@/components/TerminalChat";
import { ClassicView } from "@/components/ClassicView";

export type PortfolioView = "terminal" | "classic";

export function PortfolioContainer() {
  const [view, setView] = useState<PortfolioView>("terminal");
  const [mounted, setMounted] = useState(false);

  // Sync with URL query param & localStorage on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlView = params.get("view");
      if (urlView === "classic" || urlView === "profile") {
        setView("classic");
      } else if (urlView === "terminal" || urlView === "chat") {
        setView("terminal");
      } else {
        const stored = localStorage.getItem("portfolio_view");
        if (stored === "classic" || stored === "terminal") {
          setView(stored);
        }
      }
    } catch (_) {}
    setMounted(true);
  }, []);

  const switchView = (nextView: PortfolioView) => {
    setView(nextView);
    try {
      localStorage.setItem("portfolio_view", nextView);
      const url = new URL(window.location.href);
      if (nextView === "classic") {
        url.searchParams.set("view", "classic");
      } else {
        url.searchParams.delete("view");
      }
      window.history.replaceState({}, "", url.toString());
    } catch (_) {}
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-4 sm:py-6 lg:py-10 px-2 sm:px-4 lg:px-6"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, var(--accent-glow), transparent 60%), var(--bg)",
      }}
    >
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-3 focus:py-2 focus:bg-accent focus:text-bg focus:font-mono focus:text-xs focus:rounded-sm focus:outline-none"
      >
        Skip to content
      </a>

      {/*
       * Main terminal/portfolio window
       * Centered, max-w-4xl for terminal / max-w-5xl for classic
       */}
      <div
        className={`w-full transition-all duration-200 rounded-xl border border-border bg-bg shadow-2xl ${
          view === "classic" ? "max-w-5xl" : "max-w-4xl"
        }`}
      >
        {/*
         * Title bar — sticky so it stays accessible
         * Left:   traffic-light dots
         * Center: View switcher tabs [ >_ Terminal Chat ] [ 📄 Full Profile ]
         * Right:  ThemeToggle (+ MobileNav in classic mode on mobile)
         */}
        <div
          id="titlebar"
          className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-4 h-11 bg-surface border-b border-border shrink-0 rounded-t-xl"
        >
          {/* Traffic-light dots */}
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F56" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#27C93F" }} />
          </div>

          {/* View Switcher Tabs (Segmented Control) */}
          <div
            className="flex items-center p-0.5 rounded-lg border border-border bg-bg/80 backdrop-blur-sm"
            role="tablist"
            aria-label="View selection"
          >
            <button
              role="tab"
              aria-selected={view === "terminal"}
              onClick={() => switchView("terminal")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-xs transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                view === "terminal"
                  ? "bg-surface text-accent font-semibold shadow-xs border border-border/60"
                  : "text-text-dim hover:text-text-secondary"
              }`}
            >
              <span className="text-status-open font-bold">&gt;_</span>
              <span>Terminal &amp; Chat</span>
            </button>

            <button
              role="tab"
              aria-selected={view === "classic"}
              onClick={() => switchView("classic")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-xs transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                view === "classic"
                  ? "bg-surface text-accent font-semibold shadow-xs border border-border/60"
                  : "text-text-dim hover:text-text-secondary"
              }`}
            >
              <span className="text-accent font-bold">&gt;</span>
              <span>Full Profile</span>
            </button>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1 shrink-0">
            <ThemeToggle />
            {view === "classic" && <MobileNav />}
          </div>
        </div>

        {/*
         * Window Content
         * View 1: Terminal & Chat (ProfileStatus + TerminalChat)
         * View 2: Classic Profile (Sidebar + Sections)
         */}
        {view === "terminal" ? (
          <div>
            <ProfileStatus />
            <TerminalChat onSwitchToClassic={() => switchView("classic")} />
          </div>
        ) : (
          <ClassicView onSwitchToTerminal={() => switchView("terminal")} />
        )}
      </div>
    </div>
  );
}
