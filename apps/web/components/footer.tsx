import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const link = "underline underline-offset-4 hover:decoration-coral decoration-2";
  return (
    <footer className="mt-16 border-t-2 border-ink lg:mt-24">
      <div className="mx-auto flex max-w-page flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
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
        <p className="hidden font-mono text-mono text-ink-muted lg:block">psst: press ~</p>
      </div>
    </footer>
  );
}
