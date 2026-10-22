/**
 * A video frame drawn in SVG (sky, sun, layered hills, subject) so the step visuals never rely
 * on stock photos. CSS filters on the wrapper produce the flat vs graded looks.
 */
export function FrameArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden className={`absolute inset-0 size-full ${className}`}>
      <defs>
        <linearGradient id="pv-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f59e0b" /><stop offset="0.55" stopColor="#f472b6" /><stop offset="1" stopColor="#7c3aed" /></linearGradient>
        <linearGradient id="pv-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1e1b4b" /><stop offset="1" stopColor="#0b0c0e" /></linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#pv-sky)" />
      <circle cx="226" cy="78" r="26" fill="#fde68a" />
      <path d="M0 120 L60 92 L110 112 L170 80 L230 108 L320 86 L320 180 L0 180Z" fill="#4c1d95" opacity="0.85" />
      <path d="M0 140 L80 118 L150 136 L220 114 L320 132 L320 180 L0 180Z" fill="url(#pv-ground)" />
      <g fill="#0b0c0e"><circle cx="96" cy="112" r="7" /><path d="M86 140 Q96 116 106 140Z" /></g>
    </svg>
  );
}
