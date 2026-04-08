import React from "react";

function RightControl({ handleSelection }) {
  const ActionButton = (cx, cy, label) => (
    <g 
      style={{ cursor: "pointer" }} 
      onClick={() => handleSelection(label)}
      className="hover:brightness-125"
    >
      <circle cx={cx} cy={cy} r="15" fill="#333" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="12" fill="white" fontWeight="bold" style={{ pointerEvents: "none" }}>
        {label}
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 160 240" width="140" height="220" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="160" height="240" rx="40" fill="#ff4d4d" />

      {/*botones XYAB */}
      {ActionButton(80, 55, "X")}
      {ActionButton(80, 105, "B")}
      {ActionButton(105, 80, "A")}
      {ActionButton(55, 80, "Y")}

      {/*stick inferior */}
      <circle cx="80" cy="170" r="25" fill="#333" />
      <circle cx="80" cy="170" r="18" fill="#555" />
    </svg>
  );
}

export default RightControl;