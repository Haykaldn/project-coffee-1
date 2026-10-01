import type { MenuItem } from "@/data/menu";
import styles from "./ui.module.css";

const labels = [
  ["pahit", "Pahit"],
  ["manis", "Manis"],
  ["asam", "Asam"],
] as const;

// Indikator rasa 5 titik, khusus minuman.
export default function TasteDots({ taste }: { taste: NonNullable<MenuItem["taste"]> }) {
  return (
    <dl className={styles.taste}>
      {labels.map(([key, label]) => (
        <div key={key} className={styles.tasteRow}>
          <dt>{label}</dt>
          <dd aria-label={`${label} ${taste[key]} dari 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={i < taste[key] ? styles.dotOn : styles.dot} aria-hidden="true" />
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
