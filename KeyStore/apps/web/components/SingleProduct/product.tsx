"use client";
import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Download, Shield, Headphones, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Product() {
  const [selectedImage, setSelectedImage] = useState(0);

  const gameImages = [
    "/elden-ring-hero.png",
    "/placeholder.svg?height=400&width=600&text=Screenshot+1",
    "/placeholder.svg?height=400&width=600&text=Screenshot+2",
    "/placeholder.svg?height=400&width=600&text=Screenshot+3",
    "/placeholder.svg?height=400&width=600&text=Screenshot+4",
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left - Game Image */}
          <div className="bg-white rounded-lg p-4">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Image
                src={gameImages[selectedImage] || "/placeholder.svg"}
                alt="Elden Ring gameplay screenshot"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {gameImages.map((image, index) => (
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
                PS5
              </Badge>
              <span className="text-sm text-green-600 font-medium">
                4 keys available
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-2">Elden Ring</h1>
            <p className="text-gray-600 mb-4">Category: RPG</p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-blue-600">€49.99</span>
              <span className="text-lg text-gray-400 line-through">€59.99</span>
              <Badge variant="destructive" className="bg-red-500">
                -17%
              </Badge>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mb-6">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Download className="w-4 h-4" />
                <span>Digital delivery - Instant download</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Official keys directly from publishers</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Headphones className="w-4 h-4" />
                <span>24/7 customer support</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Payment Methods</h3>
              <div className="flex gap-2">
                <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                  V
                </div>
                <div className="w-8 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center">
                  M
                </div>
                <div className="w-8 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
                  PP
                </div>
                <div className="w-8 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center">
                  G
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">About Elden Ring</h2>
          <p className="text-gray-700 leading-relaxed">
            Elden Ring is an action RPG which takes place in the Lands Between,
            sometime after the Shattering of the titular Elden Ring. The game is
            played from a third-person perspective, with players freely roaming
            its interactive open world. Gameplay elements include combat
            featuring various types of weapons and magic spells, horseback
            riding, summoning, and crafting.
          </p>
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

        {/* Related Games */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Related Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded mb-3 flex items-center justify-center">
                  <span className="text-xs text-gray-500">PC</span>
                </div>
                <Badge variant="destructive" className="mb-2 text-xs">
                  -20%
                </Badge>
                <h4 className="font-medium text-sm mb-1">Cyberpunk 2077</h4>
                <p className="text-blue-600 font-bold">€29.99</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded mb-3 flex items-center justify-center">
                  <span className="text-xs text-gray-500">PC</span>
                </div>
                <Badge variant="destructive" className="mb-2 text-xs">
                  -25%
                </Badge>
                <h4 className="font-medium text-sm mb-1">Baldur's Gate 3</h4>
                <p className="text-blue-600 font-bold">€44.99</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded mb-3 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Xbox</span>
                </div>
                <Badge variant="destructive" className="mb-2 text-xs">
                  -15%
                </Badge>
                <h4 className="font-medium text-sm mb-1">Starfield</h4>
                <p className="text-blue-600 font-bold">€54.99</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded mb-3 flex items-center justify-center">
                  <span className="text-xs text-gray-500">PS5</span>
                </div>
                <Badge variant="destructive" className="mb-2 text-xs">
                  -30%
                </Badge>
                <h4 className="font-medium text-sm mb-1">Hogwarts Legacy</h4>
                <p className="text-blue-600 font-bold">€39.99</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">4.8</span>
              <span className="text-gray-500">(2,847 reviews)</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-b pb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">Marco_Gamer</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-700">
                    Incredible game! The open world is massive and every corner
                    has something interesting to discover. The combat system is
                    challenging but fair. Definitely worth every penny.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b pb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">Anna_RPG_Fan</span>
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                  <p className="text-gray-700">
                    Beautiful graphics and engaging storyline. The difficulty
                    can be quite high at times, but that's part of the charm.
                    Great purchase from this store, instant delivery as
                    promised.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  L
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">LucaTheExplorer</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">2 weeks ago</span>
                  </div>
                  <p className="text-gray-700">
                    This game exceeded all my expectations. The world-building
                    is phenomenal and the boss fights are epic. Fast delivery
                    and legitimate key. Highly recommended!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="text-center">
            <Button variant="outline" className="px-8 bg-transparent">
              View All Reviews
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
