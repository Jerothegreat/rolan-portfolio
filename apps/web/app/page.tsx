import { site } from "@/lib/site";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const { spotlight } = site;

  return (
    <main className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
      <header>
        <h1 className="text-4xl font-bold">{siteConfig.name}</h1>
        <p className="mt-2 text-lg">{siteConfig.role}</p>
      </header>

      <section id="projects" aria-labelledby="spotlight-heading" className="mt-16">
        <p className="text-sm uppercase tracking-wide">Spotlight</p>
        <article className="mt-4 rounded-2xl border-2 p-8">
          <h2 id="spotlight-heading" className="text-3xl font-bold">
            {spotlight.title}
          </h2>
          <p className="mt-2 text-lg">{spotlight.oneLiner}</p>
          <p className="mt-4 text-sm">
            {spotlight.status}
            {spotlight.team ? " · team project" : ""} · {spotlight.role}
          </p>
          {spotlight.video ? (
            <video className="mt-6 w-full" src={spotlight.video} controls muted playsInline />
          ) : null}
          {spotlight.demoUrl || spotlight.repoUrl ? (
            <p className="mt-6 flex gap-4">
              {spotlight.demoUrl ? <a href={spotlight.demoUrl}>Try the demo</a> : null}
              {spotlight.repoUrl ? <a href={spotlight.repoUrl}>View the code</a> : null}
            </p>
          ) : null}
        </article>
      </section>
    </main>
  );
}
