"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { User, GameDetails, CartItem, Cart, AuthContextType } from "./Types";

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  cart: null,
  cartItemsCount: 0,
  login: () => {},
  logout: () => {},
  addToCart: async () => null,
  updateCart: () => {},
  mergeCartsAfterLogin: async () => {},
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

  //if user is logged in fetch cart, if not load from localStorage
  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedIn && user) {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`http://localhost:3000/api/cart`, {
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
        // load cart from localStorage for guest users
        const guestCart = localStorage.getItem("guestCart");
        if (guestCart) {
          setCart(JSON.parse(guestCart));
        } else {
          // initialize empty cart for guest users
          setCart({
            userId: "guest",
            items: [],
          });
        }
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

    // After login, check if there's a guest cart to merge
    mergeCartsAfterLogin();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);

    // Load cart from localStorage for guest users
    const guestCart = localStorage.getItem("guestCart");
    if (guestCart) {
      setCart(JSON.parse(guestCart));
    } else {
      setCart({
        userId: "guest",
        items: [],
      });
    }

    router.push("/");
  };

  // Function to merge carts after login
  const mergeCartsAfterLogin = async () => {
    const guestCart = localStorage.getItem("guestCart");
    if (!guestCart) return;

    const parsedGuestCart: Cart = JSON.parse(guestCart);
    if (!parsedGuestCart.items || parsedGuestCart.items.length === 0) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // For each item in the guest cart, add it to the user's cart
      for (const item of parsedGuestCart.items) {
        await fetch(`http://localhost:3000/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            gameId: item.gameId._id,
            price: item.price,
            title: item.title,
            imageUrl: item.imageUrl,
            platform: item.platform,
            quantity: item.quantity,
          }),
        });
      }

      // Load the user's cart after merging
      const response = await fetch(`http://localhost:3000/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);

        // Delete guest cart after merging
        localStorage.removeItem("guestCart");
      }
    } catch (error) {
      console.error("Errore durante il merge dei carrelli:", error);
    }
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

        const response = await fetch(`http://localhost:3000/api/cart`, {
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

    // If the user is not logged in, update localStorage as well
    if (!isLoggedIn && newCart) {
      localStorage.setItem("guestCart", JSON.stringify(newCart));
    }
  };

  // Function to check if a product is already in the cart
  const isInCart = (gameId: string): boolean => {
    if (!cart || !cart.items) return false;

    return cart.items.some((item) => item.gameId._id === gameId);
  };

  // Funzione per svuotare il carrello dopo il checkout
  const clearCart = () => {
    setCart(null);
    // Rimuove anche il carrello guest dal localStorage se presente
    localStorage.removeItem("guestCart");
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
        mergeCartsAfterLogin,
        isInCart,
        clearCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
