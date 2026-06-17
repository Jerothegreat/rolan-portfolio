import { experience } from "@/lib/data/experience";
import { profile } from "@/lib/data/profile";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/SectionHeader";

export function Experience() {
  const { education } = profile;

  return (
    <section id="experience" className="reveal-section">
      <SectionHeader command="experience" />

      <div className="space-y-3">
        {experience.map((exp, i) => (
          <Card key={i}>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
              <div>
                <span className="font-mono text-sm text-text">{exp.role}</span>
                <span className="font-mono text-sm text-text-dim"> @ </span>
                <span className="font-mono text-sm text-text-secondary">{exp.company}</span>
              </div>
              <span className="font-mono text-xs text-text-dim whitespace-nowrap">{exp.dates}</span>
            </div>
            <ul className="space-y-1.5">
              {exp.bullets.map((bullet, bi) => (
                <li key={bi} className="flex gap-2">
                  <span className="font-mono text-xs text-text-dim mt-0.5 shrink-0">—</span>
                  <span className="font-mono text-xs text-text-secondary leading-relaxed">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        ))}

        {/* Education sub-section */}
        <div className="pt-2">
          <span className="font-mono text-xs text-text-dim block mb-2">// education</span>
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
              <div>
                <span className="font-mono text-sm text-text">{education.degree}</span>
              </div>
              <span className="font-mono text-xs text-text-dim whitespace-nowrap">expected {education.expected}</span>
            </div>
            <div className="font-mono text-xs text-text-secondary mb-3">
              {education.school} · {education.location}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {education.coursework.map((course) => (
                <Badge key={course} variant="tech">{course}</Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
