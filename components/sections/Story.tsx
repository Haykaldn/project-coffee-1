"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import Icon from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Pill";
import { useIsMobile } from "@/components/ui/useIsMobile";
import styles from "./Story.module.css";

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const k = mobile ? 0.4 : 1;
  const backY = useTransform(scrollYProgress, [0, 1], [40 * k, -40 * k]);
  const frontY = useTransform(scrollYProgress, [0, 1], [90 * k, -70 * k]);

  return (
    <section id="tentang" className={styles.story} aria-labelledby="story-title">
      <div className={`container ${styles.grid}`}>
        <AnimatedContent className={styles.text}>
          <Eyebrow>Cerita Kami</Eyebrow>
          <h2 id="story-title" className="section-title">
            Dari kebun di kaki Gunung Arjuna, <em>ke cangkir Anda.</em>
          </h2>
          <p className={styles.lead}>
            Biji kopi kami dipetik dari kebun rakyat di lereng Arjuna, disangrai dengan sabar, lalu diseduh di
            tengah kampus Universitas Brawijaya. UB Coffee hadir sebagai tempat singgah yang tenang untuk dosen,
            orang tua mahasiswa, dan siapa saja yang butuh jeda sejenak.
          </p>
          <p id="story-more" className={styles.lead} hidden={!expanded}>
            Sebagai unit usaha PT Brawijaya Multi Usaha, kami ikut menumbuhkan ekosistem usaha kampus, dari petani
            hingga barista. Setiap cangkir yang Anda pesan ikut mendukung kebun rakyat di lereng Arjuna.
          </p>
          <button
            type="button"
            className={styles.more}
            aria-expanded={expanded}
            aria-controls="story-more"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Lebih ringkas" : "Selengkapnya"}
            <Icon name="arrowRight" size={18} className={expanded ? styles.moreIconUp : styles.moreIcon} />
          </button>
        </AnimatedContent>

        <div className={styles.photos} ref={ref}>
          <motion.figure className={`${styles.photo} ${styles.back}`} style={{ y: backY }}>
            <Image
              src="/images/kebun-arjuna.svg"
              alt="Kebun kopi dengan buah ceri merah di kaki Gunung Arjuna"
              width={800}
              height={1000}
              sizes="(max-width: 767px) 70vw, 380px"
            />
          </motion.figure>
          <motion.figure className={`${styles.photo} ${styles.front}`} style={{ y: frontY }}>
            <Image
              src="/images/suasana-bar.svg"
              alt="Suasana bar UB Coffee dengan mesin espresso dan papan menu"
              width={800}
              height={1000}
              sizes="(max-width: 767px) 60vw, 320px"
            />
          </motion.figure>
          <AnimatedContent className={styles.badge} delay={0.3} scale={0.9} distance={20}>
            <span className={styles.badgeIcon}>
              <Icon name="bean" size={20} />
            </span>
            Arabika &amp; Robusta pilihan
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
