import type { CSSProperties, ReactNode } from "react";

export type WindowColor = "gold" | "lilac" | "mint" | "coral" | "sky" | "pink" | "surface";

// Literal class names so Tailwind sees them. Text on any accent is on-accent ink.
const barColor: Record<WindowColor, string> = {
  gold: "bg-gold text-on-accent",
  lilac: "bg-lilac text-on-accent",
  mint: "bg-mint text-on-accent",
  coral: "bg-coral text-on-accent",
  sky: "bg-sky text-on-accent",
  pink: "bg-pink text-on-accent",
  surface: "bg-surface text-ink",
};

type WindowProps = {
  /** Filename-style title, e.g. "about.txt". Decorative: real headings live in the content. */
  title: string;
  icon?: ReactNode;
  color?: WindowColor;
  /** Degrees, within ±2 (design brief). Straightens on hover and focus. */
  tilt?: number;
  /** Replaces the decorative _ □ × controls, for windows with real controls. */
  controls?: ReactNode;
  /** Optional menu row under the title bar. */
  menu?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
};

export function Window({
  title,
  icon,
  color = "surface",
  tilt = 0,
  controls,
  menu,
  className = "",
  bodyClassName = "p-6",
  children,
}: WindowProps) {
  return (
    <div
      className={`tilt relative border-[3px] border-ink bg-surface text-ink shadow-window ${className}`}
      style={{ "--tilt": `${tilt}deg` } as CSSProperties}
    >
      <div className={`flex items-center gap-2 border-b-[3px] border-ink px-2 py-1 font-pixel text-[13px] ${barColor[color]}`}>
        <span aria-hidden="true" className="flex min-w-0 items-center gap-2">
          {icon}
          <span className="truncate">{title}</span>
        </span>
        <span aria-hidden="true" className="title-stripes h-2.5 min-w-3 flex-1" />
        {controls ?? (
          <span aria-hidden="true" className="flex gap-1">
            {["_", "□", "×"].map((c) => (
              <span key={c} className="grid size-4 place-items-center border-2 border-current bg-surface font-mono text-[10px] leading-none text-ink">
                {c}
              </span>
            ))}
          </span>
        )}
      </div>
      {menu ? <div className="flex flex-wrap gap-x-4 border-b-[3px] border-ink px-3 py-1 text-mono">{menu}</div> : null}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
