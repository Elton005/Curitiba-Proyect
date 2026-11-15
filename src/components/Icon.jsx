const paths = {
  whatsapp: (
    <>
      <path d="M20.4 11.6a8.4 8.4 0 0 1-12.5 7.3L3 20.3l1.4-4.7a8.4 8.4 0 1 1 16-4Z" />
      <path d="M8.3 7.3c-.6 0-1.1 1-1 1.7.4 3.1 3.1 5.9 6.2 6.3.8.1 1.9-.5 1.9-1.2l-2.2-1.2-.9.9a7 7 0 0 1-3.1-3.1l.8-.9-1-2.4Z" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h15M13 5l7 7-7 7" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01M9 13l-2 2 2 2M15 13l2 2-2 2" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M10 5h4M11 19h2" />
    </>
  ),
  workflow: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" />
      <path d="M9 6h6a3 3 0 0 1 3 3v6M3 18h7m-3-3 3 3-3 3" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  moon: <path d="M20.5 13a8.5 8.5 0 0 1-9.5-9.5A8.5 8.5 0 1 0 20.5 13Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 3v17h17M8 16v-4M13 16V8M18 16V5" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 8 3v5c0 5-4 8-8 10-4-2-8-5-8-10V6l8-3Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  message: (
    <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5A9.5 9.5 0 0 1 11.5 2 9.5 9.5 0 0 1 21 11.5Z" />
  ),
  users: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M21 21v-3a6 6 0 0 0-4-5.6" />
    </>
  ),
  pin: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  document: (
    <>
      <path d="M14 2H5v20h14V7l-5-5ZM14 2v5h5M8 12h8M8 16h6" />
    </>
  ),
  bag: (
    <>
      <path d="M4 8h16l-1 13H5L4 8ZM8 8V6a4 4 0 0 1 8 0v2" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="13" height="13" rx="2" />
      <path d="M16 8V3H3v13h5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7h.01" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
};
export default function Icon({ name = "arrow", className = "", ...props }) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
