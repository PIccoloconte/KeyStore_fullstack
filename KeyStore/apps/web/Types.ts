export interface Game {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  platform: string[];
  imageUrl: string;
  images: string[];
  available: boolean;
  keys: string[];
}
export type User = {
  _id: string;
  username: string;
  createdAt: string;
};

export type GameDetails = {
  _id: string;
};

export type CartItem = {
  gameId: GameDetails;
  price: number;
  title: string;
  quantity: number;
  imageUrl?: string;
  platform?: string[];
  reservedKeys?: string[];
};

export type Cart = {
  _id?: string;
  userId: string;
  items: CartItem[];
  updatedAt?: Date;
};

export type AuthContextType = {
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
  isInCart: (gameId: string) => boolean;
  clearCart: () => void;
};
