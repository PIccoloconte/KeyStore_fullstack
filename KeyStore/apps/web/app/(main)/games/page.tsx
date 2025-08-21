import { ChevronRight } from "lucide-react";
import GameCard from "@/components/gameCard";
import GameCardLoading from "@/components/placeholder/gameCardLoading";
import { Suspense } from "react";
import axios, { AxiosError } from "axios";
import { Game } from "@/Types";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    platform?: string;
  }>;
}

async function getGames(searchParams: {
  search?: string;
  platform?: string;
}): Promise<Game[]> {
  try {
    const params: Record<string, string> = {};

    if (searchParams.search) {
      params.search = searchParams.search;
    }

    if (searchParams.platform) {
      params.platform = searchParams.platform;
    }

    // Chiamata diretta con axios - tutto in una riga
    const response = await axios.get<Game[]>(
      `${process.env.API_URL || "http://localhost:3000/api"}/games`,
      {
        // Axios convert object params in query string
        //Es: { search: "mario", platform: "PC" } diventa "?search=mario&platform=PC"
        params,
        //delete request after 5 s
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    // Logga l'errore e ritorna array vuoto per evitare crash
    console.error("Error fetching games:", error);
    // Ritorna un array vuoto invece di far crashare l'applicazione
    // Questo permette alla UI di mostrare il messaggio "Nessun gioco trovato"
    // invece di una pagina di errore
    return [];
  }
}

function getSectionTitle(searchParams: { search?: string; platform?: string }) {
  if (searchParams.search) {
    return `Risultati per "${searchParams.search}"`;
  }
  if (searchParams.platform) {
    return `Giochi ${searchParams.platform}`;
  }
  return "Trending";
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const games = await getGames(resolvedSearchParams);

  return (
    <div className="pt-20 bg-gray-900">
      <div className="max-w-7xl mx-auto text-white p-6">
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-2xl font-bold">
            {getSectionTitle(resolvedSearchParams)}
          </h1>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </div>

        {games.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-lg text-gray-400">Nessun gioco trovato</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
