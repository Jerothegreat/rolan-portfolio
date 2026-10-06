import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Pill } from "@/components/pill";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const { spotlight, projectCount, latestInternship } = site;
  const recent = site.recentProjects(2);

  return (
    <main className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:py-24">
      <header>
        <ThemeToggle className="float-right" />
        <h1 className="text-h1">{siteConfig.name}</h1>
        <p className="mt-3 text-body text-ink-muted">{siteConfig.role}</p>
        {latestInternship?.company ? (
          <p className="mt-4">
            <Pill variant="neutral">ex-intern @ {latestInternship.company}</Pill>
          </p>
        ) : null}
        <Button href="#projects" className="mt-8">
          See my work
        </Button>
      </header>

      <section id="projects" aria-labelledby="spotlight-heading" className="mt-16 lg:mt-24">
        <Pill variant="placement">Spotlight</Pill>
        <Card className="mt-6 p-6 sm:p-12">
          <h2 id="spotlight-heading" className="text-h2">
            {spotlight.title}
          </h2>
          <p className="mt-3 text-body">{spotlight.oneLiner}</p>
          <p className="mt-6 flex flex-wrap items-center gap-3 font-mono text-mono text-ink-muted">
            <Pill variant="status" status={spotlight.status}>
              {spotlight.status}
            </Pill>
            <span>
              {spotlight.team ? "team project · " : ""}
              {spotlight.role}
            </span>
          </p>
          {spotlight.video ? (
            <video
              className="mt-8 w-full rounded-button border-2 border-ink"
              src={spotlight.video}
              controls
              muted
              playsInline
            />
          ) : null}
          {spotlight.demoUrl || spotlight.repoUrl ? (
            <p className="mt-8 flex flex-wrap items-center gap-6">
              {spotlight.demoUrl ? (
                <Button href={spotlight.demoUrl} variant="secondary">
                  Try the demo
                </Button>
              ) : null}
              {spotlight.repoUrl ? (
                <Button href={spotlight.repoUrl} variant="ghost">
                  View the code
                </Button>
              ) : null}
            </p>
          ) : null}
        </Card>

        {recent.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {recent.map((project) => {
              const href = project.demoUrl ?? project.repoUrl;
              return (
                <li key={project.slug}>
                  <Card className="relative h-full p-6">
                    <h3 className="text-h3">
                      {href ? (
                        <a href={href} className="underline-offset-4 hover:underline after:absolute after:inset-0">
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    <p className="mt-2 text-body">{project.oneLiner}</p>
                    <p className="mt-4">
                      <Pill variant="status" status={project.status}>
                        {project.status}
                      </Pill>
                    </p>
                  </Card>
                </li>
              );
            })}
          </ul>
        ) : null}

        <p className="mt-8">
          <Button href="#projects" variant="ghost">
            See all {projectCount} {projectCount === 1 ? "project" : "projects"} →
          </Button>
        </p>
      </section>
    </main>
  );
}
