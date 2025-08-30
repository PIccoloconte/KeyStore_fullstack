"use client";
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

const CartNavbarState = ({ className }: { className: string }) => {
  const pathname = usePathname();
  return (
    <div className={`flex items-center space-x-8 ${className}`}>
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
            <span className="text-white">
              {/*desktop*/}
              <span className="hidden md:inline">{step.name}</span>
              {/*mobile*/}
              <span className="md:hidden">{isActiveIcon ? step.name : ""}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CartNavbarState;
