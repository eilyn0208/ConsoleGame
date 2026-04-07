import React from "react";

function RightControl() {
  return (
    <svg viewBox="10 30 160 220" width="140" height="220" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="10" y="20" width="160" height="220" rx="20" fill="#ff2c2c" />

      {/* Analog stick - Centro en 90 */}
      <circle cx="90" cy="180" r="26" fill="#CCCCCC" />
      <circle cx="90" cy="180" r="18" fill="#AAAAAA" />

      {/* Botones XYAB alineados al centro 90 */}
      <circle cx="90" cy="76" r="13" fill="#CCCCCC" />
      <text x="90" y="81" textAnchor="middle" fontSize="11" fill="#2255CC" fontFamily="sans-serif" fontWeight="bold">X</text>

      <circle cx="90" cy="124" r="13" fill="#CCCCCC" />
      <text x="90" y="129" textAnchor="middle" fontSize="11" fill="#DDAA00" fontFamily="sans-serif" fontWeight="bold">B</text>

      <circle cx="116" cy="100" r="13" fill="#CCCCCC" />
      <text x="116" y="105" textAnchor="middle" fontSize="11" fill="#CC2222" fontFamily="sans-serif" fontWeight="bold">A</text>

      <circle cx="64" cy="100" r="13" fill="#CCCCCC" />
      <text x="64" y="105" textAnchor="middle" fontSize="11" fill="#228833" fontFamily="sans-serif" fontWeight="bold">Y</text>
    </svg>
  );
}

export default RightControl;