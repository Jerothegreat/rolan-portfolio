import Link from "next/link";
import Image from "next/image";
import { Article } from "pixelarticons/react/Article";
import { FileText } from "pixelarticons/react/FileText";
import { Folder } from "pixelarticons/react/Folder";
import { Github } from "pixelarticons/react/Github";
import { Linkedin } from "pixelarticons/react/Linkedin";
import { Mail } from "pixelarticons/react/Mail";
import { Notes } from "pixelarticons/react/Notes";
import { SettingsCog } from "pixelarticons/react/SettingsCog";
import { Terminal } from "pixelarticons/react/Terminal";
import { User } from "pixelarticons/react/User";
import { Button } from "@/components/button";
import { CopyEmail } from "@/components/copy-email";
import { Pill } from "@/components/pill";
import { Reveal } from "@/components/reveal";
import { RoadWindow } from "@/components/road-window";
import { Stamp } from "@/components/stamp";
import { TrackerWindow } from "@/components/tracker-window";
import { MediaSlot } from "@/components/media-slot";
import { ContributionGraph } from "@/components/contribution-graph";
import { ExperienceWindow, type Job } from "@/components/experience-window";
import { SectionTitle } from "@/components/section-title";
import { ProjectsCarousel, type CarouselHackathon, type CarouselProject } from "@/components/projects-carousel";
import { Window } from "@/components/window";
import { internshipBadge, type SkillGroup } from "@/lib/content-model";
import { githubContributions } from "@/lib/contributions";
import { githubActivity } from "@/lib/github";
import { latestPosts, site } from "@/lib/site";
import { monthLabel } from "@/lib/month";
import { siteConfig } from "@/lib/site-config";
import profileImg from "@/public/profileimg.jpg";

const groupLabels: Record<SkillGroup, string> = {
  ai: "AI",
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  tools: "Tools",
};

// Lilac marks anything AI; the other groups each get their own accent.
const groupColors: Record<SkillGroup, string> = {
  ai: "bg-lilac",
  frontend: "bg-sky",
  backend: "bg-mint",
  mobile: "bg-pink",
  tools: "bg-gold",
};

const skillName = new Map(site.skills.map((skill) => [skill.id, skill.name]));

// A hackathon that built a listed project shows as part of that project's card.
const builtAt = new Map(
  site.competitions
    .filter((c) => c.project)
    .map((c) => [c.project, { name: c.name, date: c.date, placement: c.placement, prize: c.prize, prizeSourceUrl: c.prizeSourceUrl }]),
);

// Only the fields the carousel draws reach the client bundle.
const toCarousel = (p: (typeof site.listedProjects)[number]): CarouselProject => ({
  slug: p.slug,
  title: p.title,
  oneLiner: p.oneLiner,
  status: p.status,
  tags: p.tags,
  role: p.role,
  started: p.started,
  ended: p.ended,
  team: p.team,
  skills: p.skills.map((id) => skillName.get(id) ?? id),
  html: p.html,
  demoUrl: p.demoUrl,
  repoUrl: p.repoUrl,
  cover: p.cover,
  video: p.video,
  builtAt: builtAt.get(p.slug),
});

const toHackathon = (c: (typeof site.competitions)[number]): CarouselHackathon => ({
  slug: c.slug,
  name: c.name,
  date: c.date,
  placement: c.placement,
  prize: c.prize,
  prizeSourceUrl: c.prizeSourceUrl,
  role: c.role,
  teamSize: c.teamSize,
  built: c.built,
  html: c.html,
  demoUrl: c.demoUrl,
  photo: c.photo,
});

// Only the fields the experience window draws reach the client bundle.
const toJob = ({ path, date, ended, label, company, summary, details }: (typeof site.milestones)[number]): Job => ({
  path,
  date,
  ended,
  label,
  company,
  summary,
  details: details ?? [],
});

const githubUser = new URL(siteConfig.github).pathname.split("/")[1];

const icon = "size-4";
const link = "underline underline-offset-4 decoration-2 hover:decoration-coral";

// Only the fields the road draws reach the client bundle.
const toStop = ({ path, date, type, label, points, running, summary, stamp, link }: (typeof site.road.stops)[number]) => ({
  path,
  date,
  type,
  label,
  points,
  running,
  summary,
  stamp,
  link,
});

