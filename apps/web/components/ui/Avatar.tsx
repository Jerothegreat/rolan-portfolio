"use client";

import { useState } from "react";

interface AvatarProps {
  src: string;
  name: string;
  /** Show the green online/available dot */
  online?: boolean;
  className?: string;
}

/** Derive initials from a full name — up to 3 capital letters. */
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 3)
    .join("");
}

/** Returns true if the src string looks like an unfilled token placeholder. */
function isToken(src: string): boolean {
  return src.startsWith("[") && src.endsWith("]");
}

export function Avatar({ src, name, online = false, className = "" }: AvatarProps) {
  const [imgFailed, setImgFailed] = useState(false);

  const showInitials = imgFailed || isToken(src);
  const initials = getInitials(name);

  return (
    <div
      className={[
        "avatar-root relative shrink-0",
        "size-20 sm:size-24",
        className,
      ].join(" ")}
    >
      {/* Square terminal-styled avatar */}
      <div
        className={[
          "w-full h-full rounded-lg border border-border",
          "ring-1 ring-border/50",
          "overflow-hidden",
          showInitials ? "bg-surface flex items-center justify-center" : "",
        ].join(" ")}
      >
        {showInitials ? (
          <span
            className="font-mono text-lg sm:text-xl font-semibold text-accent select-none"
            aria-label={name}
          >
            {initials}
          </span>
        ) : (
          // Plain <img> — no next/image, no new deps
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>

      {/* Online / available dot */}
      {online && (
        <span
          className="avatar-dot absolute bottom-0.5 right-0.5 block w-3 h-3 rounded-full bg-status-open border-2 border-bg"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
