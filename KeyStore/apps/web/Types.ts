export interface Game {
  _id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  platform: string[];
  imageUrl: string;
  images: string[];
  available: boolean;
  keys: string[];
}
