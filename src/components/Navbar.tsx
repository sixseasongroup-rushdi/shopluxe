"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { useStore } from "./StoreProvider";
import { Logo } from "./Logo";
import { formatPrice } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, cartTotal, setPanel, viewAll, openInfo } = useStore();
  const close = () => setMenuOpen(false);
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Logo />
        <nav
          className={`nav-links ${menuOpen ? "is-open" : ""}`}
          id="main-navigation"
          aria-label="Main navigation"
        >
          <Link
            href="/#home"
            className={pathname === "/" ? "active" : ""}
            onClick={close}
          >
            Home
          </Link>
          <button
            className={pathname.startsWith("/products/") ? "active" : ""}
            onClick={() => {
              viewAll();
              close();
            }}
          >
            Shop <ChevronDown size={12} />
          </button>
          <Link href="/#categories" onClick={close}>
            Collections
          </Link>
          <Link href="/#about" onClick={close}>
            About us
          </Link>
          <button
            onClick={() => {
              openInfo(
                "The SHOPLUXE Journal",
                "A little inspiration for everyday living.\n\nTHE ART OF PACKING LIGHT\nStart with a versatile backpack, choose everyday essentials, and leave a little room for the unexpected. Explore our Accessories collection for your next trip.\n\nSMALL DETAILS, CALMER SPACES\nA touch of greenery and warm, gentle lighting can make your favorite corner feel like home. Explore Home & Living for thoughtful finishing touches.\n\nThis journal is part of the SHOPLUXE storefront demo.",
              );
              close();
            }}
          >
            Blog
          </button>
          <a href="#contact" onClick={close}>
            Contact us
          </a>
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button"
            aria-label="Search products"
            onClick={() => setPanel("search")}
          >
            <Search />
          </button>
          <button
            className="icon-button account-button"
            aria-label="My account"
            onClick={() => setPanel("account")}
          >
            <UserRound />
          </button>
          <span className="nav-divider" />
          <button
            className="cart-trigger"
            onClick={() => setPanel("cart")}
            aria-label={`Open shopping bag, ${cartCount} items, ${formatPrice(cartTotal)}`}
          >
            <span className="bag-icon">
              <ShoppingBag />
              <span className="cart-count">{cartCount}</span>
            </span>
            <span className="cart-total">{formatPrice(cartTotal)}</span>
          </button>
          <button
            className="icon-button mobile-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
