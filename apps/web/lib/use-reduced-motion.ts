import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

// Imperative check for event handlers and effects.
export function prefersReducedMotion() {
  return matchMedia(QUERY).matches;
}

// The server and the first client render are static (reduced = true); motion starts after hydration.
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => matchMedia(QUERY).matches,
    () => true,
  );
}
