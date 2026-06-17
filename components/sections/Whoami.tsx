import { profile } from "@/lib/data/profile";
import { SectionHeader } from "@/components/SectionHeader";
import { Avatar } from "@/components/ui/Avatar";

export function Whoami() {
  const { links, education } = profile;

  return (
    <section id="whoami" className="reveal-section">
      <SectionHeader command="whoami" />

      {/* Responsive row: avatar left, content right. Stacks on mobile. */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-5 max-w-prose">
        {/* Avatar */}
        <Avatar
          src={profile.avatar}
          name={profile.name}
          online={profile.availability === "open"}
        />

        {/* Right-hand content */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Name + role + edu */}
          <div className="space-y-1">
            <div className="font-mono text-sm text-text-secondary leading-relaxed">
              <span className="text-text-dim">name: </span>
              <span className="text-text">{profile.name}</span>
            </div>
            <div className="font-mono text-sm text-text-secondary leading-relaxed">
              <span className="text-text-dim">role: </span>
              <span className="text-text-secondary">{profile.title}</span>
            </div>
            <div className="font-mono text-xs text-text-dim leading-relaxed">
              <span className="text-text-dim">edu: </span>
              <span>BS Computer Science (App Dev) · {education.school} · expected {education.expected}</span>
            </div>
          </div>

          {/* Serif bio */}
          <p className="font-serif text-base text-text leading-relaxed pt-2 border-t border-border">
            {profile.bio}
          </p>

          {/* Quick-action row: social links + resume */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-secondary hover:text-accent transition-colors duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
              >
                github ↗
              </a>
            )}
            {links.linkedin && (
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-secondary hover:text-accent transition-colors duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
              >
                linkedin ↗
              </a>
            )}
            {links.email && (
              <a
                href={`mailto:${links.email}`}
                className="font-mono text-xs text-text-secondary hover:text-accent transition-colors duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
              >
                email
              </a>
            )}

            {/* Resume — primary action */}
            {profile.resume && (
              <a
                href={profile.resume}
                download
                className="font-mono text-xs px-3 py-1.5 min-h-[44px] sm:min-h-0 flex items-center bg-accent text-bg rounded-sm hover:opacity-90 transition-opacity duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                resume ↓
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
