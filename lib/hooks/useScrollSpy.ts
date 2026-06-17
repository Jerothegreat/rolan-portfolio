"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently in the viewport using
 * IntersectionObserver. Returns the id of the active section.
 *
 * @param ids   Ordered list of section element ids to observe.
 * @param options  Optional IntersectionObserver init options.
 */
export function useScrollSpy(
  ids: string[],
  options: IntersectionObserverInit = { rootMargin: "0px 0px -60% 0px", threshold: 0 }
): string {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    }, options);

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  return activeId;
}
