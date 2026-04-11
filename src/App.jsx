import { useEffect, useState } from 'react';
import LeftControl from './components/LeftControl';
import RightControl from './components/RightControl';
import Screen from './components/Screen';
import GameScreen from './components/GameScreen';
import useFetch from './hooks/useFetch';

// 1. Estilos de los tipos (puedes dejarlos aquí arriba, fuera del componente)
const typeStyles = {
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400 text-black',
  fighting: 'bg-red-700',
  psychic: 'bg-pink-500',
  dragon: 'bg-indigo-600',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-300 text-black',
  normal: 'bg-gray-400',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-sky-400',
  bug: 'bg-lime-500',
  rock: 'bg-stone-600',
  ghost: 'bg-violet-800',
  dark: 'bg-zinc-800',
  ice: 'bg-cyan-300 text-black',
};

// 2. Componente de Detalles 
const PokeDetails = ({ actual }) => {
  if (!actual || actual.length === 0) {
    return (
      <div className="w-64 h-[450px] flex items-center justify-center bg-gray-800 text-gray-500 rounded-lg border-4 border-gray-700 font-mono text-center p-4">
        <p className="animate-pulse">SELECT A POKÉMON</p>
      </div>
    );
  }

  const pokemon = actual[0];

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-2xl font-mono text-gray-800 border-4 border-gray-400">
      <div className="border-b-2 border-gray-100 pb-2 mb-3">
        <span className="text-[10px] font-bold text-gray-400 tracking-tighter">ID: {pokemon.id.toString().padStart(3, '0')}</span>
        <h2 className="text-xl uppercase font-black text-center italic truncate tracking-tight">{pokemon.name}</h2>
      </div>

      <div className="flex justify-around bg-neutral-100 rounded-md p-2 border border-gray-200 mb-3 shadow-inner">
        <div className="flex flex-col items-center">
          <img src={pokemon.sprites?.front_default} alt="front" className="w-20 h-20" style={{ imageRendering: 'pixelated' }} />
          <span className="text-[9px] font-bold text-gray-400">FRONT</span>
        </div>
        <div className="flex flex-col items-center">
          <img src={pokemon.sprites?.back_default} alt="back" className="w-20 h-20" style={{ imageRendering: 'pixelated' }} />
          <span className="text-[9px] font-bold text-gray-400">BACK</span>
        </div>
      </div>

      <div className="flex gap-1 justify-center mb-4 flex-wrap">
        {pokemon.types?.map((t, index) => (
          <span key={index} className={`${typeStyles[t.type.name] || 'bg-gray-500'} text-white text-[10px] px-3 py-0.5 rounded-sm font-bold uppercase shadow-sm`}>
            {t.type.name}
          </span>
        ))}
      </div>

      <div>
        <h3 className="text-[10px] font-bold bg-black text-white px-2 py-0.5 mb-2 inline-block skew-x-[-10deg]">MOVESET & POWER</h3>
        <ul className="h-32 overflow-y-auto text-[10px] pr-1 space-y-1">
          {pokemon.moves?.slice(0, 10).map((m, index) => (
            <li key={index} className="flex justify-between border-b border-gray-100 py-1 uppercase font-medium">
              <span className="truncate mr-2">{m.move?.name.replace('-', ' ')}</span>
              <span className="font-bold text-red-600 shrink-0">{m.attack} ATK</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// 3. Componente Principal App
function App() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
  const { data } = useFetch(url);
  const [pokemones, setPokemones] = useState([]);
  const [position, setPosition] = useState(1); 
  const [myPokeSelection, setMyPokeSelection] = useState(null);
  const [pcPokeSelection, setPcPokeSelection] = useState(null);

  const getRandomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));

  useEffect(() => {
    if (data?.results) {
      const plist = data.results.map((l) => fetch(l.url).then((res) => res.json()));
      Promise.all(plist).then((values) => {
        const saniData = values.map((e) => ({
          name: e.name,
          id: e.id,
          types: e.types,
          sprites: e.sprites,
          moves: e.moves.map((m) => ({ ...m, attack: getRandomInt(20, 98) })),
        }));
        setPokemones(saniData);
      });
    }
  }, [data]);

  const handleDirection = (direction) => {
    if (myPokeSelection) return;
    const columnas = 4;
    setPosition((prev) => {
      if (direction === 'RIGHT') return prev < pokemones.length ? prev + 1 : prev;
      if (direction === 'LEFT') return prev > 1 ? prev - 1 : prev;
      if (direction === 'DOWN') return (prev + columnas) <= pokemones.length ? prev + columnas : prev;
      if (direction === 'UP') return (prev - columnas) >= 1 ? prev - columnas : prev;
      return prev;
    });
  };

  const handleSelection = (buttonName) => {
    if (buttonName === 'A' && pokemones.length > 0 && !myPokeSelection) {
      const selected = pokemones.find((p) => p.id === position);
      setMyPokeSelection(selected);
      setPcPokeSelection(pokemones[Math.floor(Math.random() * pokemones.length)]);
    }
    if (buttonName === 'B') {
      setMyPokeSelection(null);
      setPcPokeSelection(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-200 p-4">
      <div className="flex flex-col lg:flex-row items-center gap-10 bg-neutral-300 border-neutral-100">
        
        {/* CONTENEDOR 1: LA CONSOLA */}
        <div className="flex items-center shadow-2xl rounded-[3rem] overflow-hidden bg-gray-900 border-[5px] border-gray-800">
          <LeftControl handleDirection={handleDirection} />
          <div className="relative">
            {myPokeSelection && pcPokeSelection ? (
              <GameScreen player={myPokeSelection} cpu={pcPokeSelection} />
            ) : (
              <Screen pokemones={pokemones} position={position} />
            )}
          </div>
          <RightControl handleSelection={handleSelection} />
        </div>

        {/* CONTENEDOR 2: DETALLES */}
        {!myPokeSelection && (
          <PokeDetails actual={pokemones.filter(p => p.id === position)} />
        )}
      </div>
    </div>
  );
}

export default App;