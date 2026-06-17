import { profile } from "@/lib/data/profile";
import { SectionHeader } from "@/components/SectionHeader";
import { Cursor } from "@/components/Cursor";

export function Contact() {
  const links = [
    { label: "github", href: profile.links.github, display: profile.links.github },
    { label: "linkedin", href: profile.links.linkedin, display: profile.links.linkedin },
    {
      label: "email",
      href: `mailto:${profile.links.email}`,
      display: profile.links.email,
    },
  ];

  return (
    <section id="contact" className="reveal-section">
      <SectionHeader command="contact" />

      <div className="border border-border bg-surface px-4 py-4 font-mono text-xs space-y-2 max-w-prose">
        <p className="text-text-dim mb-3"># get in touch</p>
        {links.map(({ label, href, display }) => (
          <div key={label} className="flex gap-2">
            <span className="text-text-dim w-12 shrink-0">{label}:</span>
            <a
              href={href}
              className="text-text-secondary hover:text-accent transition-colors duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm break-all"
              target={label !== "email" ? "_blank" : undefined}
              rel={label !== "email" ? "noopener noreferrer" : undefined}
            >
              {display}
            </a>
          </div>
        ))}
        <div className="flex items-center gap-1 pt-2 text-text-dim">
          <span>$</span>
          <Cursor />
        </div>
      </div>
    </section>
  );
}
