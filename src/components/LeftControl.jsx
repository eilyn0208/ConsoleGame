import React from "react";

function LeftControl() {
  return (
    <svg viewBox="0 30 160 220" width="140" height="220" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="0" y="20" width="160" height="220" rx="20" fill="#2cdcff" />

      {/* Analog stick - Centrado en 80 */}
      <circle cx="80" cy="90" r="26" fill="#CCCCCC" />
      <circle cx="80" cy="90" r="18" fill="#AAAAAA" />

      {/* D-Pad vertical */}
      <rect x="69" y="148" width="22" height="60" rx="4" fill="#CCCCCC" />
      {/* D-Pad horizontal */}
      <rect x="50" y="167" width="60" height="22" rx="4" fill="#CCCCCC" />
      {/* D-Pad center */}
      <rect x="69" y="167" width="22" height="22" rx="2" fill="#BBBBBB" />
    </svg>
  );
}

export default LeftControl;