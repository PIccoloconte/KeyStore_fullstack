"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Cart, AuthContextType } from "./Types";
import { getApiUrl } from "@/utils/config";

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  cart: null,
  cartItemsCount: 0,
  login: () => {},
  logout: () => {},
  addToCart: async () => null,
  updateCart: () => {},
  isInCart: () => false,
  clearCart: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(!!token);
    setUser(storedUser ? JSON.parse(storedUser) : null);

    // Update user state if token changes in another tab
    const handler = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  //if user is logged in fetch cart, if not replace with empty cart
  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedIn && user) {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`${getApiUrl()}/api/cart`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const cartData = await response.json();
            setCart(cartData);
          }
        } catch (error) {
          console.error("Errore nel recupero del carrello:", error);
        }
      } else {
        // if !isLoggedIn add an empty cart
        setCart({
          userId: "guest",
          items: [],
        });
      }
    };

    fetchCart();
  }, [isLoggedIn, user]);

  // Update cart item count when cart changes
  useEffect(() => {
    if (cart && cart.items) {
      const totalItems = cart.items.reduce((total, item) => {
        return total + (item.quantity || 1);
      }, 0);
      setCartItemsCount(totalItems);
    } else {
      setCartItemsCount(0);
    }
  }, [cart]);

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);

    router.push("/");
  };

  // Add products to cart (supports both logged in and guest users)
  const addToCart = async (
    gameId: string,
    price: number,
    title: string,
    imageUrl?: string,
    platform?: string[]
  ): Promise<Cart | null> => {
    if (isLoggedIn && user) {
      // Logged in user: add to database
      try {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const response = await fetch(`${getApiUrl()}/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ gameId, price, title, imageUrl, platform }),
        });

        if (!response.ok) {
          if (response.status === 400) {
            // Handle case where no keys are available
            const errorData = await response.json();
            alert(errorData.message); // Show message to user
            return null;
          }
          throw new Error("Error adding to cart");
        }

        const updatedCart = await response.json();
        setCart(updatedCart);
        return updatedCart;
      } catch (error) {
        console.error("Error adding to cart:", error);
        return null;
      }
    } else {
      // For guest users, we should redirect to login to handle keys
      alert("To purchase this product, you need to log in.");
      router.push("/login");
      return null;
    }
  };

  // Function to update the cart state
  const updateCart = (newCart: Cart | null) => {
    setCart(newCart);
  };

  // Function to check if a product is already in the cart
  const isInCart = (gameId: string): boolean => {
    if (!cart || !cart.items) return false;

    return cart.items.some((item) => item.gameId._id === gameId);
  };

  // Function to clear the cart after checkout
  const clearCart = () => {
    setCart(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        cart,
        cartItemsCount,
        login,
        logout,
        addToCart,
        updateCart,
        isInCart,
        clearCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
