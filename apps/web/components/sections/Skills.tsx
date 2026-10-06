import { skills } from "@/lib/data/skills";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/SectionHeader";

const GROUP_COMMAND: Record<string, string> = {
  ai: "[ai]",
  fullstack: "[fullstack]",
  infra: "[infra]",
};

export function Skills() {
  return (
    <section id="skills" className="reveal-section">
      <SectionHeader command="skills --group ai,fullstack,infra" />

      <div className="space-y-5">
        {skills.map((cat) => (
          <div key={cat.group} className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-start">
            <span className="font-mono text-xs text-text-dim pt-0.5 whitespace-nowrap">
              {GROUP_COMMAND[cat.group]}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((skill) => (
                <Badge key={skill} variant="tech">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
