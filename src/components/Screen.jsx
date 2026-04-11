import React from "react";

const Screen = ({ pokemones, position }) => {  // El componente Screen recibe dos props: pokemones, que es un array de objetos con la información de los Pokémon obtenida de la API, y position, que es un número que indica el ID del Pokémon actualmente seleccionado por el jugador. Este componente se encarga de mostrar una cuadrícula con los Pokémon disponibles y resaltar el que está seleccionado.
  return (
    <div className="w-[450px] h-[310px] overflow-y-auto border-4 border-gray-800 bg-white"> {/* Este bloque es el contenedor principal de la pantalla, con un tamaño fijo, borde grueso y fondo blanco. La propiedad overflow-y-auto permite que aparezca una barra de desplazamiento vertical si el contenido excede la altura del contenedor */}
      <div className="grid grid-cols-4 gap-2 p-4"> {/* Este bloque es el contenedor de los Pokémon, con un diseño de cuadrícula de 4 columnas y un espacio entre los elementos */}
        {/* esta línea es para mapear cada Pokémon y crear un bloque para él */}
        {pokemones.map((pokemon) => (   
          <div 
            key={pokemon.id} // La clave de cada Pokémon es su ID único, lo que ayuda a React a identificar cada elemento de la lista y optimizar su renderizado
            className={`flex flex-col items-center p-1 border-4 ${   /* esta linea es para crear un bloque para cada Pokémon, con un diseño de columna, centrado, padding y un borde que se va a modificar según si el Pokémon está seleccionado o no */
                position === pokemon.id  /* Si el ID del Pokémon coincide con la posición seleccionada */
                  ? 'border-red-600 bg-red-50 z-10 shadow-md'  /* se le aplica un borde rojo, un fondo rojo claro, un índice z para que esté por encima de los demás y una sombra para destacarlo */
                  :   'border-transparent' /* Si no coincide, el borde es transparente para que no se vea */
            } 
            }`}
          >
            <p className="text-[9px] font-black uppercase text-center truncate w-full"> {/* Esta linea es para mostrar el nombre del Pokémon, con un estilo de texto pequeño, negrita, mayúsculas, centrado y truncado si es muy largo */}
              {pokemon.name}
            </p>
            <img
              src={pokemon.sprites?.front_default} /* Mostramos la imagen del sprite frontal del Pokémon, utilizando el operador de encadenamiento opcional para evitar errores si la propiedad sprites o front_default no existe */
              alt={pokemon.name} /* Texto alternativo para la imagen, que es el nombre del Pokémon */
              className="w-14 h-14" /* Estilos para la imagen: un tamaño fijo de 14x14 píxeles */
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screen; /* Exportamos el componente Screen para que pueda ser utilizado en otras partes de la aplicación, como en el componente principal App.jsx donde se maneja la lógica de selección de Pokémon y se pasan los datos de los Pokémon y la posición seleccionada a este componente para mostrar la cuadrícula de Pokémon y resaltar el seleccionado. */