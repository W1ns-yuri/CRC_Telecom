const P: Record<string, React.ReactNode> = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  radio: <><rect x="7" y="8" width="10" height="13" rx="2" /><path d="M9 8V2M10 12h4M10 15h4" /></>,
  wifi: <><path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" /><circle cx="12" cy="19.5" r="1" /></>,
  cable: <><rect x="5" y="3" width="14" height="11" rx="1.5" /><path d="M9 14v3h6v-3M12 17v4M8.5 6.5v3M11 6.5v3M13.5 6.5v3M16 6.5v3" /></>,
  camera: <><rect x="2.5" y="7" width="13" height="8" rx="2" /><path d="M15.5 10l5-2v8l-5-2M8 15v4M5 20h6" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /><circle cx="12" cy="16" r="1.4" /></>,
  sat: <><path d="M5 9a10 10 0 0 0 10 10L5 9z" /><path d="M10 14l5-5" /><circle cx="16" cy="8" r="1.3" /><path d="M17.5 3.5a6 6 0 0 1 3 3" /></>,
  uc: <><path d="M4 4h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><path d="M19 9h1a2 2 0 0 1 2 2v9l-3-2h-6a2 2 0 0 1-2-2v-1" /></>,
  fleet: <><path d="M2 6h11v10H2zM13 9.5h4l3 3.5v3h-7" /><circle cx="6" cy="17.5" r="1.8" /><circle cx="16.5" cy="17.5" r="1.8" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  check: <path d="M5 12l5 5 9-10" />,
  plus: <path d="M12 5v14M5 12h14" />,
  one: <><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /></>,
  cert: <><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></>,
  north: <><path d="M3 20l6-10 4 6 3-4 5 8z" /><path d="M12 3v3M10.5 4.5h3" /></>,
  support: <><path d="M4 13a8 8 0 0 1 16 0" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19a4 4 0 0 1-4 3h-2" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  pause: <path d="M9 5v14M15 5v14" />,
  play: <path d="M7 4.5v15l12-7.5z" />,
};

export function Icon({ name, className = "size-6", strokeWidth = 1.7 }: { name: string; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {P[name]}
    </svg>
  );
}
