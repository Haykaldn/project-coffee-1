"use client";

// Diadaptasi dari React Bits "ScrollVelocity" (reactbits.dev).
// Teks berjalan tanpa putus; kecepatannya bertambah mengikuti kecepatan scroll pengunjung.
// Berhenti total untuk prefers-reduced-motion, dan intensitas dikurangi di layar HP.

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useIsMobile } from "@/components/ui/useIsMobile";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type VelocityTextProps = {
  children: ReactNode;
  baseVelocity: number; // px per detik; tanda menentukan arah
  className?: string;
  copies?: number;
};

export function VelocityText({ children, baseVelocity, className, copies = 4 }: VelocityTextProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });

  const copyRef = useRef<HTMLSpanElement>(null);
  // Animasi hanya berjalan saat pita terlihat (dengan sedikit margin), supaya tidak membebani saat di-scroll jauh.
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "200px 0px" });
  const [copyWidth, setCopyWidth] = useState(0);
  const mobile = useIsMobile();

  useIsoLayoutEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const measure = () => setCopyWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const x = useTransform(baseX, (v) => (copyWidth ? `${wrap(-copyWidth, 0, v)}px` : "0px"));

  useAnimationFrame((_, delta) => {
    if (reduce || !copyWidth || !inView) return;
    const intensity = mobile ? 0.5 : 1;
    // Arah selalu mengikuti baseVelocity (tidak berbalik saat scroll ke atas); scroll hanya menambah kecepatan.
    let moveBy = baseVelocity * intensity * (delta / 1000);
    const factor = velocityFactor.get();
    moveBy += moveBy * Math.min(Math.abs(factor), 6) * intensity;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={containerRef} className={className} style={{ overflow: "hidden", whiteSpace: "nowrap", display: "flex" }}>
      <motion.div style={{ x, display: "flex", flexWrap: "nowrap", willChange: "transform" }}>
        {Array.from({ length: copies }, (_, i) => (
          <span key={i} ref={i === 0 ? copyRef : undefined} style={{ flexShrink: 0 }}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
