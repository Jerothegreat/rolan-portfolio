import { projects } from "@/lib/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/SectionHeader";

export function Projects() {
  const pinned = projects.filter((p) => p.pinned);

  return (
    <section id="projects" className="reveal-section">
      <SectionHeader command="projects --pinned" />

      <div className="space-y-3">
        {pinned.map((project) => (
          <Card key={project.name} className="group">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                {project.url ? (
                  <a
                    href={project.url}
                    className="font-mono text-sm text-text hover:text-accent transition-colors duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.name}
                  </a>
                ) : (
                  <span className="font-mono text-sm text-text">{project.name}</span>
                )}
                <Badge variant={project.type === "ai" ? "type-ai" : "type-fullstack"}>
                  [{project.type}]
                </Badge>
              </div>
              {project.url && (
                <span className="font-mono text-xs text-text-dim" aria-hidden="true">↗</span>
              )}
            </div>

            <p className="font-mono text-xs text-text-secondary leading-relaxed mb-3">
              {project.description}
            </p>

            {project.impact && (
              <p className="font-mono text-xs text-accent/80 mb-3">
                ✓ {project.impact}
              </p>
            )}

            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="tech">{tech}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
