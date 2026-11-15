export function LoopMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 60 34"
      className={`loop-mark ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M30 17C23 7 20 4 14 4a13 13 0 1 0 0 26c6 0 9-3 16-13S40 4 46 4a13 13 0 1 1 0 26c-6 0-9-3-16-13Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
export default function Brand({ href = "#inicio" }) {
  return (
    <a className="brand" href={href} aria-label="Loop Avante">
      <LoopMark />
      <span>
        Loop <strong>Avante</strong>
        <span className="brand-dot">.</span>
      </span>
    </a>
  );
}
