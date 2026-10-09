"use client";

import { useEffect, useState } from "react";

const SEEN = "1mil-visit-counted";

// The visit count: counted once per browser session, then only read.
function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    let counted = false;
    try {
      counted = sessionStorage.getItem(SEEN) === "1";
    } catch {
      // Storage blocked: read only, so reloads do not inflate the count.
      counted = true;
    }
    fetch("/api/visits", { method: counted ? "GET" : "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count: number | null } | null) => {
        if (data?.count == null) return;
        setCount(data.count);
        try {
          sessionStorage.setItem(SEEN, "1");
        } catch {}
      })
      .catch(() => {});
  }, []);
  return count;
}

// A looping marquee under the menu bar. It pauses on hover and focus, and under reduced motion
// it stops and scrolls by hand instead. The second copy only exists to make the loop seamless.
export function Ticker({ items }: { items: string[] }) {
  const count = useVisitorCount();
  // Until the counter answers (or while no store is configured) the slot shows dashes.
  const all = [...items, `you are visitor #${count === null ? "------" : String(count).padStart(6, "0")}`];
  const line = (hidden: boolean) => (
    <p aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-4 pr-4">
      {all.map((item) => (
        <span key={item} className="flex items-center gap-4 whitespace-nowrap">
          <span aria-hidden="true">✹</span>
          {item}
        </span>
      ))}
    </p>
  );
  return (
    <div className="ticker overflow-x-auto border-b-[3px] border-ink bg-gold py-1 font-pixel text-[12px] text-on-accent [scrollbar-width:none]">
      <div className="ticker-track flex w-max">
        {line(false)}
        {line(true)}
      </div>
    </div>
  );
}
