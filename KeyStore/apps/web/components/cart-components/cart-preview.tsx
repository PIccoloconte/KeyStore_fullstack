import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Heart, Trash2 } from "lucide-react";

const CartPreview = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Section */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Cart</h2>

          {/* Cart Item */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <Image
                src="https://plus.unsplash.com/premium_photo-1682097238346-3f2a677ccfe6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Clair Obscur: Expedition 33 Deluxe Edition"
                width={160}
                height={120}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">
                  Clair Obscur: Expedition 33 Deluxe Edition - PC (Steam)
                </h3>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Steam</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold mb-4">34 €</div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4 mt-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6 sticky top-8">
            <h2 className="text-2xl font-bold mb-6">Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-300">Official price</span>
                <span>59.99 €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Discount</span>
                <span className="text-green-500">-25.99 €</span>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>34 €</span>
                </div>
              </div>
            </div>

            <Link href="/cart/checkout" className="w-full">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 mb-4 cursor-pointer">
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <div className="text-center text-gray-400 text-sm mb-4">or</div>

            <Link href="/" className="w-full">
              <Button
                variant="ghost"
                className="w-full text-gray-400 bg-black hover:bg-gray-700 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Continue shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPreview;
