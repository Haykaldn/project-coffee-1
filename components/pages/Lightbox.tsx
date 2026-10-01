"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import Icon from "@/components/ui/Icon";
import styles from "./Lightbox.module.css";

export type LightboxItem = { src: string; alt: string; caption?: string; width: number; height: number };

type LightboxProps = {
  items: LightboxItem[];
  index: number | null;
  onChange: (index: number | null) => void;
};

// Tampilan foto layar penuh. Esc untuk menutup, panah kiri/kanan untuk berpindah foto.
export default function Lightbox({ items, index, onChange }: LightboxProps) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null && items[index] !== undefined;
  const count = items.length;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      lenis?.start();
      previous?.focus();
    };
  }, [open, lenis]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") onChange((index + 1) % count);
      if (e.key === "ArrowLeft") onChange((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onChange]);

  if (!open) return null;
  const item = items[index];

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Galeri foto" onClick={() => onChange(null)}>
      <button ref={closeRef} type="button" className={styles.close} aria-label="Tutup galeri" onClick={() => onChange(null)}>
        <Icon name="close" size={24} />
      </button>

      {count > 1 && (
        <button
          type="button"
          className={`${styles.nav} ${styles.prev}`}
          aria-label="Foto sebelumnya"
          onClick={(e) => {
            e.stopPropagation();
            onChange((index - 1 + count) % count);
          }}
        >
          <Icon name="arrowLeft" size={24} />
        </button>
      )}

      <figure className={styles.figure} onClick={(e) => e.stopPropagation()}>
        <div className={styles.frame}>
          <Image key={`${index}-${item.src}`} src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="90vw" />
        </div>
        <figcaption className={styles.caption}>
          <span>{item.caption ?? item.alt}</span>
          <span className={styles.counter}>
            {index + 1} / {count}
          </span>
        </figcaption>
      </figure>

      {count > 1 && (
        <button
          type="button"
          className={`${styles.nav} ${styles.next}`}
          aria-label="Foto berikutnya"
          onClick={(e) => {
            e.stopPropagation();
            onChange((index + 1) % count);
          }}
        >
          <Icon name="arrowRight" size={24} />
        </button>
      )}
    </div>
  );
}
