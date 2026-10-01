"use client";

import Image from "next/image";
import { useState } from "react";
import Icon from "@/components/ui/Icon";
import Lightbox, { type LightboxItem } from "./Lightbox";
import styles from "./Coworking.module.css";

// Galeri ruangan: 1 foto besar + beberapa foto kecil. Klik untuk membuka lightbox.
export default function RoomGallery({ photos }: { photos: LightboxItem[] }) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <ul className={styles.gallery}>
        {photos.map((photo, i) => (
          <li key={`${photo.src}-${i}`} className={i === 0 ? styles.galleryMain : undefined}>
            <button type="button" className={styles.galleryItem} onClick={() => setIndex(i)} aria-label={`Perbesar foto: ${photo.alt}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={i === 0 ? "(max-width: 767px) 100vw, 600px" : "(max-width: 767px) 50vw, 300px"}
              />
              <span className={styles.zoom} aria-hidden="true">
                <Icon name="camera" size={18} />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={photos} index={index} onChange={setIndex} />
    </>
  );
}
