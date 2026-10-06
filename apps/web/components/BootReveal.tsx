"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const BOOT_LINES = [
  "> booting rolan.portfolio",
  "> loading modules: [ai] [fullstack] [infra]",
  "> ready_",
];

const CHAR_SPEED = 28; // ms per char
const LINE_PAUSE = 180; // ms between lines
const REVEAL_DELAY = 400; // ms after last line before showing content

interface BootRevealProps {
  children: React.ReactNode;
}

export function BootReveal({ children }: BootRevealProps) {
  const reducedMotion = useReducedMotion();

  // If reduced motion, skip boot entirely
  const [phase, setPhase] = useState<"boot" | "reveal" | "done">(
    reducedMotion ? "done" : "boot"
  );
  const [bootLines, setBootLines] = useState<string[]>([""]);
  const resolvedRef = useRef(false);

  useEffect(() => {
    // reducedMotion is initially false on SSR; re-check after mount
    if (reducedMotion) {
      setPhase("done");
      return;
    }
    if (resolvedRef.current) return;
    resolvedRef.current = true;

    let cancelled = false;

    async function runBoot() {
      for (let li = 0; li < BOOT_LINES.length; li++) {
        const line = BOOT_LINES[li];
        // Type each character
        for (let ci = 1; ci <= line.length; ci++) {
          if (cancelled) return;
          await delay(CHAR_SPEED);
          setBootLines((prev) => {
            const next = [...prev];
            next[li] = line.slice(0, ci);
            return next;
          });
        }
        // Pause between lines
        if (li < BOOT_LINES.length - 1) {
          await delay(LINE_PAUSE);
          if (cancelled) return;
          setBootLines((prev) => [...prev, ""]);
        }
      }

      await delay(REVEAL_DELAY);
      if (cancelled) return;
      setPhase("reveal");

      // After stagger completes, mark done
      await delay(600);
      if (cancelled) return;
      setPhase("done");
    }

    runBoot();
    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  if (phase === "done") {
    return <>{children}</>;
  }

  if (phase === "reveal") {
    return (
      <>
        <style>{`
          @keyframes fade-up {
            from { opacity: 0; transform: translateY(6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .reveal-section {
            animation: fade-up 0.4s ease both;
          }
          .reveal-section:nth-child(1) { animation-delay: 0ms; }
          .reveal-section:nth-child(2) { animation-delay: 60ms; }
          .reveal-section:nth-child(3) { animation-delay: 120ms; }
          .reveal-section:nth-child(4) { animation-delay: 180ms; }
          .reveal-section:nth-child(5) { animation-delay: 240ms; }
          .reveal-section:nth-child(6) { animation-delay: 300ms; }
          .reveal-section:nth-child(7) { animation-delay: 360ms; }
          .reveal-section:nth-child(8) { animation-delay: 420ms; }
          .reveal-section:nth-child(9) { animation-delay: 480ms; }
        `}</style>
        {children}
      </>
    );
  }

  // Boot phase — overlay covers the terminal window body (below the title bar)
  return (
    <div className="relative min-h-[70vh]">
      <div
        className="absolute inset-0 z-50 flex items-start justify-start bg-bg p-8 sm:p-16"
        aria-live="polite"
        aria-label="Loading portfolio"
      >
        <div className="font-mono text-sm leading-relaxed">
          {bootLines.map((line, i) => (
            <div key={i} className="text-text-secondary">
              {line}
              {i === bootLines.length - 1 && (
                <span
                  className="inline-block w-[0.5em] h-[1em] align-text-bottom bg-accent ml-0.5"
                  style={{ animation: "none" }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
        {/* Content is in DOM (hidden visually) for SEO / no-JS fallback */}
        <div className="sr-only" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
