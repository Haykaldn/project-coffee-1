// Membuat ilustrasi SVG placeholder untuk foto menu, suasana, hero, dan daun kopi.
// Jalankan: node scripts/generate-images.mjs
// Ganti file di public/images dengan foto asli (WebP/AVIF) begitu aset dari UB Coffee tersedia.

import { mkdirSync, writeFileSync } from "node:fs";

const outDir = new URL("../public/images/", import.meta.url);
mkdirSync(outDir, { recursive: true });

const save = (name, content) => writeFileSync(new URL(name, outDir), content.trim() + "\n");
const svg = (w, h, body, defs = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${defs}</defs>${body}</svg>`;

function rng(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r2 = (n) => Math.round(n * 10) / 10;

// Bentuk organik tertutup (Catmull-Rom → Bezier)
function blob(cx, cy, r, jitter, n, seed, sx = 1, sy = 1) {
  const rand = rng(seed);
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const rr = r * (1 - jitter / 2 + rand() * jitter);
    return [cx + Math.cos(a) * rr * sx, cy + Math.sin(a) * rr * sy];
  });
  let d = `M${r2(pts[0][0])} ${r2(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${r2(c1[0])} ${r2(c1[1])} ${r2(c2[0])} ${r2(c2[1])} ${r2(p2[0])} ${r2(p2[1])}`;
  }
  return d + "Z";
}

const shadowFilter = `<filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="12" dy="22" stdDeviation="20" flood-color="#0B2A5B" flood-opacity="0.18"/></filter>`;

function backdrop(bg, w = 800, h = 800) {
  return `<rect width="${w}" height="${h}" fill="${bg}"/>
  <circle cx="${w * 0.12}" cy="${h * 0.1}" r="${w * 0.32}" fill="#fff" opacity="0.35"/>
  <circle cx="${w * 0.95}" cy="${h * 0.92}" r="${w * 0.28}" fill="#0B2A5B" opacity="0.04"/>`;
}

function bean(x, y, rot, s = 1) {
  return `<g transform="translate(${r2(x)} ${r2(y)}) rotate(${r2(rot)}) scale(${s})"><ellipse rx="24" ry="16" fill="#5A3420"/><ellipse rx="20" ry="11" cx="-3" cy="-3" fill="#6E4129"/><path d="M-19 1 C-7 -7 7 8 19 -1" stroke="#2B170C" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>`;
}

function beans(seed, count = 5) {
  const rand = rng(seed);
  const spots = [
    [110, 690], [170, 740], [690, 110], [735, 170], [640, 60], [70, 620], [720, 700], [95, 130],
  ];
  return spots
    .slice(0, count)
    .map(([x, y]) => bean(x + rand() * 20, y + rand() * 20, rand() * 360, 0.9 + rand() * 0.3))
    .join("");
}

/* ---------- Minuman panas (tampak atas) ---------- */
function hotCup({ bg, crema, art, artColor = "#F7ECDD", seed }) {
  const light = crema.light;
  const dark = crema.dark;
  const defs = `${shadowFilter}
  <radialGradient id="crema" cx="0" cy="0" r="158" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${light}"/><stop offset="0.75" stop-color="${crema.mid}"/><stop offset="1" stop-color="${dark}"/></radialGradient>`;

  let artSvg = "";
  const heart = (s, y, fill) =>
    `<path transform="translate(0 ${y}) scale(${s})" fill="${fill}" d="M0 70 C-60 30 -95 -5 -80 -40 C-68 -68 -30 -72 0 -40 C30 -72 68 -68 80 -40 C95 -5 60 30 0 70Z"/>`;
  if (art === "heart") {
    artSvg = heart(1, 0, artColor) + `<path d="M0 -60 L0 95" stroke="${artColor}" stroke-width="5" stroke-linecap="round"/>`;
  } else if (art === "tulip") {
    for (let i = 0; i < 3; i++) {
      const y = 70 - i * 42;
      const rx = 92 - i * 16;
      const ry = 40 - i * 5;
      artSvg += `<ellipse cx="0" cy="${y}" rx="${rx}" ry="${ry}" fill="${artColor}"/><ellipse cx="0" cy="${y + 15}" rx="${rx - 12}" ry="${ry - 8}" fill="url(#crema)"/>`;
    }
    artSvg += heart(0.5, -72, artColor) + `<path d="M0 -95 L0 115" stroke="${artColor}" stroke-width="5" stroke-linecap="round"/>`;
  } else {
    artSvg = `<ellipse cx="-40" cy="-50" rx="70" ry="30" fill="#fff" opacity="0.08" transform="rotate(-30)"/><circle r="140" fill="none" stroke="${crema.light}" stroke-width="4" opacity="0.6"/>`;
  }

  const body = `${backdrop(bg)}${beans(seed, 4)}
  <g filter="url(#shadow)">
    <circle cx="400" cy="420" r="265" fill="#fff"/>
  </g>
  <circle cx="400" cy="420" r="205" fill="#F3F6FA"/>
  <g transform="rotate(38 400 420)"><rect x="600" y="410" width="150" height="16" rx="8" fill="#C9D3E0"/><ellipse cx="590" cy="418" rx="36" ry="22" fill="#D7DFEA"/></g>
  <rect x="540" y="395" width="115" height="50" rx="25" fill="#fff" stroke="#E4EAF2" stroke-width="3"/>
  <circle cx="400" cy="420" r="182" fill="#fff" stroke="#E4EAF2" stroke-width="3"/>
  <g transform="translate(400 420)">
    <circle r="158" fill="url(#crema)"/>
    ${artSvg}
    <circle r="158" fill="none" stroke="${dark}" stroke-width="6" opacity="0.45"/>
  </g>`;
  return svg(800, 800, body, defs);
}

/* ---------- Minuman dingin (tampak samping) ---------- */
function icedGlass({ bg, top, bottom, split = 0.5, level = 220, straw = "#0B2A5B", garnish, foam, seed }) {
  const glass = "275,150 525,150 500,690 300,690";
  const defs = `${shadowFilter}
  <clipPath id="glass"><polygon points="${glass}"/></clipPath>
  <linearGradient id="liquid" x1="0" y1="${level}" x2="0" y2="690" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="${top}"/><stop offset="${split - 0.08}" stop-color="${top}"/>
    <stop offset="${split + 0.08}" stop-color="${bottom}"/><stop offset="1" stop-color="${bottom}"/>
  </linearGradient>`;
  const rand = rng(seed);
  const cubes = [
    [330, level + 10, -12], [420, level + 25, 16], [360, level + 105, 8], [440, level + 140, -20],
  ]
    .map(([x, y, a]) => `<rect x="${x}" y="${y}" width="70" height="66" rx="12" fill="#fff" fill-opacity="0.38" stroke="#fff" stroke-opacity="0.85" stroke-width="3" transform="rotate(${a} ${x + 35} ${y + 33})"/>`)
    .join("");
  const drops = Array.from({ length: 14 }, () => {
    const y = 180 + rand() * 480;
    const t = (y - 150) / 540;
    const x = 285 + t * 25 + rand() * (230 - t * 50);
    return `<ellipse cx="${r2(x)}" cy="${r2(y)}" rx="${r2(3 + rand() * 3)}" ry="${r2(4 + rand() * 4)}" fill="#fff" opacity="0.55"/>`;
  }).join("");
  let garnishSvg = "";
  if (garnish === "lemon") {
    garnishSvg = `<g transform="translate(345 ${level + 190}) rotate(-15)"><circle r="56" fill="#F9E48A" stroke="#EAC43A" stroke-width="8"/>${[0, 60, 120]
      .map((a) => `<line x1="-50" y1="0" x2="50" y2="0" stroke="#F5D65A" stroke-width="4" transform="rotate(${a})"/>`)
      .join("")}</g>`;
  }
  const foamSvg = foam
    ? `<rect x="250" y="${level - 6}" width="300" height="34" fill="${foam}"/><ellipse cx="400" cy="${level - 6}" rx="130" ry="10" fill="${foam}"/>`
    : "";
  const body = `${backdrop(bg)}${beans(seed, 3)}
  <ellipse cx="400" cy="705" rx="210" ry="36" fill="#0B2A5B" opacity="0.12"/>
  <ellipse cx="400" cy="698" rx="185" ry="28" fill="#fff"/>
  <rect x="440" y="60" width="24" height="440" rx="12" fill="${straw}" transform="rotate(9 452 280)"/>
  <g clip-path="url(#glass)">
    <rect x="250" y="${level}" width="300" height="${700 - level}" fill="url(#liquid)" opacity="0.95"/>
    ${foamSvg}
    ${garnishSvg}
    ${cubes}
    <rect x="250" y="630" width="300" height="70" fill="#fff" opacity="0.35"/>
  </g>
  <polygon points="${glass}" fill="#fff" fill-opacity="0.12" stroke="#fff" stroke-width="7" stroke-linejoin="round"/>
  <path d="M300 175 L322 650" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity="0.5"/>
  ${drops}`;
  return svg(800, 800, body, defs);
}

/* ---------- Makanan (piring tampak atas) ---------- */
function plate(bg, seed, inner) {
  const defs = `${shadowFilter}
  <linearGradient id="golden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6CB86"/><stop offset="1" stop-color="#C47631"/></linearGradient>
  <linearGradient id="fried" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EDB45F"/><stop offset="1" stop-color="#B66D2B"/></linearGradient>
  <radialGradient id="rice" cx="0.45" cy="0.4" r="0.7"><stop offset="0" stop-color="#D99A55"/><stop offset="1" stop-color="#B26A30"/></radialGradient>`;
  const body = `${backdrop(bg)}
  <g filter="url(#shadow)"><circle cx="400" cy="420" r="290" fill="#fff"/></g>
  <circle cx="400" cy="420" r="228" fill="#F4F7FB"/>
  <circle cx="400" cy="420" r="290" fill="none" stroke="#E4EAF2" stroke-width="3"/>
  <g transform="rotate(-20 700 700)"><rect x="620" y="640" width="200" height="14" rx="7" fill="#C9D3E0"/><rect x="620" y="672" width="200" height="14" rx="7" fill="#D7DFEA"/></g>
  ${inner(rng(seed))}`;
  return svg(800, 800, body, defs);
}

function croissant() {
  const cx = 400, cy = 560, R = 165, n = 7;
  const segs = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const theta = (-155 + t * 130) * (Math.PI / 180);
    const s = 1 - Math.abs(t - 0.5) * 1.15;
    segs.push({ x: cx + R * Math.cos(theta), y: cy + R * Math.sin(theta), rx: 34 + 30 * s, ry: 42 + 62 * s, rot: (theta * 180) / Math.PI + 90, z: s });
  }
  segs.sort((a, b) => a.z - b.z);
  return segs
    .map(
      (g) => `<g transform="translate(${r2(g.x)} ${r2(g.y)}) rotate(${r2(g.rot)})"><ellipse rx="${r2(g.rx)}" ry="${r2(g.ry)}" fill="url(#golden)" stroke="#A95F22" stroke-width="3"/><path d="M${r2(-g.rx * 0.6)} ${r2(-g.ry * 0.2)} Q0 ${r2(-g.ry * 0.55)} ${r2(g.rx * 0.6)} ${r2(-g.ry * 0.2)}" stroke="#FBE2B4" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.8"/></g>`
    )
    .join("") + `<rect x="520" y="560" width="70" height="52" rx="10" fill="#FCE9A8" stroke="#EFCF6B" stroke-width="3" transform="rotate(12 555 586)"/>`;
}

function nasiGoreng(rand) {
  let s = `<path d="${blob(385, 440, 175, 0.18, 12, 7)}" fill="url(#rice)"/>`;
  const colors = ["#E4AE6A", "#A35E27", "#F3DDAE", "#E4AE6A", "#C98442"];
  for (let i = 0; i < 260; i++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * 160;
    s += `<ellipse cx="${r2(385 + Math.cos(a) * d)}" cy="${r2(440 + Math.sin(a) * d)}" rx="7" ry="3.5" fill="${colors[i % colors.length]}" transform="rotate(${r2(rand() * 180)} ${r2(385 + Math.cos(a) * d)} ${r2(440 + Math.sin(a) * d)})"/>`;
  }
  for (let i = 0; i < 26; i++) {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * 150;
    s += `<circle cx="${r2(385 + Math.cos(a) * d)}" cy="${r2(440 + Math.sin(a) * d)}" r="5" fill="${i % 3 ? "#4E9444" : "#D8452E"}"/>`;
  }
  s += `<path d="${blob(560, 250, 70, 0.3, 9, 4)}" fill="#F8EDCB" stroke="#EAD8A4" stroke-width="3"/>`;
  s += `<path d="${blob(430, 390, 95, 0.25, 10, 11)}" fill="#FFFDF7"/><circle cx="440" cy="385" r="36" fill="#F5AE1A"/><ellipse cx="428" cy="372" rx="12" ry="8" fill="#FFD76B"/>`;
  [[250, 560], [290, 600], [340, 625]].forEach(([x, y]) => {
    s += `<circle cx="${x}" cy="${y}" r="32" fill="#CFE6B3" stroke="#4F8A3A" stroke-width="7"/><circle cx="${x}" cy="${y}" r="10" fill="#E9F4DC"/>`;
  });
  [[560, 560], [520, 610]].forEach(([x, y]) => {
    s += `<circle cx="${x}" cy="${y}" r="30" fill="#E0503A"/><circle cx="${x}" cy="${y}" r="18" fill="#F07B63"/>`;
  });
  return s;
}

function rotiBakar(rand) {
  const slice = (x, y, a, spread) => `<g transform="translate(${x} ${y}) rotate(${a})">
    <path d="M-120 115 L-120 -40 C-140 -105 -85 -138 -42 -126 C-12 -146 12 -146 42 -126 C85 -138 140 -105 120 -40 L120 115Z" fill="#B56E2E"/>
    <path transform="scale(0.86)" d="M-120 115 L-120 -40 C-140 -105 -85 -138 -42 -126 C-12 -146 12 -146 42 -126 C85 -138 140 -105 120 -40 L120 115Z" fill="url(#golden)"/>
    ${spread}
  </g>`;
  let drizzle = "M-80 -40";
  for (let i = 0; i < 6; i++) drizzle += ` Q${-60 + i * 30} ${i % 2 ? 60 : -60} ${-50 + i * 30} ${i % 2 ? -40 : 40}`;
  const spread = `<path d="${blob(0, 0, 80, 0.3, 9, 3)}" fill="#8E9A3E" opacity="0.9"/><path d="${drizzle}" stroke="#6E7A2A" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  const crumbs = Array.from({ length: 12 }, () => `<circle cx="${r2(250 + rand() * 300)}" cy="${r2(560 + rand() * 60)}" r="${r2(2 + rand() * 3)}" fill="#C98442"/>`).join("");
  return slice(330, 440, -14, spread) + slice(470, 410, 16, spread) + crumbs;
}

function pisangGoreng(rand) {
  let s = "";
  [[330, 380, -28], [420, 440, -18], [480, 330, -40]].forEach(([x, y, a], i) => {
    s += `<g transform="translate(${x} ${y}) rotate(${a})"><path d="${blob(0, 0, 60, 0.2, 10, 20 + i, 2.2, 0.8)}" fill="url(#fried)" stroke="#A35E27" stroke-width="3"/></g>`;
  });
  for (let i = 0; i < 90; i++) {
    const x = 240 + rand() * 330, y = 290 + rand() * 230;
    s += `<rect x="${r2(x)}" y="${r2(y)}" width="16" height="4" rx="2" fill="#FFE070" transform="rotate(${r2(rand() * 180)} ${r2(x)} ${r2(y)})"/>`;
  }
  s += `<path d="M230 330 L300 420 L340 300 L400 470 L450 320 L500 460 L560 300" stroke="#5A331F" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>`;
  return s;
}

function mie(rand) {
  let s = `<circle cx="400" cy="420" r="200" fill="#fff" stroke="#DCE4EF" stroke-width="4"/><circle cx="400" cy="420" r="172" fill="#C9894A"/>`;
  for (let i = 0; i < 38; i++) {
    const y = 290 + rand() * 260;
    const amp = 10 + rand() * 14;
    let d = `M${r2(250 + rand() * 30)} ${r2(y)}`;
    for (let k = 1; k <= 6; k++) d += ` q25 ${r2(k % 2 ? -amp : amp)} 50 0`;
    s += `<path d="${d}" stroke="#A8652C" stroke-width="12" fill="none" stroke-linecap="round" transform="rotate(${r2(rand() * 180)} 400 420)"/><path d="${d}" stroke="#EDBF6E" stroke-width="7" fill="none" stroke-linecap="round" transform="rotate(${r2(rand() * 180)} 400 420)"/>`;
  }
  s = `<g clip-path="url(#bowl)">${s}</g>`;
  s = `<clipPath id="bowl"><circle cx="400" cy="420" r="200"/></clipPath>` + s;
  s += `<circle cx="400" cy="420" r="200" fill="none" stroke="#fff" stroke-width="24"/>`;
  [[330, 360], [470, 470], [360, 500]].forEach(([x, y], i) => {
    s += `<path d="${blob(x, y, 38, 0.3, 8, 40 + i, 1.4, 0.8)}" fill="#4E8C3A"/><path d="M${x - 40} ${y} L${x + 40} ${y}" stroke="#8CC06F" stroke-width="4"/>`;
  });
  s += `<path d="${blob(460, 360, 55, 0.2, 9, 50)}" fill="#FFFDF7"/><circle cx="465" cy="358" r="24" fill="#F5AE1A"/>`;
  for (let i = 0; i < 30; i++) s += `<circle cx="${r2(290 + rand() * 220)}" cy="${r2(320 + rand() * 200)}" r="4" fill="#7A4420"/>`;
  s += `<g transform="rotate(-32 400 420)"><rect x="170" y="560" width="470" height="14" rx="7" fill="#8A5A34"/><rect x="170" y="586" width="470" height="14" rx="7" fill="#9C6A40"/></g>`;
  return s;
}

/* ---------- Data menu → gambar ---------- */
const menuImages = {
  "kopi-susu-arjuna": () => icedGlass({ bg: "#E8F1FB", top: "#C79B73", bottom: "#6B3F22", split: 0.45, seed: 1 }),
  "americano-arjuna": () => icedGlass({ bg: "#F5EFE6", top: "#4A2C1A", bottom: "#2E1A0F", level: 240, seed: 2 }),
  cappuccino: () => hotCup({ bg: "#F5EFE6", crema: { light: "#D9A56E", mid: "#B9773F", dark: "#8A5226" }, art: "heart", seed: 3 }),
  "caffe-latte": () => hotCup({ bg: "#E8F1FB", crema: { light: "#E2B887", mid: "#C99464", dark: "#9C6737" }, art: "tulip", seed: 4 }),
  "v60-arabika-arjuna": () => hotCup({ bg: "#DCE8F7", crema: { light: "#6A3E22", mid: "#43250F", dark: "#2A160A" }, art: "none", seed: 5 }),
  "es-kopi-aren": () => icedGlass({ bg: "#F1F6FC", top: "#D8B48E", bottom: "#5C3219", split: 0.55, foam: "#EFDCC4", seed: 6 }),
  "matcha-latte": () => icedGlass({ bg: "#F5EFE6", top: "#8DB35C", bottom: "#EEF2E1", split: 0.42, straw: "#1D5FBF", seed: 7 }),
  "coklat-brawijaya": () => hotCup({ bg: "#DCE8F7", crema: { light: "#8E5634", mid: "#6E3F25", dark: "#4A2716" }, art: "heart", artColor: "#E9D2BD", seed: 8 }),
  "teh-tarik": () => icedGlass({ bg: "#F1F6FC", top: "#D7B089", bottom: "#B97E48", split: 0.3, foam: "#EAD6B8", seed: 9 }),
  "lemon-tea-selasih": () => icedGlass({ bg: "#E8F1FB", top: "#E5A24A", bottom: "#B8631F", garnish: "lemon", straw: "#1D5FBF", seed: 10 }),
  "croissant-mentega": () => plate("#DCE8F7", 11, croissant),
  "roti-bakar-srikaya": () => plate("#F5EFE6", 12, rotiBakar),
  "nasi-goreng-kampus": () => plate("#E8F1FB", 13, nasiGoreng),
  "pisang-goreng-keju": () => plate("#F1F6FC", 14, pisangGoreng),
  "mie-goreng-jawa": () => plate("#F5EFE6", 15, mie),
};

mkdirSync(new URL("menu/", outDir), { recursive: true });
for (const [id, make] of Object.entries(menuImages)) save(`menu/${id}.svg`, make());

/* ---------- Daun & buah kopi ---------- */
function coffeeLeaf(x, y, angle, len, wid, gradId = "leaf") {
  const d = `M0 0 C${len * 0.25} ${-wid} ${len * 0.7} ${-wid} ${len} 0 C${len * 0.7} ${wid} ${len * 0.25} ${wid} 0 0Z`;
  let veins = "";
  for (let i = 1; i <= 5; i++) {
    const vx = (len * i) / 6.5;
    veins += `<path d="M${r2(vx)} 0 Q${r2(vx + len * 0.08)} ${r2(-wid * 0.45)} ${r2(vx + len * 0.14)} ${r2(-wid * 0.62)}" stroke="#9FD6B2" stroke-width="2" fill="none" opacity="0.45"/><path d="M${r2(vx)} 0 Q${r2(vx + len * 0.08)} ${r2(wid * 0.45)} ${r2(vx + len * 0.14)} ${r2(wid * 0.62)}" stroke="#9FD6B2" stroke-width="2" fill="none" opacity="0.35"/>`;
  }
  return `<g transform="translate(${r2(x)} ${r2(y)}) rotate(${r2(angle)})"><path d="${d}" fill="url(#${gradId})"/><path d="M4 0 Q${r2(len / 2)} ${r2(-wid * 0.12)} ${r2(len - 6)} 0" stroke="#A8DDBB" stroke-width="3" fill="none" opacity="0.7"/>${veins}<path d="M${r2(len * 0.2)} ${r2(-wid * 0.5)} Q${r2(len * 0.45)} ${r2(-wid * 0.78)} ${r2(len * 0.7)} ${r2(-wid * 0.5)}" stroke="#fff" stroke-width="5" fill="none" opacity="0.18" stroke-linecap="round"/></g>`;
}

function cherryCluster(x, y, seed) {
  const rand = rng(seed);
  let s = "";
  const count = 4 + Math.floor(rand() * 3);
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const d = rand() * 26;
    const cx = x + Math.cos(a) * d;
    const cy = y + Math.sin(a) * d;
    const r = 18 + rand() * 7;
    const ripe = rand();
    const grad = ripe < 0.72 ? "cherry" : ripe < 0.88 ? "cherryOrange" : "cherryGreen";
    s += `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(r)}" fill="url(#${grad})"/><ellipse cx="${r2(cx - r * 0.35)}" cy="${r2(cy - r * 0.38)}" rx="${r2(r * 0.28)}" ry="${r2(r * 0.18)}" fill="#fff" opacity="0.55" transform="rotate(-35 ${r2(cx - r * 0.35)} ${r2(cy - r * 0.38)})"/><circle cx="${r2(cx + r * 0.15)}" cy="${r2(cy + r * 0.2)}" r="2.5" fill="#4A0E0B" opacity="0.5"/>`;
  }
  return s;
}

