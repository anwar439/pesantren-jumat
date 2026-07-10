import React from "react";

export function SmpAlAzhar9Logo({ className = "w-12 h-12", customSrc }: { className?: string; customSrc?: string | null }) {
  if (customSrc) {
    return <img src={customSrc} className={`${className} object-contain rounded-full bg-white`} alt="SMP Al Azhar 9 Logo" referrerPolicy="no-referrer" />;
  }
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Circle with Blue Fill */}
      <circle cx="50" cy="50" r="48" fill="#0080C0" stroke="#004D73" strokeWidth="1.5" />
      {/* Inner Circle line */}
      <circle cx="50" cy="50" r="38" fill="none" stroke="#ffffff" strokeWidth="1" />
      
      {/* Circular Text using textPath */}
      <defs>
        <path id="textPathAlAzhar" d="M 50,50 m -43,0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0" />
      </defs>
      <text fill="#ffffff" fontSize="5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.1">
        <textPath href="#textPathAlAzhar" startOffset="50%" textAnchor="middle">
          SEKOLAH MENENGAH PERTAMA ISLAM AL AZHAR 9
        </textPath>
      </text>

      {/* Mosque and Minaret Silhouette */}
      {/* Minaret on the left */}
      <path d="M 27,72 L 27,42 L 31,42 L 31,72 Z" fill="#ffffff" />
      <path d="M 25,42 L 33,42 L 33,39 L 25,39 Z" fill="#ffffff" />
      <path d="M 26,39 C 26,30 33,30 33,39 Z" fill="#ffffff" />
      {/* Minaret windows */}
      <rect x="28" y="45" width="2" height="3" fill="#0080C0" />
      <rect x="28" y="50" width="2" height="3" fill="#0080C0" />
      <rect x="28" y="55" width="2" height="3" fill="#0080C0" />

      {/* Mosque Dome on the right */}
      <path d="M 33,72 L 73,72 L 73,58 L 33,58 Z" fill="#ffffff" />
      {/* Main Dome */}
      <path d="M 40,58 C 40,40 66,40 66,58 Z" fill="#ffffff" />
      {/* Dome Top Ornament (Crescent & Star) */}
      <path d="M 53,35 C 51,35 49.5,36 49.5,38 C 49.5,40 51,41 53,41 C 54,41 54.5,40.5 54.5,40 C 53.5,40 52.5,39.5 52.5,38.5 C 52.5,37.5 53.5,36.5 54.5,36.5 C 54,35.5 53.5,35 53,35 Z" fill="#004D73" />
      <polygon points="53,32 54,34 56,34 54.5,35 55,37 53,36 51,37 51.5,35 50,34 52,34" fill="#004D73" />
      
      {/* Base line */}
      <path d="M 20,72 L 80,72" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function YayasanMuhajirienLogo({ className = "w-12 h-12", customSrc }: { className?: string; customSrc?: string | null }) {
  if (customSrc) {
    return <img src={customSrc} className={`${className} object-contain rounded-full bg-white`} alt="Yayasan Muhajirien Logo" referrerPolicy="no-referrer" />;
  }
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Circle with Green Fill */}
      <circle cx="50" cy="50" r="48" fill="#00A859" stroke="#005F32" strokeWidth="1.5" />
      {/* Inner Circle line */}
      <circle cx="50" cy="50" r="38" fill="none" stroke="#ffffff" strokeWidth="1" />
      
      {/* Circular Text using textPath */}
      <defs>
        <path id="textPathYayasan" d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
      </defs>
      <text fill="#ffffff" fontSize="4.8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.05">
        <textPath href="#textPathYayasan" startOffset="50%" textAnchor="middle">
          YAYASAN WAQAF AL MUHAJIRIEN JAKAPERMAI
        </textPath>
      </text>

      {/* Mosque dome & minaret silhouette with Jakapermai letter J style */}
      {/* Dome */}
      <path d="M 45,72 L 75,72 L 75,60 L 45,60 Z" fill="#ffffff" />
      <path d="M 47,60 C 47,43 73,43 73,60 Z" fill="#ffffff" />
      {/* Dome Top Ornament */}
      <line x1="60" y1="44" x2="60" y2="38" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="60" cy="37" r="1.5" fill="#ffffff" />

      {/* Minaret on the Left as J */}
      {/* Vertical stem */}
      <path d="M 28,72 C 28,75 32,75 35,75 L 35,71 C 32,71 31,71 31,69 L 31,45 L 35,45 L 35,72 Z" fill="#ffffff" />
      {/* Balcony */}
      <rect x="28" y="42" width="10" height="3" fill="#ffffff" />
      {/* Top Dome of Minaret */}
      <path d="M 30,42 C 30,34 36,34 36,42 Z" fill="#ffffff" />
      <line x1="33" y1="34" x2="33" y2="30" stroke="#ffffff" strokeWidth="1" />
      <circle cx="33" cy="29.5" r="1" fill="#ffffff" />

      {/* Windows on minaret */}
      <rect x="32" y="47" width="2" height="4" fill="#00A859" />
      <rect x="32" y="53" width="2" height="4" fill="#00A859" />

      {/* Open Book (Quran) under dome */}
      <path d="M 54,68 L 59,66 L 59,71 L 54,73 Z" fill="#00A859" />
      <path d="M 66,68 L 61,66 L 61,71 L 66,73 Z" fill="#00A859" />
    </svg>
  );
}
