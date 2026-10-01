import type { ReactNode } from "react";
import styles from "./ui.module.css";

type PillProps = { children: ReactNode; tone?: "light" | "dark"; className?: string };

export function Pill({ children, tone = "light", className }: PillProps) {
  return <span className={[styles.pill, styles[`pill_${tone}`], className].filter(Boolean).join(" ")}>{children}</span>;
}

// Label kecil hijau di atas judul section.
export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return <p className={[styles.eyebrow, tone === "dark" && styles.eyebrow_dark].filter(Boolean).join(" ")}>{children}</p>;
}
