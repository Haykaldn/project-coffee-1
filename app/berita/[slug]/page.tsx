import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import NewsCard, { CategoryBadge } from "@/components/pages/NewsCard";
import { BackLink } from "@/components/pages/PageHeader";
import PageShell from "@/components/pages/PageShell";
import shared from "@/components/pages/pages.module.css";
import styles from "@/components/pages/News.module.css";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Pill";
import { formatDate, getNews, news, sortedNews } from "@/data/news";
import { reservationLink, site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getNews((await params).slug);
  if (!item) return {};
  return { title: `${item.title} | UB Coffee`, description: item.excerpt };
}

export default async function BeritaDetailPage({ params }: Props) {
  const item = getNews((await params).slug);
  if (!item) notFound();

  const others = sortedNews.filter((n) => n.slug !== item.slug).slice(0, 3);
  const isEvent = item.category === "event";

  return (
    <PageShell>
      <article className={styles.detail}>
        <div className={`container ${styles.detailHead}`}>
          <BackLink href="/berita" label="Kembali ke berita" />
          <AnimatedContent>
            <CategoryBadge item={item} />
            <h1 className={`section-title ${styles.detailTitle}`}>{item.title}</h1>
            <time dateTime={item.date} className={styles.date}>
              <Icon name="calendar" size={16} />
              {formatDate(item.date)}
            </time>
          </AnimatedContent>
        </div>

        <div className="container">
          <AnimatedContent className={styles.detailMedia} scale={0.98}>
            <Image src={item.image} alt="" fill priority sizes="(max-width: 1200px) 100vw, 1200px" />
          </AnimatedContent>

          <div className={[styles.detailBody, isEvent && styles.detailBodyEvent].filter(Boolean).join(" ")}>
            <div className={styles.content}>
              {item.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {isEvent && (
              <aside className={`${shared.card} ${styles.eventCard}`} aria-label="Detail acara">
                <h2>Detail acara</h2>
                <dl>
                  <div>
                    <dt>
                      <Icon name="calendar" size={20} />
                      Tanggal
                    </dt>
                    <dd>{formatDate(item.date)}</dd>
                  </div>
                  {item.eventTime && (
                    <div>
                      <dt>
                        <Icon name="clock" size={20} />
                        Jam
                      </dt>
                      <dd>{item.eventTime}</dd>
                    </div>
                  )}
                  <div>
                    <dt>
                      <Icon name="mapPin" size={20} />
                      Tempat
                    </dt>
                    <dd>{item.eventLocation ?? site.addressShort}</dd>
                  </div>
                </dl>
                <Button href={reservationLink(`Halo UB Coffee, saya ingin bertanya tentang acara "${item.title}".`)} icon="whatsapp">
                  Tanya via WhatsApp
                </Button>
              </aside>
            )}
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className={`${shared.section} ${shared.sectionTint}`} aria-labelledby="lainnya-title">
          <div className="container">
            <div className={shared.sectionHead}>
              <Eyebrow>Berita lainnya</Eyebrow>
              <h2 id="lainnya-title" className="section-title">
                Kabar <em>lainnya.</em>
              </h2>
            </div>
            <ul className={styles.grid}>
              {others.map((n) => (
                <li key={n.slug}>
                  <NewsCard item={n} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </PageShell>
  );
}
