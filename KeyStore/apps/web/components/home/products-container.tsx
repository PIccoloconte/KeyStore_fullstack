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

  // const games = [
  //   {
  //     id: 1,
  //     title: "REMATCH - PC (Steam)",
  //     price: "18.69 €",
  //     discount: "-25%",
  //     image: "/placeholder.svg?height=200&width=350",
  //     bgColor: "from-blue-500 to-green-400",
  //   },
  //   {
  //     id: 2,
  //     title: "Planet Zoo: Asia Animal Pack - PC (Steam)",
  //     price: "6.21 €",
  //     discount: "-38%",
  //     image: "/placeholder.svg?height=200&width=350",
  //     bgColor: "from-purple-500 to-pink-400",
  //     dlc: true,
  //   },
  //   {
  //     id: 3,
  //     title: "Broken Arrow - PC (Steam)",
  //     price: "33.49 €",
  //     discount: "-32%",
  //     image: "/placeholder.svg?height=200&width=350",
  //     bgColor: "from-orange-500 to-yellow-400",
  //   },
  //   {
  //     id: 4,
  //     title: "Clair Obscur: Expedition 33 - PC (Steam)",
  //     price: "28.89 €",
  //     discount: "-62%",
  //     image: "/placeholder.svg?height=200&width=350",
  //     bgColor: "from-gray-600 to-gray-400",
  //   },
  //   {
  //     id: 5,
  //     title: "Elden Ring Nightreign - PC (Steam)",
  //     price: "31.19 €",
  //     discount: "-22%",
  //     image: "/placeholder.svg?height=200&width=350",
  //     bgColor: "from-blue-600 to-purple-500",
  //   },
  //   {
  //     id: 6,
  //     title: "Scum - PC (Steam)",
  //     price: "21.51 €",
  //     discount: "-52%",
  //     image: "/placeholder.svg?height=200&width=350",
  //     bgColor: "from-orange-600 to-red-500",
  //   },
  // ];

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
            key={game.id}
            href={`/games/${game.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card className="bg-gray-800 border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="relative">
                {/* Game Image with Gradient Overlay */}
                <div
                  className={`h-48 bg-gradient-to-br ${game.bgColor} relative overflow-hidden`}
                >
                  <img
                    src={game.image || "/placeholder.svg"}
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
