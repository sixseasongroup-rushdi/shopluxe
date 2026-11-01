"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { products } from "@/data/products";
import type { CartItem, InfoContent, Panel, Product } from "@/types";

type SavedState = { cart: CartItem[]; wishlist: string[]; hydrated: boolean };
type Action =
  | { type: "restore"; cart: CartItem[]; wishlist: string[] }
  | { type: "quantity"; id: string; change: number }
  | { type: "wishlist"; id: string }
  | { type: "clear" };
function reducer(state: SavedState, action: Action): SavedState {
  if (action.type === "restore")
    return { cart: action.cart, wishlist: action.wishlist, hydrated: true };
  if (action.type === "clear") return { ...state, cart: [] };
  if (action.type === "wishlist")
    return {
      ...state,
      wishlist: state.wishlist.includes(action.id)
        ? state.wishlist.filter((id) => id !== action.id)
        : [...state.wishlist, action.id],
    };
  const existing = state.cart.find((item) => item.productId === action.id);
  const quantity = Math.min(
    99,
    Math.max(0, (existing?.quantity ?? 0) + action.change),
  );
  return {
    ...state,
    cart: [
      ...state.cart.filter((item) => item.productId !== action.id),
      ...(quantity ? [{ productId: action.id, quantity }] : []),
    ],
  };
}
type Store = {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  cartTotal: number;
  panel: Panel;
  setPanel: (panel: Panel) => void;
  addToCart: (product: Product) => void;
  changeQuantity: (id: string, change: number) => void;
  toggleWishlist: (product: Product) => void;
  category: string;
  selectCategory: (id: string) => void;
  showAll: boolean;
  viewAll: () => void;
  offersOnly: boolean;
  showOffers: () => void;
  info: InfoContent;
  openInfo: (title: string, body: string) => void;
  selectedProduct: Product | null;
  openProduct: (product: Product) => void;
  toast: string;
  notify: (message: string) => void;
  clearCart: () => void;
};
const StoreContext = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    cart: [],
    wishlist: [],
    hydrated: false,
  });
  const [panel, setPanel] = useState<Panel>(null);
  const [category, setCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [offersOnly, setOffersOnly] = useState(false);
  const [info, setInfo] = useState<InfoContent>({ title: "", body: "" });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState("");
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("shopluxe-store") || "{}");
      const cart = Array.isArray(saved.cart)
        ? saved.cart.filter(
            (item: CartItem) =>
              item &&
              products.some((p) => p.id === item.productId) &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0 &&
              item.quantity <= 99,
          )
        : [];
      const wishlist = Array.isArray(saved.wishlist)
        ? saved.wishlist.filter((id: unknown) =>
            products.some((p) => p.id === id),
          )
        : [];
      dispatch({ type: "restore", cart, wishlist });
    } catch {
      dispatch({ type: "restore", cart: [], wishlist: [] });
    }
  }, []);
  useEffect(() => {
    if (state.hydrated) {
      try {
        localStorage.setItem(
          "shopluxe-store",
          JSON.stringify({ cart: state.cart, wishlist: state.wishlist }),
        );
      } catch {
        /* Shopping remains available without browser storage. */
      }
    }
  }, [state]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(timer);
  }, [toast]);
  const notify = useCallback((message: string) => setToast(message), []);
  function scrollToProducts() {
    setTimeout(
      () =>
        document
          .getElementById("products")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      0,
    );
  }
  const value: Store = {
    ...state,
    panel,
    setPanel,
    category,
    showAll,
    offersOnly,
    info,
    selectedProduct,
    toast,
    notify,
    cartCount: state.cart.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: state.cart.reduce(
      (sum, item) =>
        sum +
        (products.find((p) => p.id === item.productId)?.price ?? 0) *
          item.quantity,
      0,
    ),
    addToCart(product) {
      dispatch({ type: "quantity", id: product.id, change: 1 });
      notify(`${product.name} added to your bag`);
    },
    changeQuantity(id, change) {
      dispatch({ type: "quantity", id, change });
    },
    toggleWishlist(product) {
      dispatch({ type: "wishlist", id: product.id });
      notify(
        state.wishlist.includes(product.id)
          ? "Removed from your wishlist"
          : "Saved to your wishlist",
      );
    },
    selectCategory(id) {
      setCategory(id);
      setShowAll(true);
      setOffersOnly(false);
      setPanel(null);
      scrollToProducts();
    },
    viewAll() {
      setCategory("all");
      setShowAll(true);
      setOffersOnly(false);
      scrollToProducts();
    },
    showOffers() {
      setCategory("all");
      setShowAll(true);
      setOffersOnly(true);
      scrollToProducts();
    },
    openInfo(title, body) {
      setInfo({ title, body });
      setPanel("info");
    },
    openProduct(product) {
      setSelectedProduct(product);
      setPanel("product");
    },
    clearCart() {
      dispatch({ type: "clear" });
    },
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore requires StoreProvider");
  return context;
}
