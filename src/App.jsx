import { useEffect, useState } from 'react';
import LeftControl from './components/LeftControl';
import RightControl from './components/RightControl';
import Screen from './components/Screen';
import useFetch from './hooks/useFetch';

function App() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
  const { data } = useFetch(url);
  const [pokemones, setPokemones] = useState([]);

  const getListPokemones = () => {
    if (!data?.results) return;
    const plist = data.results.map((l) => fetch(l.url).then((res) => res.json()));
    Promise.all(plist).then((values) => setPokemones(values));
  };

  useEffect(() => {
    getListPokemones();
  }, [data]);

  return (
    /* items-start lo pega a la parte superior de la página */
    <div className="flex items-start justify-center min-h-screen bg-gray-100 p-10">
      
      {/* Contenedor horizontal sin huecos */}
      <div className="flex items-start bg-transparent">
        <LeftControl />
        <Screen pokemones={pokemones} />
        <RightControl />
      </div>

    </div>
  );
}

export default App;