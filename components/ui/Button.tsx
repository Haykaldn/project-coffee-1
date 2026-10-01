import type { AnchorHTMLAttributes, ReactNode } from "react";
import Icon, { type IconName } from "./Icon";
import styles from "./ui.module.css";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "outline" | "light" | "ghost";
  size?: "md" | "lg";
  icon?: IconName;
  iconEnd?: IconName;
  children: ReactNode;
};

// Tombol kapsul. Selalu berupa <a> karena semua aksi di situs ini adalah navigasi.
export default function Button({
  href,
  variant = "primary",
  size = "md",
  icon,
  iconEnd,
  className,
  children,
  ...rest
}: ButtonProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={[styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ")}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === "lg" ? 20 : 18} />}
      <span>{children}</span>
      {iconEnd && <Icon name={iconEnd} size={size === "lg" ? 20 : 18} className={styles.iconEnd} />}
    </a>
  );
}
