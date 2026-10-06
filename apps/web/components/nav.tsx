import Link from "next/link";
import { Button } from "@/components/button";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

// Both buttons are slots: ticket 08 wires them via [data-terminal-trigger].
function TerminalButton({ className = "" }: { className?: string }) {
  return (
    <Button variant="secondary" className={className} aria-label="Open terminal" data-terminal-trigger="terminal">
      <span aria-hidden="true" className="font-mono">
        {">_"}
      </span>
    </Button>
  );
}

function AskButton({ className = "" }: { className?: string }) {
  return (
    <Button className={className} data-terminal-trigger="ask">
      Ask my AI
    </Button>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-bg">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-h3 font-extrabold">
          1mil.dev
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 sm:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="underline-offset-4 hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <TerminalButton className="hidden px-4 py-2 sm:inline-flex" />
          <AskButton className="hidden px-4 py-2 sm:inline-flex" />
          <ThemeToggle className="px-4 py-2" />
          <MobileMenu>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="py-2 text-h3 font-display font-extrabold">
                {link.label}
              </Link>
            ))}
            <TerminalButton />
            <AskButton />
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
