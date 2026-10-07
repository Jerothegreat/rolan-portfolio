"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type MouseEvent } from "react";
import { Button } from "@/components/button";
import { toggleTheme } from "@/components/theme-toggle";
import { run, type TerminalAction, type TerminalContext } from "@/lib/terminal";

type Line = { text: string; input?: boolean };

const PROMPT = "rolan $";
const GREETING = ["Welcome to 1mil.dev.", "Type `help` to see what you can do."];
const ASK_HINT = "Try: ask <question> — or type help";

const toLines = (texts: string[]): Line[] => texts.map((text) => ({ text }));

// Elements where typing `~` must stay a normal keystroke.
function isTyping(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || !!target.closest("input, textarea, select"));
}

// A trigger inside another dialog (the mobile menu) is hidden by the time the terminal
// closes, so focus goes back to the button that opened that dialog.
function focusTarget(opener: HTMLElement | null): HTMLElement | null {
  const host = opener?.closest("dialog");
  if (host?.id) return document.querySelector<HTMLElement>(`[aria-controls="${host.id}"]`) ?? opener;
  return opener;
}

// Modal terminal. The native <dialog> supplies the focus trap and Escape handling.
// `context` is built on the server; Velite content never reaches this client bundle directly.
export function Terminal({ context }: { context: TerminalContext }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const greeted = useRef(false);
  const history = useRef<string[]>([]);
  const cursor = useRef(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    function open(from: HTMLElement | null, ask: boolean) {
      const el = dialog.current;
      if (!el || el.open) return;
      opener.current = from;
      el.showModal();
      input.current?.focus();
      const first = !greeted.current;
      greeted.current = true;
      setLines((prev) => {
        const next = first ? [...prev, ...toLines(GREETING)] : prev;
        return ask && next.at(-1)?.text !== ASK_HINT ? [...next, { text: ASK_HINT }] : next;
      });
    }

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== "~" || event.ctrlKey || event.metaKey || event.altKey || isTyping(event.target)) return;
      if (document.querySelector("dialog[open]")) return;
      event.preventDefault();
      const active = document.activeElement;
      open(active instanceof HTMLElement && active !== document.body ? active : null, false);
    }

    function onClick(event: globalThis.MouseEvent) {
      const trigger = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-terminal-trigger]") : null;
      if (trigger) open(trigger, trigger.dataset.terminalTrigger === "ask");
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const el = log.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function apply(action: TerminalAction) {
    if (action.type === "open-url") window.open(action.url, "_blank", "noopener,noreferrer");
    else if (action.type === "toggle-theme") toggleTheme();
    else if (action.type === "clear") setLines([]);
    else dialog.current?.close();
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const text = value;
    setValue("");
    if (text.trim() && history.current.at(-1) !== text) history.current.push(text);
    cursor.current = history.current.length;
    const result = run(text, context);
    // `clear` empties the output, so the echo is dropped with it.
    setLines((prev) => [...prev, { text: `${PROMPT} ${text}`, input: true }, ...toLines(result.lines)]);
    if (result.action) apply(result.action);
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const past = history.current;
    cursor.current = Math.min(past.length, Math.max(0, cursor.current + (event.key === "ArrowUp" ? -1 : 1)));
    setValue(past[cursor.current] ?? "");
  }

  function onClose() {
    const target = focusTarget(opener.current);
    opener.current = null;
    if (target?.isConnected) target.focus();
  }

  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    // The dialog has no padding, so a click on the dialog itself is a backdrop click.
    if (event.target === event.currentTarget) dialog.current?.close();
  }

  return (
    <dialog
      ref={dialog}
      aria-label="Terminal"
      onClose={onClose}
      onClick={onDialogClick}
      // Top-anchored on phones so the on-screen keyboard never covers the panel.
      className="fixed inset-x-0 top-0 m-0 h-[min(26rem,55dvh)] w-full max-w-none rounded-b-card border-2 border-t-0 border-ink bg-bg p-0 font-mono text-mono text-ink shadow-rest backdrop:bg-ink/50 sm:inset-0 sm:m-auto sm:h-[28rem] sm:max-w-2xl sm:rounded-card sm:border-t-2"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b-2 border-ink px-4 py-2">
          <span className="font-bold">Terminal</span>
          <Button variant="secondary" onClick={() => dialog.current?.close()} aria-label="Close terminal">
            Close
          </Button>
        </div>
        <div ref={log} role="log" aria-label="Terminal output" className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
          {lines.map((line, i) => (
            <div key={i} className={`whitespace-pre-wrap break-words ${line.input ? "font-bold" : ""}`}>
              {line.text}
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t-2 border-ink px-4 py-2">
          <label htmlFor="terminal-input" className="font-bold">
            {PROMPT}
          </label>
          <input
            ref={input}
            id="terminal-input"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              cursor.current = history.current.length;
            }}
            onKeyDown={onInputKeyDown}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="send"
            // 16px keeps iOS from zooming the page when the input is focused.
            className="min-w-0 flex-1 bg-transparent font-mono text-body text-ink"
          />
        </form>
      </div>
    </dialog>
  );
}
