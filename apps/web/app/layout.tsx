import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Terminal } from "@/components/terminal";
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

export const metadata: Metadata = {
  title: `${siteConfig.name} · ${siteConfig.role}`,
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

// Runs before first paint so the page never flashes the wrong theme.
const themeScript = `(function(){var s=null;try{s=localStorage.getItem("theme")}catch(e){}var d=s==="dark"||(s!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <Nav />
        {children}
        <Footer />
        <Terminal context={terminalContext} />
      </body>
    </html>
  );
}
