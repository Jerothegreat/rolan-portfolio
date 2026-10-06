"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/button";

const confetti = [
  ["-48px", "-36px", "var(--lilac)"],
  ["-24px", "-52px", "var(--mint)"],
  ["0px", "-58px", "var(--coral)"],
  ["24px", "-52px", "var(--lilac)"],
  ["48px", "-36px", "var(--mint)"],
  ["-36px", "-18px", "var(--coral)"],
  ["36px", "-18px", "var(--coral)"],
  ["0px", "-34px", "var(--mint)"],
];

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [burst, setBurst] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      setUnavailable(true);
      return;
    }
    setCopied(true);
    setBurst(!matchMedia("(prefers-reduced-motion: reduce)").matches);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(false);
      setBurst(false);
    }, 2000);
  }

  return (
    <span className="relative inline-flex items-center gap-3">
      {unavailable ? (
        <Button href={`mailto:${email}`} variant="secondary">
          {email}
        </Button>
      ) : (
        <Button variant="secondary" onClick={copy} aria-label={`Copy email address ${email}`}>
          {email}
        </Button>
      )}
      <span aria-live="polite" className="font-mono text-mono">
        {copied ? "Copied!" : ""}
      </span>
      {burst ? (
        <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0">
          {confetti.map(([x, y, color], i) => (
            <span
              key={i}
              className="confetti-bit"
              style={{ "--dx": x, "--dy": y, background: color } as React.CSSProperties}
            />
          ))}
        </span>
      ) : null}
    </span>
  );
}
