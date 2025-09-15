import ProductClient from "@/components/SingleProduct/product-client";
import { Game } from "@/Types";
import { getApiUrl } from "@/utils/config";

async function getGame(id: string): Promise<Game | null> {
  try {
    const response = await fetch(`${getApiUrl()}/api/games/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      // waiting for max time 10 seconds for response
      signal: AbortSignal.timeout(10000),
      // Revalidate every 5 minutes for individual games
      next: {
        revalidate: 300,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Game = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching game:", error);
    return null;
  }
}

export default async function GamePage({ params }: any) {
  const game = await getGame(params.id);

  if (!game) {
    return <div>Nessun gioco trovato</div>;
  }

  return <ProductClient game={game} />;
}
