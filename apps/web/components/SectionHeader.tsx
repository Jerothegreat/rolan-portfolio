"use client";

import { useTypeOnView } from "@/lib/hooks/useTypeOnView";
import { Cursor } from "./Cursor";

interface SectionHeaderProps {
  command: string;
  /** Extra classes on the outer <div> */
  className?: string;
}

export function SectionHeader({ command, className = "" }: SectionHeaderProps) {
  const { ref, displayed } = useTypeOnView(command, 35);

  const isTyping = displayed.length < command.length;
  const isDone = displayed.length === command.length;

  return (
    <div
      className={`mb-6 flex items-center gap-0 font-mono text-sm text-text-dim ${className}`}
    >
      <span
        // Cast needed because useTypeOnView returns RefObject<HTMLElement | null>
        ref={ref as React.RefObject<HTMLSpanElement>}
        aria-label={command}
      >
        <span className="text-text-dim select-none">$ </span>
        <span className="text-text-secondary">{displayed}</span>
      </span>
      {/* Show cursor while typing or blinking after done */}
      {(isTyping || isDone) && <Cursor steady={isTyping} />}
    </div>
  );
}
