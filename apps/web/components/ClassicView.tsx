import { Sidebar } from "@/components/Sidebar";
import { Whoami } from "@/components/sections/Whoami";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Competitions } from "@/components/sections/Competitions";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

interface ClassicViewProps {
  onSwitchToTerminal?: () => void;
}

export function ClassicView({ onSwitchToTerminal }: ClassicViewProps) {
  return (
    <div className="flex min-h-0">
      {/* Sidebar — sticky on desktop */}
      <Sidebar />

      {/* Main content */}
      <main id="main-content" className="flex-1 min-w-0" tabIndex={-1}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16">
          {/* Quick Terminal Switch Banner for Classic Mode */}
          {onSwitchToTerminal && (
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-surface/50 font-mono text-xs">
              <span className="text-text-secondary">
                Looking for the interactive terminal chat?
              </span>
              <button
                onClick={onSwitchToTerminal}
                className="px-2.5 py-1 bg-accent text-bg rounded hover:opacity-90 transition-opacity font-semibold shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                &gt;_ Open Terminal
              </button>
            </div>
          )}

          <Whoami />
          <Skills />
          <Experience />
          <Projects />
          <Competitions />
          <Certifications />
          <Contact />

          {/* Bottom breathing room */}
          <div className="h-10" aria-hidden="true" />
        </div>
      </main>
    </div>
  );
}
