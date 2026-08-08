import { profile } from "@/lib/data/profile";
import { SectionHeader } from "@/components/SectionHeader";
import { Cursor } from "@/components/Cursor";

export function Contact() {
  const links = [
    { label: "github:", href: profile.links.github, display: profile.links.github },
    { label: "linkedin:", href: profile.links.linkedin, display: profile.links.linkedin },
    {
      label: "email:",
      href: `mailto:${profile.links.email}`,
      display: profile.links.email,
    },
  ];

  return (
    <section id="contact" className="reveal-section">
      <SectionHeader command="contact" />

      <div className="w-full rounded-lg border border-border bg-surface p-5 sm:p-6 font-mono text-xs space-y-3">
        <p className="text-text-dim mb-3"># get in touch</p>
        <div className="space-y-2.5">
          {links.map(({ label, href, display }) => (
            <div key={label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <span className="text-text-dim w-24 shrink-0 font-medium">{label}</span>
              <a
                href={href}
                className="text-text-secondary hover:text-accent transition-colors duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm break-all sm:break-normal"
                target={label !== "email:" ? "_blank" : undefined}
                rel={label !== "email:" ? "noopener noreferrer" : undefined}
              >
                {display}
              </a>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 pt-3 border-t border-border/60 text-text-dim">
          <span className="text-status-open font-semibold">$</span>
          <Cursor />
        </div>
      </div>
    </section>
  );
}