const branchDefs = `
<linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2F8A57"/><stop offset="1" stop-color="#17502F"/></linearGradient>
<linearGradient id="leafDark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#236B43"/><stop offset="1" stop-color="#0F3A22"/></linearGradient>
<radialGradient id="cherry" cx="0.35" cy="0.35" r="0.75"><stop offset="0" stop-color="#EF5A45"/><stop offset="0.6" stop-color="#C42B22"/><stop offset="1" stop-color="#7E1511"/></radialGradient>
<radialGradient id="cherryOrange" cx="0.35" cy="0.35" r="0.75"><stop offset="0" stop-color="#F7B04A"/><stop offset="1" stop-color="#C9661E"/></radialGradient>
<radialGradient id="cherryGreen" cx="0.35" cy="0.35" r="0.75"><stop offset="0" stop-color="#B9D77A"/><stop offset="1" stop-color="#5F8E2E"/></radialGradient>`;

function branch() {
  // Batang melengkung dari bawah-kiri ke atas-kanan dengan pasangan daun dan kelompok ceri di setiap buku.
  const stem = "M40 1080 C120 900 150 760 210 600 C270 440 330 300 470 140";
  const nodes = [
    [95, 950, -70], [140, 820, -66], [185, 680, -68], [232, 545, -64], [290, 410, -58], [365, 270, -50], [440, 170, -45],
  ];
  let back = "", front = "", fruit = "";
  nodes.forEach(([x, y, a], i) => {
    const len = 310 - i * 20;
    const wid = 78 - i * 5;
    back += coffeeLeaf(x, y, a - 70, len, wid, "leafDark");
    front += coffeeLeaf(x, y, a + 72, len * 0.95, wid, "leaf");
    if (i < 6) fruit += cherryCluster(x + 6, y + 12, 100 + i);
  });
  front += coffeeLeaf(462, 150, -60, 170, 42, "leaf");
  const body = `${back}<path d="${stem}" stroke="#6B4A2E" stroke-width="14" fill="none" stroke-linecap="round"/><path d="${stem}" stroke="#8C6440" stroke-width="5" fill="none" stroke-linecap="round" transform="translate(-3 -2)"/>${fruit}${front}`;
  return svg(700, 1100, body, branchDefs);
}
save("coffee-branch.svg", branch());

