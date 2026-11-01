"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import type { Product, ProductDetail } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Stars } from "@/components/ProductCard";
import { useStore } from "@/components/StoreProvider";

export function ProductPurchase({
  product,
  detail,
}: {
  product: Product;
  detail: ProductDetail;
}) {
  const [quantity, setQuantity] = useState(1);
  const [option, setOption] = useState(detail.option.values[0]);
  const [shareUrl, setShareUrl] = useState("");
  const { addToCart, wishlist, toggleWishlist, setPanel, notify } = useStore();
  const saved = wishlist.includes(product.id);
  const add = () =>
    addToCart(product, quantity, `${detail.option.label}: ${option}`);
  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      notify("Product link copied. Share a good find.");
    } catch {
      setShareUrl(window.location.href);
    }
  }
  return (
    <div className="pdp-purchase">
      <div className="pdp-overline">
        <span>Shopluxe essentials</span>
        <span className="pdp-availability">
          <i />
          Available in demo
        </span>
      </div>
      <h1>{product.name}</h1>
      <p className="pdp-subtitle">{detail.subtitle}</p>
      <a className="pdp-rating-link" href="#customer-reviews">
        <Stars rating={product.rating} />
        <strong>{product.rating.toFixed(1)}</strong>
        <span>{product.reviews} reviews</span>
        <span className="pdp-rating-separator">·</span>
        <span>Read reviews</span>
      </a>
      <div className="pdp-price">
        <strong>{formatPrice(product.price)}</strong>
        {product.oldPrice && (
          <>
            <del>{formatPrice(product.oldPrice)}</del>
            <span className="pdp-saving">
              Save {formatPrice(product.oldPrice - product.price)}
            </span>
          </>
        )}
      </div>
      <p className="pdp-tax-note">USD · Shipping calculated in your bag</p>
      <p className="pdp-summary">
        {product.description.replace(" Illustrative demo product.", "")}
      </p>
      <div className="pdp-variant">
        <p>
          Color <strong>{detail.color.name}</strong>
        </p>
        <span
          className="pdp-color-swatch"
          style={{ backgroundColor: detail.color.hex }}
          aria-label={detail.color.name}
        >
          <Check size={15} />
        </span>
      </div>
      <fieldset className="pdp-options">
        <legend>
          {detail.option.label} <strong>{option}</strong>
        </legend>
        <div>
          {detail.option.values.map((value) => (
            <label
              className={`pdp-option ${option === value ? "selected" : ""}`}
              key={value}
            >
              <input
                type="radio"
                name={`option-${product.id}`}
                value={value}
                checked={option === value}
                onChange={() => setOption(value)}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="pdp-buy-row">
        <div className="pdp-quantity" aria-label="Quantity">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity === 1}
          >
            <Minus size={16} />
          </button>
          <output aria-live="polite" aria-label="Selected quantity">
            {quantity}
          </output>
          <button
            aria-label="Increase quantity"
            onClick={() => setQuantity(Math.min(99, quantity + 1))}
            disabled={quantity === 99}
          >
            <Plus size={16} />
          </button>
        </div>
        <button className="button button-primary pdp-add-button" onClick={add}>
          <ShoppingBag size={18} />
          Add to bag <span>{formatPrice(product.price * quantity)}</span>
        </button>
      </div>
      <button
        className="pdp-buy-now button button-outline"
        onClick={() => {
          add();
          setPanel("cart");
        }}
      >
        Buy now <ArrowRight size={17} />
      </button>
      <div className="pdp-secondary-actions">
        <button aria-pressed={saved} onClick={() => toggleWishlist(product)}>
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved to wishlist" : "Add to wishlist"}
        </button>
        <button onClick={share}>
          <Share2 size={16} />
          Share
        </button>
      </div>
      {shareUrl && (
        <label className="pdp-share-fallback">
          Copy this product link
          <input
            readOnly
            value={shareUrl}
            onFocus={(event) => event.currentTarget.select()}
          />
        </label>
      )}
      <div className="pdp-delivery">
        <div>
          <Truck size={22} strokeWidth={1.4} />
          <span>
            <strong>Free shipping over $50</strong>
            <span>Standard delivery · $5.99 on smaller orders</span>
          </span>
        </div>
        <div>
          <RotateCcw size={21} strokeWidth={1.4} />
          <span>
            <strong>Easy returns</strong>
            <span>See delivery & returns for details</span>
          </span>
        </div>
      </div>
      <p className="pdp-secure">
        <ShieldCheck size={15} />
        Secure checkout preview · No payment collected
      </p>
      <p className="pdp-demo-note">
        Demo product. Options, specifications, and reviews are illustrative.
      </p>
    </div>
  );
}
