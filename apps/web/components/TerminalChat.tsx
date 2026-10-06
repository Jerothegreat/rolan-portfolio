"use client";

import { useState, useRef, useEffect, useCallback, type KeyboardEvent, type FormEvent } from "react";
import { profile } from "@/lib/data/profile";
import { skills } from "@/lib/data/skills";
import { experience } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { awards, hackathons } from "@/lib/data/competitions";
import { certifications } from "@/lib/data/certifications";

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface ChatMessage {
  id: number;
  role: "user" | "system";
  text: string;
  /** If true, the message is still being "typed out" */
  typing?: boolean;
  action?: "switch-classic";
}

interface TerminalChatProps {
  onSwitchToClassic?: () => void;
}

/* ─── Command handler ───────────────────────────────────────────────────── */

const HELP_TEXT = `Available commands:

  help            Show this help message
  profile         Switch to full portfolio profile view
  whoami          About me — bio, education, background
  skills          Technical skills grouped by domain
  experience      Work experience & internships
  projects        Pinned projects & builds
  competitions    Awards, hackathons & competitions
  certifications  Certifications & courses
  contact         How to reach me
  resume          Download my resume
  clear           Clear the terminal
  
Tip: You can also ask questions naturally — try "what do you do?" or "tell me about your projects"`;

function handleCommand(raw: string): { response: string; action?: "switch-classic" } {
  const input = raw.trim().toLowerCase();

  // Empty
  if (!input) return { response: "" };

  // clear is handled specially
  if (input === "clear") return { response: "__CLEAR__" };

  // switch to classic profile view
  if (
    input === "profile" ||
    input === "classic" ||
    input === "view profile" ||
    input === "view" ||
    input === "gui" ||
    input === "explore" ||
    input === "full" ||
    input === "switch" ||
    input === "mode classic"
  ) {
    return {
      response: `Switching to Classic Profile view... (You can switch back any time via the title bar)`,
      action: "switch-classic",
    };
  }

  // help
  if (input === "help" || input === "?") return { response: HELP_TEXT };

  // whoami
  if (input === "whoami" || input.includes("about") || input.includes("who are you") || input.includes("who r u") || input.includes("introduce")) {
    return {
      response: `${profile.name}
${profile.title}

${profile.bio}

Education: ${profile.education.degree}
  ${profile.education.school} (Expected ${profile.education.expected})
  ${profile.education.location}`,
    };
  }

  // skills
  if (input === "skills" || input.includes("tech stack") || input.includes("technologies") || input.includes("what can you do")) {
    return {
      response: skills
        .map(
          (group) =>
            `[${group.label}]\n  ${group.items.join(", ")}`
        )
        .join("\n\n"),
    };
  }

  // experience
  if (input === "experience" || input === "exp" || input === "work" || input.includes("work experience") || input.includes("internship") || input.includes("where do you work")) {
    return {
      response: experience
        .map(
          (exp) =>
            `${exp.role} @ ${exp.company}\n  ${exp.dates}\n${exp.bullets.map((b) => `  • ${b}`).join("\n")}`
        )
        .join("\n\n"),
    };
  }

  // projects
  if (input === "projects" || input.includes("project") || input.includes("built") || input.includes("portfolio") || input.includes("what have you made")) {
    return {
      response: projects
        .filter((p) => p.pinned)
        .map(
          (p) =>
            `${p.name} [${p.type}]\n  ${p.description}\n  Stack: ${p.stack.join(", ")}${p.url && !p.url.startsWith("[") ? `\n  URL: ${p.url}` : ""}`
        )
        .join("\n\n"),
    };
  }

  // competitions
  if (input === "competitions" || input === "awards" || input === "hackathons" || input.includes("competition") || input.includes("award") || input.includes("hackathon") || input.includes("won")) {
    const awardsText = awards
      .map(
        (a) =>
          `* ${a.name} — ${a.placement} (${a.year})${a.note ? `\n  ${a.note}` : ""}`
      )
      .join("\n");

    const hackathonText = hackathons
      .map(
        (h) =>
          `* ${h.event} (${h.year}) — ${h.product}\n  ${h.description}\n  Stack: ${h.stack.join(", ")}`
      )
      .join("\n\n");

    return {
      response: `─── Awards ───\n${awardsText}\n\n─── Hackathons ───\n${hackathonText}`,
    };
  }

  // certifications
  if (input === "certifications" || input === "certs" || input.includes("certification") || input.includes("cert") || input.includes("course")) {
    return {
      response: certifications
        .map((c) => `* ${c.name}\n  Issuer: ${c.issuer} (${c.year})`)
        .join("\n\n"),
    };
  }

  // contact
  if (input === "contact" || input.includes("contact") || input.includes("reach") || input.includes("email") || input.includes("hire")) {
    return {
      response: `You can reach me at:

  Email:    ${profile.links.email}
  GitHub:   ${profile.links.github}
  LinkedIn: ${profile.links.linkedin}

  Status: ${profile.availability === "open" ? "Open to opportunities" : "Not currently available"}
  Location: ${profile.location}`,
    };
  }

  // resume
  if (input === "resume" || input === "cv" || input.includes("resume") || input.includes("download")) {
    return {
      response: `Resume available for download:
  ${profile.resume}

  Tip: Click the link or use the "Resume ↓" link in the status block above.`,
    };
  }

  // fallback
  return {
    response: `Command not found: "${raw.trim()}"

Type 'help' to see available commands or 'profile' to view the full profile.`,
  };
}

