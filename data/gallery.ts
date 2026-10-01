// Foto suasana & kegiatan UB Coffee.
// TODO(konfirmasi): semua `src` masih ilustrasi placeholder. Ganti dengan foto asli (taruh di
// public/images/galeri/) dan sesuaikan width/height dengan ukuran foto.

export type GalleryCategory = "ruangan" | "kegiatan" | "live-musik" | "kopi";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  width: number;
  height: number;
};

export const galleryCategories: { value: GalleryCategory | "semua"; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "ruangan", label: "Ruangan" },
  { value: "kegiatan", label: "Kegiatan" },
  { value: "live-musik", label: "Live Musik" },
  { value: "kopi", label: "Kopi" },
];

export const gallery: GalleryItem[] = [
  {
    id: "bar-utama",
    src: "/images/suasana-bar.svg",
    alt: "Area bar UB Coffee dengan mesin espresso dan papan menu",
    caption: "Area bar, tempat semua pesanan diseduh.",
    category: "ruangan",
    width: 800,
    height: 1000,
  },
  {
    id: "live-akustik",
    src: "/images/live-akustik.svg",
    alt: "Penampil akustik bermain gitar di UB Coffee",
    caption: "Live akustik di akhir pekan.",
    category: "live-musik",
    width: 600,
    height: 600,
  },
  {
    id: "kopi-susu",
    src: "/images/menu/kopi-susu-arjuna.svg",
    alt: "Segelas kopi susu Arjuna",
    caption: "Kopi Susu Arjuna, favorit pengunjung.",
    category: "kopi",
    width: 800,
    height: 800,
  },
  {
    id: "coworking",
    src: "/images/coworking.svg",
    alt: "Meja coworking dengan laptop dan secangkir kopi",
    caption: "Sudut kerja yang tenang untuk fokus.",
    category: "ruangan",
    width: 600,
    height: 600,
  },
  {
    id: "gedung",
    src: "/images/hero-building.svg",
    alt: "Tampak depan gedung UB Coffee",
    caption: "Tampak depan UB Coffee di Jl. MT. Haryono.",
    category: "ruangan",
    width: 1600,
    height: 700,
  },
  {
    id: "v60",
    src: "/images/menu/v60-arabika-arjuna.svg",
    alt: "Seduhan manual V60 arabika Arjuna",
    caption: "Seduh manual V60 dengan arabika Arjuna.",
    category: "kopi",
    width: 800,
    height: 800,
  },
  {
    id: "kebun",
    src: "/images/kebun-arjuna.svg",
    alt: "Kebun kopi di lereng Gunung Arjuna",
    caption: "Kunjungan ke kebun kopi di lereng Arjuna.",
    category: "kegiatan",
    width: 800,
    height: 1000,
  },
  {
    id: "rapat",
    src: "/images/lokasi-peta.svg",
    alt: "Ilustrasi kegiatan diskusi di UB Coffee",
    caption: "Diskusi dan rapat kecil bersama komunitas.",
    category: "kegiatan",
    width: 600,
    height: 600,
  },
  {
    id: "cappuccino",
    src: "/images/menu/cappuccino.svg",
    alt: "Secangkir cappuccino dengan latte art",
    caption: "Cappuccino hangat untuk pagi hari.",
    category: "kopi",
    width: 800,
    height: 800,
  },
  {
    id: "ranting-kopi",
    src: "/images/coffee-branch.svg",
    alt: "Ranting kopi dengan buah ceri merah",
    caption: "Buah ceri kopi sebelum dipanen.",
    category: "kegiatan",
    width: 700,
    height: 1100,
  },
  {
    id: "akustik-malam",
    src: "/images/live-akustik.svg",
    alt: "Suasana live musik malam di UB Coffee",
    caption: "Musik santai untuk menutup hari.",
    category: "live-musik",
    width: 600,
    height: 600,
  },
  {
    id: "es-kopi-aren",
    src: "/images/menu/es-kopi-aren.svg",
    alt: "Es kopi aren dalam gelas",
    caption: "Es Kopi Aren, segar di siang hari.",
    category: "kopi",
    width: 800,
    height: 800,
  },
];

// Foto meeting room / area coworking (dipakai di beranda dan halaman /coworking).
// TODO(konfirmasi): ganti dengan foto asli meeting room / area coworking.
export const coworkingPhotos = [
  { src: "/images/coworking.svg", alt: "Meja kerja dengan laptop di area coworking UB Coffee", caption: "Area coworking", width: 600, height: 600 },
  { src: "/images/hero-building.svg", alt: "Tampak depan gedung UB Coffee", caption: "Tampak depan UB Coffee", width: 1600, height: 700 },
  { src: "/images/suasana-bar.svg", alt: "Area bar UB Coffee", caption: "Area bar, dekat ruang meeting", width: 800, height: 1000 },
  { src: "/images/lokasi-peta.svg", alt: "Ilustrasi suasana ruang meeting", caption: "Ruang meeting", width: 600, height: 600 },
  { src: "/images/live-akustik.svg", alt: "Suasana acara di UB Coffee", caption: "Suasana acara", width: 600, height: 600 },
];
