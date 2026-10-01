"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import SplitText from "@/components/reactbits/SplitText";
import Button from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { useIsMobile } from "@/components/ui/useIsMobile";
import styles from "./Hero.module.css";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax berlapis: gedung (belakang) turun pelan, daun (depan) naik lebih cepat.
  // Intensitas dikurangi di HP. MotionConfig reducedMotion="user" mematikannya bila diminta pengguna.
  const k = mobile ? 0.45 : 1;
  const buildingY = useTransform(scrollYProgress, [0, 1], [0, 140 * k]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90 * k]);
  const leafLeftY = useTransform(scrollYProgress, [0, 1], [0, -220 * k]);
  const leafRightY = useTransform(scrollYProgress, [0, 1], [0, -160 * k]);
  const leafLeftRotate = useTransform(scrollYProgress, [0, 1], [0, -8 * k]);
  const leafRightRotate = useTransform(scrollYProgress, [0, 1], [0, 8 * k]);

  return (
    <section id="beranda" ref={ref} className={styles.hero} aria-labelledby="hero-title">
      <motion.div className={styles.building} style={{ y: buildingY }}>
        <Image
          src="/images/hero-building.svg"
          alt="Ilustrasi gedung UB Coffee dengan jendela kaca besar dan teras payung"
          width={1600}
          height={700}
          preload
        />
      </motion.div>

      <motion.div className={styles.content} style={{ y: contentY }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Pill>Unit Usaha PT Brawijaya Multi Usaha</Pill>
        </motion.div>

        <SplitText as="h1" id="hero-title" text="UB COFFEE" className={styles.title} delay={0.06} startDelay={0.1} />

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Diseduh di kampus, dari lereng Arjuna
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button href="#menu" size="lg" iconEnd="arrowRight">
            Lihat Menu
          </Button>
          <Button href="#lokasi" size="lg" variant="outline" icon="mapPin">
            Kunjungi Kami
          </Button>
        </motion.div>
      </motion.div>

      <motion.div className={`${styles.leaf} ${styles.leafLeft}`} style={{ y: leafLeftY, rotate: leafLeftRotate }} aria-hidden="true">
        <Image src="/images/coffee-branch.svg" alt="" width={700} height={1100} preload />
      </motion.div>
      <motion.div className={`${styles.leaf} ${styles.leafRight}`} style={{ y: leafRightY, rotate: leafRightRotate }} aria-hidden="true">
        <Image src="/images/coffee-branch.svg" alt="" width={700} height={1100} />
      </motion.div>

      <div className={styles.fade} aria-hidden="true" />
    </section>
  );
}
