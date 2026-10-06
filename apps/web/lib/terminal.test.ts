import { describe, expect, it } from "vitest";
import { run, type TerminalContext } from "./terminal";

const ctx: TerminalContext = {
  name: "Ada Tester",
  role: "Test engineer",
  bio: "Builds small, well-tested things.",
  contact: {
    email: "ada@example.com",
    github: "https://github.com/ada",
    linkedin: "https://linkedin.com/in/ada",
  },
  projects: [
    { slug: "alpha", title: "Alpha", oneLiner: "First", status: "live", demoUrl: "https://alpha.example.com", repoUrl: "https://github.com/ada/alpha" },
    { slug: "beta", title: "Beta", oneLiner: "Second", status: "building", repoUrl: "https://github.com/ada/beta" },
    { slug: "gamma", title: "Gamma", oneLiner: "Third", status: "shipped" },
  ],
  hiddenSlugs: new Set(["secret"]),
};

describe("help", () => {
  it("lists every command", () => {
    const { lines, action } = run("help", ctx);
    const text = lines.join("\n");
    for (const name of ["help", "whoami", "projects", "open <slug>", "theme", "contact", "ask", "clear", "exit"]) {
      expect(text).toContain(name);
    }
    expect(action).toBeUndefined();
  });
});

describe("whoami", () => {
  it("prints name, role and bio", () => {
    expect(run("whoami", ctx).lines).toEqual([
      "Ada Tester",
      "Test engineer",
      "Builds small, well-tested things.",
    ]);
  });
});

describe("contact", () => {
  it("prints email, GitHub and LinkedIn", () => {
    expect(run("contact", ctx).lines).toEqual([
      "Email:    ada@example.com",
      "GitHub:   https://github.com/ada",
      "LinkedIn: https://linkedin.com/in/ada",
    ]);
  });
});

describe("projects", () => {
  it("lists listed projects as slug — title (status)", () => {
    expect(run("projects", ctx).lines).toEqual([
      "alpha — Alpha (live)",
      "beta — Beta (building)",
      "gamma — Gamma (shipped)",
    ]);
  });

  it("prints a friendly line when there are no projects", () => {
    expect(run("projects", { ...ctx, projects: [] }).lines).toEqual([
      "No projects to show yet. Check back soon.",
    ]);
  });
});

describe("open", () => {
  it("opens the demo when the project has one", () => {
    expect(run("open alpha", ctx)).toEqual({
      lines: ["Opening Alpha…"],
      action: { type: "open-url", url: "https://alpha.example.com" },
    });
  });

  it("prints usage when the slug is missing", () => {
    expect(run("open", ctx)).toEqual({ lines: ["Usage: open <slug>"] });
  });

  it("answers an unknown slug with a friendly not-found line", () => {
    expect(run("open nope", ctx)).toEqual({
      lines: ["No project called \"nope\". Try `projects` to see what's here."],
    });
  });

  it("answers a hidden slug exactly like an unknown one", () => {
    expect(run("open secret", ctx)).toEqual({
      lines: ["No project called \"secret\". Try `projects` to see what's here."],
    });
    const leaky = {
      ...ctx,
      projects: [...ctx.projects, { slug: "secret", title: "Secret", oneLiner: "x", status: "live", demoUrl: "https://s.example.com" }],
    };
    expect(run("open secret", leaky)).toEqual({
      lines: ["No project called \"secret\". Try `projects` to see what's here."],
    });
  });

  it("says there is no public link yet when the project has neither", () => {
    expect(run("open gamma", ctx)).toEqual({
      lines: ["Gamma has no public link yet."],
    });
  });

  it("falls back to the repo when there is no demo", () => {
    expect(run("open beta", ctx)).toEqual({
      lines: ["Opening Beta…"],
      action: { type: "open-url", url: "https://github.com/ada/beta" },
    });
  });
});

describe("actions", () => {
  it("theme toggles the theme", () => {
    expect(run("theme", ctx)).toEqual({ lines: ["Toggling theme."], action: { type: "toggle-theme" } });
  });

  it("ask replies that the AI chat is coming soon", () => {
    expect(run("ask what do you build?", ctx)).toEqual({
      lines: ["The AI chat is coming soon. For now, try `projects` or `contact`."],
    });
  });

  it("exit closes the terminal", () => {
    expect(run("exit", ctx)).toEqual({ lines: [], action: { type: "close" } });
  });

  it("clear clears the screen", () => {
    expect(run("clear", ctx)).toEqual({ lines: [], action: { type: "clear" } });
  });
});

describe("input handling", () => {
  it("ignores case and surrounding whitespace", () => {
    expect(run("  HELP  ", ctx)).toEqual(run("help", ctx));
    expect(run("Open  ALPHA", ctx)).toEqual(run("open alpha", ctx));
  });

  it("does nothing for empty or whitespace input", () => {
    expect(run("", ctx)).toEqual({ lines: [] });
    expect(run("   \t ", ctx)).toEqual({ lines: [] });
  });

  it("suggests help for an unknown command", () => {
    expect(run("sudo rm -rf", ctx)).toEqual({
      lines: ["Unknown command: sudo. Type `help` to see what's available."],
    });
  });

  it("does not treat object prototype names as commands", () => {
    expect(run("constructor", ctx).lines).toEqual([
      "Unknown command: constructor. Type `help` to see what's available.",
    ]);
  });
});
