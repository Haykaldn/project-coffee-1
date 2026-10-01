import Image from "next/image";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import { Eyebrow } from "@/components/ui/Pill";
import SaveButton from "@/components/ui/SaveButton";
import { favoriteMenu, formatRupiah } from "@/data/menu";
import styles from "./FavoriteMenu.module.css";

// Bulatan ala story highlight Instagram, masing-masing menuju bagian yang relevan.
const highlights = [
  { label: "Menu", href: "#menu-lainnya", image: "/images/menu/cappuccino.svg" },
  { label: "About UB Coffee ", href: "#tentang", image: "/images/kebun-arjuna.svg" },
  { label: "Suasana", href: "#suasana", image: "/images/suasana-bar.svg" },
  { label: "Coworking", href: "#coworking", image: "/images/coworking.svg" },
  { label: "Acara", href: "#acara", image: "/images/live-akustik.svg" },
  { label: "Lokasi", href: "#lokasi", image: "/images/lokasi-peta.svg" },
];

export default function FavoriteMenu() {
  return (
    <section id="menu" className={styles.section} aria-labelledby="favorite-title">
      <div className="container">
        <nav aria-label="Sorotan">
          <ul className={styles.highlights}>
            {highlights.map((h) => (
              <li key={h.label}>
                <a href={h.href} className={styles.highlight}>
                  <span className={styles.ring}>
                    <Image src={h.image} alt="" width={96} height={96} />
                  </span>
                  <span className={styles.highlightLabel}>{h.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.head}>
          <AnimatedContent>
            <Eyebrow>Menu Favorit</Eyebrow>
            <h2 id="favorite-title" className="section-title">
              Pilihan yang <em>selalu dicari</em>
            </h2>
          </AnimatedContent>
          <a href="#menu-lainnya" className={styles.seeAll}>
            Lihat semua menu
          </a>
        </div>

        <ul className={styles.grid}>
          {favoriteMenu.map((item, i) => (
            <AnimatedContent as="li" key={item.id} delay={(i % 3) * 0.1} distance={50}>
              <article className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={item.image}
                    alt={`Foto ${item.name}`}
                    width={800}
                    height={800}
                    sizes="(max-width: 767px) 90vw, (max-width: 1279px) 45vw, 380px"
                  />
                  <span className={styles.category}>{item.category}</span>
                  <SaveButton id={item.id} name={item.name} className={styles.save} />
                </div>
                <div className={styles.body}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <strong className={styles.price}>{formatRupiah(item.price)}</strong>
                </div>
              </article>
            </AnimatedContent>
          ))}
        </ul>
      </div>
    </section>
  );
}
