"use client";

import { useState } from "react";
import { newsCategories, sortedNews, type NewsCategory } from "@/data/news";
import NewsCard from "./NewsCard";
import shared from "./pages.module.css";
import styles from "./News.module.css";

// Daftar berita: 1 berita unggulan besar di atas, sisanya dalam grid. Bisa difilter per kategori.
export default function NewsList() {
  const [filter, setFilter] = useState<NewsCategory | "semua">("semua");
  const items = filter === "semua" ? sortedNews : sortedNews.filter((n) => n.category === filter);
  const featured = items.find((n) => n.featured) ?? items[0];
  const rest = items.filter((n) => n !== featured);

  return (
    <>
      <div className={shared.filters} role="group" aria-label="Filter kategori berita">
        {newsCategories.map((c) => (
          <button key={c.value} type="button" className={shared.filter} aria-pressed={filter === c.value} onClick={() => setFilter(c.value)}>
            {c.label}
          </button>
        ))}
      </div>

      {!featured ? (
        <p className={shared.empty}>Belum ada berita untuk kategori ini.</p>
      ) : (
        <>
          <NewsCard item={featured} featured headingLevel={2} />
          {rest.length > 0 && (
            <ul className={styles.grid}>
              {rest.map((item) => (
                <li key={item.slug}>
                  <NewsCard item={item} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
