"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, whatsappLink } from "@/data/site";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { LogoImage } from "@/components/ui/Logo";
import styles from "./Navbar.module.css";

// Section yang dipantau untuk menandai menu aktif.
const spyIds = ["beranda", "tentang", "menu", "menu-lainnya", "suasana", "coworking", "acara", "lokasi"];

// Di halaman selain beranda, menu yang aktif ditentukan dari alamat halaman.
const routeActive: [string, string][] = [
  ["/suasana", "suasana"],
  ["/coworking", "coworking"],
  ["/berita", "acara"],
];

export default function Navbar() {
  const [active, setActive] = useState("beranda");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";
  // Link navbar berupa anchor (#menu). Di halaman lain diarahkan kembali ke beranda (/#menu).
  const hrefFor = (href: string) => (onHome ? href : `/${href}`);
  const current = onHome ? active : (routeActive.find(([path]) => pathname.startsWith(path))?.[1] ?? "");

  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === "menu-lainnya" ? "menu" : entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    spyIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={[styles.wrap, scrolled && styles.wrapScrolled].filter(Boolean).join(" ")}>
      <nav className={[styles.nav, scrolled && styles.scrolled, open && styles.isOpen].filter(Boolean).join(" ")} aria-label="Navigasi utama">
        <a href={hrefFor("#beranda")} className={styles.brand} aria-label="UB Coffee, kembali ke beranda">
          <LogoImage />
        </a>

        <ul className={styles.links}>
          {navLinks.map((link) => {
            const isActive = current === link.href.slice(1);
            return (
              <li key={link.href}>
                <a href={hrefFor(link.href)} className={isActive ? styles.active : undefined} aria-current={isActive ? "true" : undefined}>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <Button href={whatsappLink()} icon="whatsapp" className={styles.cta}>
          Pesan via WhatsApp
        </Button>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>

        <div id="menu-mobile" className={styles.mobile} hidden={!open}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={hrefFor(link.href)}
                  className={[styles.mobileLink, current === link.href.slice(1) && styles.active].filter(Boolean).join(" ")}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                  <Icon name="arrowRight" size={18} />
                </a>
              </li>
            ))}
          </ul>
          <Button href={whatsappLink()} icon="whatsapp" size="lg">
            Pesan via WhatsApp
          </Button>
        </div>
      </nav>
    </header>
  );
}
