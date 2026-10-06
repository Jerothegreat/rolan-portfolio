import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { siteConfig } from "@/lib/site-config";
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
  description: `${siteConfig.name} builds AI apps, wins hackathons, and writes about what broke.`,
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
      </body>
    </html>
  );
}
