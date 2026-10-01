"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Smooth scroll (Lenis) + konfigurasi Motion global.
// reducedMotion="user" mematikan animasi gerak untuk pengguna yang mengaktifkan prefers-reduced-motion,
// dan untuk mereka scroll kembali ke perilaku bawaan browser.
export default function Providers({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: !reduce, anchors: { offset: -16 } }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
