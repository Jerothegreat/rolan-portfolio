import type { ComponentPropsWithoutRef } from "react";

export function Card({ className = "", ...props }: ComponentPropsWithoutRef<"article">) {
  return (
    <article
      {...props}
      className={`rounded-card border-2 border-ink bg-surface text-ink shadow-rest ${className}`}
    />
  );
}
