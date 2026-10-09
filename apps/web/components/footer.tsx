import { siteConfig } from "@/lib/site-config";
import { site } from "@/lib/site";

// Retro-OS status bar.
export function Footer() {
  const link = "underline underline-offset-4 hover:decoration-coral decoration-2";
  const { total, goal } = site.road;
  return (
    <footer className="border-t-[3px] border-ink bg-surface">
      <div className="mx-auto flex max-w-page flex-col gap-3 px-4 py-4 font-pixel text-[12px] sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${siteConfig.email}`} className={link}>
            Email
          </a>
          <a href={siteConfig.github} className={link}>
            GitHub
          </a>
          <a href={siteConfig.linkedin} className={link}>
            LinkedIn
          </a>
          <a href={siteConfig.resume} download className={link}>
            Resume
          </a>
        </p>
        <p className="flex flex-wrap gap-x-4 text-ink-muted">
          <span className="hidden lg:inline">press ~ for terminal</span>
          <span className="tabular-nums">
            {total.toLocaleString("en-US")} / {goal.toLocaleString("en-US")}
          </span>
        </p>
      </div>
    </footer>
  );
}
