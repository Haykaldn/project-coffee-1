import type { Metadata } from "next";
import MasonryGallery from "@/components/pages/MasonryGallery";
import PageHeader from "@/components/pages/PageHeader";
import PageShell from "@/components/pages/PageShell";
import shared from "@/components/pages/pages.module.css";

export const metadata: Metadata = {
  title: "Suasana | UB Coffee",
  description: "Galeri foto ruangan, kegiatan, live musik, dan kopi di UB Coffee.",
};

export default function SuasanaPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Suasana"
        title={
          <>
            Sudut-sudut <em>favorit.</em>
          </>
        }
        lead="Intip ruangan, kegiatan, live musik, dan kopi yang menemani hari-hari di UB Coffee."
      />
      <section className={shared.section} aria-label="Galeri foto">
        <div className="container">
          <MasonryGallery />
        </div>
      </section>
    </PageShell>
  );
}
