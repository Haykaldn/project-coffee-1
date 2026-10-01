# Website UB Coffee

Redesign website UB Coffee (unit usaha PT Brawijaya Multi Usaha), dibangun dengan Next.js 16, Motion, Lenis, dan komponen adaptasi React Bits. Mengikuti `../UB-Coffee-Website-Spec.md`.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produksi
npm start
```

## Struktur

```
app/                 layout (font, metadata, Lenis), page (susunan section), globals.css (variabel warna)
components/layout/   Navbar, Footer, Providers (Lenis + MotionConfig)
components/sections/ Hero, VelocityBands, Story, FavoriteMenu, MenuShowcase, InfoSection
components/ui/       Button, Pill/Eyebrow, TasteDots, Icon, Logo, SaveButton, useIsMobile
components/reactbits/ SplitText, ScrollVelocity, AnimatedContent (diadaptasi ke Motion)
data/menu.ts         daftar menu, harga, rasa
data/site.ts         kontak, jam buka, link, navigasi
scripts/generate-images.mjs  pembuat ilustrasi SVG placeholder di public/images
```

## Konten yang masih placeholder

Semua yang perlu dikonfirmasi ditandai `TODO(konfirmasi)` di kode:

- `data/site.ts`: nomor WhatsApp, Instagram, website BMU, link Google Maps, jam buka, jadwal live akustik, info coworking
- `data/menu.ts`: nama menu, harga, kategori, profil rasa (sebaiknya dari barista)
- `components/ui/Logo.tsx` dan `app/icon.svg`: logo sementara, ganti dengan logo resmi
- `public/images/`: ilustrasi SVG sementara. Ganti dengan foto asli (WebP/AVIF). Nama file cukup disesuaikan di `data/menu.ts` / komponen.

## Animasi

Lima jenis animasi, dipakai konsisten: teks judul per huruf (SplitText), parallax berlapis di hero dan foto cerita, pita velocity scroll, elemen muncul saat di-scroll (AnimatedContent), dan transisi foto berputar di Menu Lainnya. Semua gerakan dimatikan untuk `prefers-reduced-motion`, dan intensitas parallax/velocity dikurangi di HP.
