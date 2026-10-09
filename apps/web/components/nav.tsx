import Link from "next/link";
import { Button } from "@/components/button";
import { LogoMark } from "@/components/logo-mark";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

const links = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#road", label: "Road" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

function AskButton({ variant = "ai" }: { variant?: "ai" | "chip-ai" }) {
  return (
    <Button variant={variant} data-terminal-trigger="ask">
      Ask my AI
    </Button>
  );
}

// Tray readout of the 1mil tracker, on every page.
function Tray() {
  const { total, goal } = site.road;
  return (
    <Link
      href="/#road"
      aria-label={`1mil tracker: ${total.toLocaleString("en-US")} of ${goal.toLocaleString("en-US")} points`}
      className="border-2 border-ink bg-gold px-2 py-0.5 font-pixel text-[12px] text-on-accent tabular-nums hover:shadow-rest"
    >
      {Math.round(total / 1000)}k / 1M
    </Link>
  );
}

// Retro-OS menu bar.
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-surface">
      <div className="mx-auto flex max-w-page items-center gap-4 px-4 py-1.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-pixel text-[13px] font-bold">
          <LogoMark className="size-7" />
          1mil.dev
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-4 font-pixel text-[12px] lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="px-1 hover:bg-ink hover:text-surface">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <Tray />
          {/* Display utilities on Button lose to its own inline-flex, so hide via this wrapper. */}
          <div className="hidden items-center gap-3 lg:flex">
            <AskButton variant="chip-ai" />
            <ThemeToggle variant="chip" />
          </div>
          <MobileMenu>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="py-2 font-pixel text-h3">
                {link.label}
              </Link>
            ))}
            <AskButton />
            <ThemeToggle />
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
