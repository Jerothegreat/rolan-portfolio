"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Fades and rises content once when it first scrolls into view. Content is visible by default
// (no JS, SSR, reduced motion); the hidden state is applied from the DOM only after hydration,
// and only to content that is still below the fold.
export function Reveal({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < innerHeight) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.remove("reveal-hidden");
        observer.disconnect();
      },
      { threshold: 0.1 },
    );
    el.classList.add("reveal-ready", "reveal-hidden");
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.classList.remove("reveal-ready", "reveal-hidden");
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
