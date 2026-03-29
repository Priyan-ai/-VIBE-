// VIBE text logo SVG component — replaces the figma:asset reference
export function VibeLogo({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 160 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="vibeGradient" x1="0" y1="0" x2="160" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14b8a6" /> {/* Teal 500 */}
          <stop offset="1" stopColor="#3b82f6" /> {/* Blue 500 */}
        </linearGradient>
      </defs>
      
      {/* Sound wave bars */}
      <rect x="0" y="16" width="6" height="16" rx="3" fill="url(#vibeGradient)" />
      <rect x="10" y="4" width="6" height="28" rx="3" fill="url(#vibeGradient)" />
      <rect x="20" y="12" width="6" height="20" rx="3" fill="url(#vibeGradient)" />
      <rect x="30" y="8" width="6" height="24" rx="3" fill="url(#vibeGradient)" />
      <rect x="40" y="18" width="6" height="14" rx="3" fill="url(#vibeGradient)" />
      
      <text 
        x="54" y="32" 
        fill="white" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="900" 
        fontSize="34" 
        letterSpacing="-1.5"
        className="drop-shadow-md"
      >
        VIBE
      </text>
      <circle cx="140" cy="14" r="5" fill="#14b8a6" className="drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
    </svg>
  )
}
