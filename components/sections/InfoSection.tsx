import AnimatedContent from "@/components/reactbits/AnimatedContent";
import LocationMap from "@/components/pages/LocationMap";
import OpeningHours from "@/components/pages/OpeningHours";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Pill";
import { site } from "@/data/site";
import styles from "./InfoSection.module.css";

// Section terakhir beranda: lokasi, peta, dan jam buka langsung tampil tanpa pindah halaman.
export default function InfoSection() {
  return (
    <section id="lokasi" className={styles.section} aria-labelledby="info-title">
      <div className="container">
        <div className={styles.head}>
          <AnimatedContent>
            <Eyebrow tone="dark">Kunjungi Kami</Eyebrow>
            <h2 id="info-title" className={`section-title ${styles.title}`}>
              Mampir, duduk, <em>nikmati.</em>
            </h2>
            <p className={styles.lead}>
              Kami berada di tengah kampus, mudah dijangkau dari gerbang KPRI UB. Ada parkir, kursi yang nyaman, dan
              kopi yang siap menemani.
            </p>
          </AnimatedContent>
          <Button href={site.mapsUrl} variant="light" size="lg" icon="mapPin">
            Buka di Google Maps
          </Button>
        </div>

        <div className={styles.location}>
          <div className={styles.locationInfo}>
            <AnimatedContent className={styles.address}>
              <span className={styles.icon}>
                <Icon name="mapPin" size={24} />
              </span>
              <div>
                <h3>Lokasi</h3>
                <address>{site.address}</address>
                <p>{site.landmark}</p>
              </div>
            </AnimatedContent>
            <AnimatedContent delay={0.1}>
              <OpeningHours />
            </AnimatedContent>
          </div>
          <LocationMap />
        </div>
      </div>
    </section>
  );
}
