import AnimatedContent from "@/components/reactbits/AnimatedContent";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { site } from "@/data/site";
import styles from "./Lokasi.module.css";

// Kartu Google Maps (embed tanpa API key) yang dimiringkan, dengan label dan kartu rute.
export default function LocationMap() {
  return (
    <div className={styles.mapArea}>
      <Icon name="bean" size={34} className={`${styles.bean} ${styles.bean1}`} />
      <Icon name="bean" size={24} className={`${styles.bean} ${styles.bean2}`} />
      <Icon name="bean" size={28} className={`${styles.bean} ${styles.bean3}`} />

      <AnimatedContent className={styles.mapWrap} delay={0.1} scale={0.96}>
        <div className={styles.mapCard}>
          <iframe
            src={site.mapsEmbedUrl}
            title="Peta lokasi UB Coffee di Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <Pill tone="dark" className={styles.mapPill}>
          <Icon name="coffee" size={16} />
          UB Coffee
        </Pill>
        <div className={styles.mapNote}>
          <p>
            <strong>UB Coffee</strong>
            {site.addressShort}
          </p>
          <Button href={site.directionsUrl} iconEnd="arrowUpRight">
            Rute
          </Button>
        </div>
      </AnimatedContent>
    </div>
  );
}
