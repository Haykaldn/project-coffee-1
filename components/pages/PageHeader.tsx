import Link from "next/link";
import type { ReactNode } from "react";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import Icon from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Pill";
import styles from "./pages.module.css";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  children?: ReactNode;
};

// Header halaman turunan, meniru gaya header section "Kunjungi Kami" di beranda.
export default function PageHeader({ eyebrow, title, lead, children }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className="container">
        <BackLink tone="dark" />
        <div className={styles.headerRow}>
          <AnimatedContent>
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h1 className={`section-title ${styles.headerTitle}`}>{title}</h1>
            <p className={styles.headerLead}>{lead}</p>
          </AnimatedContent>
          {children}
        </div>
      </div>
    </header>
  );
}

export function BackLink({ tone = "light", href = "/", label = "Kembali ke beranda" }: { tone?: "light" | "dark"; href?: string; label?: string }) {
  return (
    <Link href={href} className={[styles.back, tone === "dark" && styles.back_dark].filter(Boolean).join(" ")}>
      <Icon name="arrowLeft" size={18} />
      {label}
    </Link>
  );
}
