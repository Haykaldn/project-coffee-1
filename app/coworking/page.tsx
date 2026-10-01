import type { Metadata } from "next";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import PageHeader from "@/components/pages/PageHeader";
import PageShell from "@/components/pages/PageShell";
import RoomGallery from "@/components/pages/RoomGallery";
import shared from "@/components/pages/pages.module.css";
import styles from "@/components/pages/Coworking.module.css";
import Button from "@/components/ui/Button";
import Icon, { type IconName } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Pill";
import { coworkingPhotos } from "@/data/gallery";
import { reservationLink, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Coworking & Meeting Room | UB Coffee",
  description:
    "Meeting Room UB Coffee untuk hingga 15 orang: air mineral, LCD proyektor, dan set audio gratis. Reservasi via WhatsApp.",
};

const reserveUrl = reservationLink("Halo UB Coffee, saya ingin reservasi Meeting Room.");

const prices = [
  { label: "Internal UB", price: "IDR 100K", note: "Sivitas akademika & unit di lingkungan Universitas Brawijaya" },
  { label: "Eksternal", price: "IDR 150K", note: "Umum, komunitas, dan instansi di luar UB" },
];

const facilities: { icon: IconName; title: string; body: string }[] = [
  { icon: "droplet", title: "Air Mineral Gratis", body: "600ml per orang." },
  { icon: "projector", title: "LCD Proyektor Gratis", body: "Siap untuk presentasi dan pemutaran materi." },
  { icon: "speaker", title: "Set Audio Gratis", body: "Suara jelas untuk seluruh peserta." },
];

export default function CoworkingPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Coworking Space"
        title={
          <>
            Ruang untuk <em>berkarya.</em>
          </>
        }
        lead="Tempat nyaman untuk bekerja, belajar, dan bertemu, lengkap dengan Meeting Room berkapasitas hingga 15 orang."
      >
        <Button href={reserveUrl} variant="light" size="lg" icon="whatsapp">
          Reservasi via WhatsApp
        </Button>
      </PageHeader>

      <section className={shared.section} aria-labelledby="meeting-title">
        <div className={`container ${styles.intro}`}>
          <AnimatedContent>
            <RoomGallery photos={coworkingPhotos} />
          </AnimatedContent>
          <AnimatedContent delay={0.1} className={styles.highlight}>
            <Eyebrow>Meeting Room</Eyebrow>
            <h2 id="meeting-title" className="section-title">
              Ruang meeting yang <em>nyaman.</em>
            </h2>
            <p>
              Cari ruang meeting yang nyaman, fasilitas lengkap, dan suasana inspiratif? Meeting Room UB Coffee siap
              mendukung kesuksesan setiap acara Anda! Dengan kapasitas hingga 15 orang, ruangan kami adalah pilihan tepat
              untuk pertemuan bisnis, pelatihan, hingga workshop eksklusif.
            </p>
            <ul className={styles.stats}>
              <li>
                <Icon name="users" size={22} />
                Hingga 15 orang
              </li>
              <li>
                <Icon name="laptop" size={22} />
                Rapat, pelatihan, workshop
              </li>
            </ul>
          </AnimatedContent>
        </div>
      </section>

      <section className={`${shared.section} ${shared.sectionTint}`} aria-labelledby="harga-title">
        <div className="container">
          <div className={shared.sectionHead}>
            <Eyebrow>Harga Sewa</Eyebrow>
            <h2 id="harga-title" className="section-title">
              Harga yang <em>bersahabat.</em>
            </h2>
          </div>
          <ul className={styles.prices}>
            {prices.map((p, i) => (
              <AnimatedContent as="li" key={p.label} delay={i * 0.08} distance={30}>
                <article className={`${shared.card} ${styles.priceCard}`}>
                  <span className={shared.icon}>
                    <Icon name={i === 0 ? "users" : "globe"} size={24} />
                  </span>
                  <h3>{p.label}</h3>
                  <p className={styles.price}>{p.price}</p>
                  <p>{p.note}</p>
                </article>
              </AnimatedContent>
            ))}
          </ul>
        </div>
      </section>

      <section className={shared.section} aria-labelledby="fasilitas-title">
        <div className="container">
          <div className={shared.sectionHead}>
            <Eyebrow>Fasilitas</Eyebrow>
            <h2 id="fasilitas-title" className="section-title">
              Fasilitas meeting <em>lengkap.</em>
            </h2>
            <p>Semua yang Anda butuhkan untuk kelancaran acara sudah kami siapkan:</p>
          </div>
          <ul className={styles.facilities}>
            {facilities.map((f, i) => (
              <AnimatedContent as="li" key={f.title} delay={i * 0.08} distance={30}>
                <article className={shared.card}>
                  <span className={shared.icon}>
                    <Icon name={f.icon} size={24} />
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </article>
              </AnimatedContent>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${shared.section} ${shared.sectionTint}`} aria-labelledby="kerjasama-title">
        <div className={`container ${styles.partner}`}>
          <AnimatedContent className={styles.partnerIcon}>
            <span className={shared.icon}>
              <Icon name="handshake" size={28} />
            </span>
          </AnimatedContent>
          <AnimatedContent delay={0.08}>
            <Eyebrow>Kerjasama</Eyebrow>
            <h2 id="kerjasama-title" className="section-title">
              Kerjasama & event <em>khusus.</em>
            </h2>
            <p className={styles.partnerText}>
              Ingin mengadakan event di UB Coffee? Kami juga menerima tawaran kerjasama dengan promo khusus untuk berbagai
              acara spesial Anda. Jadikan UB Coffee pilihan utama untuk menciptakan acara yang berkesan dan profesional.
            </p>
          </AnimatedContent>
        </div>
      </section>

      <section className={shared.section} aria-labelledby="kontak-title">
        <div className="container">
          <AnimatedContent className={shared.cta}>
            <div>
              <Eyebrow tone="dark">Hubungi Kami</Eyebrow>
              <h2 id="kontak-title" className="section-title">
                Siap untuk <em>memulai?</em>
              </h2>
              <p>Hubungi kami sekarang untuk informasi lebih lanjut dan reservasi.</p>
            </div>
            <div className={shared.ctaActions}>
              <Button href={reserveUrl} variant="light" size="lg" icon="whatsapp">
                Reservasi via WhatsApp
              </Button>
              <a href={`tel:+${site.whatsapp}`} className={shared.ctaPhone}>
                {site.whatsappDisplay}
              </a>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </PageShell>
  );
}
