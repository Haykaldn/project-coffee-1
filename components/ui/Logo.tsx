import Image from "next/image";
import logoUbCoffee from "@/public/images/Logo UB COFFEE.png";
import styles from "./ui.module.css";

// Logo resmi UB Coffee (public/images/Logo UB COFFEE.png).
export function LogoImage({
  height = 44,
  alt = "UB Coffee, The Halal Cafe",
  priority = true,
}: {
  height?: number;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logoUbCoffee}
      alt={alt}
      height={height}
      style={{ width: "auto", height }}
      className={styles.logoImage}
      priority={priority}
    />
  );
}

// Logo + nama (dipakai di footer). Nama sudah tertulis di sebelahnya, jadi gambar logo diberi alt kosong.
export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className={[styles.logo, tone === "light" && styles.logo_light].filter(Boolean).join(" ")}>
      <LogoImage height={40} alt="" priority={false} />
      <span className={styles.logoText}>
        <strong>UB Coffee</strong>
        <small>by Brawijaya Multi Usaha</small>
      </span>
    </span>
  );
}
