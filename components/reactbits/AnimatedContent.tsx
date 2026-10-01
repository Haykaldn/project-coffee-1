"use client";

// Diadaptasi dari React Bits "AnimatedContent" (reactbits.dev), memakai Motion alih-alih GSAP.
// Elemen muncul (fade + geser halus) saat masuk layar. Hanya sekali, supaya tidak mengganggu.

import { motion } from "motion/react";
import type { ReactNode } from "react";

type AnimatedContentProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  delay?: number;
  duration?: number;
  scale?: number;
  as?: "div" | "li" | "article";
};

export default function AnimatedContent({
  children,
  className,
  distance = 40,
  direction = "vertical",
  reverse = false,
  delay = 0,
  duration = 0.8,
  scale = 1,
  as = "div",
}: AnimatedContentProps) {
  const offset = reverse ? -distance : distance;
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{
        opacity: 0,
        x: direction === "horizontal" ? offset : 0,
        y: direction === "vertical" ? offset : 0,
        scale,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
