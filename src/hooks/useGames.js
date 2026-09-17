import { useState, useEffect } from 'react';

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // API pública libre de CORS y API Key
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        if (!response.ok) throw new Error('Error al conectar con la API pública');
        const data = await response.json();

        // Petición paralela para obtener detalles e imágenes
        const detailedData = await Promise.all(
          data.results.map(async (item) => {
            const res = await fetch(item.url);
            const detail = await res.json();
            return {
              id: detail.id,
              name: detail.name.toUpperCase(),
              background_image:
                detail.sprites.other['official-artwork'].front_default ||
                detail.sprites.front_default,
              rating: (detail.weight / 10).toFixed(1),
              released: detail.types.map((t) => t.type.name).join(', '),
              metacritic: `${detail.base_experience} XP`,
            };
          })
        );

        setGames(detailedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
};

export default useGames;