import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

// Kerangka halaman turunan: navbar dan footer yang sama dengan beranda.
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#konten" className="skip-link">
        Langsung ke konten
      </a>
      <Navbar />
      <main id="konten">{children}</main>
      <Footer />
    </>
  );
}
