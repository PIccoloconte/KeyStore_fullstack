"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useAuth } from "@/context";
import { useRouter } from "next/navigation";
import CartSummaryLoading from "../placeholder/cartSummuryLoading";

const CartPreview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingItems, setDeletingItems] = useState<string[]>([]);
  const { isLoggedIn, cart, updateCart } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn && !cart) {
      fetchCart();
    }
  }, [isLoggedIn, cart]);

  // function to fetch data cart
  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("user not authenticated");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:3000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Errore ${response.status}: ${response.statusText}`);
      }

      const cartData = await response.json();
      //check if the product is already in the cart or if user is authenticated
      updateCart(cartData);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching cart");
      setLoading(false);
    }
  };
  //Delete single game from cart
  const deleteGameFromCart = async (gameId: string) => {
    try {
      //Visible feedback to user when deleting item to cart
      setDeletingItems((prev) => [...prev, gameId]);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("user not authenticated");
        setDeletingItems((prev) => prev.filter((id) => id !== gameId));
        return;
      }

      const response = await fetch(`http://localhost:3000/api/cart/${gameId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Errore ${response.status}: ${response.statusText}`);
      }

      // update cart state after deletion
      const updatedCart = await response.json();
      updateCart(updatedCart);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Errore nell'eliminazione del prodotto dal carrello"
      );
    } finally {
      setDeletingItems((prev) => prev.filter((id) => id !== gameId));
    }
  };

  //click management for checkout
  const handleNextClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      // Save url after login
      localStorage.setItem("redirectAfterLogin", "/cart/checkout");
      router.push("/login"); // redirect to login
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 scroll-none">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Section */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Cart</h2>

          {loading || !cart ? (
            <div className="bg-gray-700 rounded-lg mb-8 p-6 text-center animate-pulse h-[202px] content-center">
              Loading...
            </div>
          ) : error ? (
            <div className="bg-gray-800 rounded-lg p-6 mb-8 text-center text-red-500">
              {error}
            </div>
          ) : !cart || cart.items.length === 0 ? (
            <div className="bg-gray-700 rounded-lg p-6 mb-8 text-center h-[202px] content-center">
              Cart is empty
            </div>
          ) : (
            // Display cart items
            cart.items.map((item, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 mb-8 ">
                <div className="flex flex-col md:flex-row items-center space-x-4">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    width={160}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-300">
                        {item.platform && item.platform.length > 0
                          ? item.platform.join(" - ")
                          : "Digital"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold mb-4">
                      {item.price} €
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-4 mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-black cursor-pointer"
                    onClick={() => deleteGameFromCart(item.gameId._id)}
                    disabled={deletingItems.includes(item.gameId._id)}
                  >
                    {deletingItems.includes(item.gameId._id) ? (
                      "Removing..." //visible feedback to user
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6 sticky top-8">
            <h2 className="text-2xl font-bold mb-6">Summary</h2>

            {loading || !cart ? (
              <CartSummaryLoading />
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : cart.items.length === 0 ? (
              <div className="text-center py-4">
                Cart is empty
                <Link href="/" className="w-full">
                  <Button
                    variant="ghost"
                    className="mt-4 w-full text-gray-400 bg-black hover:bg-gray-700 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Continue shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-300">Total</span>
                  <span>
                    {cart.items
                      .reduce((acc, item) => acc + item.price, 0)
                      .toFixed(2)}{" "}
                    €
                  </span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Totale</span>
                    <span>
                      {cart.items
                        .reduce((acc, item) => acc + item.price, 0)
                        .toFixed(2)}{" "}
                      €
                    </span>
                  </div>
                </div>
              </div>
            )}
            {/* Go to checkout or go home button */}
            {cart && cart.items.length > 0 ? (
              <>
                <Link href="/cart/checkout" className="w-full">
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 mb-4 cursor-pointer"
                    onClick={handleNextClick}
                  >
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
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPreview;
