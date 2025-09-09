"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Game } from "@/Types";
import Link from "next/link";

interface Props {
  games: Game[];
}

export default function HeroCarouselClient({ games }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  //carousel autoplay
  useEffect(() => {
    if (!games || games.length === 0) return;
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % games.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, games]);

  //carousel stop autoplay
  useEffect(() => {
    if (!games || games.length === 0) return;
    if (isAutoPlaying) return;

    const timeout = setTimeout(() => setIsAutoPlaying(true), 1000);
    return () => clearTimeout(timeout);
  }, [isAutoPlaying, games]);

  const currentGame = games[currentSlide];

  //right arrow
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % games.length);
    setIsAutoPlaying(false);
  };
  //left arrow
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + games.length) % games.length);
    setIsAutoPlaying(false);
  };
  //go to specific slide with dots
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <>
      <div className="absolute inset-0">
        {games.map((game, index) => (
          <div
            key={game._id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${game.imageUrl}')`,
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl">
            <div className="space-y-4 sm:space-y-6 text-white">
              <div className="inline-block"></div>
              <h1 className="text-3xl xl:text-4xl font-bold leading-tight">
                {currentGame.title}
              </h1>
              <p className="text-gray-200 text-sm lg:text-lg leading-relaxed max-w-lg lg:max-w-2xl">
                {currentGame.description}
              </p>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-3xl xl:text-4xl font-bold leading-tight">
                  {currentGame.price + " €"}
                </span>
              </div>
              <Link key={currentGame._id} href={`/games/${currentGame._id}`}>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-md transition-colors"
                >
                  Buy Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Previous slide button */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-colors z-10 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        {/* Next slide button */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-colors z-10 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
      {/** Dots navigation */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {games.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors cursor-pointer ${
              index === currentSlide ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}
