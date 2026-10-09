"use client";

import { useEffect } from "react";

// Home is one long page, so the tab title follows the section being read: "1mil | Projects".
// Above the first section (the hero) it reads "1mil | Home".
const SECTIONS = [
  // The tech stack sits beside experience on wide screens, so both read "Experience".
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "road", label: "Road" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export function SectionTitle() {
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      // The current section is the last one whose top has passed 40% of the viewport.
      // At the very bottom the last section wins, since it may never reach that line.
      const line = innerHeight * 0.4;
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      const current = atBottom
        ? SECTIONS.at(-1)
        : SECTIONS.filter((s) => {
            const el = document.getElementById(s.id);
            return el && el.getBoundingClientRect().top <= line;
          }).at(-1);
      const title = `1mil | ${current?.label ?? "Home"}`;
      if (document.title !== title) document.title = title;
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
