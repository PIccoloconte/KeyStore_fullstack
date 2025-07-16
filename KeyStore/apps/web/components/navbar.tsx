"use client";

import { useState } from "react";
import { Search, ShoppingCart, User, Monitor, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <nav className="bg-black text-white px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-orange-500"></div>
            <div className="w-0 h-0 border-r-[12px] border-r-transparent border-b-[20px] border-b-red-500 -ml-1"></div>
          </div>
          <div className="text-white font-bold text-lg tracking-wide">
            <span>INSTANT</span>
            <br />
            <span>GAMING</span>
          </div>
        </div>

        {/* Gaming Platform Icons */}
        <div className="hidden md:flex items-center space-x-6">
          {!isSearchExpanded ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-orange-500 hover:bg-gray-800"
              >
                <Monitor className="w-4 h-4 mr-2" />
                PC
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-orange-500 hover:bg-gray-800"
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                PlayStation
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-orange-500 hover:bg-gray-800"
              >
                <div className="w-4 h-4 mr-2 bg-green-500 rounded-sm flex items-center justify-center text-xs font-bold text-white">
                  X
                </div>
                Xbox
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-orange-500 hover:bg-gray-800"
              >
                <div className="w-4 h-4 mr-2 bg-red-500 rounded-sm flex items-center justify-center text-xs font-bold text-white">
                  N
                </div>
                Nintendo
              </Button>
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2"
                onClick={() => setIsSearchExpanded(true)}
              >
                <Search className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="text"
                placeholder="Cerca giochi..."
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-orange-500 focus:outline-none"
                autoFocus
              />
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2"
                onClick={() => setIsSearchExpanded(false)}
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-orange-500 hover:bg-gray-800 p-2"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-orange-500 hover:bg-gray-800 p-2"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
