import { ChevronRight } from "lucide-react";
import GameCard from "../gameCard";
import { Game } from "@/Types";
import { getApiUrl } from "@/utils/config";

interface ProductsContainerProps {
  filter?: string;
  categoryName?: string;
}

// fetch games from API
async function getGames(): Promise<Game[]> {
  try {
    const response = await fetch(`${getApiUrl()}/api/games`, {
      headers: {
        "Content-Type": "application/json",
      },
      // waiting for max time 5 seconds for response
      signal: AbortSignal.timeout(5000),

      next: {
        revalidate: 120,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Game[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

export default async function ProductsContainer({
  filter,
  categoryName,
}: ProductsContainerProps) {
  const games = await getGames();

  if (filter === "price") {
    games.sort((a, b) => a.price - b.price);
  }

  return (
    <div className="max-w-7xl mx-auto text-white p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <h1 className="text-2xl font-bold">{categoryName}</h1>
        <ChevronRight className="w-6 h-6 text-gray-400" />
      </div>

      {/* Games Grid desktop and mobile*/}
      <div className="flex overflow-x-scroll md:overflow-hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.slice(0, 6).map((game) => (
          <GameCard
            key={game._id}
            game={game}
            className="w-[170px] h-full md:w-auto"
          />
        ))}
      </div>
    </div>
  );
}
