import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Pill } from "@/components/pill";
import { site } from "@/lib/site";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const { spotlight } = site;

  return (
    <main className="mx-auto max-w-page px-4 py-16 sm:px-6 lg:py-24">
      <header>
        <h1 className="text-h1">{siteConfig.name}</h1>
        <p className="mt-3 text-body text-ink-muted">{siteConfig.role}</p>
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
      </section>
    </main>
  );
}
