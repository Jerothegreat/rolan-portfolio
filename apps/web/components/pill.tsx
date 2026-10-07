import type { ReactNode } from "react";

type PillProps = { children: ReactNode; className?: string } & (
  | { variant: "tag" }
  | { variant: "placement" }
  | { variant: "neutral" }
  | { variant: "status"; status: "live" | "building" | "archived" }
);

function tone(props: PillProps) {
  if (props.variant === "tag") return "bg-lilac text-on-accent";
  if (props.variant === "placement") return "bg-gold text-on-accent";
  if (props.variant === "neutral") return "bg-surface text-ink";
  return props.status === "live" ? "bg-mint text-on-accent" : "bg-surface text-ink";
}

export function Pill(props: PillProps) {
  return (
    <span
      className={`inline-block rounded-pill border-2 border-ink px-3 py-1 font-mono text-mono font-bold ${tone(props)} ${props.className ?? ""}`}
    >
      {props.children}
    </span>
  );
}
