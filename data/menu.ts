// Daftar menu UB Coffee.
// TODO(konfirmasi): nama, harga, kategori, dan profil rasa masih placeholder.
// Profil rasa sebaiknya diisi oleh barista (lihat spesifikasi bagian 9).

export type MenuItem = {
  id: string;
  name: string;
  category: "Kopi" | "Non-Kopi" | "Makanan";
  type: "drink" | "food";
  description: string;
  price: number; // dalam rupiah
  image: string; // path di /public/images
  favorite?: boolean; // tampil di grid Menu Favorit
  taste?: { pahit: number; manis: number; asam: number }; // skala 0–5, khusus minuman
};

export const menu: MenuItem[] = [
  {
    id: "kopi-susu-arjuna",
    name: "Kopi Susu Arjuna",
    category: "Kopi",
    type: "drink",
    description: "Espresso robusta Arjuna, susu segar, dan gula aren. Andalan untuk menemani jam kuliah pagi.",
    price: 18000,
    image: "/images/menu/kopi-susu-arjuna.svg",
    favorite: true,
    taste: { pahit: 3, manis: 4, asam: 1 },
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "Kopi",
    type: "drink",
    description: "Espresso dengan busa susu tebal dan lembut, disajikan hangat dengan latte art.",
    price: 22000,
    image: "/images/menu/cappuccino.svg",
    favorite: true,
    taste: { pahit: 3, manis: 2, asam: 2 },
  },
  {
    id: "v60-arabika-arjuna",
    name: "V60 Arabika Arjuna",
    category: "Kopi",
    type: "drink",
    description: "Seduh manual biji arabika dari lereng Arjuna. Ringan, bersih, dengan sentuhan buah.",
    price: 25000,
    image: "/images/menu/v60-arabika-arjuna.svg",
    favorite: true,
    taste: { pahit: 2, manis: 1, asam: 4 },
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    category: "Non-Kopi",
    type: "drink",
    description: "Matcha pilihan dikocok halus di atas susu dingin. Lembut dan tidak terlalu manis.",
    price: 23000,
    image: "/images/menu/matcha-latte.svg",
    taste: { pahit: 1, manis: 3, asam: 0 },
  },
  {
    id: "croissant-mentega",
    name: "Croissant Mentega",
    category: "Makanan",
    type: "food",
    description: "Croissant berlapis renyah dengan mentega, dipanggang ulang saat dipesan.",
    price: 18000,
    image: "/images/menu/croissant-mentega.svg",
  },
  {
    id: "nasi-goreng-kampus",
    name: "Nasi Goreng Kampus",
    category: "Makanan",
    type: "food",
    description: "Nasi goreng bumbu rumahan dengan telur ceplok, acar timun, dan kerupuk.",
    price: 25000,
    image: "/images/menu/nasi-goreng-kampus.svg",
  },
  {
    id: "americano-arjuna",
    name: "Americano Arjuna",
    category: "Kopi",
    type: "drink",
    description: "Double shot espresso dan air, tersedia panas atau dingin. Tegas tanpa gula.",
    price: 16000,
    image: "/images/menu/americano-arjuna.svg",
    taste: { pahit: 4, manis: 0, asam: 3 },
  },
  {
    id: "caffe-latte",
    name: "Caffè Latte",
    category: "Kopi",
    type: "drink",
    description: "Espresso dengan lebih banyak susu hangat. Pilihan aman untuk rapat santai.",
    price: 22000,
    image: "/images/menu/caffe-latte.svg",
    taste: { pahit: 2, manis: 3, asam: 1 },
  },
  {
    id: "es-kopi-aren",
    name: "Es Kopi Aren",
    category: "Kopi",
    type: "drink",
    description: "Kopi dingin dengan sirup gula aren dan krim susu di atasnya.",
    price: 20000,
    image: "/images/menu/es-kopi-aren.svg",
    taste: { pahit: 3, manis: 4, asam: 1 },
  },
  {
    id: "coklat-brawijaya",
    name: "Cokelat Brawijaya",
    category: "Non-Kopi",
    type: "drink",
    description: "Cokelat hangat yang pekat dan lembut, cocok untuk sore yang hujan.",
    price: 20000,
    image: "/images/menu/coklat-brawijaya.svg",
    taste: { pahit: 1, manis: 4, asam: 0 },
  },
  {
    id: "teh-tarik",
    name: "Teh Tarik",
    category: "Non-Kopi",
    type: "drink",
    description: "Teh hitam dan susu yang ditarik hingga berbusa. Manis dan menyegarkan.",
    price: 15000,
    image: "/images/menu/teh-tarik.svg",
    taste: { pahit: 1, manis: 4, asam: 0 },
  },
  {
    id: "lemon-tea-selasih",
    name: "Lemon Tea Selasih",
    category: "Non-Kopi",
    type: "drink",
    description: "Teh dingin dengan perasan lemon dan biji selasih. Asam segar di siang terik.",
    price: 15000,
    image: "/images/menu/lemon-tea-selasih.svg",
    taste: { pahit: 0, manis: 3, asam: 4 },
  },
  {
    id: "roti-bakar-srikaya",
    name: "Roti Bakar Srikaya",
    category: "Makanan",
    type: "food",
    description: "Roti tebal dipanggang dengan mentega dan selai srikaya pandan buatan sendiri.",
    price: 17000,
    image: "/images/menu/roti-bakar-srikaya.svg",
  },
  {
    id: "pisang-goreng-keju",
    name: "Pisang Goreng Keju",
    category: "Makanan",
    type: "food",
    description: "Pisang goreng renyah dengan parutan keju dan saus cokelat.",
    price: 15000,
    image: "/images/menu/pisang-goreng-keju.svg",
  },
  {
    id: "mie-goreng-jawa",
    name: "Mie Goreng Jawa",
    category: "Makanan",
    type: "food",
    description: "Mie goreng bumbu Jawa dengan sawi, telur, dan taburan bawang goreng.",
    price: 22000,
    image: "/images/menu/mie-goreng-jawa.svg",
  },
];

export const favoriteMenu = menu.filter((item) => item.favorite);

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
