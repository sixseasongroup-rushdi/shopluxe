"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, Star } from "lucide-react";
import { formatPrice, isGeneratedPhoto } from "@/lib/utils";
import type { Product } from "@/types";
import { useStore } from "./StoreProvider";

export function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < Math.round(rating) ? "currentColor" : "none"}
          strokeWidth={1}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart, setPanel } = useStore();
  const saved = wishlist.includes(product.id);
  return (
    <article className="product-card">
      <div
        className={`product-image-wrap ${isGeneratedPhoto(product.image) ? "catalog-photo" : ""}`}
      >
        <Link
          className="product-image-button"
          aria-label={`View ${product.name}`}
          href={`/products/${product.id}`}
          onClick={() => setPanel(null)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 480px) 44vw, (max-width: 767px) 45vw, (max-width: 1023px) 30vw, 230px"
          />
        </Link>
        {product.discount && (
          <span className="discount-tag">−{product.discount}%</span>
        )}
        <button
          className={`wishlist-button ${saved ? "is-saved" : ""}`}
          onClick={() => toggleWishlist(product)}
          aria-label={`${saved ? "Remove" : "Save"} ${product.name} ${saved ? "from" : "to"} wishlist`}
          aria-pressed={saved}
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </button>
        <span className="quick-view">
          A closer look <Plus size={12} />
        </span>
      </div>
      <div className="product-details">
        <Link
          className="product-name"
          href={`/products/${product.id}`}
          onClick={() => setPanel(null)}
        >
          {product.name}
        </Link>
        <div className="product-rating">
          <Stars rating={product.rating} />
          <span>({product.reviews})</span>
        </div>
        <div className="product-price">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
        </div>
        <button className="add-cart" onClick={() => addToCart(product)}>
          <Plus size={14} />
          Add to cart
        </button>
      </div>
    </article>
  );
}
