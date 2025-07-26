"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  username: string;
  createdAt: string;
};

type GameDetails = {
  _id: string;
};

type CartItem = {
  gameId: GameDetails;
  price: number;
  title: string;
  quantity: number;
  imageUrl?: string;
  platform?: string[];
};

type Cart = {
  _id?: string;
  userId: string;
  items: CartItem[];
  updatedAt?: Date;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  cart: Cart | null;
  cartItemsCount: number;
  login: (token: string, user: User) => void;
  logout: () => void;
  addToCart: (
    gameId: string,
    price: number,
    title: string,
    imageUrl?: string,
    platform?: string[]
  ) => Promise<Cart | null>;
  updateCart: (newCart: Cart | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  cart: null,
  cartItemsCount: 0,
  login: () => {},
  logout: () => {},
  addToCart: async () => null,
  updateCart: () => {},
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

    // Aggiorna lo stato se il token cambia in un'altra tab
    const handler = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Carica il carrello quando l'utente è autenticato
  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedIn && user) {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            // `${process.env.NEXT_PUBLIC_API_URL || ""}/api/cart`,
            `http://localhost:3000/api/cart`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const cartData = await response.json();
            setCart(cartData);
          }
        } catch (error) {
          console.error("Errore nel recupero del carrello:", error);
        }
      } else {
        setCart(null);
      }
    };

    fetchCart();
  }, [isLoggedIn, user]);

  // Aggiorna il numero di prodotti nel carrello quando il carrello cambia
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
    setCart(null);
    router.push("/");
  };

  //aggiungere poi che quando non è loggato aggiunge il prodotto al localStorage
  // e poi quando si logga lo aggiunge al carrello
  const addToCart = async (
    gameId: string,
    price: number,
    title: string,
    imageUrl?: string,
    platform?: string[]
  ): Promise<Cart | null> => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !user) return null;

      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_API_URL || ""}/api/cart`,
        `http://localhost:3000/api/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ gameId, price, title, imageUrl, platform }),
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'aggiunta al carrello");
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("Errore nell'aggiunta al carrello:", error);
      return null;
    }
  };

  const updateCart = (newCart: Cart | null) => {
    setCart(newCart);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
