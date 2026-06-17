import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { BootReveal } from "@/components/BootReveal";
import { ThemeToggle } from "@/components/ThemeToggle";

import { Whoami } from "@/components/sections/Whoami";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { OpenSource } from "@/components/sections/OpenSource";
import { Competitions } from "@/components/sections/Competitions";
import { Events } from "@/components/sections/Events";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    /*
     * Page backdrop — distinct from the terminal surface.
     * Dark: near-black with subtle radial glow.
     * Light: soft off-white gradient.
     * Both use CSS variables so they adapt per theme.
     */
    <div
      className="min-h-screen py-6 lg:py-10 px-3 sm:px-6"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, var(--accent-glow), transparent 60%), var(--bg)",
      }}
    >
      {/* Skip to content — first focusable element */}
      <a
        href="#whoami"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-3 focus:py-2 focus:bg-accent focus:text-bg focus:font-mono focus:text-xs focus:rounded-sm focus:outline-none"
      >
        Skip to content
      </a>

      {/*
       * Terminal window container
       * Centered, max-w-5xl, rounded, bordered, shadowed.
       */}
      <div className="mx-auto max-w-5xl rounded-xl border border-border bg-bg shadow-2xl">

        {/*
         * Title bar — sticky so it stays visible while the page scrolls.
         * Left:   traffic-light dots
         * Center: terminal identity in mono
         * Right:  ThemeToggle + mobile menu toggle (via MobileNav)
         */}
        <div
          id="titlebar"
          className="sticky top-0 z-30 flex items-center justify-between px-4 h-11 bg-surface border-b border-border shrink-0 rounded-t-xl"
        >
          {/* Traffic-light dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F56" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#27C93F" }} />
          </div>

          {/* Terminal title */}
          <span className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-text-dim select-none hidden sm:block">
            rolan@portfolio: ~
          </span>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            {/* MobileNav renders its own toggle button inside; on desktop it's hidden */}
            <MobileNav />
          </div>
        </div>

        {/*
         * Window body — two columns on desktop.
         * Left:  Sidebar (sticky, in-flow)
         * Right: main content (9 sections)
         * Mobile: single column; sidebar hidden, nav reachable via title bar toggle.
         */}
        <BootReveal>
          <div className="flex min-h-0">
            {/* Sidebar — in-flow, sticky below title bar */}
            <Sidebar />

            {/* Main content */}
            <main
              id="main-content"
              className="flex-1 min-w-0"
              tabIndex={-1}
            >
              <div className="max-w-2xl mx-auto px-6 py-14 space-y-20">
                <Whoami />
                <Skills />
                <Experience />
                <Projects />
                <OpenSource />
                <Competitions />
                <Events />
                <Certifications />
                <Contact />

                {/* Bottom breathing room */}
                <div className="h-16" aria-hidden="true" />
              </div>
            </main>
          </div>
        </BootReveal>
      </div>
    </div>
  );
}
