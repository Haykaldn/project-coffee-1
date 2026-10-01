"use client";

import Image from "next/image";
import { useState } from "react";
import { gallery, galleryCategories, type GalleryCategory } from "@/data/gallery";
import Lightbox from "./Lightbox";
import shared from "./pages.module.css";
import styles from "./Suasana.module.css";

const labelOf = Object.fromEntries(galleryCategories.map((c) => [c.value, c.label]));

// Galeri masonry dengan filter kategori. Lightbox hanya berpindah di antara foto yang sedang tampil.
export default function MasonryGallery() {
  const [filter, setFilter] = useState<GalleryCategory | "semua">("semua");
  const [index, setIndex] = useState<number | null>(null);
  const items = filter === "semua" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <>
      <div className={shared.filters} role="group" aria-label="Filter kategori foto">
        {galleryCategories.map((c) => (
          <button
            key={c.value}
            type="button"
            className={shared.filter}
            aria-pressed={filter === c.value}
            onClick={() => {
              setFilter(c.value);
              setIndex(null);
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className={shared.empty}>Belum ada foto untuk kategori ini.</p>
      ) : (
        <ul className={styles.masonry}>
          {items.map((item, i) => (
            <li key={item.id}>
              <button type="button" className={styles.tile} onClick={() => setIndex(i)} aria-label={`Perbesar foto: ${item.caption}`}>
                <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 400px" />
                <span className={styles.tileCaption}>
                  <span className={styles.tileTag}>{labelOf[item.category]}</span>
                  {item.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Lightbox items={items} index={index} onChange={setIndex} />
    </>
  );
}
