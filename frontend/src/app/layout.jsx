import { Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: false,
});

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
  adjustFontFallback: false,
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["SFMono-Regular", "Menlo", "Monaco", "Consolas", "Courier New", "monospace"],
  adjustFontFallback: false,
});

export const metadata = {
  title: "IP-SAKTI Sahayak | National Ayush Legal & Patent Intelligence",
  description: "Sovereign Civic-Institutional Portal for Ayush Formulations, Indian Patents Act Section 3(p)/3(e) Defenses, and BDA 2024 Compliance.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-sans min-h-screen flex flex-col bg-[var(--canvas)] text-[var(--ink)] antialiased selection:bg-forest-700 selection:text-surface-raised"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
