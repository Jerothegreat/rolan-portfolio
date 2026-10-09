import type { CSSProperties, ReactNode } from "react";

const tone = {
  gold: "bg-gold",
  coral: "bg-coral",
  mint: "bg-mint",
} as const;

// A rotated rubber stamp (WON, LIVE, TOP 10) that sits on a window edge. Position it with className.
export function Stamp({
  children,
  color = "gold",
  tilt = 8,
  className = "",
}: {
  children: ReactNode;
  color?: keyof typeof tone;
  tilt?: number;
  className?: string;
}) {
  return (
    <span
      className={`absolute z-10 rotate-(--stamp-tilt) border-[3px] border-ink px-2.5 py-0.5 font-pixel text-[14px] font-bold uppercase tracking-wider text-on-accent shadow-[3px_3px_0_var(--ink)] ${tone[color]} ${className}`}
      style={{ "--stamp-tilt": `${tilt}deg` } as CSSProperties}
    >
      {children}
    </span>
  );
}
