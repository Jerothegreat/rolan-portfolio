"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/button";

const KEY = "theme";
const QUERY = "(prefers-color-scheme: dark)";

function saved(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

// Mirrors the pre-paint script in layout.tsx.
function applyTheme() {
  const choice = saved();
  const dark = choice === "dark" || (choice !== "light" && matchMedia(QUERY).matches);
  document.documentElement.classList.toggle("dark", dark);
}

function subscribe(onChange: () => void) {
  const media = matchMedia(QUERY);
  const onSystem = () => {
    if (saved() === null) applyTheme();
  };
  media.addEventListener("change", onSystem);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => {
    media.removeEventListener("change", onSystem);
    observer.disconnect();
  };
}

const isDark = () => document.documentElement.classList.contains("dark");

// Shared with the terminal's `theme` command.
export function toggleTheme() {
  const dark = isDark();
  try {
    localStorage.setItem(KEY, dark ? "light" : "dark");
  } catch {
    // Storage unavailable: the choice still applies for this page view.
    document.documentElement.classList.toggle("dark", !dark);
    return;
  }
  applyTheme();
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  return (
    <Button
      variant="secondary"
      className={className}
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {dark ? "Light" : "Dark"}
    </Button>
  );
}
