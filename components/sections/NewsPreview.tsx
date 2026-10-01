import AnimatedContent from "@/components/reactbits/AnimatedContent";
import NewsCard from "@/components/pages/NewsCard";
import Button from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Pill";
import { sortedNews } from "@/data/news";
import styles from "./HomePreview.module.css";

// 3 berita terbaru di beranda. Daftar lengkap ada di /berita.
export default function NewsPreview() {
  return (
    <section id="acara" className={`${styles.section} ${styles.berita}`} aria-labelledby="berita-title">
      <div className="container">
        <div className={styles.head}>
          <AnimatedContent>
            <Eyebrow>Berita & Acara</Eyebrow>
            <h2 id="berita-title" className="section-title">
              Kabar dari <em>kedai.</em>
            </h2>
            <p className={styles.lead}>Event, promo, dan kabar terbaru dari UB Coffee.</p>
          </AnimatedContent>
          <Button href="/berita" variant="outline" size="lg" iconEnd="arrowRight">
            Lihat selengkapnya
          </Button>
        </div>

        <ul className={styles.news}>
          {sortedNews.slice(0, 3).map((item, i) => (
            <AnimatedContent as="li" key={item.slug} delay={i * 0.08} distance={30}>
              <NewsCard item={item} />
            </AnimatedContent>
          ))}
        </ul>
      </div>
    </section>
  );
}
