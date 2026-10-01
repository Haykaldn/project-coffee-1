"use client";

import { site } from "@/data/site";
import useNow from "./useNow";
import styles from "./Lokasi.module.css";

const toMinutes = (time: string) => {
  const [h, m] = time.split(".").map(Number);
  return h * 60 + m;
};

// WIB = UTC+7 sepanjang tahun (tanpa DST), jadi cukup digeser 7 jam.
function wibParts(now: number) {
  const d = new Date(now + 7 * 60 * 60 * 1000);
  return { day: d.getUTCDay(), minutes: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

// Tabel jam buka + status "Buka sekarang / Tutup" berdasarkan waktu WIB di perangkat pengunjung.
export default function OpeningHours() {
  const now = useNow();
  const wib = now === null ? null : wibParts(now);
  const today = wib ? site.hours.find((h) => h.days.includes(wib.day)) : undefined;
  const isOpen = wib && today ? wib.minutes >= toMinutes(today.open) && wib.minutes < toMinutes(today.close) : false;

  return (
    <div className={styles.hours}>
      <div className={styles.hoursHead}>
        <h2>Jam buka</h2>
        {wib && (
          <span className={[styles.status, isOpen ? styles.statusOpen : styles.statusClosed].join(" ")} role="status">
            ● {isOpen ? "Buka sekarang" : "Tutup"}
          </span>
        )}
      </div>
      <table className={styles.table}>
        <caption className="visually-hidden">Jam buka UB Coffee (WIB)</caption>
        <tbody>
          {site.hours.map((h) => {
            const isToday = today === h;
            return (
              <tr key={h.day} className={isToday ? styles.today : undefined} aria-current={isToday ? "date" : undefined}>
                <th scope="row">
                  {h.day}
                  {isToday && <span className={styles.todayTag}>Hari ini</span>}
                </th>
                <td>
                  {h.open} – {h.close}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className={styles.hoursNote}>Semua jam dalam WIB.</p>
    </div>
  );
}