/* ---------- Gedung UB Coffee (hero) ---------- */
function building() {
  const defs = `
  <linearGradient id="glassPane" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2B6FCF"/><stop offset="1" stop-color="#0B2A5B"/></linearGradient>
  <radialGradient id="warm" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE3A3" stop-opacity="0.95"/><stop offset="1" stop-color="#FFE3A3" stop-opacity="0"/></radialGradient>
  <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EEF3FA"/></linearGradient>`;
  let trees = "";
  [[160, 470, 150], [300, 430, 130], [1320, 440, 150], [1470, 480, 130], [1080, 330, 110], [560, 320, 110]].forEach(([x, y, r], i) => {
    trees += `<path d="${blob(x, y, r, 0.25, 10, 200 + i)}" fill="${i % 2 ? "#C3D6EF" : "#B1C8E8"}"/>`;
  });
  const pane = (x, w) => {
    let s = `<rect x="${x}" y="330" width="${w}" height="330" fill="url(#glassPane)"/>`;
    for (let i = 0; i < 3; i++) {
      const lx = x + (w / 3) * i + w / 6;
      s += `<ellipse cx="${lx}" cy="420" rx="60" ry="55" fill="url(#warm)"/><line x1="${lx}" y1="330" x2="${lx}" y2="385" stroke="#0B2A5B" stroke-width="2"/><path d="M${lx - 16} 400 L${lx + 16} 400 L${lx + 10} 385 L${lx - 10} 385Z" fill="#FFD98A"/>`;
      s += `<rect x="${lx - 30}" y="585" width="60" height="8" rx="4" fill="#0B2A5B" opacity="0.8"/><rect x="${lx - 3}" y="593" width="6" height="45" fill="#0B2A5B" opacity="0.8"/><circle cx="${lx - 45}" cy="565" r="15" fill="#0B2A5B" opacity="0.7"/><rect x="${lx - 58}" y="580" width="26" height="60" rx="10" fill="#0B2A5B" opacity="0.7"/>`;
    }
    s += `<path d="M${x + 20} 340 L${x + 90} 340 L${x + 20} 470Z" fill="#fff" opacity="0.14"/>`;
    for (let i = 1; i < 3; i++) s += `<rect x="${x + (w / 3) * i - 3}" y="330" width="6" height="330" fill="#fff"/>`;
    s += `<rect x="${x}" y="330" width="${w}" height="330" fill="none" stroke="#fff" stroke-width="10"/>`;
    return s;
  };
  const umbrella = (x) => `<g transform="translate(${x} 0)"><rect x="-4" y="520" width="8" height="170" fill="#9FB3CF"/><path d="M-110 530 Q0 440 110 530Z" fill="#fff" stroke="#DCE6F3" stroke-width="3"/><path d="M-37 530 Q0 450 37 530Z" fill="#1D5FBF" opacity="0.85"/><rect x="-60" y="620" width="120" height="8" rx="4" fill="#9FB3CF"/><rect x="-4" y="628" width="8" height="60" fill="#9FB3CF"/></g>`;
  const pot = (x) => `<path d="${blob(x, 600, 55, 0.3, 9, x)}" fill="#1E7A4C" opacity="0.85"/><path d="M${x - 35} 630 L${x + 35} 630 L${x + 25} 690 L${x - 25} 690Z" fill="#0B2A5B"/>`;
  const body = `${trees}
  <rect x="0" y="686" width="1600" height="14" fill="#DCE6F3"/>
  <rect x="180" y="470" width="260" height="220" fill="url(#wall)" stroke="#D6E1EF" stroke-width="3"/>
  <path d="M160 470 L460 470 L440 440 L180 440Z" fill="#1D5FBF"/>
  <rect x="215" y="510" width="190" height="150" fill="url(#glassPane)" stroke="#fff" stroke-width="8"/>
  <ellipse cx="310" cy="560" rx="70" ry="45" fill="url(#warm)"/>
  <rect x="420" y="250" width="760" height="440" fill="url(#wall)" stroke="#D6E1EF" stroke-width="3"/>
  <rect x="380" y="215" width="840" height="58" rx="6" fill="#0B2A5B"/>
  <text x="800" y="256" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="800" font-size="34" letter-spacing="10" fill="#fff">UB COFFEE</text>
  <rect x="520" y="265" width="80" height="4" fill="#7CC49C"/><rect x="1000" y="265" width="80" height="4" fill="#7CC49C"/>
  ${pane(455, 300)}
  ${pane(845, 300)}
  <rect x="765" y="400" width="70" height="286" fill="url(#glassPane)" stroke="#fff" stroke-width="8"/>
  <circle cx="820" cy="545" r="5" fill="#fff"/>
  <path d="M740 300 L860 300 L860 312 L740 312Z" fill="#1D5FBF"/>
  <rect x="1180" y="500" width="240" height="190" fill="#F4F7FB" stroke="#D6E1EF" stroke-width="3"/>
  <path d="M1160 500 L1440 500 L1420 470 L1180 470Z" fill="#0B2A5B"/>
  ${umbrella(1300)}
  ${umbrella(90)}
  ${pot(470)}${pot(1130)}
  <rect x="1500" y="420" width="8" height="270" fill="#9FB3CF"/><circle cx="1504" cy="415" r="16" fill="#FFE3A3"/>`;
  return svg(1600, 700, body, defs);
}
save("hero-building.svg", building());

