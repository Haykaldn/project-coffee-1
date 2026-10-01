import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { categoryLabel, formatDate, type NewsItem } from "@/data/news";
import EventStatus from "./EventStatus";
import styles from "./News.module.css";

export function CategoryBadge({ item }: { item: NewsItem }) {
  return (
    <span className={styles.badges}>
      <span className={`${styles.badge} ${styles[`badge_${item.category}`]}`}>{categoryLabel[item.category]}</span>
      <EventStatus item={item} className={styles.badgeDone} />
    </span>
  );
}

export default function NewsCard({ item, featured = false, headingLevel = 3 }: { item: NewsItem; featured?: boolean; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link href={`/berita/${item.slug}`} className={[styles.card, featured && styles.featured].filter(Boolean).join(" ")}>
      <div className={styles.media}>
        <Image
          src={item.image}
          alt=""
          fill
          sizes={featured ? "(max-width: 1023px) 100vw, 640px" : "(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 380px"}
        />
      </div>
      <div className={styles.body}>
        <CategoryBadge item={item} />
        <time dateTime={item.date} className={styles.date}>
          <Icon name="calendar" size={16} />
          {formatDate(item.date)}
        </time>
        <Heading className={styles.cardTitle}>{item.title}</Heading>
        <p>{item.excerpt}</p>
        <span className={styles.more}>
          Baca selengkapnya
          <Icon name="arrowRight" size={16} />
        </span>
      </div>
    </Link>
  );
}
