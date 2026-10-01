"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Pill";
import TasteDots from "@/components/ui/TasteDots";
import { formatRupiah, menu } from "@/data/menu";
import { whatsappLink } from "@/data/site";
import styles from "./MenuShowcase.module.css";

const filters = [
  { key: "all", label: "Semua" },
  { key: "drink", label: "Minuman" },
  { key: "food", label: "Makanan" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

const ease = [0.22, 1, 0.36, 1] as const;

// Putar otomatis: setelah animasi ganti menu selesai (~1,2 dtk), menu diam selama AUTOPLAY_PAUSE lalu berganti.
// Berhenti selama pengunjung mengarahkan kursor / fokus keyboard di section ini, dan selama IDLE_RESUME
// setelah klik terakhir. Tidak berjalan saat section tidak terlihat atau pengguna memilih reduced motion.
const SLIDE_ANIMATION = 1200;
const AUTOPLAY_PAUSE = 2500;
const IDLE_RESUME = 3000;

// Teks detail muncul bergantian.
const textGroup: Variants = {
  enter: { transition: { staggerChildren: 0.09 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};
const textItem: Variants = {
  initial: { opacity: 0, y: 14 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.35, ease: "easeIn" } },
};

export default function MenuShowcase() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const idleTimer = useRef<number | undefined>(undefined);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const reduceMotion = useReducedMotion();

  const items = filter === "all" ? menu : menu.filter((m) => m.type === filter);
  const item = items[Math.min(index, items.length - 1)];

  const go = (next: number) => {
    const total = items.length;
    setDir(next >= index ? 1 : -1);
    setIndex((next + total) % total);
  };

  const changeFilter = (key: FilterKey) => {
    setFilter(key);
    setIndex(0);
    setDir(1);
  };

  // Setiap klik/sentuhan menghentikan putar otomatis, lalu lanjut lagi setelah tidak ada klik selama IDLE_RESUME.
  const markInteraction = () => {
    setInteracting(true);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setInteracting(false), IDLE_RESUME);
  };

  useEffect(() => () => window.clearTimeout(idleTimer.current), []);

  const paused = hovering || focused || interacting || !inView || reduceMotion === true;
  const total = items.length;

  useEffect(() => {
    if (paused || total < 2) return;
    const id = window.setTimeout(() => {
      setDir(1);
      setIndex((i) => (i + 1) % total);
    }, SLIDE_ANIMATION + AUTOPLAY_PAUSE);
    return () => window.clearTimeout(id);
  }, [paused, index, total]);

  return (
    <section id="menu-lainnya" ref={sectionRef} className={styles.section} aria-labelledby="showcase-title">
      <div
        className={`container ${styles.grid}`}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHovering(false)}
        onPointerDown={markInteraction}
        onFocus={(e) => {
          if (e.target.matches(":focus-visible")) setFocused(true);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
        }}
      >
        <div className={styles.detail}>
          <AnimatedContent>
            <Eyebrow>Menu Lainnya</Eyebrow>
            <h2 id="showcase-title" className="section-title">
              Temani setiap <em>jeda harimu.</em>
            </h2>
          </AnimatedContent>

          <div className={styles.filters} role="group" aria-label="Saring menu">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                className={filter === f.key ? styles.filterActive : styles.filter}
                aria-pressed={filter === f.key}
                onClick={() => changeFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className={styles.itemArea}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.id}
                className={styles.item}
                variants={textGroup}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <motion.p variants={textItem} className={styles.category}>
                  {item.category}
                </motion.p>
                <motion.h3 variants={textItem} className={styles.name}>
                  {item.name}
                </motion.h3>
                <motion.p variants={textItem} className={styles.desc}>
                  {item.description}
                </motion.p>
                {item.taste && (
                  <motion.div variants={textItem}>
                    <TasteDots taste={item.taste} />
                  </motion.div>
                )}
                <motion.div variants={textItem} className={styles.buy}>
                  <strong className={styles.price}>{formatRupiah(item.price)}</strong>
                  <Button href={whatsappLink(`Halo UB Coffee, saya ingin memesan ${item.name}.`)} icon="whatsapp">
                    Pesan lewat WhatsApp
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.pager}>
            <button type="button" className={styles.navBtn} onClick={() => go(index - 1)}>
              <Icon name="arrowLeft" size={18} />
              Sebelumnya
            </button>
            <p className={styles.count} aria-live="polite">
              Menu <strong>{index + 1}</strong> dari {items.length}
              <span className="visually-hidden">: {item.name}</span>
            </p>
            <button type="button" className={styles.navBtn} onClick={() => go(index + 1)}>
              Berikutnya
              <Icon name="arrowRight" size={18} />
            </button>
          </div>

          <div className={styles.dots}>
            {items.map((m, i) => (
              <button
                key={m.id}
                type="button"
                className={i === index ? styles.dotActive : styles.dot}
                aria-label={`Tampilkan ${m.name}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </div>

        <div className={styles.panel}>
          <span className={styles.panelRing} aria-hidden="true" />
          <span className={styles.panelNumber} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={item.id}
              className={styles.photo}
              custom={dir}
              initial={{ opacity: 0, rotate: dir * 24, scale: 0.9 }}
              animate={{ opacity: 1, rotate: 0, scale: 1, transition: { duration: 1.2, ease } }}
              exit={{ opacity: 0, rotate: dir * -24, scale: 0.9, transition: { duration: 0.7, ease } }}
            >
              <Image src={item.image} alt={`Foto ${item.name}`} width={800} height={800} sizes="(max-width: 767px) 70vw, 420px" />
            </motion.div>
          </AnimatePresence>
          <span className={styles.panelLabel}>{item.category}</span>
        </div>
      </div>
    </section>
  );
}