/* ---------- Foto suasana & highlight ---------- */
function kebun() {
  const defs = `
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE0F5"/><stop offset="1" stop-color="#F7FAFE"/></linearGradient>
  <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  ${branchDefs}`;
  let bushes = "";
  for (let row = 0; row < 3; row++) {
    for (let i = 0; i < 5; i++) {
      const x = 60 + i * 175 + (row % 2) * 80;
      const y = 700 + row * 110;
      const r = 70 + row * 25;
      bushes += `<path d="${blob(x, y, r, 0.35, 11, row * 10 + i)}" fill="${row === 2 ? "#1B4A31" : row === 1 ? "#235C3C" : "#2F6E49"}"/>`;
      if (row === 2) bushes += cherryCluster(x - 20, y - 30, 300 + i) + cherryCluster(x + 30, y + 10, 400 + i);
    }
  }
  const body = `<rect width="800" height="1000" fill="url(#sky)"/>
  <circle cx="610" cy="210" r="70" fill="#FFF3D1"/>
  <path d="M0 520 L120 430 L230 470 L360 300 L420 250 L480 300 L600 380 L700 350 L800 420 L800 1000 L0 1000Z" fill="#A9C1E3"/>
  <path d="M0 580 L150 470 L300 520 L400 360 L445 330 L520 400 L650 470 L800 460 L800 1000 L0 1000Z" fill="#6F92C4"/>
  <path d="M400 360 L445 330 L520 400 L470 380Z" fill="#fff" opacity="0.5"/>
  <rect y="470" width="800" height="120" fill="url(#mist)"/>
  <path d="M0 640 C200 580 350 610 520 590 C650 575 740 600 800 590 L800 1000 L0 1000Z" fill="#3E7A5A"/>
  ${bushes}
  ${coffeeLeaf(-20, 930, -30, 240, 60)}${coffeeLeaf(820, 960, -150, 240, 60)}`;
  return svg(800, 1000, body, defs);
}
save("kebun-arjuna.svg", kebun());