/* ─── Typing animation speed ────────────────────────────────────────────── */
const TYPE_SPEED = 8; // ms per character
const MAX_TYPE_LENGTH = 800; // skip animation for very long outputs

/* ─── Component ─────────────────────────────────────────────────────────── */

export function TerminalChat({ onSwitchToClassic }: TerminalChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "system",
      text: `$ ./rolan-ai --interactive
  Ask me anything about my career, skills, or projects.
  Type 'help' for commands, or 'profile' for the full profile view.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingCancelRef = useRef(false);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input on mount and when clicking the chat area
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Type out a response character by character
  const typeOutResponse = useCallback(
    (text: string, msgId: number, action?: "switch-classic") => {
      typingCancelRef.current = false;
      setIsTyping(true);

      const finish = () => {
        setIsTyping(false);
        if (action === "switch-classic" && onSwitchToClassic) {
          setTimeout(() => {
            onSwitchToClassic();
          }, 400);
        }
      };

      // Skip typing animation for very long text
      if (text.length > MAX_TYPE_LENGTH) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, text, typing: false } : m
          )
        );
        finish();
        return;
      }

      let i = 0;
      const interval = setInterval(() => {
        if (typingCancelRef.current) {
          clearInterval(interval);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msgId ? { ...m, text, typing: false } : m
            )
          );
          finish();
          return;
        }

        i++;
        const chunk = text.slice(0, i);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, text: chunk, typing: i < text.length } : m
          )
        );

        if (i >= text.length) {
          clearInterval(interval);
          finish();
        }
      }, TYPE_SPEED);
    },
    [onSwitchToClassic]
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isTyping) return;

      const userMsg: ChatMessage = {
        id: nextId.current++,
        role: "user",
        text: input.trim(),
      };

      const { response, action } = handleCommand(input);

      if (response === "__CLEAR__") {
        setMessages([
          {
            id: nextId.current++,
            role: "system",
            text: "Terminal cleared. Type 'help' for commands, or 'profile' for full profile.",
          },
        ]);
        setInput("");
        return;
      }

      if (response === "") {
        setInput("");
        return;
      }

      const sysMsg: ChatMessage = {
        id: nextId.current++,
        role: "system",
        text: "",
        typing: true,
        action,
      };

      setMessages((prev) => [...prev, userMsg, sysMsg]);
      setInput("");

      // Start typing animation after a brief delay
      setTimeout(() => {
        typeOutResponse(response, sysMsg.id, action);
      }, 150);
    },
    [input, isTyping, typeOutResponse]
  );

  // Allow pressing Enter to submit, and skip typing animation on any key during typing
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isTyping && e.key !== "Tab") {
        typingCancelRef.current = true;
      }
    },
    [isTyping]
  );

  // Command history
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent) => {
      handleKeyDown(e);

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length > 0) {
          const nextIdx = historyIdx < history.length - 1 ? historyIdx + 1 : historyIdx;
          setHistoryIdx(nextIdx);
          setInput(history[history.length - 1 - nextIdx]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIdx > 0) {
          const nextIdx = historyIdx - 1;
          setHistoryIdx(nextIdx);
          setInput(history[history.length - 1 - nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInput("");
        }
      }
    },
    [handleKeyDown, history, historyIdx]
  );

  const submitWithHistory = useCallback(
    (e: FormEvent) => {
      if (input.trim()) {
        setHistory((prev) => [...prev, input.trim()]);
        setHistoryIdx(-1);
      }
      handleSubmit(e);
    },
    [input, handleSubmit]
  );

  return (
    <div className="terminal-chat-container" onClick={focusInput}>
      {/* Chat output area */}
      <div
        ref={scrollRef}
        className="terminal-chat-output"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`terminal-message ${msg.role}`}>
            {msg.role === "user" ? (
              <div className="terminal-user-line">
                <span className="terminal-prompt-text">visitor@rolan.dev:~$</span>{" "}
                <span className="text-text">{msg.text}</span>
              </div>
            ) : (
              <pre className="terminal-system-text">{msg.text}
                {msg.typing && (
                  <span className="terminal-cursor" aria-hidden="true" />
                )}
              </pre>
            )}
          </div>
        ))}
      </div>

      {/* Input area */}
      <form onSubmit={submitWithHistory} className="terminal-input-row">
        <label htmlFor="terminal-input" className="terminal-prompt-text shrink-0">
          visitor@rolan.dev:~$
        </label>
        <input
          ref={inputRef}
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="terminal-input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={isTyping ? "..." : "type a command or question..."}
          disabled={false}
          aria-label="Terminal command input"
        />
      </form>
    </div>
  );
}
