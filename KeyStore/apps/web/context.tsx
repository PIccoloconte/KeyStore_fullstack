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
  mergeCartsAfterLogin: () => Promise<void>;
  removeFromCart: (gameId: string) => Promise<void>;
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
  mergeCartsAfterLogin: async () => {},
  removeFromCart: async () => {},
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

  // Carica il carrello quando l'utente è autenticato o dal localStorage se non è loggato
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
        // Carica il carrello dal localStorage per utenti non loggati
        const guestCart = localStorage.getItem("guestCart");
        if (guestCart) {
          setCart(JSON.parse(guestCart));
        } else {
          // Inizializza un carrello vuoto per utenti guest
          setCart({
            userId: "guest",
            items: [],
          });
        }
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

    // Dopo il login, verifica se c'è un carrello guest da unire
    mergeCartsAfterLogin();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);

    // Carica il carrello dal localStorage per l'utente guest
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

  // Funzione per unire i carrelli dopo il login
  const mergeCartsAfterLogin = async () => {
    const guestCart = localStorage.getItem("guestCart");
    if (!guestCart) return;

    const parsedGuestCart: Cart = JSON.parse(guestCart);
    if (!parsedGuestCart.items || parsedGuestCart.items.length === 0) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Per ogni item nel carrello guest, aggiungilo al carrello dell'utente
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

      // Ricarica il carrello dell'utente
      const response = await fetch(`http://localhost:3000/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);

        // Cancella il carrello guest dopo il merge
        localStorage.removeItem("guestCart");
      }
    } catch (error) {
      console.error("Errore durante il merge dei carrelli:", error);
    }
  };

  // Aggiunta prodotti al carrello (supporta sia utenti loggati che guest)
  const addToCart = async (
    gameId: string,
    price: number,
    title: string,
    imageUrl?: string,
    platform?: string[]
  ): Promise<Cart | null> => {
    if (isLoggedIn && user) {
      // Utente loggato: aggiungi al database
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
          throw new Error("Errore durante l'aggiunta al carrello");
        }

        const updatedCart = await response.json();
        setCart(updatedCart);
        return updatedCart;
      } catch (error) {
        console.error("Errore nell'aggiunta al carrello:", error);
        return null;
      }
    } else {
      // Utente guest: aggiungi al localStorage
      try {
        let guestCart = localStorage.getItem("guestCart");
        let cartData: Cart;

        if (guestCart) {
          cartData = JSON.parse(guestCart);
        } else {
          cartData = {
            userId: "guest",
            items: [],
          };
        }

        // Verifica se il prodotto è già nel carrello
        const existingItemIndex = cartData.items.findIndex(
          (item) => item.gameId._id === gameId
        );

        if (existingItemIndex >= 0) {
          // Se la quantità è maggiore o uguale a 0, non aggiungere il prodotto
          if (cartData.items[existingItemIndex].quantity >= 0) {
            return cartData;
          }
        } else {
          // Aggiungi nuovo prodotto
          cartData.items.push({
            gameId: { _id: gameId },
            price,
            title,
            quantity: 1,
            imageUrl,
            platform,
          });
        }

        // Aggiorna il localStorage e lo stato
        localStorage.setItem("guestCart", JSON.stringify(cartData));
        setCart(cartData);
        return cartData;
      } catch (error) {
        console.error("Errore nell'aggiunta al carrello guest:", error);
        return null;
      }
    }
  };

  // Rimozione prodotti dal carrello
  const removeFromCart = async (gameId: string): Promise<void> => {
    if (isLoggedIn && user) {
      // Utente loggato: rimuovi dal database
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          `http://localhost:3000/api/cart/${gameId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Errore durante la rimozione dal carrello");
        }

        const updatedCart = await response.json();
        setCart(updatedCart);
      } catch (error) {
        console.error("Errore nella rimozione dal carrello:", error);
      }
    } else {
      // Utente guest: rimuovi dal localStorage
      const guestCart = localStorage.getItem("guestCart");
      if (!guestCart) return;

      try {
        const cartData: Cart = JSON.parse(guestCart);
        cartData.items = cartData.items.filter(
          (item) => item.gameId._id !== gameId
        );

        localStorage.setItem("guestCart", JSON.stringify(cartData));
        setCart(cartData);
      } catch (error) {
        console.error("Errore nella rimozione dal carrello guest:", error);
      }
    }
  };

  const updateCart = (newCart: Cart | null) => {
    setCart(newCart);

    // Se l'utente non è loggato, aggiorna anche il localStorage
    if (!isLoggedIn && newCart) {
      localStorage.setItem("guestCart", JSON.stringify(newCart));
    }
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
        removeFromCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
