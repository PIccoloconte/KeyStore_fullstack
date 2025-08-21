import Link from "next/link";
import React from "react";
import { Card } from "@/components/ui/card";
import { Game } from "@/Types";

const GameCard = (props: { game: Game }) => {
  const { game } = props;
  return (
    <Link href={`/games/${game._id}`} style={{ textDecoration: "none" }}>
      <Card className="bg-gray-800 border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
        <div className="relative">
          {/* Game Image with Gradient Overlay */}
          <div className={`h-48 bg-gradient-to-br relative overflow-hidden`}>
            <img
              src={game.imageUrl || "/placeholder.svg"}
              alt={game.title}
              className="w-full h-full object-cover mix-blend-overlay opacity-80"
            />

            {/* Game Title Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold text-center px-4">
                {game.title.split(" - ")[0]}
              </h3>
            </div>
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
                  €{game.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default GameCard;
