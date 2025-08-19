"use client";
import { ChevronRight } from "lucide-react";
import { useGamesApi } from "../../hooks/useGamesApi";
import { useEffect } from "react";
import GameCard from "../gameCard";
import GameCardLoading from "../placeholder/gameCardLoading";

export default function ProductsContainer() {
  const { games, loading, error, fetchAllGames } = useGamesApi(
    "http://localhost:3000/api/games"
    // "http://192.168.205.140:3000/api/games" // hotspot mobile
    // "http://192.168.2.116:3000/api/games" // wifi portatile
  );

  useEffect(() => {
    fetchAllGames();
  }, []);

  if (loading)
    return (
      <div>
        <GameCardLoading />
      </div>
    );
  if (error) return <div>Errore: {error}</div>;
  if (!games || games.length === 0) return <GameCardLoading />;

  return (
    <div className="max-w-7xl mx-auto text-white p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <h1 className="text-2xl font-bold">Trending</h1>
        <ChevronRight className="w-6 h-6 text-gray-400" />
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
}
