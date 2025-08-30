"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Monitor, Gamepad2 } from "lucide-react";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { MdMonitor } from "react-icons/md";

//GameCategory Navigation
const NavbarCategory = ({ className }: { className: string }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handlePlatformFilter = (platform: string) => {
    router.push(`/games?platform=${encodeURIComponent(platform)}`);
  };

  //searchbar functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/games?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchExpanded(false);
      setSearchQuery("");
    }
  };

  return (
    <div className={` items-center space-x-6 ${className}`}>
      {!isSearchExpanded ? (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-orange-500 hover:bg-gray-800 cursor-pointer"
            onClick={() => handlePlatformFilter("PC")}
          >
            <MdMonitor className="w-6 h-6 md:w-4 md:h-4 md:mr-2" />
            <span className="hidden md:block">PC</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-orange-500 hover:bg-gray-800 cursor-pointer"
            onClick={() => handlePlatformFilter("PS5")}
          >
            <FaPlaystation className=" mr-2" />
            <span className="hidden md:block">PlayStation</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-orange-500 hover:bg-gray-800 cursor-pointer"
            onClick={() => handlePlatformFilter("XBOX")}
          >
            <FaXbox className="w-4 h-4 mr-2 bg-green-500 rounded-sm flex items-center justify-center text-xs font-bold text-white"></FaXbox>
            <span className="hidden md:block">Xbox</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-orange-500 hover:bg-gray-800 cursor-pointer"
            onClick={() => handlePlatformFilter("Nintendo Switch")}
          >
            <BsNintendoSwitch className="w-4 h-4 mr-2 bg-red-500 rounded-sm flex items-center justify-center text-xs font-bold text-white"></BsNintendoSwitch>
            <span className="hidden md:block">Nintendo</span>
          </Button>
          <Button
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 cursor-pointer"
            onClick={() => setIsSearchExpanded(true)}
          >
            <Search className="w-4 h-4" />
          </Button>
        </>
      ) : (
        <form
          onSubmit={handleSearch}
          className="flex items-center space-x-2 flex-1"
        >
          <input
            type="text"
            placeholder="Cerca giochi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-gray-800 text-white px-4 py-[5px] rounded-lg border border-gray-600 focus:border-orange-500 focus:outline-none"
            autoFocus
          />
          <Button
            type="submit"
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="text-white hover:text-gray-300"
            onClick={() => {
              setIsSearchExpanded(false);
              setSearchQuery("");
            }}
          >
            ✕
          </Button>
        </form>
      )}
    </div>
  );
};

export default NavbarCategory;
