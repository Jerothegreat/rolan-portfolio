import { profile } from "@/lib/data/profile";
import { skills } from "@/lib/data/skills";

/**
 * systemctl-style profile status block, inspired by charles.dev.
 * Renders profile data as a "service" status output.
 */
export function ProfileStatus() {
  const taskSummary = skills.map((s) => s.label).join(", ");

  return (
    <div className="terminal-block">
      {/* Command line */}
      <div className="font-mono text-sm text-text-dim mb-1">
        <span className="text-text-secondary">$</span> systemctl status rolan.service
      </div>

      {/* Divider */}
      <div className="h-px bg-accent/30 mb-5" />

      {/* Status body */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        {/* Avatar */}
        <div className="relative shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatar}
            alt={profile.name}
            width={120}
            height={120}
            className="rounded-xl object-cover border border-border"
            style={{ width: 120, height: 120 }}
          />
          {/* Online dot */}
          {profile.availability === "open" && (
            <span
              className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-status-open border-2 border-bg"
              aria-label="Available for work"
            />
          )}
        </div>

        {/* Service details */}
        <div className="font-mono text-sm leading-[1.85] min-w-0 space-y-0">
          {/* Name line */}
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-status-open mr-2 align-middle" />
            <span className="text-text font-semibold">{profile.name}</span>
            <span className="text-text-dim"> — rolan.service</span>
          </div>

          {/* Loaded */}
          <div className="text-text-dim">
            Loaded:<span className="text-text-secondary">(portfolio/rolan.service; </span>
            <span className="text-status-open">enabled</span>
            <span className="text-text-secondary">)</span>
          </div>

          {/* Active */}
          <div className="text-text-dim">
            Active: <span className="text-status-open">active (running)</span>
            <span className="text-text-secondary">; Anticipated Graduation: {profile.education.expected}</span>
          </div>

          {/* Notify */}
          <div className="text-text-dim">
            Notify:{" "}
            <a
              href={`mailto:${profile.links.email}`}
              className="text-accent hover:underline"
            >
              mailto:{profile.links.email}
            </a>
          </div>

          {/* Process */}
          <div className="text-text-dim">
            Process:{" "}
            <span className="text-text-secondary">{profile.title}</span>
          </div>

          {/* Tasks */}
          <div className="text-text-dim">
            Tasks:{" "}
            <span className="text-text-secondary">{taskSummary}</span>
          </div>

          {/* Memory */}
          <div className="text-text-dim">
            Memory:{" "}
            <span className="text-text-secondary">2+ years of experience</span>
          </div>

          {/* CPU */}
          <div className="text-text-dim">
            CPU:{" "}
            <span className="text-text-secondary">∞ (Always learning)</span>
          </div>

          {/* Links */}
          <div className="text-text-dim flex flex-wrap items-center gap-x-1">
            Links:{"  "}
            {profile.links.github && (
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                GitHub
              </a>
            )}
            {profile.links.linkedin && (
              <>
                <span className="text-text-dim">·</span>
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  LinkedIn
                </a>
              </>
            )}
            {profile.links.email && (
              <>
                <span className="text-text-dim">·</span>
                <a
                  href={`mailto:${profile.links.email}`}
                  className="text-accent hover:underline"
                >
                  Email
                </a>
              </>
            )}
            {profile.resume && (
              <>
                <span className="text-text-dim">·</span>
                <a
                  href={profile.resume}
                  download
                  className="text-accent hover:underline"
                >
                  Resume ↓
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