function interior() {
  const defs = `<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE3A3" stop-opacity="0.8"/><stop offset="1" stop-color="#FFE3A3" stop-opacity="0"/></radialGradient>
  <linearGradient id="win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFD5F2"/><stop offset="1" stop-color="#E8F1FB"/></linearGradient>
  <linearGradient id="steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#AEBBCD"/><stop offset="0.5" stop-color="#E6ECF4"/><stop offset="1" stop-color="#9FAEC2"/></linearGradient>`;
  const lamp = (x) => `<line x1="${x}" y1="0" x2="${x}" y2="150" stroke="#0B2A5B" stroke-width="3"/><ellipse cx="${x}" cy="200" rx="110" ry="90" fill="url(#glow)"/><path d="M${x - 45} 190 Q${x} 130 ${x + 45} 190Z" fill="#0B2A5B"/><ellipse cx="${x}" cy="192" rx="18" ry="7" fill="#FFE3A3"/>`;
  const body = `<rect width="800" height="1000" fill="#F1F6FC"/>
  <rect x="60" y="120" width="330" height="430" rx="10" fill="url(#win)" stroke="#fff" stroke-width="14"/>
  <path d="${blob(160, 470, 90, 0.3, 9, 60)}" fill="#9FC3A6" opacity="0.7"/><path d="${blob(300, 500, 70, 0.3, 9, 61)}" fill="#86B391" opacity="0.7"/>
  <line x1="225" y1="120" x2="225" y2="550" stroke="#fff" stroke-width="10"/>
  <rect x="450" y="200" width="290" height="260" rx="14" fill="#16325F"/>
  <text x="595" y="252" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="30" fill="#fff">Menu</text>
  ${[0, 1, 2, 3, 4].map((i) => `<rect x="485" y="${285 + i * 32}" width="${140 - (i % 3) * 25}" height="8" rx="4" fill="#fff" opacity="0.75"/><rect x="665" y="${285 + i * 32}" width="40" height="8" rx="4" fill="#7CC49C"/>`).join("")}
  ${lamp(200)}${lamp(560)}
  <rect x="0" y="640" width="800" height="360" fill="#0B2A5B"/>
  <rect x="0" y="625" width="800" height="30" fill="#C9A27A"/>
  <rect x="0" y="655" width="800" height="12" fill="#A9855F"/>
  <rect x="330" y="470" width="300" height="155" rx="16" fill="url(#steel)"/>
  <rect x="330" y="470" width="300" height="28" rx="12" fill="#8C9CB2"/>
  ${[400, 560].map((x) => `<rect x="${x - 26}" y="520" width="52" height="30" rx="6" fill="#3A4E6E"/><rect x="${x + 10}" y="538" width="80" height="12" rx="6" fill="#1B2B45" transform="rotate(8 ${x + 10} 544)"/><path d="M${x - 22} 585 L${x + 22} 585 L${x + 16} 622 L${x - 16} 622Z" fill="#fff"/>`).join("")}
  <circle cx="480" cy="505" r="9" fill="#1E7A4C"/>
  <path d="M170 470 L250 470 L230 540 L190 540Z" fill="#E6ECF4" opacity="0.9"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => bean(190 + (i % 3) * 20, 490 + Math.floor(i / 3) * 22, i * 40, 0.45)).join("")}
  <rect x="180" y="540" width="60" height="85" rx="8" fill="#3A4E6E"/>
  <path d="${blob(715, 560, 55, 0.35, 9, 70)}" fill="#1E7A4C"/><path d="M690 590 L740 590 L732 625 L698 625Z" fill="#fff"/>
  <text x="400" y="820" text-anchor="middle" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="800" font-size="46" letter-spacing="14" fill="#fff" opacity="0.92">UB COFFEE</text>
  <rect x="330" y="850" width="140" height="4" fill="#7CC49C"/>`;
  return svg(800, 1000, body, defs);
}
save("suasana-bar.svg", interior());

