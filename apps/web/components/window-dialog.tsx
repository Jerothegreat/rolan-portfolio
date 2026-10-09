"use client";

import { useRef, type ReactNode } from "react";
import type { WindowColor } from "@/components/window";
import { prefersReducedMotion } from "@/lib/use-reduced-motion";

// Literal class names so Tailwind sees them.
const barColor: Record<WindowColor, string> = {
  gold: "bg-gold text-on-accent",
  lilac: "bg-lilac text-on-accent",
  mint: "bg-mint text-on-accent",
  coral: "bg-coral text-on-accent",
  sky: "bg-sky text-on-accent",
  pink: "bg-pink text-on-accent",
  surface: "bg-surface text-ink",
};

export const ctl =
  "grid size-5 cursor-pointer place-items-center border-2 border-current bg-surface font-mono text-[11px] font-bold leading-none text-ink hover:bg-gold hover:text-on-accent";

/** The labelled button in a window footer that maximizes it. */
export const maxButton =
  "cursor-pointer border-[3px] border-ink bg-gold px-3 py-1 font-medium text-on-accent shadow-rest motion-safe:transition-[transform,box-shadow] motion-safe:duration-120 hover:shadow-hover active:translate-x-1 active:translate-y-1 active:shadow-pressed";

/** A maximized window: a modal <dialog> that grows out of `from` and shrinks back, like an old window manager. */
export function useWindowDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const from = useRef<Element | null>(null);

  function grow(reverse: boolean) {
    const a = from.current?.getBoundingClientRect();
    const b = dialog.current?.getBoundingClientRect();
    if (!a || !b || prefersReducedMotion()) return Promise.resolve();
    const start = `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`;
    const frames = [{ transform: start }, { transform: "none" }];
    return dialog.current!.animate(reverse ? frames.reverse() : frames, { duration: 260, easing: "steps(6, end)" }).finished;
  }

  /** Opens from the clicked control; `source` is the element it grows out of (defaults to the control). */
  function open(event: React.MouseEvent<HTMLElement>, source?: Element | null) {
    opener.current = event.currentTarget;
    from.current = source ?? event.currentTarget;
    const el = dialog.current;
    if (!el || el.open) return Promise.resolve();
    el.showModal();
    return grow(false);
  }

  function close() {
    grow(true).then(() => dialog.current?.close());
  }

  return { dialog, opener, open, close };
}

type WindowDialogProps = {
  state: ReturnType<typeof useWindowDialog>;
  /** Accessible name of the dialog. */
  label: string;
  title: string;
  icon?: ReactNode;
  color?: WindowColor;
  /** Width cap, e.g. "1100px". */
  width?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDialogElement>) => void;
  children: ReactNode;
};

export function WindowDialog({ state, label, title, icon, color = "gold", width = "1100px", onKeyDown, children }: WindowDialogProps) {
  const { dialog, opener, close } = state;
  return (
    <dialog
      ref={dialog}
      aria-label={label}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={() => opener.current?.focus()}
      onClick={(event) => {
        // The dialog has no padding, so a click on the dialog itself is a backdrop click.
        if (event.target === event.currentTarget) close();
      }}
      onKeyDown={onKeyDown}
      style={{ width: `min(${width}, calc(100vw - 24px))` }}
      className="fixed inset-0 m-auto h-[min(92dvh,1100px)] max-h-none max-w-none border-[3px] border-ink bg-bg p-0 text-ink shadow-window backdrop:bg-ink/55 open:flex open:flex-col"
    >
      <div className={`flex items-center gap-2 border-b-[3px] border-ink px-2 py-1 font-pixel text-[13px] ${barColor[color]}`}>
        {icon}
        <span className="truncate">{title}</span>
        <span aria-hidden="true" className="title-stripes h-2.5 min-w-3 flex-1" />
        <button type="button" className={ctl} onClick={close} aria-label="Restore the window">
          ▣
        </button>
        <button type="button" className={ctl} onClick={close} aria-label="Close">
          ×
        </button>
      </div>
      <div className="desk min-h-0 flex-1 overflow-y-auto px-4 py-6">{children}</div>
    </dialog>
  );
}
