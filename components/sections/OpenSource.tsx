{/*import { projects } from "@/lib/data/projects";
import { profile } from "@/lib/data/profile";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/SectionHeader";

export function OpenSource() {
  const nonPinned = projects.filter((p) => !p.pinned);

  return (
    <section id="open-source" className="reveal-section">
      <SectionHeader command="open-source" />

      <div className="space-y-3">
        {nonPinned.map((project) => (
          <div key={project.name} className="border-l-2 border-border pl-4 py-1">
            <div className="flex items-center gap-2 mb-1">
              {project.url ? (
                <a
                  href={project.url}
                  className="font-mono text-xs text-text-secondary hover:text-accent transition-colors duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.name} ↗
                </a>
              ) : (
                <span className="font-mono text-xs text-text-secondary">{project.name}</span>
              )}
              <Badge variant={project.type === "ai" ? "type-ai" : "type-fullstack"}>
                [{project.type}]
              </Badge>
            </div>
            <p className="font-mono text-xs text-text-dim leading-relaxed">{project.description}</p>
          </div>
        ))}

        //github link change to bracketed later on 
        <div className={nonPinned.length > 0 ? "pt-2" : ""}>
          <a
            href={profile.links.github}
            className="font-mono text-xs text-text-dim hover:text-accent transition-colors duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            → more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
*/}