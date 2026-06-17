"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  // Avoid hydration mismatch: read DOM state only after mount
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch (_) {}
  }

  // Render a neutral placeholder before mount to avoid mismatch
  if (!mounted) {
    return (
      <button
        aria-label="Toggle color theme"
        aria-pressed={false}
        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm text-text-dim focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        style={{ visibility: "hidden" }}
      />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      aria-pressed={isDark}
      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm text-text-dim hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
    >
      {isDark ? (
        /* Sun icon — shown in dark mode to switch to light */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
        </svg>
      ) : (
        /* Moon icon — shown in light mode to switch to dark */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
