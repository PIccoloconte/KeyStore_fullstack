import { useState } from "react";

export function useGamesApi(baseUrl: string) {
  const [games, setGames] = useState<any[]>([]);
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all games
  const fetchAllGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}`);
      if (!res.ok) throw new Error("Errore nel recupero giochi");
      const data = await res.json();
      setGames(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch game by id
  const fetchGameById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${baseUrl}/${id}`);
      if (!res.ok) throw new Error("Gioco non trovato");
      const data = await res.json();
      setGame(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    games,
    game,
    loading,
    error,
    fetchAllGames,
    fetchGameById,
  };
}
