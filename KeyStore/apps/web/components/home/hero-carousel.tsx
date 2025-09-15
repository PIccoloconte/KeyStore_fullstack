import { Game } from "@/Types";
import HeroCarouselClient from "./hero-carousel-client";
import { getApiUrl } from "@/utils/config";

async function getGames(): Promise<Game[]> {
  try {
    const response = await fetch(`${getApiUrl()}/api/games`, {
      headers: {
        "Content-Type": "application/json",
      },
      // waiting for max time 5 seconds for response
      signal: AbortSignal.timeout(5000),
      // Revalidate cache every 60 seconds
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Game[] = await response.json();
    // need only 4 games for carousel
    return data.slice(0, 4);
  } catch (error) {
    console.error("Error fetching games:", error);
    // return empty array instead of crashing
    return [];
  }
}

export default async function HeroCarouselWrapper() {
  const games = await getGames();

  if (!games || games.length === 0) {
    return <div className="h-full bg-gray-700 animate-pulse w-full"></div>;
  }
  //client component because i need arrows to scroll carousel
  return <HeroCarouselClient games={games} />;
}
