import type { Metadata } from "next";
import { Oswald, Inter, JetBrains_Mono, Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";

const displayFont = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700", "800"],
});

const luxuryFont = Cinzel({
  subsets: ["latin"],
  variable: "--font-luxury",
  weight: ["500", "600", "700", "800", "900"],
});

const italicFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif-italic",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "SYNDICATE SUITS — Haute Couture Mafia Bespoke & AI Concierge",
  description:
    "Ultra-luxury bespoke mafia tailoring atelier featuring Toni Lee, the AI Master Tailor & Consigliere. Level III-A Kevlar bulletproof suits, hand-rolled Italian Como canvas, and discreet underworld courier dispatch.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className="dark bg-[#0B0B0A]"
    >
      <body
        className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} ${luxuryFont.variable} ${italicFont.variable} antialiased bg-[#0B0B0A] text-[#E9DFC9] selection:bg-[#B92720] selection:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}