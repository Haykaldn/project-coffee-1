"use client";

import { Fragment } from "react";
import { VelocityText } from "@/components/reactbits/ScrollVelocity";
import { menu } from "@/data/menu";
import styles from "./VelocityBands.module.css";

const tagline = ["Kopi Arjuna", "Diseduh di Kampus", "UB Coffee", "Ruang Temu Dosen & Mahasiswa"];
const menuNames = menu.map((item) => item.name);

function Row({ items, sep }: { items: string[]; sep: string }) {
  return (
    <>
      {items.map((text) => (
        <Fragment key={text}>
          <span>{text}</span>
          <span className={styles.sep} aria-hidden="true">
            {sep}
          </span>
        </Fragment>
      ))}
    </>
  );
}

// Dua pita teks yang saling menyilang di batas bawah hero, bergerak berlawanan arah.
// Dekoratif, jadi disembunyikan dari pembaca layar.
export default function VelocityBands() {
  return (
    <div className={styles.bands} aria-hidden="true">
      <div className={`${styles.band} ${styles.white}`}>
        <VelocityText baseVelocity={40} className={styles.track}>
          <Row items={menuNames} sep="✦" />
        </VelocityText>
      </div>
      <div className={`${styles.band} ${styles.blue}`}>
        <VelocityText baseVelocity={-55} className={styles.track}>
          <Row items={tagline} sep="·" />
        </VelocityText>
      </div>
    </div>
  );
}
