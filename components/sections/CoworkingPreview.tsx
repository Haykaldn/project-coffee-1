import Image from "next/image";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Pill";
import { coworkingPhotos } from "@/data/gallery";
import styles from "./HomePreview.module.css";

// Cuplikan coworking di beranda. Detail meeting room ada di /coworking.
export default function CoworkingPreview() {
  return (
    <section id="coworking" className={`${styles.section} ${styles.coworking}`} aria-labelledby="coworking-title">
      <div className={`container ${styles.split}`}>
        <AnimatedContent className={styles.collage}>
          {coworkingPhotos.slice(0, 3).map((photo, i) => (
            <div key={photo.src} className={styles.photo}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={i === 0 ? "(max-width: 1023px) 100vw, 620px" : "(max-width: 1023px) 50vw, 300px"}
              />
            </div>
          ))}
        </AnimatedContent>

        <AnimatedContent delay={0.1} className={styles.text}>
          <Eyebrow>Coworking Space</Eyebrow>
          <h2 id="coworking-title" className="section-title">
            Ruang untuk <em>berkarya.</em>
          </h2>
          <p>
            Tempat nyaman untuk bekerja, belajar, dan bertemu. Meeting Room kami menampung hingga 15 orang, lengkap dengan
            air mineral, LCD proyektor, dan set audio gratis.
          </p>
          <ul className={styles.stats}>
            <li>
              <Icon name="users" size={22} />
              Hingga 15 orang
            </li>
            <li>
              <Icon name="projector" size={22} />
              Fasilitas lengkap
            </li>
          </ul>
          <Button href="/coworking" size="lg" iconEnd="arrowRight">
            Lihat meeting room
          </Button>
        </AnimatedContent>
      </div>
    </section>
  );
}
