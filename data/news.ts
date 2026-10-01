// Berita, promo, dan acara UB Coffee.
// TODO(konfirmasi): SEMUA entri di bawah adalah CONTOH untuk mengisi tata letak, bukan berita asli.
// Ganti dengan berita resmi dari UB Coffee sebelum website dipublikasikan.

export type NewsCategory = "event" | "promo" | "info";

export type NewsItem = {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string; // YYYY-MM-DD (WIB). Untuk event: tanggal acara.
  excerpt: string;
  content: string[]; // satu string = satu paragraf
  image: string;
  eventTime?: string;
  eventLocation?: string;
  featured?: boolean;
};

export const newsCategories: { value: NewsCategory | "semua"; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "event", label: "Event" },
  { value: "promo", label: "Promo" },
  { value: "info", label: "Info" },
];

export const categoryLabel: Record<NewsCategory, string> = {
  event: "Event",
  promo: "Promo",
  info: "Info",
};

const note = "[CONTOH] Ini adalah teks contoh untuk mengisi tata letak halaman dan bukan berita resmi UB Coffee.";

export const news: NewsItem[] = [
  {
    slug: "contoh-live-akustik-akhir-pekan",
    title: "[CONTOH] Live Akustik Akhir Pekan",
    category: "event",
    date: "2026-10-10",
    eventTime: "19.00 – 21.00 WIB",
    eventLocation: "UB Coffee, Jl. MT. Haryono No.169, Malang",
    excerpt: "[CONTOH] Contoh pengumuman acara musik akustik di akhir pekan.",
    content: [
      note,
      "Paragraf ini menunjukkan bagaimana isi pengumuman acara akan tampil: siapa yang tampil, apa yang bisa dinikmati pengunjung, dan hal lain yang perlu diketahui sebelum datang.",
      "Detail acara di sisi kanan (tanggal, jam, dan tempat) diambil otomatis dari data berita.",
    ],
    image: "/images/live-akustik.svg",
    featured: true,
  },
  {
    slug: "contoh-promo-kopi-susu",
    title: "[CONTOH] Promo Kopi Susu Arjuna",
    category: "promo",
    date: "2026-09-15",
    excerpt: "[CONTOH] Contoh tampilan kartu promo menu.",
    content: [
      note,
      "Paragraf ini menunjukkan tempat untuk menjelaskan isi promo, syarat dan ketentuan, serta periode berlakunya.",
    ],
    image: "/images/menu/kopi-susu-arjuna.svg",
  },
  {
    slug: "contoh-workshop-seduh-manual",
    title: "[CONTOH] Workshop Seduh Manual",
    category: "event",
    date: "2026-08-22",
    eventTime: "15.00 – 17.00 WIB",
    eventLocation: "Meeting Room UB Coffee",
    excerpt: "[CONTOH] Contoh acara yang sudah lewat, otomatis diberi label Selesai.",
    content: [
      note,
      "Acara ini sengaja diberi tanggal yang sudah lewat untuk menunjukkan label “Selesai” pada kartu dan halaman detail.",
    ],
    image: "/images/menu/v60-arabika-arjuna.svg",
  },
  {
    slug: "contoh-info-jam-operasional",
    title: "[CONTOH] Info Jam Operasional",
    category: "info",
    date: "2026-09-01",
    excerpt: "[CONTOH] Contoh tampilan kartu informasi umum.",
    content: [
      note,
      "Kategori Info dipakai untuk kabar umum seperti perubahan jam buka, fasilitas baru, atau pengumuman lainnya.",
    ],
    image: "/images/hero-building.svg",
  },
  {
    slug: "contoh-diskusi-komunitas",
    title: "[CONTOH] Diskusi Komunitas di Meeting Room",
    category: "event",
    date: "2026-11-07",
    eventTime: "13.00 – 15.00 WIB",
    eventLocation: "Meeting Room UB Coffee",
    excerpt: "[CONTOH] Contoh acara mendatang yang diadakan di Meeting Room.",
    content: [
      note,
      "Paragraf ini menunjukkan tempat untuk menjelaskan topik, pembicara, dan cara mendaftar acara.",
    ],
    image: "/images/coworking.svg",
  },
  {
    slug: "contoh-promo-menu-baru",
    title: "[CONTOH] Promo Menu Baru",
    category: "promo",
    date: "2026-07-10",
    excerpt: "[CONTOH] Contoh kartu promo untuk peluncuran menu.",
    content: [note, "Paragraf ini menunjukkan tempat untuk memperkenalkan menu baru beserta harganya."],
    image: "/images/menu/matcha-latte.svg",
  },
];

// Diurutkan dari yang terbaru.
export const sortedNews = [...news].sort((a, b) => b.date.localeCompare(a.date));

export function getNews(slug: string) {
  return news.find((n) => n.slug === slug);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(
    new Date(`${date}T12:00:00+07:00`)
  );
}

// Event dianggap selesai setelah tanggal acaranya berakhir (WIB).
export function isEventPast(item: NewsItem, now: number) {
  return item.category === "event" && now > Date.parse(`${item.date}T23:59:59+07:00`);
}
