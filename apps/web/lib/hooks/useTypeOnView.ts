"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Types out a string character-by-character once the target element
 * enters the viewport. Respects prefers-reduced-motion: returns the
 * full string immediately when reduced motion is active.
 *
 * @param text       The full string to type.
 * @param speed      Ms between each character (default 40).
 * @returns          { ref, displayed } — attach ref to the element to observe.
 */
export function useTypeOnView(
  text: string,
  speed = 40
): { ref: React.RefObject<HTMLElement | null>; displayed: string } {
  const ref = useRef<HTMLElement | null>(null);
  const [displayed, setDisplayed] = useState("");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text);
      return;
    }

    let started = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          observer.disconnect();

          let i = 0;
          const tick = () => {
            i += 1;
            setDisplayed(text.slice(0, i));
            if (i < text.length) {
              timeoutId = setTimeout(tick, speed);
            }
          };
          tick();
        }
      },
      { threshold: 0.1 }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [text, speed, reducedMotion]);

  return { ref, displayed };
}
