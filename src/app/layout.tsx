import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bellagio by Sadaf — Luxury Bridal, Makeup & Hair · Karachi",
  description:
    "Luxury bridal, makeup, hair and salon experiences in Karachi, designed with intention. Nikkah, Mehndi, Baraat, Walima and engagement looks by Bellagio by Sadaf.",
};

export const viewport: Viewport = {
  themeColor: "#F7F0E9",
};

// Runs before paint: flags JS + reduced motion so reveal start-states never flash.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduced');})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://assets.mixkit.co" />
      </head>
      <body>{children}</body>
    </html>
  );
}
