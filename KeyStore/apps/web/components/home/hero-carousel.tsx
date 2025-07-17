"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGamesApi } from "../../hooks/useGamesApi";
import Link from "next/link";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { games, loading, error, fetchAllGames } = useGamesApi(
    "http://localhost:3000/api/games"
    // "http://192.168.205.140:3000/api/games"
    //"http://192.168.2.116:3000/api/games" // Adjust this URL based on your environment
  );

  useEffect(() => {
    fetchAllGames();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!games || games.length === 0) return;
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(games.length, 4));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, games]);

  useEffect(() => {
    if (!games || games.length === 0) return;
    if (isAutoPlaying) return;

    const timeout = setTimeout(() => setIsAutoPlaying(true), 1000);

    return () => clearTimeout(timeout);
  }, [isAutoPlaying, games]);

  // Handle edge cases
  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error}</div>;
  if (!games || games.length === 0) return <div>Nessun gioco disponibile.</div>;

  const currentItem = games[currentSlide];
  const slicedGamesToCarousel = games.slice(0, 4);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slicedGamesToCarousel.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + slicedGamesToCarousel.length) % slicedGamesToCarousel.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <>
      {/* Background Image with transition */}
      <div className="absolute inset-0">
        {slicedGamesToCarousel.map((item, index) => (
          <div
            key={item._id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${item.imageUrl}')`,
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl">
            {/* Content */}
            <div className="space-y-4 sm:space-y-6 text-white">
              {/* Discount Badge */}
              <div className="inline-block"></div>

              {/* Title */}
              <h1 className="text-3xl xl:text-4xl font-bold leading-tight">
                {currentItem.title}
              </h1>

              {/* Description */}
              <p className="text-gray-200 text-sm lg:text-lg leading-relaxed max-w-lg lg:max-w-2xl">
                {currentItem.description}
              </p>

              {/* Price */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-3xl xl:text-4xl font-bold leading-tight">
                  {currentItem.price + " €"}
                </span>
              </div>

              {/* CTA Button */}
              <Link key={currentItem._id} href={`/games/${currentItem._id}`}>
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

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slicedGamesToCarousel.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter (mobile only) */}
      <div className="absolute top-4 right-4 sm:hidden bg-black/30 text-white px-2 py-1 rounded text-sm z-10">
        {currentSlide + 1} / {slicedGamesToCarousel.length}
      </div>
    </>
  );
}
