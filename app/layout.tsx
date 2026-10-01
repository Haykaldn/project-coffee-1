import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/components/layout/Providers";
import "lenis/dist/lenis.css";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UB Coffee",
  description:
    "UB Coffee, unit usaha PT Brawijaya Multi Usaha. Kopi Arjuna, menu favorit, ruang coworking, dan live akustik di Jl. MT Haryono, Malang.",
  openGraph: {
    title: "UB Coffee",
    description: "Diseduh di kampus, dari lereng Arjuna. Unit usaha PT Brawijaya Multi Usaha.",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B2A5B",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
