import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`border border-border bg-surface px-4 py-4 ${className}`}
    >
      {children}
    </div>
  );
}
