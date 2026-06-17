import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rolan Jero Pinton — AI Engineer & Full-Stack Developer",
  description:
    "Portfolio of Rolan Jero Pinton — CS student at UMak building AI applications, RAG systems, and full-stack products. Champion at Infotechnolympics 2025.",
};

// Runs before first paint — reads localStorage.theme, falls back to system pref,
// then adds/removes the .dark class on <html> so there is no flash.
const themeInitScript = `(function(){
  try {
    var stored = localStorage.getItem('theme');
    var isDark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDark);
  } catch(e){}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${newsreader.variable}`}
    >
      <head>
        {/* No-flash theme init — must run synchronously before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-bg text-text font-mono antialiased">
        {children}
      </body>
    </html>
  );
}
