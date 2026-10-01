import type { SVGProps } from "react";

// Ikon garis (stroke) sederhana. Warna mengikuti currentColor.
const paths = {
  whatsapp: (
    <>
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4l-4.5 1.1z" />
      <path d="M9 8.5c0 3.3 2.9 6.5 6.5 6.5l1-1.6-2-1-1 .8a4.3 4.3 0 0 1-2.4-2.4l.8-1-1-2L9.5 8.5z" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  arrowLeft: (
    <>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5.5l10-2V16" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </>
  ),
  laptop: (
    <>
      <rect x="4.5" y="5" width="15" height="10" rx="1.5" />
      <path d="M2.5 19h19" />
    </>
  ),
  coffee: (
    <>
      <path d="M4.5 9h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V9z" />
      <path d="M16.5 10.5h1.5a2.5 2.5 0 0 1 0 5h-1.8" />
      <path d="M8.5 3.5c-.8 1 .8 1.8 0 3" />
      <path d="M12 3.5c-.8 1 .8 1.8 0 3" />
    </>
  ),
  mountain: (
    <>
      <path d="M2.5 19.5l6.5-11 4 6.5 2.5-3.5 6 8H2.5z" />
      <path d="M7 12.5l2 1.5 1.5-1" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.5-3.5-8.5s1-6 3.5-8.5z" />
    </>
  ),
  bean: (
    <>
      <ellipse cx="12" cy="12" rx="6" ry="8.5" transform="rotate(35 12 12)" />
      <path d="M9 17c3-2 1-7 6-10" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17L17 7" />
      <path d="M8.5 7H17v8.5" />
    </>
  ),
  camera: (
    <>
      <path d="M3.5 8.5A1.5 1.5 0 0 1 5 7h2.5l1.5-2.5h6L16.5 7H19a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5v-9z" />
      <circle cx="12" cy="12.8" r="3.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3 19.5c.6-3.3 3-5.2 6-5.2s5.4 1.9 6 5.2" />
      <path d="M15.5 5.5a3 3 0 0 1 0 6" />
      <path d="M17.5 14.6c2 .7 3.2 2.4 3.5 4.9" />
    </>
  ),
  droplet: <path d="M12 3.5s-6 6.4-6 10.7a6 6 0 0 0 12 0C18 9.9 12 3.5 12 3.5z" />,
  projector: (
    <>
      <rect x="2.5" y="8" width="19" height="9" rx="2" />
      <circle cx="15.5" cy="12.5" r="2.5" />
      <path d="M6 12.5h3" />
      <path d="M6 17v2.5" />
      <path d="M18 17v2.5" />
    </>
  ),
  speaker: (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
      <path d="M15.5 9a4.5 4.5 0 0 1 0 6" />
      <path d="M18 6.5a8 8 0 0 1 0 11" />
    </>
  ),
  handshake: (
    <>
      <path d="M2.5 12l3.5-5 4 1.5 2-1.5 2 1.5 4-1.5 3.5 5" />
      <path d="M6 7l-1 7 5.5 4.5c.8.6 1.8.6 2.5 0L19 14l-1-7" />
      <path d="M12 7.5l-3 3c.8 1 2.3 1 3.2 0L14 9" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export default function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
