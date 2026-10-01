"use client";

import { motion } from "motion/react";
import { useSyncExternalStore } from "react";
import Icon from "./Icon";
import styles from "./SaveButton.module.css";

const KEY = "ubcoffee:saved";
const EVENT = "ubcoffee:saved-change";

function readRaw() {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parse(raw: string): string[] {
  try {
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

// Tombol simpan (ikon hati). Pilihan hanya disimpan di browser pengunjung.
export default function SaveButton({ id, name, className }: { id: string; name: string; className?: string }) {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "[]");
  const saved = parse(raw).includes(id);

  const toggle = () => {
    const list = parse(readRaw()).filter((x) => x !== id);
    try {
      localStorage.setItem(KEY, JSON.stringify(saved ? list : [...list, id]));
    } catch {
      // Penyimpanan browser tidak tersedia; abaikan.
    }
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <motion.button
      type="button"
      className={[styles.save, saved && styles.saved, className].filter(Boolean).join(" ")}
      aria-pressed={saved}
      aria-label={saved ? `Hapus ${name} dari simpanan` : `Simpan ${name}`}
      onClick={toggle}
      whileTap={{ scale: 0.85 }}
    >
      <Icon name="heart" size={20} />
    </motion.button>
  );
}
