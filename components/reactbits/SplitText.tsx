"use client";

// Diadaptasi dari React Bits "SplitText" (reactbits.dev), memakai Motion alih-alih GSAP.
// Teks dipecah per huruf/kata lalu muncul bergantian. Pembaca layar membaca teks utuh lewat aria-label.

import { motion, type Variants } from "motion/react";
import type { ElementType } from "react";

type SplitTextProps = {
  text: string;
  id?: string;
  as?: ElementType;
  className?: string;
  splitType?: "chars" | "words";
  delay?: number; // jeda antar potongan, detik
  startDelay?: number; // detik
  duration?: number; // detik
};

export default function SplitText({
  text,
  id,
  as: Tag = "p",
  className,
  splitType = "chars",
  delay = 0.05,
  startDelay = 0,
  duration = 0.8,
}: SplitTextProps) {
  const pieces = splitType === "words" ? text.split(" ") : Array.from(text);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: delay, delayChildren: startDelay } },
  };
  const piece: Variants = {
    hidden: { opacity: 0, y: "0.45em", filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <Tag id={id} className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        style={{ display: "inline-block" }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {pieces.map((p, i) => (
          <motion.span key={i} variants={piece} style={{ display: "inline-block", whiteSpace: "pre" }}>
            {p === " " ? " " : p}
            {splitType === "words" && i < pieces.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
