import { Shield } from "lucide-react";
import Link from "next/link";
import CartNavbarState from "./cart-navbar-state";

const CartNavbar = () => {
  return (
    <header className="border-b border-gray-700 fixed top-0 w-full bg-black px-4 py-3 z-50">
      <div className="mb-4 md:mb-0 max-w-7xl mx-auto flex items-center justify-between sm:h-8 md:h-auto">
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
        {/* Progress Steps desktop */}
        <CartNavbarState className="hidden md:flex" />

        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-green-500" />
          <div>
            <div className="text-sm font-medium text-gray-500">
              Secure payment
            </div>
            <div className="text-xs text-gray-400">256-bit SSL Secured</div>
          </div>
        </div>
      </div>
      {/* Progress Steps mobile */}
      <CartNavbarState className="flex md:hidden justify-evenly" />
    </header>
  );
};

export default CartNavbar;
