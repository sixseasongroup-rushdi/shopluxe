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
export type CartItem = {
  productId: string;
  quantity: number;
  variant?: string;
};
export type ProductImage = {
  src: string;
  alt: string;
  label: string;
  zoom?: number;
};
export type ProductDetail = {
  subtitle: string;
  story: string;
  highlights: string[];
  specifications: { label: string; value: string }[];
  option: { label: string; values: string[] };
  color: { name: string; hex: string };
  care: string;
};
export type Panel = "cart" | "search" | "account" | "wishlist" | "info" | null;
export type InfoContent = { title: string; body: string };
