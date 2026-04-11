import React, { useState, useEffect } from 'react';

const GameScreen = ({ player, cpu }) => { // Recibimos los datos del jugador y la CPU como props
  const [myHP, setMyHP] = useState(100); //vida del jugador al 100
  const [pcHP, setPcHP] = useState(100); //vida de la CPU al 100
  const [turn, setTurn] = useState('player'); // 'player' o 'cpu' para controlar de quien es el turno

  // --- Lógica de Ataque del Jugador ---
  const handlePlayerAttack = (moveDamage) => { // Recibimos el daño del movimiento seleccionado
    if (turn !== 'player' || myHP <= 0 || pcHP <= 0) return; // Solo permitimos atacar si es el turno del jugador y ambos están vivos

    // Reducimos el daño (opcional) para que la pelea dure más
    const finalDamage = Math.floor(moveDamage / 3);  // el daño se reduce a un tercio para balancear la pelea
    
    setPcHP((prev) => Math.max(0, prev - finalDamage)); // el hp de la cpu se reduce pero sin bajar de 0
    setTurn('cpu'); //cambia el turno a la cpu despues del ataque del jugador
  };

  // --- Lógica de la CPU ---
  useEffect(() => { // Este efecto se activa cada vez que cambia el turno, el HP del jugador o el HP de la CPU
    if (turn === 'cpu' && pcHP > 0 && myHP > 0) { // si el turno es de la CPU y ambos están vivos, la CPU ataca
      const cpuTimer = setTimeout(() => { // Simulamos un tiempo de reacción de la CPU con un timeout
        // La CPU elige uno de sus 4 movimientos al azar
        const randomMoveIdx = Math.floor(Math.random() * 4); // elegimos un índice aleatorio entre 0 y 3 para seleccionar un movimiento de la CPU
        const cpuDamage = Math.floor((cpu.moves[randomMoveIdx]?.attack || 15) / 3); // obtenemos el daño del movimiento seleccionado, si no tiene movimientos se asigna un daño base de 15, y luego se reduce a un tercio para balancear la pelea
        
        setMyHP((prev) => Math.max(0, prev - cpuDamage)); 
        setTurn('player'); // Después de que la CPU ataca, el turno vuelve al jugador
      }, 1000); // La CPU "piensa" durante 1 segundo antes de atacar
      return () => clearTimeout(cpuTimer); // devolvemos una función de limpieza para cancelar el timeout si el componente se desmonta o si el turno cambia antes de que la CPU ataque
    }
  }, [turn, pcHP, myHP, cpu]); // Dependencias del efecto: se ejecuta cada vez que cambia el turno, el HP del jugador, el HP de la CPU o los datos de la CPU

  return ( // El diseño visual del GameScreen se basa en una pantalla dividida en dos bloques: el bloque superior para la CPU y el bloque inferior para el jugador, con un panel de botones de ataque debajo del bloque del jugador. También incluye un overlay final que aparece cuando uno de los dos (jugador o CPU) pierde toda su HP, mostrando un mensaje de victoria o derrota.
    <div className="w-[400px] h-[300px] opacity-90 flex flex-col p-2 relative font-mono overflow-hidden border-4 border-gray-800 shadow-inner">
      {/* IMAGEN DE FONDO DE BATALLA */}
    <div className="absolute inset-0 -z-10">
      <img 
        src="https://i.pinimg.com/1200x/95/29/7f/95297f250f9563193468f7969decc4f4.jpg" 
        alt="battle-bg" 
        className="w-full h-full object-cover opacity-100" 
      />
      {/* Overlay para suavizar el fondo y que se vea el texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300/20 to-green-200/20"></div>
    </div>
      {/* BLOQUE CPU ARRIBA */}
      <div className="flex justify-between items-start w-full px-2 mt-1"> {/* Esta linea es para que los items esten alineados  */}
        <div className="bg-white/90 p-1.5 rounded-lg border-2 border-gray-700 shadow-md w-36 z-10"> {/* Este bloque es el contenedor del estado de la CPU, con fondo blanco semitransparente, borde y sombra para destacarlo */}
          <div className="flex justify-between text-[8px] font-bold uppercase"> {/* Esta linea es para mostrar el nombre y ID de la CPU, con estilo de texto pequeño, negrita y mayúsculas */}
            <span className="truncate w-20">{cpu?.name}</span> {/* Mostramos el nombre de la CPU, con truncamiento si es muy largo */}
            <span className="text-gray-500">ID:{cpu?.id}</span> {/* Mostramos el ID de la CPU, con un color gris para diferenciarlo del nombre */}
          </div>
          <div className="w-full bg-gray-300 h-1.5 rounded-full overflow-hidden border border-gray-400 mt-1"> {/* Esta linea es el fondo de la barra de HP de la CPU, con un color gris claro, altura pequeña, bordes redondeados y un borde para darle definición */}
            <div 
              className={`h-full transition-all duration-500 ${pcHP > 50 ? 'bg-green-500' : pcHP > 20 ? 'bg-yellow-400' : 'bg-red-500'}`} 
              style={{ width: `${pcHP}%` }}
            />
          </div>
          <p className="text-[8px] text-right font-bold mt-0.5">HP: {pcHP}/100</p> {/* Mostramos el HP actual de la CPU sobre el hp máximo alineado a la derecha */}
        </div>

        <img 
          src={cpu?.sprites?.front_default}  // Mostramos la imagen del sprite frontal de la CPU
          className={`w-40 h-40 pixelated ${pcHP <= 0 ? 'opacity-0 scale-0 transition-all duration-700' : 'animate-bounce'}`}  // Si la CPU pierde toda su HP, su imagen desaparece con una transición suave, de lo contrario, tiene una animación de rebote para darle vida
          alt="cpu" // Texto alternativo para la imagen de la CPU
        />
      </div>

      {/* BLOQUE JUGADOR + BOTONES */}
      <div className="flex flex-col w-full absolute bottom-1 px-2"> {/* Este bloque es el contenedor del estado del jugador y los botones de ataque, está posicionado absolutamente en la parte inferior de la pantalla para simular la interfaz de una consola retro */}
        <div className="flex justify-between items-end w-full"> {/* Esta linea es para que los items estén alineados al fondo del bloque */}
          <img 
            src={player?.sprites?.back_default} // Mostramos la imagen del sprite trasero del jugador
            className={`w-44 h-44 pixelated ${myHP <= 0 ? 'opacity-0 scale-0 transition-all duration-700' : ''}`}  // Si el jugador pierde toda su HP, su imagen desaparece con una transición suave
            alt="player" // si no aparece la imagen del jugador, se muestra este texto alternativo
          />

          {/* MI ESTADO */}
          <div className="bg-white/90 p-1.5 rounded-lg border-2 border-gray-700 shadow-md w-36 z-10 mb-1"> {/* Este bloque es el contenedor del estado del jugador, con fondo blanco semitransparente, borde y sombra para destacarlo */}
            <div className="flex justify-between text-[8px] font-bold uppercase"> {/* Esta linea es para alinear el nombre y el ID del jugador */}
              <span className="truncate w-20">{player?.name}</span> {/* Mostramos el nombre del jugador, con truncamiento si es muy largo */}
              <span className="text-gray-500">ID:{player?.id}</span> {/* Mostramos el ID del jugador, con un color gris para diferenciarlo del nombre */}
            </div>
            <div className="w-full bg-gray-300 h-1.5 rounded-full overflow-hidden border border-gray-400 mt-1">  {/* Esta linea es el fondo de la barra de HP del jugador, con un color gris claro, altura pequeña, bordes redondeados y un borde para darle definición */}
              <div 
                className={`h-full transition-all duration-500 ${myHP > 50 ? 'bg-green-500' : myHP > 20 ? 'bg-yellow-400' : 'bg-red-500'}`}
                style={{ width: `${myHP}%` }}
              />
            </div>
            <p className="text-[8px] text-right font-bold mt-0.5">HP: {myHP}/100</p>
          </div>
        </div>

        {/* PANEL DE 4 ATAQUES */}
        <div className="grid grid-cols-2 gap-1 bg-slate-800/90 p-1.5 rounded-md border-2 border-slate-600 mt-1"> {/* Este bloque es el contenedor de los botones de ataque, con un fondo oscuro semitransparente, borde y un diseño de cuadrícula para colocar los botones en dos columnas */}
          {player?.moves?.slice(0, 4).map((m, index) => (   // Iteramos sobre los primeros 4 movimientos del jugador para crear un botón por cada uno, si el jugador tiene menos de 4 movimientos, se mostrarán solo los que tenga */}
            <button
              key={index} // La clave del botón es el índice del movimiento en la lista de movimientos del jugador
              disabled={turn !== 'player' || myHP <= 0 || pcHP <= 0} // Deshabilitamos el botón si no es el turno del jugador o si alguno de los dos (jugador o CPU) ha perdido toda su HP
              onClick={() => handlePlayerAttack(m.attack)} // Al hacer clic en el botón, se llama a la función handlePlayerAttack con el daño del movimiento seleccionado
              className="bg-white hover:bg-yellow-200 disabled:bg-gray-400 text-[8px] font-black uppercase py-1 px-1 rounded border-b-2 border-gray-400 active:border-b-0 transition-all truncate" // Estilos para el botón: fondo blanco, cambio de color  a amarillo al pasar el mouse, fondo gris cuando está deshabilitado, texto pequeño, negrita y mayúsculas, padding, borde inferior para simular un botón presionable, transición suave y truncamiento del texto si es muy largo
            >
              {m.move.name.replace('-', ' ')}  {/* Mostramos el nombre del movimiento, reemplazando guiones por espacios para mejorar la legibilidad */}  
            </button>
          ))}
        </div>
      </div>

      {/* OVERLAY FINAL */}
      {(myHP <= 0 || pcHP <= 0) && (   // Si el HP del jugador o de la CPU llega a 0 o menos, mostramos un overlay que cubre toda la pantalla con un mensaje de victoria o derrota 
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">    {/* esta linea es para crear un overlay que cubre toda la pantalla  */}
          <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_white]"> {/* este bloque es el contenedor del mensaje final, con fondo blanco, borde y una sombra para darle efecto de pop up*/}
            <p className="text-xl font-black italic uppercase">   {/* esta linea es para mostrar el mensaje final, con un estilo de letra negra grande cursiva y mayúsculas */}
              {pcHP <= 0 ? 'Victory!' : 'Defeat...'} {/* Si la CPU pierde toda su HP, el mensaje es "Victory!", de lo contrario, si el jugador pierde toda su HP, el mensaje es "Defeat..." */}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;  // Exportamos el componente GameScreen para que pueda ser utilizado en otras partes de la aplicación, como en el componente principal App.jsx donde se maneja la lógica de selección de Pokémon y se pasan los datos del jugador y la CPU a este componente para simular la batalla.