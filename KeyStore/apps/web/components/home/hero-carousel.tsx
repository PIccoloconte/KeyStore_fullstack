import axios from "axios";
import { Game } from "@/Types";
import HeroCarouselClient from "./hero-carousel-client";

async function getGames(): Promise<Game[]> {
  try {
    const response = await axios.get<Game[]>(
      `${process.env.API_URL || "http://localhost:3000"}/api/games`,
      {
        // waiting for max time 5 seconds for response
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //need anly 4 games for carousel
    return response.data.slice(0, 4);
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