function coworking() {
  const rand = rng(90);
  let keys = "";
  for (let r = 0; r < 4; r++) for (let c = 0; c < 10; c++) keys += `<rect x="${196 + c * 21}" y="${320 + r * 21}" width="17" height="17" rx="3" fill="#E6ECF4"/>`;
  const body = `<rect width="600" height="600" fill="#D9B891"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M0 ${40 + i * 70 + rand() * 20} C200 ${30 + i * 70} 400 ${60 + i * 70} 600 ${40 + i * 70}" stroke="#C9A378" stroke-width="3" fill="none"/>`).join("")}
  <rect x="170" y="220" width="260" height="30" rx="8" fill="#1B2B45"/>
  <rect x="170" y="250" width="260" height="190" rx="16" fill="#C9D3E0"/>
  ${keys}
  <rect x="255" y="410" width="90" height="22" rx="6" fill="#B3BFCF"/>
  <g transform="rotate(-10 110 470)"><rect x="40" y="400" width="140" height="170" rx="8" fill="#fff"/>${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="58" y1="${430 + i * 22}" x2="162" y2="${430 + i * 22}" stroke="#BFD0EA" stroke-width="3"/>`).join("")}<rect x="40" y="400" width="14" height="170" fill="#1D5FBF"/></g>
  <rect x="205" y="500" width="160" height="10" rx="5" fill="#0B2A5B" transform="rotate(-18 285 505)"/>
  <circle cx="480" cy="150" r="70" fill="#fff"/><circle cx="480" cy="150" r="55" fill="#B9773F"/><path transform="translate(480 150) scale(0.4)" fill="#F7ECDD" d="M0 70 C-60 30 -95 -5 -80 -40 C-68 -68 -30 -72 0 -40 C30 -72 68 -68 80 -40 C95 -5 60 30 0 70Z"/>
  <path d="${blob(560, 520, 90, 0.4, 9, 91)}" fill="#1E7A4C" opacity="0.85"/>`;
  return svg(600, 600, body);
}
save("coworking.svg", coworking());

