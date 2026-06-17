import { awards, hackathons } from "@/lib/data/competitions";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/SectionHeader";

const RANK_LABEL: Record<string, string> = {
  "1st": "◆ 1st · CHAMPION",
  finalist: "◇ FINALIST",
  representative: "○ REPRESENTATIVE",
  participant: "▹ PARTICIPANT",
};

// Sort awards: wins first, then by year descending
const sortedAwards = [...awards].sort((a, b) => {
  const order: Record<string, number> = { "1st": 0, finalist: 1, representative: 2, participant: 3 };
  const rankDiff = (order[a.rank] ?? 9) - (order[b.rank] ?? 9);
  if (rankDiff !== 0) return rankDiff;
  return b.year - a.year;
});

export function Competitions() {
  return (
    <section id="competitions" className="reveal-section">
      <SectionHeader command="competitions --awards" />

      {/* Awards */}
      <div className="space-y-3 mb-8">
        {sortedAwards.map((a) => {
          const isWin = a.rank === "1st";
          return (
            <div
              key={a.name}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 border-b border-border last:border-0"
              style={
                isWin
                  ? { borderLeftColor: "var(--accent-glow)" }
                  : undefined
              }
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <Badge variant={isWin ? "rank" : "tech"}>
                    {RANK_LABEL[a.rank]}
                  </Badge>
                  <span
                    className={`font-mono text-xs ${isWin ? "text-text" : "text-text-secondary"}`}
                    style={
                      isWin
                        ? { textShadow: "0 0 12px var(--accent-glow)" }
                        : undefined
                    }
                  >
                    {a.name}
                  </span>
                </div>
                <span className="font-mono text-xs text-text-dim pl-0 sm:pl-1">
                  {a.placement}
                </span>
                {a.note && (
                  <span className="font-mono text-xs text-text-dim leading-relaxed pl-0 sm:pl-1">
                    {a.note}
                  </span>
                )}
              </div>
              <span className="font-mono text-xs text-text-dim shrink-0">{a.year}</span>
            </div>
          );
        })}
      </div>

      {/* Hackathons sub-group */}
      <p className="font-mono text-xs text-text-dim mb-4">// hackathons</p>

      <div className="space-y-3">
        {hackathons.map((h) => (
          <Card key={`${h.event}-${h.year}`} className="group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
              <span className="font-mono text-sm text-text">{h.event}</span>
              <span className="font-mono text-xs text-text-dim shrink-0">{h.year}</span>
            </div>

            <p className="font-mono text-xs text-accent mb-2">{h.product}</p>

            <p className="font-mono text-xs text-text-secondary leading-relaxed mb-3">
              {h.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {h.stack.map((tech) => (
                <Badge key={tech} variant="tech">{tech}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
