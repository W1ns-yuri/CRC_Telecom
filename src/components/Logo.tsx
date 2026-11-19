// Логотипы из лого-пака, вставлены без изменений (crc-telecom-logo-color.svg / -white-transparent.svg).
export function Logo({ variant = "color", className }: { variant?: "color" | "white"; className?: string }) {
  const white = variant === "white";
  const tile = white ? "#FFFFFF" : "#0B2545";
  const wave = white ? "#0B2545" : "#FFFFFF";
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 140" role="img" aria-label="CRC Telecom" className={className}>
      <g transform="translate(10,10)">
        <rect x="0" y="0" width="120" height="120" rx="26" fill={tile} />
        <circle cx="38" cy="82" r="9" fill="#14B8A6" />
        <path d="M38 56 A26 26 0 0 1 64 82" fill="none" stroke={wave} strokeWidth="9" strokeLinecap="round" />
        <path d="M38 36 A46 46 0 0 1 84 82" fill="none" stroke={wave} strokeWidth="9" strokeLinecap="round" opacity="0.85" />
        <path d="M38 16 A66 66 0 0 1 104 82" fill="none" stroke={wave} strokeWidth="9" strokeLinecap="round" opacity="0.6" />
      </g>
      <text x="150" y="86" fontFamily="Poppins, var(--font-poppins), sans-serif" fontWeight="700" fontSize="72" letterSpacing="2" fill={white ? "#FFFFFF" : "#0B2545"}>CRC</text>
      <text x="153" y="120" fontFamily="Inter, var(--font-inter), sans-serif" fontWeight="600" fontSize="24" letterSpacing="11.5" fill={white ? "#5EEAD4" : "#14B8A6"}>TELECOM</text>
    </svg>
  );
}
