"use client";

import { useSyncExternalStore } from "react";

// Waktu sekarang (dibulatkan per menit) yang hanya tersedia di browser.
// Di server bernilai null, sehingga status "Buka/Tutup" dan "Selesai" tidak ikut dibekukan saat build.
const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
};
const getSnapshot = () => Math.floor(Date.now() / 60_000) * 60_000;
const getServerSnapshot = () => null;

export default function useNow(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
