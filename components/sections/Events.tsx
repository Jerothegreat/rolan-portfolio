import { events } from "@/lib/data/events";
import { SectionHeader } from "@/components/SectionHeader";

export function Events() {
  return (
    <section id="events" className="reveal-section">
      <SectionHeader command="events" />

      <div className="space-y-2">
        {events.map((evt, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2 border-b border-border last:border-0"
          >
            <div>
              <span className="font-mono text-xs text-text-secondary">{evt.name}</span>
              <span className="font-mono text-xs text-text-dim"> · {evt.role}</span>
            </div>
            <span className="font-mono text-xs text-text-dim">{evt.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
