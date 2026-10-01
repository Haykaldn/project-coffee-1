// Info kontak dan operasional UB Coffee.
// TODO(konfirmasi): nilai bertanda TODO masih placeholder dan wajib dicek ke UB Coffee / BMU
// sebelum website dipublikasikan (lihat spesifikasi bagian 9).

export const site = {
  name: "UB Coffee",
  parent: "PT Brawijaya Multi Usaha",
  whatsappNumber: "6281234567890", // TODO: nomor WhatsApp resmi (format 62…)
  instagram: "https://www.instagram.com/ubcoffee", // TODO: akun Instagram resmi
  bmuWebsite: "https://bmu.ub.ac.id", // TODO: website resmi BMU
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=UB+Coffee+Jl.+MT+Haryono+Malang", // TODO: link Google Maps
  address: "Jl. MT. Haryono No.169, Ketawanggede, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145",
  addressShort: "Jl. MT. Haryono No.169, dekat gerbang KPRI UB, Malang",
  landmark: "Tepi Jl. MT. Haryono, dekat gerbang masuk KPRI UB",
  // Nomor reservasi Meeting Room / pertanyaan acara.
  whatsapp: "6282132245897",
  whatsappDisplay: "+62 821-3224-5897",
  // Embed peta tanpa API key.
  mapsEmbedUrl: "https://www.google.com/maps?q=UB+Coffee,+Jl.+MT.+Haryono+No.169,+Ketawanggede,+Malang&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=UB+Coffee,+Jl.+MT.+Haryono+No.169,+Ketawanggede,+Malang",
  // `days` memakai Date.getDay(): 0 = Minggu … 6 = Sabtu. Jam dalam WIB.
  hours: [
    { day: "Senin – Jumat", days: [1, 2, 3, 4, 5], open: "07.30", close: "22.30" },
    { day: "Sabtu", days: [6], open: "09.00", close: "22.30" },
    { day: "Minggu", days: [0], open: "12.00", close: "20.00" },
  ],
  acoustic: "Setiap Jumat & Sabtu, 19.00 – 21.00",
  coworking: "Wi-Fi cepat, colokan di tiap meja, ruang tenang di lantai dalam",
};

export function whatsappLink(message = "Halo UB Coffee, saya ingin memesan.") {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Link WhatsApp ke nomor reservasi (site.whatsapp).
export function reservationLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#menu", label: "Menu" },
  { href: "#suasana", label: "Suasana" },
  { href: "#coworking", label: "Coworking" },
  { href: "#acara", label: "Berita" },
  { href: "#lokasi", label: "Lokasi" },
] as const;
