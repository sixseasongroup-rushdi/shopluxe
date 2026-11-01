export type Category = { id: string; name: string; image: string; alt: string };
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  reviews: number;
  rating: number;
  description: string;
};
export type CartItem = { productId: string; quantity: number };
export type Panel =
  | "cart"
  | "search"
  | "account"
  | "wishlist"
  | "info"
  | "product"
  | null;
export type InfoContent = { title: string; body: string };
