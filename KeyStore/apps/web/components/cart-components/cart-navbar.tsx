"use client";
import { Shield } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const cartNavigationStep = [
  {
    name: "Shopping cart",
    href: "/cart",
  },
  {
    name: "Payment",
    href: "/cart/checkout",
  },
  {
    name: "Game activation",
    href: "/cart/purchaseCodes",
  },
];

const CartNavbar = () => {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-700 bg-black px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
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
        </Link>
        {/* Progress Steps */}
        <div className="flex items-center space-x-8">
          {cartNavigationStep.map((step, index) => {
            const isActiveIcon = pathname === step.href;

            return (
              <div key={step.name} className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 ${
                    isActiveIcon ? "bg-orange-500" : "bg-gray-600"
                  }  rounded-full flex items-center justify-center text-sm font-bold`}
                >
                  {index + 1}
                </div>
                <span className="text-white">{step.name}</span>
              </div>
            );
          })}
        </div>

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
    </header>
  );
};

export default CartNavbar;
