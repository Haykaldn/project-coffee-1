"use client";

import { isEventPast, type NewsItem } from "@/data/news";
import useNow from "./useNow";

// Label "Selesai" untuk event yang tanggalnya sudah lewat. Dihitung di browser agar tidak basi setelah build.
export default function EventStatus({ item, className }: { item: NewsItem; className?: string }) {
  const now = useNow();
  if (now === null || !isEventPast(item, now)) return null;
  return <span className={className}>Selesai</span>;
}