export default async function Home() {
  const { spotlight, latestInternship, road } = site;
  const [github, contributions] = await Promise.all([githubActivity(), githubContributions(githubUser)]);
  const experience = site.milestones.filter((m) => m.type === "internship" || m.type === "job");
  const hackathons = site.competitions.filter((c) => c.kind === "hackathon" && !c.project).map(toHackathon);
  const badge = internshipBadge(latestInternship);
  const featuredHighlight = site.featuredHighlight;
  const others = site.otherHighlights(3);

  const desktopIcons = [
    { label: "Projects", href: "#projects", Icon: Folder },
    { label: "Contact", href: "#contact", Icon: Mail },
    { label: "Resume", href: siteConfig.resume, Icon: FileText, download: true },
  ];

  return (
    <main className="desk">
      <SectionTitle />
      <div className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:py-16">
        {/* Hero pile. DOM order is reading order; the overlap on lg is visual only. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
          <Window title="about.txt" icon={<FileText className={icon} />} color="sky" tilt={-1.5} className="z-10 lg:col-span-7 lg:row-start-1">
            <header className="grid gap-3">
              <h1 className="font-display text-[clamp(40px,5.5vw,64px)] leading-[0.95] font-extrabold tracking-tight">{siteConfig.name}</h1>
              <p className="font-medium">{siteConfig.role}</p>
              {badge ? (
                <p>
                  <Pill variant="neutral">{badge}</Pill>
                </p>
              ) : null}
              <p className="text-ink-muted">{siteConfig.tagline}</p>
              <p className="mt-2 flex flex-wrap gap-4">
                <Button href="#projects">See my work</Button>
                <Button href={siteConfig.resume} variant="secondary" download>
                  Resume
                </Button>
              </p>
            </header>
            {/* Starburst sticker slapped on the window corner. */}
            <span className="absolute -right-1 -top-10 z-30 rotate-12 drop-shadow-[3px_3px_0_var(--ink)] sm:-right-10">
              <span className="sticker-burst grid size-28 place-items-center bg-ink">
                <span className="sticker-burst grid size-[104px] place-items-center bg-mint px-5 text-center font-pixel text-[12px] leading-tight font-bold text-on-accent">
                  {siteConfig.status}
                </span>
              </span>
            </span>
          </Window>

          <Window
            title="me.jpg"
            icon={<User className={icon} />}
            color="pink"
            tilt={2.5}
            className="z-20 w-56 justify-self-end lg:col-start-9 lg:col-span-4 lg:row-start-1 lg:mt-6 lg:w-60 lg:self-start lg:justify-self-center"
            bodyClassName="p-2"
          >
            <span aria-hidden="true" className="absolute -top-4 left-1/2 z-10 h-5 w-16 -translate-x-1/2 -rotate-3 border-2 border-ink bg-surface/70" />
            <Image src={profileImg} alt={siteConfig.name} sizes="240px" className="aspect-[3/4] w-full border-2 border-ink object-cover" priority />
          </Window>

          <TrackerWindow road={road} tilt={1} className="z-20 lg:col-start-6 lg:col-span-6 lg:row-start-2 lg:-mt-16" />

          <section id="spotlight" aria-labelledby="spotlight-heading" className="relative z-10 hover:z-40 focus-within:z-40 lg:col-start-1 lg:col-span-7 lg:row-start-3 lg:-mt-14 lg:ml-6">
            <Window title="spotlight.exe" icon={<Folder className={icon} />} color="mint" tilt={-1} bodyClassName="grid gap-4 p-6">
              <p className="font-pixel text-[13px]">★ spotlight</p>
              <h2 id="spotlight-heading" className="text-h2">
                {spotlight.title}
              </h2>
              <p>{spotlight.oneLiner}</p>
              <p className="flex flex-wrap items-center gap-3 font-mono text-mono text-ink-muted">
                <Pill variant="status" status={spotlight.status}>
                  {spotlight.status}
                </Pill>
                <span>
                  {spotlight.team ? "team project · " : ""}
                  {spotlight.role}
                </span>
              </p>
              <MediaSlot video={spotlight.video} image={spotlight.cover} alt={spotlight.title} kind="video" />
              {spotlight.demoUrl || spotlight.repoUrl ? (
                <p className="flex flex-wrap items-center gap-6">
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
              <Stamp color={spotlight.status === "live" ? "mint" : "coral"} tilt={-8} className="-bottom-5 -right-1 sm:-right-4">
                {spotlight.status}
              </Stamp>
            </Window>
          </section>

          <nav aria-label="Desktop" className="lg:col-start-12 lg:row-span-2 lg:row-start-2 lg:self-center lg:justify-self-end">
            <ul className="flex flex-wrap gap-4 lg:flex-col lg:items-center">
              {desktopIcons.map(({ label, href, Icon, download }) => (
                <li key={label}>
                  <a href={href} download={download} className="group grid w-20 justify-items-center gap-1 text-center">
                    <Icon className="size-10" aria-hidden="true" />
                    <span className="border-2 border-ink bg-surface px-1 font-pixel text-[11px] group-hover:bg-gold group-hover:text-on-accent">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <button type="button" data-terminal-trigger="terminal" className="group grid w-20 cursor-pointer justify-items-center gap-1 text-center">
                  <Terminal className="size-10" aria-hidden="true" />
                  <span className="border-2 border-ink bg-surface px-1 font-pixel text-[11px] group-hover:bg-gold group-hover:text-on-accent">
                    Terminal
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Experience and tech stack first, then projects, then the road and the rest. */}
        <Reveal className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-0">
            <section id="experience" aria-labelledby="experience-heading" className="relative z-10 hover:z-40 focus-within:z-40 lg:col-start-1 lg:col-span-6 lg:row-start-1">
              <ExperienceWindow jobs={experience.map(toJob)} />
            </section>

            <section id="skills" aria-labelledby="skills-heading" className="relative z-20 hover:z-40 focus-within:z-40 lg:col-start-7 lg:col-span-6 lg:row-start-1 lg:-ml-8 lg:mt-16 lg:self-start">
              <Window
                title="skills.cpl · Control Panel"
                icon={<SettingsCog className={icon} />}
                color="lilac"
                tilt={0.5}
                menu={site.skillGroups.map((group) => (
                  <span key={group.group}>{groupLabels[group.group]}</span>
                ))}
                bodyClassName="grid gap-4 p-6"
              >
                <h2 id="skills-heading" className="sr-only">
                  Skills
                </h2>
                {site.skillGroups.map((group) => (
                  <div key={group.group} className="grid gap-2 border-b-2 border-dashed border-ink/35 pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[8rem_1fr]">
                    <h3 className="font-pixel text-[13px]">{groupLabels[group.group]}</h3>
                    <ul className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => {
                        const used = skill.usedIn.length > 0;
                        return (
                          <li
                            key={skill.id}
                            title={used ? `Used in ${skill.usedIn.map((p) => p.title).join(", ")}` : skill.level}
                            className={`border-2 border-ink px-2 font-mono text-mono ${used ? `${groupColors[group.group]} text-on-accent` : "bg-surface"}`}
                          >
                            {skill.name}
                            <span className="sr-only">
                              {`, ${skill.level}`}
                              {used ? `, used in ${skill.usedIn.map((p) => p.title).join(", ")}` : ""}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
                <p className="text-mono text-ink-muted">Filled: used in a project. Outlined: experimenting.</p>
              </Window>
            </section>
          </div>
        </Reveal>

        <Reveal className="mt-16 lg:mt-24">
          <section id="projects" aria-labelledby="projects-heading">
            <ProjectsCarousel projects={site.listedProjects.map(toCarousel)} hackathons={hackathons} />
          </section>
        </Reveal>

        <div className="mt-16 lg:mt-24">
          <RoadWindow highlights={road.highlights.map(toStop)} stops={road.stops.map(toStop)} total={road.total} goal={road.goal} />
        </div>

        <Reveal className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-0">
            {featuredHighlight ? (
              <section aria-labelledby="news-heading" className="relative z-10 hover:z-40 focus-within:z-40 lg:col-start-1 lg:col-span-7 lg:row-start-1">
                <Window title="in_the_news.html" icon={<Article className={icon} />} color="coral" tilt={-2} bodyClassName="grid gap-3 p-6">
                  <p className="font-pixel text-[13px]">In the news</p>
                  <p>
                    <Pill variant="neutral">{`${monthLabel(featuredHighlight.date)} · featured`}</Pill>
                  </p>
                  <h2 id="news-heading" className="text-h3">
                    {featuredHighlight.label}
                  </h2>
                  <MediaSlot image={featuredHighlight.photo} alt={featuredHighlight.label} kind="image" label="photo soon" />
                  {featuredHighlight.summary ? <p>{featuredHighlight.summary}</p> : null}
                  {featuredHighlight.link ? (
                    <p>
                      <Button href={featuredHighlight.link} variant="secondary">
                        Read the post ↗
                      </Button>
                    </p>
                  ) : null}
                  {others.length > 0 ? (
                    <ul className="grid gap-1 border-t-2 border-dashed border-ink/35 pt-3 text-mono">
                      {others.map((m) => (
                        <li key={m.path}>
                          <span className="text-ink-muted tabular-nums">{monthLabel(m.date)}</span> · {m.label}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <p>
                    <a href="#road" className={link}>
                      Every milestone is on the road ↑
                    </a>
                  </p>
                </Window>
              </section>
            ) : null}

            <section id="blog" aria-labelledby="blog-heading" className="relative z-20 hover:z-40 focus-within:z-40 lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:-ml-10 lg:mt-16 lg:self-start">
              <Window title="blog.txt" icon={<Notes className={icon} />} color="sky" tilt={1.5} bodyClassName="grid gap-4 p-6">
                <h2 id="blog-heading" className="text-h2">
                  Blog
                </h2>
                {latestPosts.length > 0 ? (
                  <ul className="grid gap-3">
                    {latestPosts.map((post) => (
                      <li key={post.slug} className="grid gap-1 border-b-2 border-dashed border-ink/35 pb-3 last:border-b-0">
                        <p className="flex flex-wrap items-center gap-2 font-mono text-mono text-ink-muted">
                          <Pill variant={post.tag === "til" ? "tag" : "neutral"}>{post.tag}</Pill>
                          {monthLabel(post.date)}
                        </p>
                        <h3 className="text-h3">
                          <Link href={`/blog/${post.slug}`} className={link}>
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-ink-muted">{post.summary}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="grid justify-items-start gap-2 border-2 border-dashed border-ink p-4 text-ink-muted">
                    <span className="border-2 border-ink bg-surface px-1.5 font-pixel text-[11px] text-ink">0 posts</span>
                    No posts yet. The first ones are being written: what broke, what I learned, and why 1mil.
                  </p>
                )}
                <p>
                  <Link href="/blog" className={link}>
                    Open C:log →
                  </Link>
                </p>
              </Window>
            </section>
          </div>
        </Reveal>

        {github || contributions ? (
          <Reveal className="mt-16 lg:mt-24">
            <section aria-labelledby="github-heading">
              <Window title="github.exe" icon={<Github className={icon} />} color="mint" tilt={-0.5} bodyClassName="grid gap-6 p-6 lg:grid-cols-[1fr_18rem]">
                <div className="grid min-w-0 content-start gap-4">
                  <h2 id="github-heading" className="flex flex-wrap items-center gap-3 text-h2">
                    GitHub
                    {github ? (
                      <span className={`border-2 border-ink px-1.5 font-pixel text-[12px] ${github.active ? "bg-mint text-on-accent" : "bg-surface"}`}>
                        {github.active ? "● active" : "quiet lately"}
                      </span>
                    ) : null}
                  </h2>
                  {contributions ? <ContributionGraph total={contributions.total} weeks={contributions.weeks} /> : null}
                </div>
                {github ? (
                  <div className="grid content-start gap-3 border-ink lg:border-l-2 lg:border-dashed lg:pl-6">
                    <p>
                      <a href={siteConfig.github} className={link}>
                        @{github.user} on GitHub ↗
                      </a>
                    </p>
                  </div>
                ) : null}
              </Window>
            </section>
          </Reveal>
        ) : null}

        <Reveal className="mt-16 lg:mt-24">
          <section id="contact" aria-labelledby="contact-heading" className="lg:mx-auto lg:w-2/3">
            <Window title="mail.app" icon={<Mail className={icon} />} color="pink" tilt={-1.5} bodyClassName="grid gap-5 p-6">
              <h2 id="contact-heading" className="text-h2">
                Get in touch
              </h2>
              <p className="text-ink-muted">Email is the fastest way to reach me.</p>
              <p>
                <CopyEmail email={siteConfig.email} />
              </p>
              <p className="flex flex-wrap gap-x-6 gap-y-3 border-t-2 border-dashed border-ink/35 pt-4">
                <a href={siteConfig.github} className={`flex items-center gap-2 ${link}`}>
                  <Github className="size-6" aria-hidden="true" /> GitHub
                </a>
                <a href={siteConfig.linkedin} className={`flex items-center gap-2 ${link}`}>
                  <Linkedin className="size-6" aria-hidden="true" /> LinkedIn
                </a>
                <a href={siteConfig.resume} download className={`flex items-center gap-2 ${link}`}>
                  <FileText className="size-6" aria-hidden="true" /> Resume.pdf
                </a>
              </p>
            </Window>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
