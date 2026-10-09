import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ai" | "ghost" | "chip" | "chip-ai";

const base =
  "inline-flex items-center justify-center motion-safe:transition-[transform,box-shadow] motion-safe:duration-120 motion-safe:ease-out motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-x-1 motion-safe:active:translate-y-1";

const boxed =
  "rounded-button border-ink px-6 py-3 font-sans font-medium shadow-rest hover:shadow-hover active:shadow-pressed";

const variants: Record<Variant, string> = {
  primary: `${boxed} border-[3px] bg-gold text-on-accent`,
  secondary: `${boxed} border-2 bg-surface text-ink`,
  // Lilac marks anything AI.
  ai: `${boxed} border-[3px] bg-lilac text-on-accent`,
  ghost: "px-2 py-1 font-sans font-medium underline underline-offset-4 decoration-2 hover:decoration-coral",
  // Compact menu-bar controls in the pixel face.
  chip: "border-2 border-ink bg-surface px-2 py-0.5 font-pixel text-[12px] text-ink shadow-[2px_2px_0_var(--ink)] hover:shadow-[3px_3px_0_var(--ink)] active:shadow-pressed",
  "chip-ai": "border-2 border-ink bg-lilac px-2 py-0.5 font-pixel text-[12px] text-on-accent shadow-[2px_2px_0_var(--ink)] hover:shadow-[3px_3px_0_var(--ink)] active:shadow-pressed",
};

type ButtonProps = { variant?: Variant } & (
  | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
);

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (props.href !== undefined) {
    return <a {...props} className={classes} />;
  }
  return <button type="button" {...props} className={classes} />;
}
