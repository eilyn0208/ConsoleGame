import React from "react";

function LeftControl({ handleDirection }) {
  const DirectionButton = (cx, cy, dir, arrow) => (
    <g 
      style={{ cursor: "pointer" }} 
      onClick={() => handleDirection(dir)}
      className="hover:brightness-125"
    >
      <circle cx={cx} cy={cy} r="15" fill="#333" />
      <path d={arrow} fill="white" transform={`translate(${cx - 5}, ${cy - 5}) scale(0.8)`} />
    </g>
  );

  return (
    <svg viewBox="0 0 160 320" width="140" height="320" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="-15" width="160" height="350" rx="30" fill="#2cdcff" />
      
      {/* stick superior */}
      <circle cx="80" cy="70" r="25" fill="#333" />
      <circle cx="80" cy="70" r="18" fill="#555" />

      {/* Direction pad para mover el cursor */}
      {DirectionButton(80, 135, "UP", "M5 2 L8 8 L2 8 Z")}
      {DirectionButton(80, 185, "DOWN", "M5 8 L8 2 L2 2 Z")}
      {DirectionButton(55, 160, "LEFT", "M2 5 L8 2 L8 8 Z")}
      {DirectionButton(105, 160, "RIGHT", "M8 5 L2 2 L2 8 Z")}
    </svg>
  );
}

export default LeftControl;