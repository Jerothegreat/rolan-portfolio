import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono, Silkscreen } from "next/font/google";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Terminal } from "@/components/terminal";
import { Ticker } from "@/components/ticker";
import { githubContributions } from "@/lib/contributions";
import { site } from "@/lib/site";
import { siteConfig } from "@/lib/site-config";
import type { TerminalContext } from "@/lib/terminal";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-bricolage",
  fallback: ["system-ui", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
  fallback: ["ui-monospace", "monospace"],
});

// Pixel face for title bars, the menu and status bars, stamps, and icon labels only.
const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  // Tabs read "1mil | Home", "1mil | Blog", ...; Home switches by section (SectionTitle).
  title: { default: "1mil | Home", template: "1mil | %s" },
  description: siteConfig.tagline,
};

// Built on the server; only listed projects reach the client. Drafts and unlisted projects are
// absent, so hiddenSlugs is left out rather than shipping their slugs to every visitor.
const terminalContext: TerminalContext = {
  name: siteConfig.name,
  role: siteConfig.role,
  bio: siteConfig.tagline,
  contact: { email: siteConfig.email, github: siteConfig.github, linkedin: siteConfig.linkedin },
  projects: site.listedProjects.map((p) => ({
    slug: p.slug,
    title: p.title,
    oneLiner: p.oneLiner,
    status: p.status,
    demoUrl: p.demoUrl,
    repoUrl: p.repoUrl,
  })),
};

const updated = new Date(process.env.SITE_UPDATED ?? Date.now()).toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "Asia/Manila",
});

async function tickerItems() {
  const contributions = await githubContributions(new URL(siteConfig.github).pathname.split("/")[1]);
  return [
    ...siteConfig.tickerWords,
    `last updated ${updated.toLowerCase()}`,
    ...(contributions ? [`${contributions.total.toLocaleString("en-US")} github contributions this year`] : []),
    `${site.road.total.toLocaleString("en-US")} / ${site.road.goal.toLocaleString("en-US")} to the dream`,
  ];
}

// Runs before first paint so the page never flashes the wrong theme.
const themeScript = `(function(){var s=null;try{s=localStorage.getItem("theme")}catch(e){}var d=s==="dark"||(s!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)})()`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} ${silkscreen.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <Nav />
        <Ticker items={await tickerItems()} />
        {children}
        <Footer />
        <Terminal context={terminalContext} />
      </body>
    </html>
  );
}
