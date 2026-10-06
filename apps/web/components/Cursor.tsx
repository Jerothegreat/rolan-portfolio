"use client";

interface CursorProps {
  /** When true, the cursor stays solid (e.g. while typing is in progress) */
  steady?: boolean;
  className?: string;
}

export function Cursor({ steady = false, className = "" }: CursorProps) {
  return (
    <>
      <style>{`
        @keyframes cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cursor-blink { animation: none !important; opacity: 1; }
        }
      `}</style>
      <span
        aria-hidden="true"
        className={`cursor-blink inline-block w-[0.55em] h-[1.1em] align-text-bottom bg-accent ${className}`}
        style={
          steady
            ? { animation: "none", opacity: 1 }
            : { animation: "cursor-blink 1s step-end infinite" }
        }
      />
    </>
  );
}
