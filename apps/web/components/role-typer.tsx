"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const WORDS = ["AI engineer", "builder", "hackathon goblin"];
const TYPE_MS = 60;
const HOLD_MS = 1400;
const GAP_MS = 300;
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

// The server and the first client render are static (reduced = true); animation starts after hydration.
function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => matchMedia(QUERY).matches,
    () => true,
  );
}

type Step = { word: number; length: number; deleting: boolean };

// The real role stays in the DOM as sr-only text; the animated line is aria-hidden so
// screen readers never announce keystrokes.
export function RoleTyper({ role }: { role: string }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState<Step>({ word: 0, length: WORDS[0].length, deleting: false });

  useEffect(() => {
    if (reduced) return;
    const full = WORDS[step.word].length;
    let delay = TYPE_MS;
    let next: Step;
    if (!step.deleting && step.length === full) {
      delay = HOLD_MS;
      next = { ...step, deleting: true };
    } else if (step.deleting && step.length === 0) {
      delay = GAP_MS;
      next = { word: (step.word + 1) % WORDS.length, length: 0, deleting: false };
    } else {
      next = { ...step, length: step.length + (step.deleting ? -1 : 1) };
    }
    const timer = setTimeout(() => setStep(next), delay);
    return () => clearTimeout(timer);
  }, [reduced, step]);

  return (
    <p className="mt-3 text-body text-ink-muted">
      <span className="sr-only">{role}</span>
      <span aria-hidden="true">
        {reduced ? WORDS[0] : WORDS[step.word].slice(0, step.length)}
        {reduced ? null : "|"}
      </span>
    </p>
  );
}
