"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGamesApi } from "../../hooks/useGamesApi";

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  discount: string;
  currentPrice: string;
  originalPrice: string;
  backgroundImage: string;
}

const carouselData: CarouselItem[] = [
  {
    id: 1,
    title: "FIFA 24",
    description:
      "FIFA 24 is a football simulation video game published by Electronic Arts. The game features the latest teams, players, and stadiums from around the world.",
    discount: "-29%",
    currentPrice: "€39.99",
    originalPrice: "€56.32",
    backgroundImage: "/placeholder.svg?height=1080&width=1920",
  },
  {
    id: 2,
    title: "Call of Duty",
    description:
      "Experience the ultimate first-person shooter with stunning graphics and intense multiplayer action across various game modes.",
    discount: "-35%",
    currentPrice: "€45.99",
    originalPrice: "€69.99",
    backgroundImage: "/placeholder.svg?height=1080&width=1920",
  },
  {
    id: 3,
    title: "Cyberpunk 2077",
    description:
      "An open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary.",
    discount: "-50%",
    currentPrice: "€29.99",
    originalPrice: "€59.99",
    backgroundImage: "/placeholder.svg?height=1080&width=1920",
  },
  {
    id: 4,
    title: "Assassin's Creed",
    description:
      "Embark on an epic adventure through history in this action-adventure stealth game series with stunning open worlds.",
    discount: "-40%",
    currentPrice: "€35.99",
    originalPrice: "€59.99",
    backgroundImage: "/placeholder.svg?height=1080&width=1920",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { games, loading, error, fetchAllGames } = useGamesApi(
    "http://localhost:3000/api/games"
  );

  useEffect(() => {
    fetchAllGames();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentItem = carouselData[currentSlide];

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error}</div>;

  return (
    <>
      {/* Background Image with transition */}
      <div className="absolute inset-0">
        {carouselData.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${item.backgroundImage}')`,
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 border-2 sm:border-4 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 border border-white sm:border-2 rounded-full"></div>
          {/* Radiating lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-24 sm:w-36 lg:w-48 h-0.5 bg-white origin-left"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl">
            {/* Content */}
            <div className="space-y-4 sm:space-y-6 text-white">
              {/* Discount Badge */}
              <div className="inline-block">
                <span className="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {currentItem.discount}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                {currentItem.title}
              </h1>

              {/* Description */}
              <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-lg lg:max-w-2xl">
                {currentItem.description}
              </p>

              {/* Price */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {currentItem.currentPrice}
                </span>
                <span className="text-lg sm:text-xl md:text-2xl text-gray-300 line-through">
                  {currentItem.originalPrice}
                </span>
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-md transition-colors"
              >
                Buy Now
              </Button>
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
        {carouselData.map((_, index) => (
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
        {currentSlide + 1} / {carouselData.length}
      </div>
    </>
  );
}
