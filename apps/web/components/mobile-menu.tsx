"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Button } from "@/components/button";

// Bottom-sheet menu below 640px. The native modal <dialog> supplies the focus trap,
// Escape handling, and the backdrop; this wires aria state and focus return.
export function MobileMenu({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  function show() {
    dialog.current?.showModal();
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
    root.current?.querySelector("button")?.focus();
  }

  function onClick(event: MouseEvent<HTMLDialogElement>) {
    const target = event.target as HTMLElement;
    // The dialog has no padding, so a click on the dialog itself is a backdrop click.
    if (target === event.currentTarget || target.closest("a, [data-terminal-trigger]")) {
      dialog.current?.close();
    }
  }

  return (
    <div ref={root} className="sm:hidden">
      <Button
        variant="secondary"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={show}
      >
        Menu
      </Button>
      <dialog
        ref={dialog}
        id="mobile-menu"
        aria-label="Menu"
        onClose={onClose}
        onClick={onClick}
        className="fixed inset-x-0 bottom-0 top-auto m-0 w-full max-w-none rounded-t-card border-2 border-b-0 border-ink bg-bg p-0 text-ink backdrop:bg-ink/50"
      >
        <div className="flex flex-col gap-4 p-6 pb-8">
          {children}
          <Button variant="secondary" onClick={() => dialog.current?.close()}>
            Close
          </Button>
        </div>
      </dialog>
    </div>
  );
}