function akustik() {
  const defs = `<radialGradient id="spot" cx="0.5" cy="0.35" r="0.6"><stop offset="0" stop-color="#2B6FCF"/><stop offset="1" stop-color="#0B2A5B"/></radialGradient>
  <linearGradient id="wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E9B26A"/><stop offset="1" stop-color="#B8742F"/></linearGradient>`;
  const lights = Array.from({ length: 11 }, (_, i) => {
    const x = 20 + i * 57;
    const y = 60 + Math.sin(i / 1.6) * 22;
    return `<circle cx="${x}" cy="${r2(y)}" r="16" fill="#FFE3A3" opacity="0.25"/><circle cx="${x}" cy="${r2(y)}" r="6" fill="#FFE3A3"/>`;
  }).join("");
  const body = `<rect width="600" height="600" fill="url(#spot)"/>
  <path d="M0 55 Q150 110 300 60 T600 60" stroke="#7CC49C" stroke-width="2" fill="none" opacity="0.6"/>${lights}
  <g transform="rotate(-24 300 330)">
    <rect x="286" y="80" width="30" height="210" rx="6" fill="#5A331F"/>
    <rect x="280" y="50" width="42" height="50" rx="8" fill="#3A2214"/>
    <circle cx="301" cy="380" r="100" fill="url(#wood)"/>
    <circle cx="301" cy="270" r="72" fill="url(#wood)"/>
    <circle cx="301" cy="330" r="30" fill="#2A160A"/>
    <rect x="270" y="420" width="62" height="14" rx="4" fill="#3A2214"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="${291 + i * 4}" y1="60" x2="${291 + i * 4}" y2="427" stroke="#F4F7FB" stroke-width="1.2" opacity="0.8"/>`).join("")}
  </g>
  <rect x="470" y="250" width="8" height="330" fill="#9FB3CF"/><rect x="455" y="200" width="38" height="70" rx="19" fill="#C9D3E0"/><path d="M430 580 L518 580" stroke="#9FB3CF" stroke-width="8" stroke-linecap="round"/>`;
  return svg(600, 600, body, defs);
}
save("live-akustik.svg", akustik());

function lokasi() {
  const body = `<rect width="600" height="600" fill="#E8F1FB"/>
  ${[[40, 40, 200, 150], [280, 40, 280, 110], [40, 250, 150, 140], [360, 220, 200, 170], [40, 450, 220, 120], [320, 450, 240, 120]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#DCE8F7"/>`).join("")}
  <rect x="230" y="200" width="100" height="220" rx="14" fill="#CFE6D8"/>
  <path d="M0 200 L600 180" stroke="#fff" stroke-width="34"/><path d="M260 0 L300 600" stroke="#fff" stroke-width="30"/><path d="M0 425 L600 435" stroke="#fff" stroke-width="22"/>
  <path d="M0 200 L600 180" stroke="#C3D4EC" stroke-width="3" stroke-dasharray="14 12"/>
  <path d="M-20 560 C150 520 300 600 620 540" stroke="#9CC2EE" stroke-width="18" fill="none"/>
  <ellipse cx="330" cy="330" rx="46" ry="14" fill="#0B2A5B" opacity="0.18"/>
  <path d="M330 330 C300 280 270 250 270 205 C270 170 297 145 330 145 C363 145 390 170 390 205 C390 250 360 280 330 330Z" fill="#0B2A5B"/>
  <circle cx="330" cy="205" r="24" fill="#fff"/><circle cx="330" cy="205" r="10" fill="#1E7A4C"/>`;
  return svg(600, 600, body);
}
save("lokasi-peta.svg", lokasi());

console.log("Gambar placeholder dibuat di public/images");
