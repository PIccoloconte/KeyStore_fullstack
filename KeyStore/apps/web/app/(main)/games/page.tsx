import { ChevronRight } from "lucide-react";
import GameCard from "@/components/gameCard";
import axios, { AxiosError } from "axios";
import { Game } from "@/Types";
import { getApiUrl } from "@/utils/config";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    platform?: string;
  }>;
}
//search params arrives from navbar-category.tsx
async function getGames(searchParams: {
  search?: string;
  platform?: string;
}): Promise<Game[]> {
  try {
    const params: Record<string, string> = {};

    //if user search with the searchbar
    if (searchParams.search) {
      params.search = searchParams.search;
    }
    //if user click on a platform in the navbar
    if (searchParams.platform) {
      params.platform = searchParams.platform;
    }

    //don't need revalidate , than i can use axios
    const response = await axios.get<Game[]>(`${getApiUrl()}/api/games`, {
      // Axios convert object params in query string
      //Es: { search: "mario", platform: "PC" } become "?search=mario&platform=PC"
      params,
      //delete request after 5 s
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    // return an empty array instead of crashing the application
    return [];
  }
}
//dynamic title for the page
function getSectionTitle(searchParams: { search?: string; platform?: string }) {
  if (searchParams.search) {
    return `Result for "${searchParams.search}"`;
  }
  if (searchParams.platform) {
    return `Games ${searchParams.platform}`;
  }
  return "Trending";
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const games = await getGames(resolvedSearchParams);

  return (
    <div className="mt-[104px] md:mt-20 bg-gray-900">
      <div className="max-w-7xl mx-auto text-white p-6">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-2xl font-bold">
            {getSectionTitle(resolvedSearchParams)}
          </h1>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </div>

        {games.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-lg text-gray-400">No game found</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-rows-2 ">
            {games.map((game) => (
              <GameCard key={game._id} game={game} className="" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
