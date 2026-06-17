import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "rank" | "tech" | "type-ai" | "type-fullstack";
  className?: string;
}

export function Badge({ children, variant = "tech", className = "" }: BadgeProps) {
  const base =
    "inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono leading-none";

  const variants: Record<string, string> = {
    rank: [
      "text-accent border border-accent/40 bg-accent-soft",
      // amber glow — done via inline style below
    ].join(" "),
    tech: "text-text-dim border border-border bg-transparent",
    "type-ai": "text-accent border border-accent/30 bg-accent-soft",
    "type-fullstack": "text-text-dim border border-border bg-transparent",
  };

  const isRank = variant === "rank";

  return (
    <span
      className={`${base} ${variants[variant]} ${className}`}
      style={
        isRank
          ? {
              boxShadow: "0 0 8px var(--accent-glow)",
              textShadow: "0 0 6px var(--accent-glow)",
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
