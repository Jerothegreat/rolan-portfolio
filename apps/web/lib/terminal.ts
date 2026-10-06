// Pure terminal command interpreter. No React, DOM, network, or Velite import:
// the caller passes content in via TerminalContext and applies the result.

export type TerminalProject = {
  slug: string;
  title: string;
  oneLiner: string;
  status: string;
  demoUrl?: string;
  repoUrl?: string;
};

export type TerminalContext = {
  name: string;
  role: string;
  bio: string;
  contact: { email: string; github: string; linkedin: string };
  // Listed projects only. Drafts and unlisted projects must not be passed here.
  projects: TerminalProject[];
  // Slugs of drafts/unlisted projects; `open` treats them exactly like unknown slugs.
  hiddenSlugs?: ReadonlySet<string>;
};

export type TerminalAction =
  | { type: "open-url"; url: string }
  | { type: "toggle-theme" }
  | { type: "clear" }
  | { type: "close" };

export type TerminalResult = { lines: string[]; action?: TerminalAction };

const HELP_LINES = [
  "Commands:",
  "  help         show this list",
  "  whoami       who I am",
  "  projects     list my projects",
  "  open <slug>  open a project's demo or repo",
  "  theme        toggle light/dark",
  "  contact      how to reach me",
  "  ask <text>   ask the AI chat",
  "  clear        clear the screen",
  "  exit         close the terminal",
];

const commands: Record<string, (args: string, ctx: TerminalContext) => TerminalResult> = {
  help: () => ({ lines: HELP_LINES }),
  whoami: (_args, ctx) => ({ lines: [ctx.name, ctx.role, ctx.bio] }),
  projects: (_args, { projects }) => ({
    lines: projects.length
      ? projects.map((p) => `${p.slug} — ${p.title} (${p.status})`)
      : ["No projects to show yet. Check back soon."],
  }),
  open: (slug, { projects, hiddenSlugs }) => {
    if (!slug) return { lines: ["Usage: open <slug>"] };
    const project = hiddenSlugs?.has(slug) ? undefined : projects.find((p) => p.slug === slug);
    if (!project) {
      return { lines: [`No project called "${slug}". Try \`projects\` to see what's here.`] };
    }
    const url = project.demoUrl ?? project.repoUrl;
    if (!url) return { lines: [`${project.title} has no public link yet.`] };
    return { lines: [`Opening ${project.title}…`], action: { type: "open-url", url } };
  },
  theme: () => ({ lines: ["Toggling theme."], action: { type: "toggle-theme" } }),
  ask: () => ({ lines: ["The AI chat is coming soon. For now, try `projects` or `contact`."] }),
  exit: () => ({ lines: [], action: { type: "close" } }),
  clear: () => ({ lines: [], action: { type: "clear" } }),
  contact: (_args, { contact }) => ({
    lines: [`Email:    ${contact.email}`, `GitHub:   ${contact.github}`, `LinkedIn: ${contact.linkedin}`],
  }),
};

export function run(input: string, ctx: TerminalContext): TerminalResult {
  const [name = "", ...rest] = input.trim().toLowerCase().split(/\s+/);
  if (!name) return { lines: [] };
  if (!Object.hasOwn(commands, name)) {
    return { lines: [`Unknown command: ${name}. Type \`help\` to see what's available.`] };
  }
  return commands[name](rest.join(" "), ctx);
}
