import React from "react";

const GameScreen = ({ player, cpu }) => {
  return (
    // pantalla de batalla entre el pokemon y el de la pc
    <div className="w-[450px] h-[220px] bg-white flex items-center justify-center p-4">
      
      <div className="flex justify-around items-center w-full">
        
        {/* pokemon seleccionado */}
        <img 
          src={player.sprites?.front_default} 
          className="w-40 h-40 object-contain" 
          alt="Jugador" 
        />

        {/* el versus entre ambos pokemones */}
        <div className="text-xl font-black text-gray-300">VS</div>

        {/* pokemon de la PC */}
        <img 
          src={cpu.sprites?.front_default} 
          className="w-40 h-40 object-contain" 
          alt="Rival" 
        />
        
      </div>
    </div>
  );
};

export default GameScreen;