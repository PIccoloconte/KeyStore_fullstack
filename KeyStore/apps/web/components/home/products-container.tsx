"use client";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useGamesApi } from "../../hooks/useGamesApi";
import { useEffect } from "react";

export default function ProductsContainer() {
  const { games, loading, error, fetchAllGames } = useGamesApi(
    "http://localhost:3000/api/games"
  );

  useEffect(() => {
    fetchAllGames();
  }, []);

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error}</div>;

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
          <Link
            key={game._id}
            href={`/games/${game._id}`}
            style={{ textDecoration: "none" }}
          >
            <Card className="bg-gray-800 border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="relative">
                {/* Game Image with Gradient Overlay */}
                <div
                  className={`h-48 bg-gradient-to-br ${game.bgColor} relative overflow-hidden`}
                >
                  <img
                    src={game.imageUrl || "/placeholder.svg"}
                    alt={game.title}
                    className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  />

                  {/* Game Title Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold text-center px-4">
                      {game.title.split(" - ")[0]}
                    </h3>
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold">
                      {game.discount}
                    </span>
                  </div>

                  {/* DLC Badge */}
                  {game.dlc && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs border border-gray-500">
                        DLC
                      </span>
                    </div>
                  )}
                </div>

                {/* Game Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-sm text-gray-300 mb-1 line-clamp-2">
                        {game.title}
                      </h4>
                    </div>
                    <div className="text-right ml-4">
                      <span className="text-lg font-bold text-white">
                        {game.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
