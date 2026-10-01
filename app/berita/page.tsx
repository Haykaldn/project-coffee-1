import type { Metadata } from "next";
import NewsList from "@/components/pages/NewsList";
import PageHeader from "@/components/pages/PageHeader";
import PageShell from "@/components/pages/PageShell";
import shared from "@/components/pages/pages.module.css";

export const metadata: Metadata = {
  title: "Berita & Acara | UB Coffee",
  description: "Event, promo, dan kabar terbaru dari UB Coffee.",
};

export default function BeritaPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Berita & Acara"
        title={
          <>
            Kabar dari <em>kedai.</em>
          </>
        }
        lead="Event, promo, dan kabar terbaru dari UB Coffee."
      />
      <section className={shared.section} aria-label="Daftar berita">
        <div className="container">
          <NewsList />
        </div>
      </section>
    </PageShell>
  );
}
