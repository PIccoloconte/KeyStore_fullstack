"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import GameCard from "@/components/gameCard";
import GameCardLoading from "@/components/placeholder/gameCardLoading";
interface Game {
  _id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  platform: string[];
  imageUrl: string;
  images: string[];
  available: boolean;
  keys: string[];
}

const GamesContent = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Funzione per fare la chiamata fetch
  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);

      // Ottieni i parametri dalla URL
      const search = searchParams.get("search");
      const platform = searchParams.get("platform");

      // Costruisci l'URL per la chiamata API
      const baseUrl = "http://localhost:3000/api/games"; // Modifica con il tuo endpoint
      const params = new URLSearchParams();

      if (search) {
        params.append("search", search);
      }
      if (platform) {
        params.append("platform", platform);
      }

      const url = params.toString()
        ? `${baseUrl}?${params.toString()}`
        : baseUrl;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }

      const data = await response.json();

      // Aggiungi proprietà aggiuntive ai giochi
      const gamesWithExtras = data.map((game: Game) => ({
        ...game,
      }));

      setGames(gamesWithExtras);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Errore durante il caricamento"
      );
      console.error("Errore nel fetch dei giochi:", err);
    } finally {
      setLoading(false);
    }
  };

  // Effetto per caricare i giochi quando cambiano i parametri URL
  useEffect(() => {
    fetchGames();
  }, [searchParams]);

  // Funzione per determinare il titolo della sezione
  const getSectionTitle = () => {
    const search = searchParams.get("search");
    const platform = searchParams.get("platform");

    if (search) {
      return `Risultati per "${search}"`;
    }
    if (platform) {
      return `Giochi ${platform}`;
    }
    return "Trending";
  };

  if (loading) {
    return (
      <div className="pt-20 bg-gray-900">
        <GameCardLoading />;
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20   text-white p-6 bg-gray-900">
        <div className="text-lg text-red-500">Errore: {error}</div>
      </div>
    );
  }

  return (
    <div className="pt-20  bg-gray-900">
      <div className="max-w-7xl mx-auto text-white p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-2xl font-bold">{getSectionTitle()}</h1>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </div>

        {/* No Games Found */}
        {games.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-lg text-gray-400">Nessun gioco trovato</div>
          </div>
        ) : (
          /* Games Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className=" max-w-7xl mx-auto text-white p-6 bg-gray-900">
          <div className="text-lg">Caricamento...</div>
        </div>
      }
    >
      <GamesContent />
    </Suspense>
  );
};

export default Page;
