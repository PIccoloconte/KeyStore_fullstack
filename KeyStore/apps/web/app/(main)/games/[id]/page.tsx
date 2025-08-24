import ProductClient from "@/components/SingleProduct/product-client";
import { Game } from "@/Types";
import axios from "axios";

async function getGame(id: string): Promise<Game | null> {
  try {
    const response = await axios.get<Game>(
      `${process.env.API_URL || "http://localhost:3000"}/api/games/${id}`,
      {
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
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
