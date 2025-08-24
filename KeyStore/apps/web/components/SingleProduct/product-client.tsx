"use client";
import { useState } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  Check,
  Download,
  Shield,
  Headphones,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context";
import { Game } from "@/Types";

export default function ProductClient({ game }: { game: Game }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart, isInCart } = useAuth();

  const productInCart = isInCart(game._id);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left - Game Image */}
          <div className="bg-white rounded-lg p-4">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Image
                src={game.images[selectedImage] || "/placeholder.svg"}
                alt={game.title}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {game.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded border-2 transition-colors ${
                    selectedImage === index
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    width={60}
                    height={60}
                    className="rounded object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {game.platform.map((p: string) => p.toUpperCase()).join(", ")}
              </Badge>

              {game.keys && game.keys.length > 0 ? (
                <span className="text-sm text-green-600 font-medium">
                  {game.keys.length} keys available
                </span>
              ) : (
                <span className="text-sm text-red-600 font-medium">
                  Non disponibile
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
            <p className="text-gray-600 mb-4">Category: {game.category}</p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-blue-600">
                €{game.price}
              </span>
            </div>

            {/* Add to Cart Button - Parte interattiva */}
            {productInCart ? (
              <Button
                disabled
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mb-6 cursor-default"
              >
                <Check className="w-4 h-4 mr-2" />
                In Cart
              </Button>
            ) : game.keys && game.keys.length > 0 ? (
              <Button
                onClick={() =>
                  addToCart(
                    game._id,
                    game.price,
                    game.title,
                    game.images[0],
                    game.platform
                  )
                }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mb-6 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            ) : (
              <Button
                disabled
                className="w-full bg-gray-400 text-white py-3 mb-6 cursor-not-allowed"
              >
                Non disponibile
              </Button>
            )}
            <div className="space-y-3 mb-6">
              {" "}
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Download className="w-4 h-4" />
                <span>Digital delivery - Instant download</span>{" "}
              </div>{" "}
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Official keys directly from publishers</span>{" "}
              </div>{" "}
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Headphones className="w-4 h-4" />
                <span>24/7 customer support</span>{" "}
              </div>{" "}
            </div>
          </div>
        </div>

        {/* About Section - Contenuto statico */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">{`About ${game.title}`}</h2>
          <p className="text-gray-700 leading-relaxed">{game.description}</p>
        </div>
        {/* System Requirements */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">System Requirements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">
                Minimum Requirements
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">OS:</span> Windows 10 64-bit
                </div>
                <div>
                  <span className="font-medium">Processor:</span> Intel Core
                  i5-8400 / AMD Ryzen 3 3300X
                </div>
                <div>
                  <span className="font-medium">Memory:</span> 12 GB RAM
                </div>
                <div>
                  <span className="font-medium">Graphics:</span> NVIDIA GeForce
                  GTX 1060 6GB / AMD Radeon RX 580 8GB
                </div>
                <div>
                  <span className="font-medium">DirectX:</span> Version 12
                </div>
                <div>
                  <span className="font-medium">Storage:</span> 70 GB available
                  space
                </div>
                <div>
                  <span className="font-medium">Network:</span> Broadband
                  Internet connection
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">
                Recommended Requirements
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">OS:</span> Windows 10 64-bit
                </div>
                <div>
                  <span className="font-medium">Processor:</span> Intel Core
                  i7-10700K / AMD Ryzen 7 3700X
                </div>
                <div>
                  <span className="font-medium">Memory:</span> 16 GB RAM
                </div>
                <div>
                  <span className="font-medium">Graphics:</span> NVIDIA GeForce
                  RTX 3070 / AMD Radeon RX 6800 XT
                </div>
                <div>
                  <span className="font-medium">DirectX:</span> Version 12
                </div>
                <div>
                  <span className="font-medium">Storage:</span> 70 GB available
                  space (SSD recommended)
                </div>
                <div>
                  <span className="font-medium">Network:</span> Broadband
                  Internet connection
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
