import Image from "next/image";
import Link from "next/link";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import Button from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Pill";
import { gallery } from "@/data/gallery";
import styles from "./HomePreview.module.css";

// Cuplikan galeri di beranda. Galeri lengkap ada di /suasana.
const previewIds = ["bar-utama", "live-akustik", "kopi-susu", "gedung", "v60"];
const preview = previewIds.map((id) => gallery.find((g) => g.id === id)).filter((g) => g !== undefined);

export default function SuasanaPreview() {
  return (
    <section id="suasana" className={`${styles.section} ${styles.suasana}`} aria-labelledby="suasana-title">
      <div className="container">
        <div className={styles.head}>
          <AnimatedContent>
            <Eyebrow>Suasana</Eyebrow>
            <h2 id="suasana-title" className="section-title">
              Sudut-sudut <em>favorit.</em>
            </h2>
            <p className={styles.lead}>Intip ruangan, kegiatan, live musik, dan kopi yang menemani hari-hari di UB Coffee.</p>
          </AnimatedContent>
          <Button href="/suasana" variant="outline" size="lg" iconEnd="arrowRight">
            Lihat selengkapnya
          </Button>
        </div>

        <ul className={styles.bento}>
          {preview.map((item, i) => (
            <AnimatedContent as="li" key={item.id} delay={i * 0.06} distance={30}>
              <Link href="/suasana" className={styles.tile}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={i === 0 ? "(max-width: 767px) 100vw, 480px" : "(max-width: 767px) 50vw, 340px"}
                />
                <span className={styles.tileCaption}>{item.caption}</span>
              </Link>
            </AnimatedContent>
          ))}
        </ul>
      </div>
    </section>
  );
}
