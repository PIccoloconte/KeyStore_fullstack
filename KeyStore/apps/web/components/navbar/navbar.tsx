"use client";

import { ShoppingCart, User, LogIn } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context";
import { useRouter } from "next/navigation";
import NavbarCategory from "./navbar-category";

export default function Navbar() {
  const { isLoggedIn, user, logout, cartItemsCount } = useAuth();

  return (
    <nav className="bg-black text-white px-4 py-3 fixed top-0 w-full shadow-md z-50">
      <div className="mb-4 md:mb-0 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2">
            <div className="flex">
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-orange-500"></div>
              <div className="w-0 h-0 border-r-[12px] border-r-transparent border-b-[20px] border-b-red-500 -ml-1"></div>
            </div>
            <div className="text-white font-bold text-lg tracking-wide">
              <span className="pr-2 md:pr-0">INSTANT</span>
              <br className="hidden md:block" />
              <span>GAMING</span>
            </div>
          </div>
        </Link>

        {/* Desktop Category Navigation */}

        <NavbarCategory className="hidden md:flex" />

        {/* cart*/}
        <div className="flex items-center space-x-3 ">
          <Link href="/cart">
            <Button
              variant="ghost"
              size="sm"
              className=" relative text-white hover:text-orange-500 hover:bg-gray-800 p-2 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 right-1.5  bg-red-500 text-red text-xs rounded-full px-1">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>

          {/* User Account */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-orange-500 hover:bg-gray-800 p-2 cursor-pointer"
                >
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <Link href={`/user/${user?._id}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-orange-500 hover:bg-gray-800 p-2 cursor-pointer"
              >
                <LogIn className="w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
      {/* Mobile Category Navigation */}
      <NavbarCategory className="flex md:hidden justify-evenly" />
    </nav>
  );
}
