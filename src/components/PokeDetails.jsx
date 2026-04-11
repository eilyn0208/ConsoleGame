import React from 'react';

const PokeDetails = ({ actual }) => {
  // Validación de que actual que significa el Pokémon seleccionado no esté vacío o sea nulo, para evitar errores al intentar acceder a sus propiedades. Si no hay un Pokémon seleccionado, se muestra un mensaje indicando que se debe seleccionar uno.
  if (!actual || actual.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-white font-mono">  {/* Este bloque es el contenedor principal de los detalles del Pokémon, con un diseño de flexbox para centrar el contenido tanto vertical como horizontalmente, una altura completa para ocupar todo el espacio disponible, un color de texto blanco y una fuente monoespaciada para darle un estilo retro */}
        Selecciona un Pokémon...
      </div>
    );
  }

  const pokemon = actual[0]; // Si hay un Pokémon seleccionado, se toma el primer elemento del array actual, que es el objeto con la información del Pokémon seleccionado, y se asigna a la variable pokemon para poder acceder a sus propiedades y mostrarlas en la interfaz de usuario.

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-inner font-mono text-gray-800 border-4 border-gray-400"> {/* Este bloque es el contenedor principal de los detalles del Pokémon, con un fondo gris claro, padding para separar el contenido del borde, bordes redondeados para darle un aspecto más suave, una sombra interna para darle profundidad, una fuente monoespaciada para darle un estilo retro y un borde gris para delimitar el área de los detalles */}
      {/* Cabecera: Nombre e ID */}
      <div className="flex justify-between items-center border-b-2 border-gray-300 pb-2 mb-4"> {/* Este bloque es la cabecera de los detalles del Pokémon, con un diseño de flexbox para distribuir el contenido entre el nombre y el ID, una línea divisoria en la parte inferior para separar la cabecera del resto del contenido, padding en la parte inferior para dar espacio a la línea divisoria y margin-bottom para separar la cabecera del resto del contenido */}
        <h2 className="text-2xl uppercase font-bold italic">{pokemon.name}</h2>     {/* Esta linea es para mostrar el nombre del Pokémon, con un estilo de texto grande, mayúsculas, negrita e itálica para darle un aspecto destacado */}
        <span className="text-xl text-gray-500">#{pokemon.id}</span> {/* Esta linea es para mostrar el ID del Pokémon, con un estilo de texto más pequeño y un color gris para darle un aspecto secundario, span significa "etiqueta" en inglés */}
      </div>

      {/* Sprites */}
      <div className="flex justify-around bg-white rounded-md p-2 border border-gray-300 shadow-sm mb-4"> {/* Este bloque es el contenedor de los sprites del Pokémon, con un diseño de flexbox para distribuir los sprites de manera uniforme, un fondo blanco para resaltar las imágenes, bordes redondeados para darle un aspecto más suave, padding para separar el contenido del borde, un borde gris para delimitar el área de los sprites y una sombra para darle profundidad */}
        <div className="text-center"> {/* Este bloque es el contenedor del sprite frontal del Pokémon, con un diseño de texto centrado para alinear la imagen y el texto debajo de ella */}
          <img 
            src={pokemon.sprites?.front_default}    // Mostramos la imagen del sprite frontal del Pokémon, utilizando el operador de encadenamiento opcional para evitar errores si la propiedad sprites o front_default no existe
            alt={`${pokemon.name} front`}       // Texto alternativo para la imagen del sprite frontal, que incluye el nombre del Pokémon seguido de "front" para indicar que es la vista frontal
            className="w-24 h-24 pixelated"  // Estilos para la imagen del sprite frontal: un tamaño fijo de 24x24 píxeles y un estilo pixelado para darle un aspecto retro
          />
          <p className="text-xs text-gray-400">FRONT</p> {/* Esta linea es para mostrar la etiqueta "FRONT" debajo del sprite frontal, con un estilo de texto pequeño y un color gris para darle un aspecto secundario */}
        </div>
        <div className="text-center"> {/* Este bloque es el contenedor del sprite trasero del Pokémon, con un diseño de texto centrado para alinear la imagen y el texto debajo de ella */}
          <img 
            src={pokemon.sprites?.back_default}  // Mostramos la imagen del sprite trasero del Pokémon, utilizando el operador de encadenamiento opcional para evitar errores si la propiedad sprites o back_default no existe
            alt={`${pokemon.name} back`}     // Texto alternativo para la imagen del sprite trasero, que incluye el nombre del Pokémon seguido de "back" para indicar que es la vista trasera
            className="w-24 h-24 pixelated" // Estilos para la imagen del sprite trasero: un tamaño fijo de 24x24 píxeles y un estilo pixelado para darle un aspecto retro
          />
          <p className="text-xs text-gray-400">BACK</p> {/* Esta linea es para mostrar la etiqueta "BACK" debajo del sprite trasero, con un estilo de texto pequeño y un color gris para darle un aspecto secundario */}
        </div>
      </div>

      {/* Lista de Movimientos */}
      <div>
        <h3 className="text-sm font-bold bg-gray-800 text-white px-2 py-1 inline-block mb-2">   {/* Esta linea es para mostrar el título "MOVES & POWER" encima de la lista de movimientos, con un estilo de texto pequeño, negrita, fondo gris oscuro, texto blanco, padding para separar el texto del borde, un display inline-block para que el fondo se ajuste al tamaño del texto y margin-bottom para separar el título de la lista */}
          MOVESET & POWER
        </h3>
        <ul className="grid grid-cols-1 gap-1 h-32 overflow-y-auto pr-2 custom-scrollbar"> {/* Este bloque es el contenedor de la lista de movimientos del Pokémon, con un diseño de cuadrícula de una columna para mostrar los movimientos en una sola columna, un espacio entre los elementos para separarlos visualmente, una altura fija para limitar el espacio ocupado por la lista, una propiedad overflow-y-auto para permitir el desplazamiento vertical si la lista excede la altura establecida, padding-right para dar espacio al scrollbar y una clase personalizada custom-scrollbar para estilizar la barra de desplazamiento */}
          {/* ESta linea es para mostrar los movimientos del Pokémon, con un estilo de texto pequeño y un borde inferior para separarlos visualmente */}
          {pokemon.moves?.slice(0, 10).map((m, index) => ( 
            <li 
              key={index}  /* La clave de cada movimiento es su índice en el array, lo que ayuda a React a identificar cada elemento de la lista y optimizar su renderizado */
              className="flex justify-between text-xs border-b border-gray-200 py-1 hover:bg-gray-200" /* Estilos para cada movimiento: un diseño de flexbox para distribuir el nombre del movimiento y su poder de ataque, un estilo de texto pequeño, un borde inferior para separar los movimientos visualmente, padding vertical para dar espacio al contenido y un efecto hover para resaltar el movimiento cuando el usuario pasa el cursor sobre él */
            >
              <span className="uppercase">{m.move?.name.replace('-', ' ')}</span> {/* Esta linea es para mostrar el nombre del movimiento, con un estilo de texto en mayúsculas y reemplazando los guiones por espacios para mejorar la legibilidad */}
              <span className="font-bold text-red-600">{m.attack} ATK</span> {/* Esta linea es para mostrar el poder de ataque del movimiento, con un estilo de texto en negrita y un color rojo para resaltar su importancia, seguido de "ATK" para indicar que se refiere al ataque */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokeDetails; /* Exportamos el componente PokeDetails para que pueda ser utilizado en otras partes de la aplicación, como en el componente principal App.jsx donde se maneja la lógica de selección de Pokémon y se pasan los datos del Pokémon seleccionado a este componente para mostrar sus detalles, incluyendo su nombre, ID, sprites y lista de movimientos. */