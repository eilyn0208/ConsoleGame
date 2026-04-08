import React from "react";

const Screen = ({ pokemones, position }) => {
  return (
    <div className="w-[450px] h-[220px] overflow-y-auto border-8 border-gray-800 bg-white">
      <div className="grid grid-cols-4 gap-2 p-4">
        {pokemones.map((pokemon) => (
          <div 
            key={pokemon.id}
            className={`flex flex-col items-center p-1 border-4 ${
              position === pokemon.id 
                ? 'border-red-600 bg-red-50 z-10 shadow-md' 
                :   'border-transparent'
            } 
            }`}
          >
            <p className="text-[9px] font-black uppercase text-center truncate w-full">
              {pokemon.name}
            </p>
            <img
              src={pokemon.sprites?.front_default}
              alt={pokemon.name}
              className="w-14 h-14"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screen;