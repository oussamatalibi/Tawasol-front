import type { ReactNode } from "react";

const paths: Record<string, ReactNode> = {
  users: <><path d="M16 20v-1.6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" /><circle cx="9" cy="7" r="4" /><path d="M22 20v-1.6a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  user: <><circle cx="12" cy="8" r="3.4" /><path d="M5.5 20c.5-3.4 3-5.2 6.5-5.2s6 1.8 6.5 5.2" /></>,
  cap: <><path d="m2 10 10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6" /></>,
  trophy: <><path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 7H3v2a4 4 0 0 0 4 4m10-6h4v2a4 4 0 0 1-4 4" /></>,
  handshake: <><path d="m3 12 4-4 4 1 2-1 4 1 4 4-3 3-4-2-3 2-5-3" /><path d="m7 8 3-3 5 1 3 3M5 14l3 3m0-2 3 3m1-2 2 2" /></>,
  chart: <><path d="M4 20V10m6 10V4m6 16v-7m6 7H2" /></>,
  crown: <><path d="m3 8 5 4 4-7 4 7 5-4-2 11H5L3 8Z" /><path d="M5 22h14" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h2m4 0h2m-8 4h2m4 0h2" /></>,
  megaphone: <><path d="m3 11 18-6v14L3 13v-2Z" /><path d="m7 14 2 7h4l-2-6m7-8v13" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.3" /><path d="m15.4 15.4 4.1 4.1" /></>,
  refresh: <><path d="M20 11a8 8 0 0 0-14.5-4M4 4v4h4M4 13a8 8 0 0 0 14.5 4M20 20v-4h-4" /></>,
  medal: <><circle cx="12" cy="15" r="5" /><path d="m8.5 10.5-2-7h4l1.5 4M15.5 10.5l2-7h-4L12 7.5" /></>,
  king: <><path d="M12 2v5M9.5 4.5h5M8 21h8M7 18h10l-1.5-7a3.5 3.5 0 1 0-7 0L7 18Z" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  chevron: <><path d="m9 6 6 6-6 6" /></>,
  bell: <><path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4l2-2Z" /><path d="M10 21h4" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12.3 2.8 2.8L16 9.5" /></>,
  pin: <><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
  play: <><circle cx="12" cy="12" r="9" /><path d="m10 8.5 5 3.5-5 3.5v-7Z" /></>,
  file: <><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>,
  book: <><path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2Z" /><path d="M12 6v14" /></>,
  monitor: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>,
  puzzle: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 12h16M12 4v16" /></>,
  lesson: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="m10 8.5 5 3-5 3v-6Z" /><path d="M8 21h8" /></>,
  pawn: <><circle cx="12" cy="6" r="3" /><path d="M9 21h6m-5-3h4l-1-6h-2l-1 6Z" /></>,
  phone: <><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></>,
  send: <><path d="m21 3-9.5 18-2.5-7.5L1.5 11 21 3Z" /><path d="m21 3-12 10.5" /></>,
  download: <><path d="M12 4v11m-4-4 4 4 4-4M5 20h14" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  bus: <><rect x="4" y="3" width="16" height="15" rx="3" /><path d="M4 11h16M8 21v-3m8 3v-3M8 15h.01M16 15h.01" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  facebook: <><path d="M14 21v-8h3l.5-3H14V8c0-.9.3-1.5 1.6-1.5h2V3.8c-.4-.1-1.4-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.7V10H7.5v3h2.9v8H14Z" /></>,
  instagram: <><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.5" /><path d="M17.5 6.8h.01" /></>,
  youtube: <><path d="M21 8.2a2.5 2.5 0 0 0-1.8-1.8C17.6 6 12 6 12 6s-5.6 0-7.2.4A2.5 2.5 0 0 0 3 8.2 26 26 0 0 0 2.6 12a26 26 0 0 0 .4 3.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.2.4 7.2.4s5.6 0 7.2-.4a2.5 2.5 0 0 0 1.8-1.8 26 26 0 0 0 .4-3.8 26 26 0 0 0-.4-3.8Z" /><path d="m10 9 5 3-5 3V9Z" /></>,
  linkedin: <><path d="M5 9v11M5 4.5v.01M10 20V9m0 4a4 4 0 0 1 8 0v7" /></>,
  bolt: <><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></>,
  list: <><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" /></>,
};

export function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name] ?? paths.users}
    </svg>
  );
}
