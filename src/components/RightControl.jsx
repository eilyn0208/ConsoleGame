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
    <svg viewBox="0 0 160 320" width="140" height="320" xmlns="http://www.w3.org/2000/svg">  {/* Este bloque es el contenedor principal del control derecho, con un tamaño de vista de 160x400 píxeles y un tamaño de renderizado de 140x320 píxeles para darle un aspecto más compacto */}
      <rect x="0" y="-15" width="160" height="350" rx="30" fill="#ff4d4d" /> {/* Este bloque es el fondo del control, con un rectángulo rojo con bordes redondeados para simular la carcasa de un control retro  con posicion */}

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