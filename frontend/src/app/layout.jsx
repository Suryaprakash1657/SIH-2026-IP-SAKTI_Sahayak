import { Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "IP-SAKTI Sahayak | Flagship Ayush Legal & Patent Intelligence",
  description: "Specialized Sovereign Civic-Tech Portal for Ayush Formulations, Indian Patents Act Section 3(p)/3(e) Defenses, and BDA 2024 Compliance.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <body
        className="font-sans min-h-screen flex flex-col bg-[#fbf9f4] text-[#12231d] antialiased selection:bg-forest-800 selection:text-blue-100"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
