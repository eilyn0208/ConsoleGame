import { useEffect, useState } from 'react';
import LeftControl from './components/LeftControl';
import RightControl from './components/RightControl';
import Screen from './components/Screen';
import GameScreen from './components/GameScreen';
import useFetch from './hooks/useFetch';

function App() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
  const { data } = useFetch(url);
  const [pokemones, setPokemones] = useState([]);
  const [position, setPosition] = useState(1); 
  const [myPokeSelection, setMyPokeSelection] = useState(null);
  const [pcPokeSelection, setPcPokeSelection] = useState(null);

  useEffect(() => {
    if (data?.results) {
      const plist = data.results.map((l) => fetch(l.url).then((res) => res.json()));
      Promise.all(plist).then((values) => setPokemones(values));
    }
  }, [data]);

  const handleDirection = (direction) => {
    const columnas = 4;
    // Si ya estamos en batalla, bloqueamos el movimiento del cursor
    if (myPokeSelection) return;

    setPosition((prev) => {
      if (direction === 'RIGHT') return prev < pokemones.length ? prev + 1 : prev;
      if (direction === 'LEFT') return prev > 1 ? prev - 1 : prev;
      if (direction === 'DOWN') return (prev + columnas) <= pokemones.length ? prev + columnas : prev;
      if (direction === 'UP') return (prev - columnas) >= 1 ? prev - columnas : prev;
      return prev;
    });
  };

  const handleSelection = (buttonName) => {
    // BOTÓN A: Selecciona al pokemon actual y uno al azar para la PC
    if (buttonName === 'A' && pokemones.length > 0 && !myPokeSelection) {
      const selected = pokemones.find((p) => p.id === position);
      const randomIdx = Math.floor(Math.random() * pokemones.length);
      setMyPokeSelection(selected);
      setPcPokeSelection(pokemones[randomIdx]);
    }

    // BOTÓN B: Simplemente regresa a la lista
    if (buttonName === 'B') {
      setMyPokeSelection(null);
      setPcPokeSelection(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="flex items-center shadow-2xl rounded-[2.5rem] overflow-hidden bg-gray-900 p-0">
        <LeftControl handleDirection={handleDirection} />
        
        {myPokeSelection && pcPokeSelection ? (
          <GameScreen player={myPokeSelection} cpu={pcPokeSelection} />
        ) : (
          <Screen pokemones={pokemones} position={position} />
        )}

        <RightControl handleSelection={handleSelection} />
      </div>
    </div>
  );
}

export default App;