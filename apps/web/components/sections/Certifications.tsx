import { certifications } from "@/lib/data/certifications";
import { SectionHeader } from "@/components/SectionHeader";

export function Certifications() {
  return (
    <section id="certifications" className="reveal-section">
      <SectionHeader command="certifications" />

      <div className="space-y-2">
        {certifications.map((cert, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2 border-b border-border last:border-0"
          >
            <div>
              <span className="font-mono text-xs text-text-secondary">{cert.name}</span>
              <span className="font-mono text-xs text-text-dim"> · {cert.issuer}</span>
            </div>
            <span className="font-mono text-xs text-text-dim">{cert.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
