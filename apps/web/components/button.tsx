import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center font-sans font-medium motion-safe:transition-[transform,box-shadow] motion-safe:duration-120 motion-safe:ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1";

const boxed =
  "rounded-button border-2 border-ink px-6 py-3 shadow-rest hover:shadow-hover active:shadow-pressed";

const variants: Record<Variant, string> = {
  primary: `${boxed} border-[3px] bg-gold text-on-accent`,
  secondary: `${boxed} bg-surface text-ink`,
  ghost: "px-2 py-1 underline underline-offset-4 decoration-2 hover:decoration-coral",
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
