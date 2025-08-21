import { ChevronRight } from "lucide-react";
import GameCard from "../gameCard";
import GameCardLoading from "../placeholder/gameCardLoading";
import axios from "axios";
import { Game } from "@/Types";

async function getGames(): Promise<Game[]> {
  try {
    const response = await axios.get<Game[]>(
      `${process.env.API_URL || "http://localhost:3000"}/api/games`,
      {
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

export default async function ProductsContainer() {
  const games = await getGames();

  if (!games || games.length === 0) {
    return (
      <div>
        <GameCardLoading />
      </div>
    );
  }

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
